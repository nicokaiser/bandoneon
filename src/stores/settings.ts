import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const instrument = ref('rheinische142');
  const locale = ref(navigator.language?.split('-')[0] || 'en');
  const pitchNotation = ref<'scientific' | 'helmholtz'>('scientific');
  const userChords = ref<Record<string, Record<string, string[]>>>({});
  const difficulty = ref<'medium' | 'easy'>('medium');

  function saveUserChord(side: string, chordName: string, notes: string[]) {
    if (!userChords.value[side]) userChords.value[side] = {};
    userChords.value[side][chordName] = [...notes];
  }

  function resetUserChord(side: string, chordName: string) {
    if (userChords.value[side]) delete userChords.value[side][chordName];
  }

  return {
    instrument,
    locale,
    pitchNotation,
    userChords,
    difficulty,
    saveUserChord,
    resetUserChord,
  };
});
