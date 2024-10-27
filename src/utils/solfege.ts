import { Note } from 'tonal';

export function scientificToSolfegeNotation(str: string): string {
  const n = Note.get(str);
  console.log(n);
  if (n.empty) return '';
  const { step, acc, oct } = n;
  return (
    ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'][step] +
    acc +
    (typeof oct !== 'undefined' ? oct : '')
  );
}
