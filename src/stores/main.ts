import Note from '@tonaljs/note';
import Scale from '@tonaljs/scale';
import { defineStore } from 'pinia';
import chords from '../data/chords';
import { instruments } from '../data/index';
import { useSettingsStore } from './settings';

export const useStore = defineStore('main', {
  state: () => ({
    showColors: false,
    showEnharmonics: false,
    side: 'right' as 'right' | 'left',
    direction: 'open' as 'open' | 'close',
    tonic: null as null | string,
    chordType: null as null | string,
    scaleType: null as null | string,
  }),

  getters: {
    chordName(state) {
      if (state.tonic && state.chordType) {
        return `${state.tonic}${state.chordType}`;
      }
      return null;
    },

    chordNotes(): string[] {
      const settings = useSettingsStore();

      if (this.side && this.direction && this.chordName) {
        if (
          settings.userChords[this.side] &&
          settings.userChords[this.side][this.chordName]
        ) {
          return settings.userChords[this.side][this.chordName];
        }

        return chords[`${this.side}-${this.direction}`][this.chordName];
      }
      return [];
    },

    isUserChord() {
      const settings = useSettingsStore();

      if (this.side && this.direction && this.chordName) {
        if (
          settings.userChords[this.side] &&
          settings.userChords[this.side][this.chordName]
        )
          return true;
      }
      return false;
    },

    keyPositions(state): [number, number, string][] {
      const settings = useSettingsStore();

      if (!settings.instrument) return [];

      const keys = Array.isArray(instruments[settings.instrument][state.side])
        ? instruments[settings.instrument][state.side]
        : // @ts-expect-error TODO
          instruments[settings.instrument][state.side][state.direction];

      if (!keys) return [];

      const positions: [number, number, string][] = [];
      let offsetX = 0;
      let offsetY = 0;

      // Center
      const cols = Math.max(...keys.map((row: string[]) => row.length));
      const rows = keys.reduce(
        (acc: number, row: string[]) => acc + (row.length > 0 ? 1 : 0),
        0,
      );
      if (cols < 9) offsetX += 39 * (9 - cols);
      if (rows < 6) offsetY -= 32 * (6 - rows);

      for (let row = 0; row < keys.length; row++) {
        for (let col = 0; col < keys[row].length; col++) {
          const tonal = keys[row][col];
          if (tonal) {
            const x = offsetX + col * 79 + 40 - (row % 2) * 40;
            const y =
              offsetY +
              row * 64 +
              30 * (1 - Math.sin(((x / 320) * Math.PI) / 2));
            positions.push([x, y, tonal]);
          }
        }
      }

      return positions;
    },

    scalePaths() {
      if (this.tonic && this.scaleType) {
        const { intervals, empty } = Scale.get(this.scaleType);
        if (empty) return [];
        const paths = [];

        for (let o = -1; o < 7; o++) {
          const scaleNotes = intervals.map((i) =>
            Note.transpose(`${this.tonic}${o}`, i),
          );
          scaleNotes.push(`${this.tonic}${o + 1}`);
          let pathString = '';

          scaleNotes.forEach((note) => {
            const no = Note.get(note);

            const pos = this.keyPositions.find(
              (v) => Note.get(v[2]).height === no.height,
            );

            if (pos) {
              pathString += `${pathString === '' ? 'M' : 'L'}${pos[0] + 30},${pos[1] + 30}`;
            }
          });

          paths.push(pathString);
        }

        return paths;
      }
    },
  },

  actions: {
    setTonic(tonic: string | null) {
      if (!tonic) {
        this.tonic = null;
        this.chordType = null;
        this.scaleType = null;
      } else {
        this.tonic = tonic;
        if (!this.scaleType && !this.chordType) {
          this.chordType = 'M';
        }
      }
    },

    setScaleType(scaleType: string | null) {
      if (this.chordType) this.chordType = null;
      if (!this.tonic) this.tonic = 'C';
      this.scaleType = scaleType;
    },

    setChordType(chordType: string | null) {
      if (this.scaleType) this.scaleType = null;
      if (!this.tonic) this.tonic = 'C';
      this.chordType = chordType;
    },
  },
});
