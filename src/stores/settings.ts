import { defineStore } from 'pinia';
import INSTRUMENTS from '../constants/instruments';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    instrument: 'rheinische142',
    locale: navigator.language?.split('-')[0] || 'en',
    pitchNotation: 'scientific',
    userChords: {} as Record<string, Record<string, string[]>>,
    difficulty: 'medium',
  }),

  getters: {
    allInstruments: () => Object.keys(INSTRUMENTS),
    allPitchNotations: () => ['helmholtz', 'scientific'],
  },

  actions: {
    saveUserChord(side: string, chordName: string, notes: string[]) {
      if (!this.userChords[side]) this.userChords[side] = {};
      this.userChords[side][chordName] = [...notes];
    },

    resetUserChord(side: string, chordName: string) {
      if (this.userChords[side]) delete this.userChords[side][chordName];
    },
  },

  persist: true,
});
