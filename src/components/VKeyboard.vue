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
      >
        <circle 
          :cx="x + 29"
          :cy="y + 29"
          r="28"
          :fill="fill(name)"
          stroke="#999"
          stroke-width="1"
          fill-opacity="0.5"
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
      <circle
        v-for="([x, y], index) in chordsPositions"
        :key="index"
        :cx="x + 29"
        :cy="y + 29"
        r="28"
        stroke="#222"
        :stroke-width="index === 0 ? 3 : 2"
        :fill-opacity="(0.4 - 0.1 * index)"
      />
    </svg>
  </div>
</template>

<script>
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
      octaveColors: ['#d7b171', '#71a8d7', '#e37e7b', '#85ca85', '#e6cb84', '#71a8d7'],
      scaleColors: ['orange', 'blue', 'red', 'green', 'orange', 'blue']
    }),

    computed: {
      buttonColors() {
        return this.$store.state.buttonColors
      },

      positions() {
        if (!this.currentKeyboard) return {};
        const keyboard = this.currentKeyboard[this.variant]
        if (!keyboard) return {};

        const positions = {}
        let offsetX = 0;
        let offsetY = 0;

        // Center
        const cols = Math.max(...keyboard.map((row) => row.length));
        const rows = keyboard.reduce((acc, row) => acc + (row.length > 0 ? 1 : 0), 0);
        if (cols < 9) offsetX += 39 * (9 - cols);
        if (rows < 6) offsetY -= 32 * (6 - rows);

        for (let row = 0; row < keyboard.length; row++) {
          for (let col = 0; col < keyboard[row].length; col++) {
            let name = keyboard[row][col]
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

      chordsPositions() {
        if (this.tonic && this.chordType) {
          const chord = this.chords[`${this.tonic}${this.chordType}`]
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

      currentKeyboard() {
        return this.$store.state.keyboards[this.$store.state.keyboard]
      },
    },

    methods: {
      format(tonal) {
        let result = tonal[0].toLowerCase()
        let octave = +tonal.slice(1)
        if (tonal[1] === '#') octave = +tonal.slice(2)
        if (octave < 1) result = tonal[0].toUpperCase()
        if (tonal[1] === '#') result += '#'
        if (octave > 0) result += '’'.repeat(octave - 1)
        return result
      },

      fill(tonal) {
        let octave = +tonal.slice(1)
        if (tonal[1] === '#') octave = +tonal.slice(2)
        return this.buttonColors ? this.octaveColors[octave + 1] : '#ddd'
      }
    }
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
