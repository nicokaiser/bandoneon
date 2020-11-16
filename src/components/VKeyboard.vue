<template>
  <div>
    <svg 
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 690 410"
    >
      <g
        v-for="([x, y], name) in positions"
        :key="name"
        @click="toggle(name)"
      >
        <circle 
          :cx="x + 29"
          :cy="y + 29"
          r="28"
          :fill="fill(name)"
          :stroke="selected[name] ? '#222' : '#999'"
          :stroke-width="selected[name] ? 2 : 1"
          :fill-opacity="selected[name] ? 1 : 0.25"
        />
        <text
          :x="x + 29"
          :y="y + 29"
          fill="#222"
          :style="(name.endsWith('-1') ? 'text-decoration: underline' : '')"
        >
          <tspan dy="7">{{ format(name) }}</tspan>
        </text>
      </g>
      <path
        v-for="(path, index) in scalePaths"
        :key="index"
        :stroke="scaleColors[index % scaleColors.length]"
        :d="path"
      />
    </svg>
  </div>
</template>

<script>
  import Vue from "vue"
  import Note from '@tonaljs/note'
  import Scale from '@tonaljs/scale'

  export default {
    props: {
      variant: {
        type: String,
        default: 'right-open',
      },
      tonic: {
        type: String,
        default: undefined,
      },
      scaleType: {
        type: String,
        default: undefined,
      },
      chordType: {
        type: String,
        default: undefined,
      }
    },

    data: () => ({
      modified: false,
      userSelected: {},
      octaveColors: ['#d7b171', '#71a8d7', '#e37e7b', '#85ca85', '#e6cb84', '#71a8d7'],
      scaleColors: ['orange', 'blue', 'red', 'green', 'orange', 'blue']
    }),

    computed: {
      buttonColors() {
        return this.$store.state.buttonColors
      },

      positions() {
        if (!this.currentInstrument) return {}
        const instrument = this.currentInstrument[this.variant]
        if (!instrument) return {}

        const positions = {}
        let offsetX = 0
        let offsetY = 0

        // Center
        const cols = Math.max(...instrument.map((row) => row.length))
        const rows = instrument.reduce((acc, row) => acc + (row.length > 0 ? 1 : 0), 0)
        if (cols < 9) offsetX += 39 * (9 - cols)
        if (rows < 6) offsetY -= 32 * (6 - rows)

        for (let row = 0; row < instrument.length; row++) {
          for (let col = 0; col < instrument[row].length; col++) {
            let name = instrument[row][col]
            const x = offsetX + col * 79 + 40 - (row % 2 * 40)
            const y = offsetY + row * 64
              + 30 * (1 - Math.sin(x / 320 * Math.PI / 2))
            if (name) {
              while (positions[name]) {
                name += ' '
              }
              positions[name] = [x, y]
            }
          }
        }
        return positions
      },

      chords() {
        return this.$store.state.chords[this.variant]
      },

      scalePaths() {
        if (this.tonic && this.scaleType) {
          const { intervals, empty } = Scale.get(this.scaleType)
          if (empty) return []
          const paths = []
          for (let o = -1; o < 5; o++) {
            const notes = intervals.map((i) => Note.transpose(`${this.tonic}${o}`, i))
            notes.push(`${this.tonic}${o + 1}`)
            let pathString = ''
            notes.forEach((n) => {
              const no = Note.get(n)
              const idx = Object.keys(this.positions).find((v) => Note.get(v).height === no.height)
              if (idx) {
                const [x, y] = this.positions[idx]
                pathString += `${pathString === '' ? 'M' : 'L'}${x + 30},${y + 30}`
              }
            })
            paths.push(pathString)
          }
          return paths
        }
        return []
      },

      selected() {
        if (this.modified) return this.userSelected

        const selected = {}
        if (this.tonic && this.chordType) {
          const chord = this.chords[`${this.tonic}${this.chordType}`]
          if (chord) {
            for (let i = 0; i <= chord.length; i++) {
              if (chord[i]) selected[chord[i]] = true
            }
          }
        }
        return selected
      },

      currentInstrument() {
        return this.$store.state.instruments[this.$store.state.instrument]
      },
    },

    watch: {
      tonic() {
        this.userSelected = {}
        this.modified = false
      },

      chordType() {
        this.userSelected = {}
        this.modified = false
      }
    },

    methods: {
      format(tonal) {
        const note = Note.get(tonal)
        return ((note.oct < 1) ? note.letter : note.letter.toLowerCase())
          + note.acc + ((note.oct > 0) ? '’'.repeat(note.oct - 1) : '')
      },

      fill(tonal) {
        let octave = +tonal.slice(1)
        if (tonal[1] === '#') octave = +tonal.slice(2)
        return this.buttonColors ? this.octaveColors[octave + 1] : '#aaa'
      },

      toggle(tonal) {
        if (!this.modified) {
          this.userSelected = { ...this.selected }
          this.modified = true
        }
        if (this.userSelected[tonal]) {
          Vue.delete(this.userSelected, tonal)
        } else {
          Vue.set(this.userSelected, tonal, true)
        }
      },
    },
  }
</script>

<style scoped>
  div {
    width: 100%;
    margin: 30px 0;
    text-align: center;
  }

  svg {
    overflow: hidden;
    position: relative;
    left: -0.5px;
  }

  svg text {
    text-anchor: middle;
    font-family: Georgia, serif;
    font-size: 21px;
    font-style: italic;
    user-select: none;
    cursor: default;
  }

  svg path {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-opacity: 0.66;
    stroke-width: 3px;
    fill: none;
  }
</style>
