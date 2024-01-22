import einheitsbandonion144 from './instruments/einheitsbandonion144';
import manouri148 from './instruments/manouri148';
import peguri146 from './instruments/peguri146';
import rheinische142 from './instruments/rheinische142';
import rheinische152 from './instruments/rheinische152';

type Instrument = Record<
  'right' | 'left',
  Record<'open' | 'close', string[][]> | string[][]
>;

export const instruments = <Record<string, Instrument>>{
  rheinische142,
  rheinische152,
  einheitsbandonion144,
  peguri146,
  manouri148,
};

export const difficulties = ['easy', 'medium'];

export const pitchNotations = ['helmholtz', 'scientific'];

export const notes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const scaleTypes = ['major', 'minor', 'chromatic'];

export const chordTypes = ['M', 'm', '7', 'dim', 'm7', 'M7'];
