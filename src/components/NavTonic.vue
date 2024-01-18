<template>
  <div class="mb-2 text-center d-print-none">
    <span v-for="idx in [0, 1]" :key="idx" class="d-inline-block text-nowrap">
      <button
        v-for="item in store.allNotes.slice(idx * 6, idx * 6 + 6)"
        :key="item"
        :class="[
          'btn btn-outline-secondary mx-1 my-1',
          item === store.tonic ? 'active' : null,
        ]"
        :disabled="disabled"
        style="width: 3em"
        @click="store.setTonic(item === store.tonic ? null : item)"
      >
        {{ format(item) }}
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/main';
import { enharmonic } from '@tonaljs/note';

defineProps({
  disabled: Boolean,
});

const store = useStore();

const format = (noteName: string): string => {
  if (!store.showEnharmonics) {
    return noteName.replace('#', '♯');
  }

  if (noteName.length === 2 && noteName[1] === '#') {
    return enharmonic(noteName).replace('b', '♭');
  }

  return noteName;
};
</script>
