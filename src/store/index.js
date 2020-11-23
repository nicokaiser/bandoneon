import Vue from "vue"
import Vuex from "vuex"
import VueLocalStorage from 'vue-localstorage'

import chords from './chords.json'
import instruments from './instruments'

Vue.use(Vuex)
Vue.use(VueLocalStorage)

export default new Vuex.Store({
  state: () => ({
    language: Vue.localStorage.get('language') || navigator.language?.split('-')[0] || 'en',
    colors: false,
    chords,
    enharmonic: false,
    instruments,
    instrument: Vue.localStorage.get('instrument') || 'rheinische142',
    pitchNotation: 'helmholtz',
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
      Vue.localStorage.set('language', language)
      state.language = language
    },

    setInstrument(state, instrument) {
      if (instrument in instruments) {
        state.instrument = instrument
        Vue.localStorage.set('instrument', instrument)
      }
    },

    setPitchNotation(state, pitchNotation) {
      state.pitchNotation = pitchNotation
      // Vue.localStorage.set('picthNotation', pitchNotation)
    },
  },
})
