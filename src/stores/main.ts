import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';

import CHORDS from '../constants/chords.json';
import INSTRUMENTS from '../constants/instruments';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const chords = <any>CHORDS;
const instruments = <any>INSTRUMENTS;

export const useStore = defineStore('main', {
  state: () => ({
    showColors: false,
    showEnharmonics: false,
    side: 'right',
    direction: 'open',
    tonic: null as null | string,
    chordType: null as null | string,
    scaleType: null as null | string,
  }),

  getters: {
    allNotes: () => NOTES,

    allScaleTypes: () => ['major', 'minor', 'chromatic'],

    allChordTypes: () => ['M', 'm', '7', 'dim', 'm7', 'M7'],

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
        : instruments[settings.instrument][state.side][state.direction];

      if (!keys) return [];

      const positions: [number, number, string][] = [];
      let offsetX = 0;
      let offsetY = 0;

      // Center
      const cols = Math.max(...keys.map((row: Array<any>) => row.length));
      const rows = keys.reduce(
        (acc: number, row: Array<any>) => acc + (row.length > 0 ? 1 : 0),
        0
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
