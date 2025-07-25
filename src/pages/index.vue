<template>
  <div class="mx-auto flex w-full max-w-[896px] flex-1 items-center px-6 pt-6">
    <SvgKeyboard ref="keyboardEl">
      <SvgButton
        v-for="([x, y, tonal], idx) in keyPositions"
        :key="idx"
        :selected="selected[tonal]"
        :x="x"
        :y="y"
        :tonal="tonal"
        :color="color(tonal)"
        @click="toggle(tonal)"
      />
      <SvgPath
        v-for="(path, index) in scalePaths"
        :key="index"
        :stroke="getScaleColor(index)"
        :d="path"
      />
    </SvgKeyboard>
  </div>
  <div class="mx-auto max-w-(--breakpoint-md) px-6 pb-6">
    <NavVariant />
    <NavTonic />
    <NavDisplay :modified="isModified" @reset="onReset" @download="onDownload" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { storeToRefs } from 'pinia';
import { Note, Scale } from 'tonal';
import { computed, onMounted, ref, watch } from 'vue';
import NavDisplay from '../components/NavDisplay.vue';
import NavTonic from '../components/NavTonic.vue';
import NavVariant from '../components/NavVariant.vue';
import SvgButton from '../components/SvgButton.vue';
import SvgKeyboard from '../components/SvgKeyboard.vue';
import SvgPath from '../components/SvgPath.vue';
import { useKeyboard } from '../composables/useKeyboard';
import { colors } from '../data/index';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';

useHead({ title: 'Bandoneon keyboard, chords and scales – Bandoneon.app' });

useKeyboard();

const keyboardEl = ref<typeof SvgKeyboard>();

const store = useStore();
const {
  chordName,
  chordNotes,
  chordType,
  direction,
  keyPositions,
  scaleType,
  showColors,
  side,
  tonic,
} = storeToRefs(store);

const settings = useSettingsStore();
const { instrument } = storeToRefs(settings);

const isModified = ref(false);
const userSelection = ref<Record<string, boolean>>({});

const getScaleColor = (octave: number) => {
  return colors[(octave - 1) % colors.length];
};

const scalePaths = computed(() => {
  if (!tonic.value || !scaleType.value) return [];
  const { intervals, empty } = Scale.get(scaleType.value);
  if (empty) return [];
  const paths = [];
  for (let o = -1; o < 7; o++) {
    const scaleNotes = intervals.map((i) => Note.transpose(`${tonic.value}${o}`, i));
    scaleNotes.push(`${tonic.value}${o + 1}`);
    let pathString = '';
    for (const note of scaleNotes) {
      const no = Note.get(note);
      const pos = keyPositions.value.find((v) => Note.get(v[2]).height === no.height);
      if (pos) {
        pathString += `${pathString === '' ? 'M' : 'L'}${pos[0] + 30},${pos[1] + 30}`;
      }
    }
    paths.push(pathString);
  }
  return paths;
});

const onDownload = () => {
  const filename =
    `bandoneon-${instrument.value}-${side.value}-${direction.value}` +
    (tonic.value ? '-' + tonic.value.replace('#', 's') : '') +
    (chordType.value ? chordType.value : '') +
    (scaleType.value ? '-' + scaleType.value : '') +
    (isModified.value ? '-custom' : '') +
    '.png';

  keyboardEl.value?.download(filename);
};

const resetUserSelection = () => {
  userSelection.value = {};
  isModified.value = false;
};

watch([side, tonic, chordType], resetUserSelection);

const selected = computed(() => {
  if (isModified.value) return userSelection.value;

  const result: Record<string, boolean> = {};

  const chord = chordNotes.value;
  if (chord) {
    for (let i = 0; i <= chord.length; i++) {
      if (chord[i]) result[chord[i]] = true;
    }
  }
  return result;
});

function color(tonal: string) {
  if (showColors.value) {
    let octave = +tonal.slice(1);
    if (tonal[1] === '#') octave = +tonal.slice(2);
    return colors[octave % colors.length] + '80';
  }
  return 'transparent';
}

const toggle = (tonal: string) => {
  if (!isModified.value) {
    userSelection.value = { ...selected.value };
    isModified.value = true;
  }
  if (userSelection.value[tonal]) {
    delete userSelection.value[tonal];
  } else {
    userSelection.value[tonal] = true;
  }
};

const onSave = () => {
  if (isModified.value && chordName.value) {
    settings.saveUserChord(
      side.value,
      chordName.value,
      Object.keys(userSelection.value).filter((item) => !!userSelection.value[item]),
    );
  }
  resetUserSelection();
};

const onReset = () => {
  resetUserSelection();
  if (chordName.value) settings.resetUserChord(side.value, chordName.value);
};

onMounted(() => store.$reset());
</script>
