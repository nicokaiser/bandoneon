<template>
  <div>
    <svg 
      height="440"
      version="1.1"
      width="690"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        v-for="([x, y], name) in positions"
        :key="name"
      >
        <circle 
          :cx="x + 10"
          :cy="y + 28"
          r="28"
          :fill="fill(name)"
          stroke="#999"
          stroke-width="1"
          fill-opacity="0.5"
        />
        <text
          :x="x + 10"
          :y="y + 28"
          fill="#222"
          font-style="italic"
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
      <circle
        v-for="([x, y], index) in chordsPositions"
        :key="index"
        :cx="x + 10"
        :cy="y + 28"
        r="28"
        stroke="#222"
        :stroke-width="index === 0 ? 3 : 2"
        :fill-opacity="(0.4 - 0.1 * index)"
      />
    </svg>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Note from '@tonaljs/note'
  import Scale from '@tonaljs/scale'

  export default {
    data: () => ({
      octaveColors: ['#71a8d7', '#e37e7b', '#85ca85', '#e6cb84'],
      scaleColors: ['orange', 'blue', 'red', 'green', 'orange', 'blue']
    }),

    computed: {
      buttonColors() {
        return this.$store.state.buttonColors
      },

      positions() {
        return this.$store.state.positions[this.currentVariant]
      },

      chords() {
        return this.$store.state.chords[this.currentVariant]
      },

      scalePaths() {
        if (this.currentTonic && this.currentScaleType) {
          const { intervals, empty } = Scale.get(this.currentScaleType)
          if (empty) return []
          const paths = []
          for (let o = -1; o < 5; o++) {
            const notes = intervals.map((i) => Note.transpose(`${this.currentTonic}${o}`, i))
            notes.push(`${this.currentTonic}${o + 1}`)
            let pathString = ''
            notes.forEach((n) => {
              const no = Note.get(n)
              const idx = Object.keys(this.positions).find((v) => Note.get(v).height === no.height)
              if (idx) {
                const [x, y] = this.positions[idx]
                pathString += `${pathString === '' ? 'M' : 'L'}${x + 10},${y + 30}`
              }
            })
            paths.push(pathString)
          }
          return paths
        }
        return []
      },

      chordsPositions() {
        if (this.currentTonic && this.currentChordType) {
          const chord = this.chords[`${this.currentTonic}${this.currentChordType}`]
          if (!chord) return []
          const positions = []
          for (let i = 0; i <= chord.length; i++) {
            const n = chord[i]
            if (!n || !this.positions[n]) continue
            positions.push(this.positions[n])
          }
          return positions
        }
        return []
      },

      ...mapGetters(['currentVariant', 'currentScaleType', 'currentChordType', 'currentTonic'])
    },

    methods: {
      format(tonal) {
        let result = tonal[0].toLowerCase()
        let octave = +tonal[1]
        if (tonal[1] === '#') octave = +tonal[2]
        if (octave === 0) result = tonal[0].toUpperCase()
        if (tonal[1] === '#') result += '♯'
        if (octave > 0) result += '’'.repeat(octave - 1)
        return result
      },

      fill(tonal) {
        let octave = +tonal[1]
        if (tonal[1] === '#') octave = +tonal[2]
        return this.buttonColors ? this.octaveColors[octave % this.octaveColors.length] : '#ddd'
      }
    }
  }
</script>

<style scoped>
  div {
    width: 690px;
    height: 440px;
    margin: 20px 0;
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
