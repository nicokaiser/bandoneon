import { defineStore } from 'pinia';
import INSTRUMENTS from './instruments';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        instrument: 'rheinische142',
        locale: navigator.language?.split('-')[0] || 'en',
        pitchNotation: 'scientific',
    }),

    getters: {
        availableInstruments: () => Object.keys(INSTRUMENTS),
        availablePitchNotations: () => ['helmholtz', 'scientific'],
    },

    persist: true,
});
