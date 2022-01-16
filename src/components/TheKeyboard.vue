<template>
    <div class="my-4">
        <svg
            ref="svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 690 410"
            width="720"
            height="428"
        >
            <g
                v-for="([x, y, tonal], idx) in keyPositions"
                :key="idx"
                @click="toggle(tonal)"
            >
                <circle
                    :cx="x + 29"
                    :cy="y + 29"
                    r="28"
                    :fill="fill(tonal)"
                    :stroke="selected[tonal] ? '#495057' : '#adb5bd'"
                    :stroke-width="selected[tonal] ? 2 : 1"
                    :fill-opacity="selected[tonal] ? 1 : 0.25"
                />

                <text
                    :x="x + 29"
                    :y="y + 36"
                    fill="#212529"
                    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
                    font-size="20px"
                    text-anchor="middle"
                >
                    <tspan>{{ format(tonal)[0] }}</tspan>
                    <tspan dx="2" font-size="16px">
                        {{ format(tonal)[1] }}
                    </tspan>
                </text>
            </g>

            <path
                v-for="(path, index) in scalePaths"
                :key="index"
                :stroke="colorsScale[index % colorsScale.length]"
                :d="path"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-opacity="0.66"
                stroke-width="3px"
                fill="none"
            />
        </svg>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore, mapState, mapGetters } from 'vuex';
import Note from '@tonaljs/note';
import Scale from '@tonaljs/scale';
import download from '@/helpers/download';
import helmholtz from '@/helpers/helmholtz';

export default {
    setup() {
        const modified = ref(false);
        const userSelected = ref({});
        const store = useStore();

        return {
            modified,
            userSelected,

            colorsOctave: [
                '#d7b171',
                '#71a8d7',
                '#e37e7b',
                '#85ca85',
                '#e6cb84',
                '#71a8d7',
            ],

            colorsScale: [
                'orange',
                'blue',
                'red',
                'green',
                'orange',
                'blue',
                'red',
                'green',
            ],
        };
    },

    computed: {
        scalePaths() {
            if (this.tonic && this.scaleType) {
                const { intervals, empty } = Scale.get(this.scaleType);
                if (empty) return [];
                const paths = [];

                for (let o = -1; o < 7; o++) {
                    const notes = intervals.map((i) =>
                        Note.transpose(`${this.tonic}${o}`, i)
                    );
                    notes.push(`${this.tonic}${o + 1}`);
                    let pathString = '';

                    notes.forEach((n) => {
                        const no = Note.get(n);

                        const pos = this.keyPositions.find(
                            (v) => Note.get(v[2]).height === no.height
                        );

                        if (pos) {
                            pathString += `${pathString === '' ? 'M' : 'L'}${
                                pos[0] + 30
                            },${pos[1] + 30}`;
                        }
                    });

                    paths.push(pathString);
                }

                return paths;
            }

            return [];
        },

        selected() {
            if (this.modified) return this.userSelected;

            const selected = {};

            if (this.tonic && this.chordType) {
                const chord =
                    this.chords[this.variant][`${this.tonic}${this.chordType}`];

                if (chord) {
                    for (let i = 0; i <= chord.length; i++) {
                        if (chord[i]) selected[chord[i]] = true;
                    }
                }
            }

            return selected;
        },

        ...mapState([
            'instrument',
            'showEnharmonics',
            'showColors',
            'chords',
            'tonic',
            'variant',
            'scaleType',
            'chordType',
            'pitchNotation',
        ]),

        ...mapGetters(['keyPositions']),
    },

    watch: {
        tonic() {
            this.userSelected = {};
            this.modified = false;
        },

        chordType() {
            this.userSelected = {};
            this.modified = false;
        },
    },

    methods: {
        format(tonal) {
            const note = Note.get(
                this.showEnharmonics ? Note.enharmonic(tonal) : tonal
            );
            if (note.empty) return '';

            if (this.pitchNotation === 'scientific') {
                return [note.pc.replace('b', '♭').replace('#', '♯'), note.oct];
            }

            return [helmholtz(note.name), ''];
        },

        fill(tonal) {
            let octave = +tonal.slice(1);
            if (tonal[1] === '#') octave = +tonal.slice(2);
            return this.showColors ? this.colorsOctave[octave - 1] : '#ced4da'; // gray-500
        },

        toggle(tonal) {
            if (!this.modified) {
                this.userSelected = { ...this.selected };
                this.modified = true;
            }

            if (this.userSelected[tonal]) {
                delete this.userSelected[tonal];
            } else {
                this.userSelected[tonal] = true;
            }
        },

        fetchSelected() {
            return this.userSelected;
        },

        resetSelected() {
            this.userSelected = {};
            this.modified = false;
        },

        downloadImage() {
            let filename = `bandoneon-${this.instrument}-${this.variant}`;
            if (this.tonic) {
                filename += '-' + this.tonic.replace('#', 's');
                if (this.chordType) filename += this.chordType;
                if (this.scaleType) filename += '-' + this.scaleType;
            }
            if (this.modified) {
                filename += '-custom';
            }
            filename += '.png';

            download(this.$refs.svg, filename);
        },
    },
};
</script>

<style scoped>
svg {
    width: 100%;
    height: calc(100% / 720 * 428);
    max-height: calc(90vh - 5em);
}

svg text {
    user-select: none;
    cursor: default;
}
</style>
