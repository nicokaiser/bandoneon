<template>
  <div class="mx-auto max-w-screen-md p-6">
    <SvgKeyboard ref="keyboard">
      <SvgButton
        v-for="([x, y, tonal], idx) in keyPositions"
        :key="idx"
        :selected="selected[tonal]"
        :x="x"
        :y="y"
        :tonal="tonal"
        @click="toggle(tonal)"
      />
      <SvgPath
        v-for="(path, index) in scalePaths"
        :key="index"
        :stroke="getScaleColor(index)"
        :d="path"
      />
    </SvgKeyboard>

    <NavVariant />
    <NavTonic />
    <NavDisplay
      :modified="modified"
      @reset="onReset"
      @download="onDownload"
      @save="onSave"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import NavDisplay from '../components/NavDisplay.vue';
import NavTonic from '../components/NavTonic.vue';
import NavVariant from '../components/NavVariant.vue';
import SvgButton from '../components/SvgButton.vue';
import SvgKeyboard from '../components/SvgKeyboard.vue';
import SvgPath from '../components/SvgPath.vue';
import { useKeyboard } from '../composables/useKeyboard';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';

useKeyboard();

const keyboard = ref();

const COLORS_SCALE = [
  '#ca8a04', // yellow-600
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
];

const store = useStore();
const {
  side,
  direction,
  tonic,
  chordType,
  chordNotes,
  chordName,
  keyPositions,
  scaleType,
  scalePaths,
} = storeToRefs(store);

const settings = useSettingsStore();
const { instrument } = storeToRefs(settings);

const modified = ref(false);
const userSelection = ref<Record<string, boolean>>({});

const getScaleColor = (octave: number) => {
  return COLORS_SCALE[octave % COLORS_SCALE.length];
};

const onDownload = () => {
  const filename =
    `bandoneon-${instrument.value}-${side.value}-${direction.value}` +
    (tonic.value ? '-' + tonic.value.replace('#', 's') : '') +
    (chordType.value ? chordType.value : '') +
    (scaleType.value ? '-' + scaleType.value : '') +
    (modified.value ? '-custom' : '') +
    '.png';

  keyboard.value.download(filename);
};

const resetUserSelection = () => {
  userSelection.value = {};
  modified.value = false;
};

watch([side, tonic, chordType], resetUserSelection);

const selected = computed(() => {
  if (modified.value) return userSelection.value;

  const result: Record<string, boolean> = {};

  const chord = chordNotes.value;
  if (chord) {
    for (let i = 0; i <= chord.length; i++) {
      if (chord[i]) result[chord[i]] = true;
    }
  }
  return result;
});

const toggle = (tonal: string) => {
  if (!modified.value) {
    userSelection.value = { ...selected.value };
    modified.value = true;
  }
  if (userSelection.value[tonal]) {
    delete userSelection.value[tonal];
  } else {
    userSelection.value[tonal] = true;
  }
};

const onSave = () => {
  if (modified.value && chordName.value) {
    settings.saveUserChord(
      side.value,
      chordName.value,
      Object.keys(userSelection.value).filter(
        (item) => !!userSelection.value[item],
      ),
    );
  }
  resetUserSelection();
};

const onReset = () => {
  resetUserSelection();
  if (chordName.value) settings.resetUserChord(side.value, chordName.value);
};

onMounted(() => {
  tonic.value = null;
  chordType.value = null;
  scaleType.value = null;
});
</script>
