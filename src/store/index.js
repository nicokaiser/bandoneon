import { createStore } from "vuex"

import originalChords from './chords.json'
import instruments from './instruments'

export const store = createStore({
  state: () => ({
    language: window.localStorage.getItem('language') || navigator.language?.split('-')[0] || 'en',
    colors: false,
    chords: (window.localStorage.getItem('chords') && JSON.parse(window.localStorage.getItem('chords'))) || JSON.parse(JSON.stringify(originalChords)),
    originalChords,
    enharmonic: false,
    instruments,
    instrument: window.localStorage.getItem('instrument') || 'rheinische142',
    pitchNotation: window.localStorage.getItem('pitchNotation') || 'helmholtz',
    variants: ['left-open', 'left-close', 'right-open', 'right-close'],
    scaleTypes: ['major', 'minor', 'chromatic'],
    chordTypes: ['M', 'm', '7', 'dim', 'm7', 'M7'],
  }),

  getters: {
    currentVariant(state) {
      return state.route.params.variant || 'right-open'
    },

    currentTonic(state) {
      return state.route.params.tonic ? decodeURIComponent(state.route.params.tonic) : undefined
    },

    currentChordType(state) {
      return state.route.params.chordType
    },

    currentScaleType(state) {
      return state.route.params.scaleType
    },
  },

  mutations: {
    setLanguage(state, language) {
      window.localStorage.setItem('language', language)
      state.language = language
    },

    setInstrument(state, instrument) {
      if (instrument in instruments) {
        state.instrument = instrument
        window.localStorage.setItem('instrument', instrument)
      }
    },

    setPitchNotation(state, pitchNotation) {
      state.pitchNotation = pitchNotation
      window.localStorage.setItem('pitchNotation', pitchNotation)
    },
  },
})
