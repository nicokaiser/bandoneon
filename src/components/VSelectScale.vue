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
  <div>
    <div class="btn-toolbar justify-content-between d-print-none">
      <div class="btn-group">
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
      <!--
      <button
        :class="['btn', 'btn-outline-secondary', showSettings ? 'active' : null]"
        style="line-height: 1em;"
        title="Settings"
        @click.stop="toggleSettings()"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-gear-wide-connected"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"
          />
          <path
            fill-rule="evenodd"
            d="M7.375 8L4.602 4.302l.8-.6L8.25 7.5h4.748v1H8.25L5.4 12.298l-.8-.6L7.376 8z"
          />
        </svg>
      </button>
      -->
    </div>
    <v-select-instrument v-if="showSettings" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VSelectInstrument from './VSelectInstrument';

  export default {
    components: { VSelectInstrument },

    data: () => ({
      showSettings: false,
    }),

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
      },

      toggleSettings() {
        this.showSettings = !this.showSettings;
      },
    }
  }
</script>
