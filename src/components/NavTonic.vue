<template>
  <div class="mb-3 flex flex-wrap justify-center print:hidden">
    <span v-for="idx in [0, 1]" :key="idx" class="inline-block text-nowrap">
      <Button
        v-for="item in store.allNotes.slice(idx * 6, idx * 6 + 6)"
        :key="item"
        :active="item === store.tonic"
        :disabled="disabled"
        class="m-1 w-12"
        @click="store.setTonic(item === store.tonic ? null : item)"
      >
        {{ format(item) }}
      </Button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/main';
import { enharmonic } from '@tonaljs/note';
import Button from './Button.vue';

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
