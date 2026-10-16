<template>
  <div class="grid grid-cols-6 gap-1 sm:grid-cols-12 print:hidden">
    <Button
      v-for="item in notes"
      :key="item"
      class="min-w-0 px-0"
      :aria-pressed="item === tonic"
      :disabled="disabled"
      @click.prevent="store.setTonic(item === tonic ? null : item)"
    >
      {{ format(item) }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Note } from 'tonal';

import { notes } from '../data/index';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import { scientificToSolfegeNotation } from '../utils/solfege';
import Button from './Button.vue';

defineProps<{ disabled?: boolean }>();

const store = useStore();
const { tonic, showEnharmonics } = storeToRefs(store);

const settings = useSettingsStore();

const format = (noteName: string): string => {
  if (settings.pitchNotation === 'solfege') {
    if (!showEnharmonics.value) {
      return scientificToSolfegeNotation(noteName).replace('#', '♯');
    }

    if (noteName.length === 2 && noteName[1] === '#') {
      return scientificToSolfegeNotation(Note.enharmonic(noteName)).replace('b', '♭');
    }

    return scientificToSolfegeNotation(noteName);
  }

  if (!showEnharmonics.value) {
    return noteName.replace('#', '♯');
  }

  if (noteName.length === 2 && noteName[1] === '#') {
    return Note.enharmonic(noteName).replace('b', '♭');
  }

  return noteName;
};
</script>
