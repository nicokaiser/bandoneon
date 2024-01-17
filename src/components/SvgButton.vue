<template>
  <g @click="click">
    <circle
      :cx="x + 29"
      :cy="y + 29"
      r="28"
      :fill="fill"
      stroke="#212529"
      :stroke-width="selected ? 2 : 1"
      :fill-opacity="selected ? 0.7 : 0.2"
    />
    <text
      :x="x + 29"
      :y="y + 36"
      fill="#212529"
      font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
      font-size="20px"
      text-anchor="middle"
    >
      <tspan>{{ format[0] }}</tspan>
      <tspan dx="2" font-size="16px">
        {{ format[1] }}
      </tspan>
    </text>
  </g>
</template>

<script setup lang="ts">
import Note from '@tonaljs/note';
import { computed } from 'vue';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import helmholtz from '../utils/helmholtz';

const COLORS_OCTAVE = [
  '#198754', // green
  '#ffc107', // yellow
  '#0dcaf0', // cyan
  '#dc3545', // red
];

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  tonal: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const store = useStore();
const settings = useSettingsStore();

const click = () => {
  emit('click');
};

const format = computed(() => {
  const note = Note.get(
    store.showEnharmonics ? Note.enharmonic(props.tonal) : props.tonal,
  );
  if (note.empty) return ['', ''];

  if (settings.pitchNotation === 'helmholtz') {
    return [helmholtz(note.name), ''];
  }

  return [note.pc.replace('b', '♭').replace('#', '♯'), '' + note.oct];
});

const fill = computed(() => {
  let octave = +props.tonal.slice(1);
  if (props.tonal[1] === '#') octave = +props.tonal.slice(2);
  return store.showColors
    ? COLORS_OCTAVE[octave % COLORS_OCTAVE.length]
    : '#adb5bd'; // gray-500
});
</script>

<style scoped>
text {
  user-select: none;
  cursor: default;
}
</style>
