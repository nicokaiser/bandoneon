import chords from './data/chords.json';
import positions from './data/positions.json';

export default class {
    static name() {
        return 'Bandoneon AA 142 (orchestra chords)';
    }

    static variants() {
        return [
            'right-open',
            'right-close',
            'left-open',
            'left-close'
        ];
    }

    static chords(variant = 'right-open') {
        switch (variant) {
        case 'right-open':
        case 'right-close':
            return chords['right'];
            break;
        case 'left-open':
        case 'left-close':
            return chords['left'];
            break;
        default:
            return {};
        }
    }

    static positions(variant = 'right-open') {
        return positions[variant];
    }
}
