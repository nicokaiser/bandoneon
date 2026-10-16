<template>
  <g :class="{ selected }" @click.prevent="emit('click')">
    <circle class="bg" :cx="x + 29" :cy="y + 29" r="28" fill="#fff" />
    <circle :cx="x + 29" :cy="y + 29" r="28" :fill="fill" :stroke="stroke" stroke-width="2" />
    <text
      :x="x + 29"
      :y="y + 37"
      :fill="selected ? '#fff' : 'currentColor'"
      font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
      font-size="22px"
      font-weight="600"
      text-anchor="middle"
    >
      <template v-if="label !== null">
        {{ label }}
      </template>
      <template v-else>
        <tspan>{{ format[0] }}</tspan>
        <tspan dx="1" font-size="15px" font-weight="500">
          {{ format[1] }}
        </tspan>
      </template>
    </text>
  </g>
</template>

<script setup lang="ts">
import { Note } from 'tonal';
import { computed } from 'vue';

import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import { scientificToHelmholtzNotation } from '../utils/helmholtz';
import { scientificToSolfegeNotation } from '../utils/solfege';

const props = withDefaults(
  defineProps<{
    x: number;
    y: number;
    tonal: string;
    selected?: boolean;
    label?: string | null;
    color?: string;
  }>(),
  {
    selected: false,
    label: null,
    color: undefined,
  },
);

const emit = defineEmits<{ click: [] }>();

const store = useStore();
const settings = useSettingsStore();

const format = computed(() => {
  const note = Note.get(store.showEnharmonics ? Note.enharmonic(props.tonal) : props.tonal);
  if (note.empty) return ['', ''];

  if (settings.pitchNotation === 'helmholtz') {
    return [scientificToHelmholtzNotation(note.name), ''];
  } else if (settings.pitchNotation === 'solfege') {
    return [
      scientificToSolfegeNotation(note.name).slice(0, -1).replace('b', '♭').replace('#', '♯'),
      '' + note.oct,
    ];
  }

  return [note.pc.replace('b', '♭').replace('#', '♯'), '' + note.oct];
});

const fill = computed(() => {
  if (props.selected) return 'currentColor';
  if (props.color) return props.color;
  return 'transparent';
});

const stroke = computed(() => {
  return props.selected ? 'currentColor' : '#000';
});
</script>

<style scoped>
circle {
  stroke: #a3a3a3; /* neutral-400 */
}

.bg {
  stroke: none;
}

.dark .bg {
  fill: #0a0a0a; /* neutral-950 */
}

.dark circle {
  stroke: #737373; /* neutral-500 */
}

.selected circle {
  fill: #171717;
  stroke: #171717;
}

text {
  user-select: none;
  cursor: default;
}

.dark .selected circle {
  fill: #fff;
  stroke: #fff;
}

.dark .selected text {
  fill: #0a0a0a;
}
</style>
