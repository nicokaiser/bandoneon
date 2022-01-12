import Note from '@tonaljs/note';

export default function helmholtz(name) {
    const note = Note.get(name);
    if (note.empty) return '';
    return (
        (note.oct < 3 ? note.letter : note.letter.toLowerCase()) +
        note.acc.replace('b', '♭').replace('#', '♯') +
        (note.oct > 3 ? '’'.repeat(note.oct - 3) : '') +
        (note.oct < 2 ? ','.repeat(-(note.oct - 2)) : '')
    );
}
