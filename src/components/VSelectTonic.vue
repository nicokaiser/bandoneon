<template>
  <div class="btn-toolbar mb-3 d-print-none">
    <div
      class="btn-group"
      style="width: 100%"
    >
      <button
        v-for="tonic in tonics" 
        :key="tonic"
        :class="['btn', (currentTonic === tonic) ? 'btn-primary' : 'btn-outline-secondary']"
        @click.stop="setTonic(tonic)"
      >
        {{ noteNames(tonic).join('/') }}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Note from '@tonaljs/note'

  export default {
    data() {
      return {
        tonics: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      }
    },

    computed: {
      ...mapGetters(['currentVariant', 'currentTonic', 'currentScaleType', 'currentChordType'])
    },

    mounted() {
      document.addEventListener('keypress', ({ key }) => {
        if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
          return this.setTonic(key.toUpperCase(), true)
        }

        if (key === '#' && this.currentTonic && this.currentTonic.length === 1) {
          this.setTonic(this.currentTonic + '#')
        }
      })
    },

    methods: {
      setTonic(tonic, force = false) {
        if (this.currentTonic === tonic) {
          if (!force) this.$router.push({ name: 'home', params: {
            variant: this.currentVariant
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
          chordType: this.currentChordType || 'M'
        }})
      },

      noteNames(noteName) {
        const names = [noteName]
        if (noteName.length === 2 && noteName[1] === '#') {
          names.push(Note.enharmonic(noteName))
        }
        return names
      }
    }
  }
</script>
