import { Note } from 'tonal';

export function scientificToHelmholtzNotation(str: string): string {
  const n = Note.get(str);
  if (n.empty || (!n.oct && n.oct !== 0)) return '';
  const { letter, acc, oct } = n;
  const a = acc[0] === 'b' ? acc.replace(/b/g, '♭') : acc.replace(/#/g, '♯');
  const l = oct > 2 ? letter.toLowerCase() : letter;
  const o =
    oct === 3 ? '' : oct > 2 ? '’'.repeat(oct - 3) : ','.repeat(2 - oct);
  return l + a + o;
}
