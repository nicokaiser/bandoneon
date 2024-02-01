<template>
  <g :class="{ selected }" @click.prevent="emit('click')">
    <circle
      :cx="x + 29"
      :cy="y + 29"
      r="28"
      :fill="fill"
      :stroke="stroke"
      stroke-width="1"
      :opacity="selected ? 1 : 0.33"
    />
    <text
      :x="x + 29"
      :y="y + 36"
      :fill="selected ? '#fff' : 'currentColor'"
      font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
      font-size="20px"
      text-anchor="middle"
    >
      <template v-if="label !== null">
        {{ label }}
      </template>
      <template v-else>
        <tspan>{{ format[0] }}</tspan>
        <tspan dx="2" font-size="16px">
          {{ format[1] }}
        </tspan>
      </template>
    </text>
  </g>
</template>

<script setup lang="ts">
import Note from '@tonaljs/note';
import { computed } from 'vue';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import helmholtz from '../utils/helmholtz';

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

const emit = defineEmits(['click']);

const store = useStore();
const settings = useSettingsStore();

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
  if (props.selected) return 'currentColor';
  if (props.color) return props.color;
  return 'transparent';
});

const stroke = computed(() => {
  return props.selected ? 'currentColor' : '#000';
});
</script>

<style scoped>
text {
  user-select: none;
  cursor: default;
}

.dark circle {
  stroke: #fff;
}

.dark .selected circle {
  fill: #f5f5f5;
}

.dark .selected text {
  fill: #262626;
}
</style>
