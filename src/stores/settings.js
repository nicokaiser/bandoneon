import { defineStore } from 'pinia';
import INSTRUMENTS from '@/constants/instruments';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        instrument: 'rheinische142',
        locale: navigator.language?.split('-')[0] || 'en',
        pitchNotation: 'scientific',
        userChords: {},
    }),

    getters: {
        availableInstruments: () => Object.keys(INSTRUMENTS),
        availablePitchNotations: () => ['helmholtz', 'scientific'],
    },

    actions: {
        saveUserChord(side, chordName, notes) {
            if (!this.userChords[side]) this.userChords[side] = {};
            this.userChords[side][chordName] = [...notes];
        },

        resetUserChord(side, chordName) {
            if (this.userChords[side]) delete this.userChords[side][chordName];
        },
    },

    persist: true,
});
