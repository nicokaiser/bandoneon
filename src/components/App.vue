<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light mb-5">
      <div class="container">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-brand mr-auto"
        >
          Bandoneon.app
        </router-link>
        <div class="nav-item">
          <small>{{ $t(currentInstrument) }}</small>
        </div>
      </div>
    </nav>
    <div class="container mb-5">
      <ul class="nav nav-tabs nav-fill d-print-none">
        <li
          v-for="variant in variants"
          :key="variant"
          class="nav-item"
        >
          <a
            :class="['nav-link', (currentVariant === variant) ? 'active' : null]"
            href="#"
            @click.prevent="setVariant(variant)"
          >
            {{ $t(variant) }}
          </a>
        </li>
      </ul>
      <v-keyboard
        ref="keyboard"
        :variant="currentVariant"
        :tonic="currentTonic"
        :scale-type="currentScaleType"
        :chord-type="currentChordType"
      />
      <div class="btn-toolbar mb-3 d-print-none">
        <div
          class="btn-group"
          style="width: 100%"
        >
          <button
            v-for="tonic in tonics"
            :key="tonic"
            :class="['btn', (currentTonic === tonic) ? 'btn-secondary' : 'btn-outline-secondary']"
            @click.stop="setTonic(tonic)"
          >
            {{ enharmonicNoteName(tonic) }}
          </button>
        </div>
      </div>
      <div class="btn-toolbar justify-content-between d-print-none">
        <button
          :class="['btn', 'btn-outline-secondary', enharmonic ? 'active' : null]"
          @click.stop="toggleEnharmonic()"
        >
          {{ enharmonic ? '♯' : '♭' }}
        </button>
        <div class="btn-group">
          <button
            v-for="scaleType in scaleTypes"
            :key="scaleType"
            :class="['btn', (currentScaleType === scaleType) ? 'btn-secondary' : 'btn-outline-secondary']"
            @click.stop="setScaleType(scaleType)"
          >
            {{ $t(scaleType) }}
          </button>
        </div>
        <div class="btn-group">
          <button
            v-for="chordType in chordTypes"
            :key="chordType"
            :class="['btn', (currentChordType === chordType) ? 'btn-secondary' : 'btn-outline-secondary']"
            @click.stop="setChordType(chordType)"
          >
            {{ chordType }}
          </button>
        </div>
        <button
          :class="['btn', 'btn-outline-secondary', colors ? 'active' : null]"
          @click.stop="toggleColors()"
        >
          {{ $t('colors') }}
        </button>
        <button
          class="btn btn-outline-secondary"
          style="line-height: 1em;"
          :title="$t('useVoicing')"
          @click.stop="useVoicing()"
        >
          {{ $t('useVoicing-short') }}
        </button>
        <button
                class="btn btn-outline-secondary"
                style="line-height: 1em;"
                :title="$t('resetVoicing')"
                @click.stop="resetVoicing()"
        >
          {{ $t('resetVoicing-short') }}
        </button>
        <button
          :class="['btn', 'btn-outline-secondary', showSettings ? 'active' : null]"
          style="line-height: 1em;"
          :title="$t('settings')"
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
      </div>
      <div
        v-if="showSettings"
        class="my-3 form-group"
      >
        <select
          class="form-control d-print-none"
          @change="setInstrument($event)"
        >
          <option
            v-for="instrument in instruments"
            :key="instrument"
            :selected="currentInstrument === instrument"
            :value="instrument"
          >
            {{ $t(instrument) }}
          </option>
        </select>
      </div>
      <div
        v-if="showSettings"
        class="my-3 form-group"
      >
        <select
          class="form-control d-print-none"
          @change="setPitchNotation($event)"
        >
          <option
            v-for="item in ['helmholtz', 'scientific']"
            :key="item"
            :selected="pitchNotation === item"
            :value="item"
          >
            {{ $t(item) }}
          </option>
        </select>
      </div>
    </div>
    <v-how-to />
    <v-footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Note from '@tonaljs/note'
  import VHowTo from './VHowTo.vue'
  import VFooter from './VFooter.vue'
  import VKeyboard from './VKeyboard.vue'

  export default {
    name:'App',

    components: {
      VHowTo, VFooter, VKeyboard
    },

    data() {
      return {
        tonics: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        showSettings: false,
      }
    },

    computed: {
      variants() {
        return this.$store.state.variants
      },

      colors() {
        return this.$store.state.colors
      },

      enharmonic() {
        return this.$store.state.enharmonic
      },

      scaleTypes() {
        return this.$store.state.scaleTypes
      },

      chordTypes() {
        return this.$store.state.chordTypes
      },

      instruments() {
        return Object.keys(this.$store.state.instruments)
      },

      currentInstrument() {
        return this.$store.state.instrument
      },

      pitchNotation() {
        return this.$store.state.pitchNotation
      },

      ...mapGetters(['currentVariant', 'currentScaleType', 'currentChordType', 'currentTonic'])
    },

    mounted() {
      document.addEventListener('keypress', ({ key }) => {
        if (key === 'l') return this.setVariant('left-open')
        if (key === 'L') return this.setVariant('left-close')
        if (key === 'r') return this.setVariant('right-open')
        if (key === 'R') return this.setVariant('right-close')

        if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
          return this.setTonic(key.toUpperCase(), true)
        }

        if (key === '#' && this.currentTonic && this.currentTonic.length === 1) {
          this.setTonic(this.currentTonic + '#')
        }

        if (key === 'M') return this.setChordType('M')
        if (key === 'm') return this.setChordType('m')
        if (key === '7') return this.setChordType('7')

        if (key === 'C') return this.toggleColors()
      })
    },

    methods: {
      setVariant(variant) {
        if (this.currentVariant === variant) return
        this.$router.push({
          name: this.$route.name,
          params: { ...this.$route.params, ...{ variant } },
        })
      },

      setTonic(tonic, force = false) {
        if (this.currentTonic === tonic) {
          if (!force) this.$router.push({ name: 'home', params: {
            variant: this.currentVariant,
          }})
          return
        }

        if (this.currentScaleType) {
          this.$router.push({ name: 'scale', params: {
            variant: this.currentVariant,
            tonic,
            scaleType: this.currentScaleType,
          }})
          return
        }

        this.$router.push({ name: 'chord', params: {
          variant: this.currentVariant,
          tonic,
          chordType: this.currentChordType || 'M',
        }})
      },

      enharmonicNoteName(name) {
        if (!this.enharmonic) return name.replace('#', '♯')
        if (name.length === 2 && name[1] === '#') {
          return Note.enharmonic(name).replace('b', '♭')
        }
        return name
      },

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

      setPitchNotation(event) {
        this.$store.commit('setPitchNotation', event.target.value)
      },

      toggleEnharmonic() {
        this.$store.state.enharmonic = !this.$store.state.enharmonic
      },

      toggleColors() {
        this.$store.state.colors = !this.$store.state.colors
      },

      toggleSettings() {
        this.showSettings = !this.showSettings
      },

      setInstrument(event) {
        this.$store.commit('setInstrument', event.target.value)
      },

      downloadImage() {
        this.$refs.keyboard.downloadImage()
      },

      useVoicing() {
          const selected = this.$refs.keyboard.fetchSelected();
          const pitches = [];
          for (let c in selected) {
              if (selected[c]) pitches.push(c);
          }

          const chord = `${this.currentTonic}${this.currentChordType}`;

          const left = [ "left-open", "left-close" ];
          const right = [ "right-open", "left-close" ];
          const variants = {
              "left-open": left,
              "left-close": left,
              "right-open": right,
              "right-close": right,
          };

          for (const variant of variants[this.currentVariant]) {
              this.$store.state.chords[variant][chord] = pitches;
          }

          window.localStorage.setItem('chords', JSON.stringify(this.$store.state.chords));
      },
      resetVoicing() {
        this.$store.state.chords = JSON.parse(JSON.stringify(this.$store.state.originalChords));
        window.localStorage.removeItem('chords');
      },
    },
  }
</script>

<style lang="scss">
  $enable-transitions: false;

  $primary: #bcac76;
  $secondary: #877f64;
  $light: #f8f9fa;

  @import "~bootstrap/scss/bootstrap";

  body {
    min-width: 750px;
  }

  .container {
    max-width: 750px;
  }

  .container .row {
    margin-right: 0;
    margin-left: 0;
  }
</style>
