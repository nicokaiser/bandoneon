<template>
  <div>
    <svg
      ref="svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 690 410"
      width="720"
      height="428"
    >
      <g
        v-for="([x, y], tonal) in positions"
        :key="tonal"
        @click="toggle(tonal)"
      >
        <circle 
          :cx="x + 29"
          :cy="y + 29"
          r="28"
          :fill="fill(tonal)"
          :stroke="selected[tonal] ? '#222' : '#999'"
          :stroke-width="selected[tonal] ? 2 : 1"
          :fill-opacity="selected[tonal] ? 1 : 0.25"
        />
        <text
          :x="x + 29"
          :y="y + 29"
          fill="#222"
          font-family="Georgia, serif"
          font-size="21px"
          font-style="italic"
          text-anchor="middle"
        >
          <tspan dy="7">{{ format(tonal) }}</tspan>
        </text>
      </g>
      <path
        v-for="(path, index) in scalePaths"
        :key="index"
        :stroke="scaleColors[index % scaleColors.length]"
        :d="path"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-opacity="0.66"
        stroke-width="3px"
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
  import Vue from "vue"
  import { mapGetters } from 'vuex'
  import Note from '@tonaljs/note'
  import Scale from '@tonaljs/scale'

  function helmholtz(name) {
    const note = Note.get(name)
    if (note.empty) return ''
    return ((note.oct < 3) ? note.letter : note.letter.toLowerCase())
      + note.acc + ((note.oct > 3) ? '’'.repeat(note.oct - 3) : '')
      + ((note.oct < 2) ? ','.repeat(-(note.oct - 2)) : '')
  }

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
      colors() {
        return this.$store.state.colors
      },

      enharmonic() {
        return this.$store.state.enharmonic
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

      ...mapGetters(['currentVariant'])
    },

    watch: {
      tonic() {
        // On tonic change, remove user selection
        this.userSelected = {}
        this.modified = false
      },

      chordType() {
        // On chord change, remove user selection
        this.userSelected = {}
        this.modified = false
      }
    },

    methods: {
      format(tonal) {
        const note = Note.get(this.enharmonic ? Note.enharmonic(tonal) : tonal)
        if (note.empty) return ''
        if (this.$store.state.pitchNotation === 'scientific') return note.name
        return helmholtz(note.name)
      },

      fill(tonal) {
        let octave = +tonal.slice(1)
        if (tonal[1] === '#') octave = +tonal.slice(2)
        return this.colors ? this.octaveColors[octave - 1] : '#bbb'
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

      downloadImage() {
        // https://mybyways.com/blog/convert-svg-to-png-using-your-browser

        const margin = 30
        const svg = this.$refs.svg
        const canvas = document.createElement('canvas')
        canvas.width = (svg.getBoundingClientRect().width + margin) * 2
        canvas.height = (svg.getBoundingClientRect().height + margin) * 2
        const data = new XMLSerializer().serializeToString(svg)
        const win = window.URL || window.webkitURL || window
        const img = new Image()
        const blob = new Blob([data], { type: 'image/svg+xml' })
        const url = win.createObjectURL(blob)

        let selected = ''
        if (this.tonic) {
          selected = '-' + this.tonic.replace('#', 's')
          if (this.chordType) selected += this.chordType
          if (this.scaleType) selected += '-' + this.scaleType
        }

        const filename = 'bandoneon-' 
          + this.$store.state.instrument + '-'
          + this.currentVariant
          + selected
          + (this.modified ? '-custom' : '')
          + '.png'

        img.onload = () => {
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin)
          win.revokeObjectURL(url)
          let uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream')
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          a.href = uri
          a.download = filename
          a.click()
          window.URL.revokeObjectURL(uri)
          document.body.removeChild(a)
        }

        img.src = url
      }
    },
  }
</script>

<style scoped>
  div {
    width: 100%;
    margin: 30px 0;
    text-align: center;
  }

  svg text {
    user-select: none;
    cursor: default;
  }
</style>
