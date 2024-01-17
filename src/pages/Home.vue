<template>
  <svg
    ref="svg"
    class="keyboard mb-4"
    viewBox="0 0 690 410"
    width="720"
    height="428"
  >
    <SvgButton
      v-for="([x, y, tonal], idx) in store.keyPositions"
      :key="idx"
      :selected="selected[tonal]"
      :x="x"
      :y="y"
      :tonal="tonal"
      @click="toggle(tonal)"
    />
    <SvgPath
      v-for="(path, index) in store.scalePaths"
      :key="index"
      :stroke="getScaleColor(index)"
      :d="path"
    />
  </svg>

  <NavVariant />
  <NavTonic />
  <NavDisplay
    :modified="modified"
    @reset="onReset"
    @download="onDownload"
    @save="onSave"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useKeyboard } from '../composables/useKeyboard';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import download from '../utils/download';
import NavVariant from '../components/NavVariant.vue';
import NavTonic from '../components/NavTonic.vue';
import NavDisplay from '../components/NavDisplay.vue';
import SvgPath from '../components/SvgPath.vue';
import SvgButton from '../components/SvgButton.vue';

useKeyboard();

const svg = ref();

const COLORS_SCALE = [
  '#ffc107', // yellow
  '#0d6efd', // blue
  '#dc3545', // red
  '#198754', // green
];

const store = useStore();
const settings = useSettingsStore();

const modified = ref(false);
const userSelected = ref<Record<string, boolean>>({});

const getScaleColor = (octave: number) => {
  return COLORS_SCALE[octave % COLORS_SCALE.length];
};

const onDownload = () => {
  const filename =
    `bandoneon-${settings.instrument}-${store.side}-${store.direction}` +
    (store.tonic ? '-' + store.tonic.replace('#', 's') : '') +
    (store.chordType ? store.chordType : '') +
    (store.scaleType ? '-' + store.scaleType : '') +
    (modified.value ? '-custom' : '') +
    '.png';

  download(svg.value, filename);
};

const resetSelected = () => {
  userSelected.value = {};
  modified.value = false;
};

const side = computed(() => store.side);
const tonic = computed(() => store.tonic);
const chordType = computed(() => store.chordType);
watch([side, tonic, chordType], resetSelected);

const selected = computed(() => {
  if (modified.value) return userSelected.value;

  const result: Record<string, boolean> = {};

  const chord = store.chordNotes;
  if (chord) {
    for (let i = 0; i <= chord.length; i++) {
      if (chord[i]) result[chord[i]] = true;
    }
  }
  return result;
});

const toggle = (tonal: string) => {
  if (!modified.value) {
    userSelected.value = { ...selected.value };
    modified.value = true;
  }
  if (userSelected.value[tonal]) {
    delete userSelected.value[tonal];
  } else {
    userSelected.value[tonal] = true;
  }
};

const onSave = () => {
  if (modified.value && store.chordName) {
    settings.saveUserChord(
      store.side,
      store.chordName,
      Object.keys(userSelected.value).filter(
        (item) => !!userSelected.value[item],
      ),
    );
  }
  resetSelected();
};

const onReset = () => {
  resetSelected();
  if (store.chordName) settings.resetUserChord(store.side, store.chordName);
};
</script>

<style scoped>
.keyboard {
  width: 100%;
  height: calc(100% / 720 * 428);
  max-height: calc(90vh - 5em);
}
</style>
