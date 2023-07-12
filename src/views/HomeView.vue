<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useKeyboardNavigation } from '../composables/useKeyboardNavigation';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import Note from '@tonaljs/note';
import Scale from '@tonaljs/scale';
import download from '../helpers/download';
import helmholtz from '../helpers/helmholtz';
import NavVariant from '../components/NavVariant.vue';
import NavTonic from '../components/NavTonic.vue';
import NavDisplay from '../components/NavDisplay.vue';

useKeyboardNavigation();

const svg = ref();

const COLORS_OCTAVE = [
  '#198754', // green
  '#ffc107', // yellow
  '#0dcaf0', // cyan
  '#dc3545', // red
];

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

const format = (tonal: string): string[] => {
  const note = Note.get(store.showEnharmonics ? Note.enharmonic(tonal) : tonal);
  if (note.empty) return ['', ''];

  if (settings.pitchNotation === 'helmholtz') {
    return [helmholtz(note.name), ''];
  }

  return [note.pc.replace('b', '♭').replace('#', '♯'), '' + note.oct];
};

const getScaleColor = (octave: number) => {
  return COLORS_SCALE[octave % COLORS_SCALE.length];
};

const scalePaths = computed(() => {
  if (store.tonic && store.scaleType) {
    const { intervals, empty } = Scale.get(store.scaleType);
    if (empty) return [];
    const paths = [];

    for (let o = -1; o < 7; o++) {
      const notes = intervals.map((i) =>
        Note.transpose(`${store.tonic}${o}`, i),
      );
      notes.push(`${store.tonic}${o + 1}`);
      let pathString = '';

      notes.forEach((n) => {
        const no = Note.get(n);

        const pos = store.keyPositions.find(
          (v) => Note.get(v[2]).height === no.height,
        );

        if (pos) {
          pathString += `${pathString === '' ? 'M' : 'L'}${pos[0] + 30},${
            pos[1] + 30
          }`;
        }
      });

      paths.push(pathString);
    }

    return paths;
  }

  return [];
});

const fill = (tonal: string) => {
  let octave = +tonal.slice(1);
  if (tonal[1] === '#') octave = +tonal.slice(2);
  return store.showColors
    ? COLORS_OCTAVE[octave % COLORS_OCTAVE.length]
    : '#adb5bd'; // gray-500
};

const onDownload = () => {
  let filename = `bandoneon-${settings.instrument}-${store.side}-${store.direction}`;
  if (store.tonic) {
    filename += '-' + store.tonic.replace('#', 's');
    if (store.chordType) filename += store.chordType;
    if (store.scaleType) filename += '-' + store.scaleType;
  }
  if (modified.value) {
    filename += '-custom';
  }
  filename += '.png';

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

<template>
  <svg
    ref="svg"
    class="keyboard mb-4"
    viewBox="0 0 690 410"
    width="720"
    height="428"
  >
    <g
      v-for="([x, y, tonal], idx) in store.keyPositions"
      :key="idx"
      @click="toggle(tonal)"
    >
      <circle
        :cx="x + 29"
        :cy="y + 29"
        r="28"
        :fill="fill(tonal)"
        style="stroke: var(--bs-tertiary-color)"
        :stroke-width="selected[tonal] ? 2 : 1"
        :fill-opacity="selected[tonal] ? 0.7 : 0.2"
      />
      <text
        :x="x + 29"
        :y="y + 36"
        style="fill: var(--bs-body-color)"
        font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
        font-size="20px"
        text-anchor="middle"
      >
        <tspan>{{ format(tonal)[0] }}</tspan>
        <tspan dx="2" font-size="16px">
          {{ format(tonal)[1] }}
        </tspan>
      </text>
    </g>
    <path
      v-for="(path, index) in scalePaths"
      :key="index"
      :stroke="getScaleColor(index)"
      :d="path"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-opacity="0.7"
      stroke-width="3px"
      fill="none"
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

<style scoped>
.keyboard {
  width: 100%;
  height: calc(100% / 720 * 428);
  max-height: calc(90vh - 5em);
}

.keyboard text {
  user-select: none;
  cursor: default;
}
</style>
