import { createStore } from 'vuex';
import CHORDS from './chords.json';
import INSTRUMENTS from './instruments';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default createStore({
    state: () => ({
        locale:
            window.localStorage.getItem('locale') ||
            navigator.language?.split('-')[0] ||
            'en',
        showColors: false,
        chords:
            (window.localStorage.getItem('chords') &&
                JSON.parse(window.localStorage.getItem('chords'))) ||
            JSON.parse(JSON.stringify(CHORDS)),
        showEnharmonics: false,
        instrument:
            window.localStorage.getItem('instrument') || 'rheinische142',
        pitchNotation:
            window.localStorage.getItem('pitchNotation') || 'scientific',
        side: 'right',
        direction: 'open',
        tonic: null,
        notes: NOTES,
    }),

    getters: {
        getAllNotes: () => NOTES,

        getAvailableInstruments: () => Object.keys(INSTRUMENTS),

        getAvailablePitchNotations: () => ['helmholtz', 'scientific'],

        getAvailableChordTypes: () => ['M', 'm', '7', 'dim', 'm7', 'M7'],

        getAvailableScaleTypes: () => ['major', 'minor', 'chromatic'],

        getKeyPositions(state) {
            if (!state.instrument) return [];
            const keys =
                INSTRUMENTS[state.instrument][
                    state.side + '-' + state.direction
                ];
            if (!keys) return [];

            const positions = [];
            let offsetX = 0;
            let offsetY = 0;

            // Center
            const cols = Math.max(...keys.map((row) => row.length));
            const rows = keys.reduce(
                (acc, row) => acc + (row.length > 0 ? 1 : 0),
                0
            );
            if (cols < 9) offsetX += 39 * (9 - cols);
            if (rows < 6) offsetY -= 32 * (6 - rows);

            for (let row = 0; row < keys.length; row++) {
                for (let col = 0; col < keys[row].length; col++) {
                    let tonal = keys[row][col];
                    if (tonal) {
                        const x = offsetX + col * 79 + 40 - (row % 2) * 40;
                        const y =
                            offsetY +
                            row * 64 +
                            30 * (1 - Math.sin(((x / 320) * Math.PI) / 2));
                        positions.push([x, y, tonal]);
                    }
                }
            }

            return positions;
        },
    },

    mutations: {
        setLocale(state, locale) {
            window.localStorage.setItem('locale', locale);
            state.locale = locale;
        },

        setInstrument(state, instrument) {
            if (instrument in INSTRUMENTS) {
                state.instrument = instrument;
                window.localStorage.setItem('instrument', instrument);
            }
        },

        setPitchNotation(state, pitchNotation) {
            state.pitchNotation = pitchNotation;
            window.localStorage.setItem('pitchNotation', pitchNotation);
        },

        setSide(state, side) {
            state.side = side;
        },

        setDirection(state, direction) {
            state.direction = direction;
        },

        setSideAndDirection(state, side, direction) {
            state.side = side;
            state.direction = direction;
        },

        setTonic(state, tonic) {
            if (!tonic) {
                state.tonic = null;
                state.chordType = null;
                state.scaleType = null;
            } else if (NOTES.includes(tonic)) {
                state.tonic = tonic;
                if (!state.scaleType && !state.chordType) {
                    state.chordType = 'M';
                }
            }
        },

        setScaleType(state, scaleType) {
            if (state.chordType) state.chordType = null;
            if (!state.tonic) state.tonic = 'C';
            state.scaleType = scaleType;
        },

        setChordType(state, chordType) {
            if (state.scaleType) state.scaleType = null;
            if (!state.tonic) state.tonic = 'C';
            state.chordType = chordType;
        },

        toggleColors(state) {
            state.showColors = !state.showColors;
        },

        toggleEnharmonics(state) {
            state.showEnharmonics = !state.showEnharmonics;
        },

        saveUserChord(state, notes) {
            if (!state.tonic || !state.chordType) return;

            const chordName = `${state.tonic}${state.chordType}`;

            if (state.side === 'left') {
                state.chords['left-open'][chordName] = notes;
                state.chords['left-close'][chordName] = notes;
            } else {
                state.chords['right-open'][chordName] = notes;
                state.chords['right-close'][chordName] = notes;
            }

            window.localStorage.setItem('chords', JSON.stringify(state.chords));
        },

        resetUserChords(state) {
            state.chords = JSON.parse(JSON.stringify(CHORDS));
            window.localStorage.removeItem('chords');
        },
    },
});
