import keys from './keys';
import modes from './modes';

// Build a scale of a key, octave and mode, e.g. ('d', 3, 'major')
export function buildScale(key, octave, mode) {
    let pos = keys.indexOf(key);
    if (pos === -1) return [];

    const intervals = modes[mode];
    if (typeof intervals === 'undefined') return [];

    const scale = [];
    for (let s in intervals) {
        scale.push(keys[pos] + '' + octave);
        pos += intervals[s];
        if (pos >= keys.length) octave++;
        pos %= keys.length;
    }

    return scale;
}
