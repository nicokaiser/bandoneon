import einheitsbandonion144 from './instruments/einheitsbandonion144';
import einheitskonzertina128 from './instruments/einheitskonzertina128';
import manouri148 from './instruments/manouri148';
import peguri146 from './instruments/peguri146';
import rheinische142 from './instruments/rheinische142';
import rheinische152 from './instruments/rheinische152';

type Instrument = Record<'right' | 'left', Record<'open' | 'close', string[][]> | string[][]>;

export const instruments = <Record<string, Instrument>>{
  rheinische142,
  rheinische152,
  einheitsbandonion144,
  peguri146,
  manouri148,
  einheitskonzertina128,
};

export const difficulties = <Array<'easy' | 'medium'>>['easy', 'medium'];

export const pitchNotations = <Array<'scientific' | 'helmholtz' | 'solfege'>>[
  'scientific',
  'helmholtz',
  'solfege',
];

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const scaleTypes = ['major', 'minor', 'chromatic'];

export const chordTypes = ['M', 'm', '7', 'dim', 'm7', 'M7'];

export const colors = [
  '#22c55e', // green-500
  '#eab308', // yellow-500
  '#0ea5e9', // sky-500
  '#ef4444', // red-500
];
