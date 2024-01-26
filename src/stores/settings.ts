import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    instrument: 'rheinische142',
    locale: navigator.language?.split('-')[0] || 'en',
    pitchNotation: 'scientific' as 'scientific' | 'helmholtz',
    userChords: {} as Record<string, Record<string, string[]>>,
    difficulty: 'medium' as 'medium' | 'easy',
  }),

  actions: {
    saveUserChord(side: string, chordName: string, notes: string[]) {
      if (!this.userChords[side]) this.userChords[side] = {};
      this.userChords[side][chordName] = [...notes];
    },

    resetUserChord(side: string, chordName: string) {
      if (this.userChords[side]) delete this.userChords[side][chordName];
    },
  },
});
