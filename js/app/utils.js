// Helper functions
define([
    'app/keys',
    'app/modes'
], function (keys, modes) {
    'use strict';

    return {
        // Build a scale of a key, octave and mode, e.g. ('d', 3, 'major')
        scale: function (key, octave, mode) {
            var pos, intervals, scale, s;

            pos = keys.indexOf(key);
            if (pos === -1) return [];

            intervals = modes[mode];
            if (typeof intervals === 'undefined') return [];

            scale = [];
            for (s in intervals) {
                scale.push(keys[pos] + '' + octave);
                pos += intervals[s];
                if (pos >= keys.length) {
                    octave++;
                }
                pos %= keys.length;
            }

            return scale;
        }
    };
});
