import { Chord, ChordType, Note } from 'tonal';
import { assert, describe, it } from 'vitest';
import chords from '../chords';

ChordType.add(['1P', '3M', '7m'], ['7']); // 7no5
ChordType.add(['1P', '3m', '7d'], ['dim']); // dim7no5
ChordType.add(['1P', '3m', '7m'], ['m7']); // m7no5
ChordType.add(['1P', '3M', '7M'], ['M7']); // M7no5

describe('chords', () => {
  for (const direction in chords) {
    describe('' + direction, () => {
      for (const chord in chords[direction]) {
        it('' + chord, () => {
          // Compare chromas
          assert.deepEqual(
            chords[direction][chord].map(Note.chroma).toSorted(),
            Chord.get(chord).notes.map(Note.chroma).toSorted(),
            `Expected ${direction} ${chord} to be ${Chord.get(chord).notes}, but got ${chords[direction][chord]}`,
          );
        });
      }
    });
  }
});
