<i18n>
{
  "de": {
    "major": "Dur",
    "minor": "Moll",
    "chromatic": "chromatisch",
    "colors": "Farben"
  },
  "en": {
    "major": "major",
    "minor": "minor",
    "chromatic": "chromatic",
    "colors": "button colors"
  },
  "es": {
    "major": "mayor",
    "minor": "menor",
    "chromatic": "cromático",
    "colors": "colores"
  }
}
</i18n>

<template>
  <div class="btn-toolbar justify-content-between">
    <div class="btn-group mr-2">
      <button
        v-for="scaleType in scaleTypes" 
        :key="scaleType"
        :class="['btn', (currentScaleType === scaleType) ? 'btn-primary' : 'btn-outline-secondary']"
        @click.stop="setScaleType(scaleType)"
      >
        {{ $t(scaleType) }}
      </button>
    </div>
    <div class="btn-group">
      <button
        v-for="chordType in chordTypes" 
        :key="chordType"
        :class="['btn', (currentChordType === chordType) ? 'btn-primary' : 'btn-outline-secondary']"
        @click.stop="setChordType(chordType)"
      >
        {{ chordType }}
      </button>
    </div>
    <button
      :class="['btn', 'btn-outline-secondary', buttonColors ? 'active' : null]"
      @click.stop="toggleButtonColors()"
    >
      {{ $t('colors') }}
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      buttonColors() {
        return this.$store.state.buttonColors
      },

      scaleTypes() {
        return this.$store.state.scaleTypes
      },

      chordTypes() {
        return this.$store.state.chordTypes
      },

      ...mapGetters(['currentVariant', 'currentTonic', 'currentScaleType', 'currentChordType'])
    },

    mounted() {
      document.addEventListener('keypress', ({ key }) => {
        if (key === 'M') return this.setChordType('M')
        if (key === 'm') return this.setChordType('m')
        if (key === '7') return this.setChordType('7')

        if (key === 'C') return this.toggleButtonColors()
      })
    },

    methods: {
      setScaleType(scaleType) {
        if (this.currentScaleType === scaleType) return
        this.$router.push({ name: 'scale', params: {
          variant: this.currentVariant,
          tonic: this.currentTonic || 'C',
          scaleType
        }})
      },

      setChordType(chordType) {
        if (this.currentChordType === chordType) return
        this.$router.push({ name: 'chord', params: {
          variant: this.currentVariant,
          tonic: this.currentTonic || 'C',
          chordType
        }})
      },

      toggleButtonColors() {
        this.$store.state.buttonColors = !this.$store.state.buttonColors
      }
    }
  }
</script>
