import chords from './data/chords.json';
import positions from './data/positions.json';

export default class {
    static name() {
        return 'Bandoneon AA 142';
    }

    static variants() {
        return ['right-open', 'right-close', 'left-open', 'left-close'];
    }

    static chords(variant = 'right-open') {
        return chords[variant];
    }

    static positions(variant = 'right-open') {
        return positions[variant];
    }
}
