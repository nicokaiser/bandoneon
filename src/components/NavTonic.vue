<template>
  <div class="mb-3 flex flex-wrap justify-center print:hidden">
    <span v-for="idx in [0, 1]" :key="idx" class="inline-block text-nowrap">
      <Button
        v-for="item in notes.slice(idx * 6, idx * 6 + 6)"
        :key="item"
        class="m-1 w-12"
        :aria-pressed="item === tonic"
        :disabled="disabled"
        @click.prevent="store.setTonic(item === tonic ? null : item)"
      >
        {{ format(item) }}
      </Button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { enharmonic } from '@tonaljs/note';
import { storeToRefs } from 'pinia';
import { notes } from '../data/index';
import { useStore } from '../stores/main';
import Button from './Button.vue';

defineProps({
  disabled: Boolean,
});

const store = useStore();
const { tonic, showEnharmonics } = storeToRefs(store);

const format = (noteName: string): string => {
  if (!showEnharmonics.value) {
    return noteName.replace('#', '♯');
  }

  if (noteName.length === 2 && noteName[1] === '#') {
    return enharmonic(noteName).replace('b', '♭');
  }

  return noteName;
};
</script>
