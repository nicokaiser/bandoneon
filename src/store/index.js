import { createStore } from 'vuex';
import originalChords from './chords.json';
import instruments from './instruments';

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
            JSON.parse(JSON.stringify(originalChords)),
        originalChords,
        showEnharmonics: false,
        instruments,
        instrument:
            window.localStorage.getItem('instrument') || 'rheinische142',
        pitchNotation:
            window.localStorage.getItem('pitchNotation') || 'scientific',
        variants: ['left-open', 'left-close', 'right-open', 'right-close'],
        variant: 'right-open',
        scaleTypes: ['major', 'minor', 'chromatic'],
        chordTypes: ['M', 'm', '7', 'dim', 'm7', 'M7'],
        tonic: null,
        notes: [
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
        ],
    }),

    mutations: {
        setLocale(state, locale) {
            window.localStorage.setItem('locale', locale);
            state.locale = locale;
        },

        setInstrument(state, instrument) {
            if (instrument in state.instruments) {
                state.instrument = instrument;
                window.localStorage.setItem('instrument', instrument);
            }
        },

        setPitchNotation(state, pitchNotation) {
            state.pitchNotation = pitchNotation;
            window.localStorage.setItem('pitchNotation', pitchNotation);
        },

        setVariant(state, variant) {
            if (state.variants.includes(variant)) {
                state.variant = variant;
            }
        },

        setTonic(state, tonic) {
            if (!tonic) {
                state.tonic = null;
                state.chordType = null;
                state.scaleType = null;
            } else if (state.notes.includes(tonic)) {
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
            // TODO: save to localStorage
        },

        setShowColors(state, showColors) {
            state.showColors = showColors;
        },

        toggleEnharmonics(state) {
            state.showEnharmonics = !state.showEnharmonics;
        },

        saveUserChord(state, notes) {
            if (!state.tonic || !state.chordType || !state.variant) return;

            const chordName = `${state.tonic}${state.chordType}`;

            if (['left-open', 'left-close'].includes(state.variant)) {
                state.chords['left-open'][chordName] = notes;
                state.chords['left-close'][chordName] = notes;
            } else if (['right-open', 'right-close'].includes(state.variant)) {
                state.chords['right-open'][chordName] = notes;
                state.chords['right-close'][chordName] = notes;
            }

            window.localStorage.setItem('chords', JSON.stringify(state.chords));
        },

        resetUserChords(state) {
            state.chords = JSON.parse(JSON.stringify(originalChords));
            window.localStorage.removeItem('chords');
        },
    },
});
