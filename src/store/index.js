import Vue from "vue"
import Vuex from "vuex"

import chords from './chords.json'
import positions from './positions.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    buttonColors: false,
    chords,
    positions,
    variants: ['left-open', 'left-close', 'right-open', 'right-close'],
    scaleTypes: ['major', 'minor', 'chromatic'],
    chordTypes: ['M', 'm', '7', 'dim', 'm7', 'M7']
  }),

  getters: {
    currentVariant(state) {
      return state.route.params.variant || 'right-open'
    },

    currentTonic(state) {
      return state.route.params.tonic
    },

    currentChordType(state) {
      return state.route.params.chordType
    },

    currentScaleType(state) {
      return state.route.params.scaleType
    }
  },
})
