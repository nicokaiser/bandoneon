import Note from '@tonaljs/note';

export default function helmholtz(input) {
    const note = Note.get(input);
    if (note.empty || !note.oct) return '';
    return (
        (note.oct < 3 ? note.letter : note.letter.toLowerCase()) +
        note.acc.replace('b', '♭').replace('#', '♯') +
        (note.oct > 3 ? '’'.repeat(note.oct - 3) : '') +
        (note.oct < 2 ? ','.repeat(-(note.oct - 2)) : '')
    );
}
