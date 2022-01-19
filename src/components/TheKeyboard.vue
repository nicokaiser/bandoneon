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
                :stroke="getScaleColor(index)"
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

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/stores/main';
import { useSettingsStore } from '@/stores/settings';
import Note from '@tonaljs/note';
import Scale from '@tonaljs/scale';
import download from '@/helpers/download';
import helmholtz from '@/helpers/helmholtz';

const svg = ref(null);

const COLORS_OCTAVE = [
    '#d7b171',
    '#71a8d7',
    '#e37e7b',
    '#85ca85',
    '#e6cb84',
    '#71a8d7',
];

const COLORS_SCALE = [
    'orange',
    'blue',
    'red',
    'green',
    'orange',
    'blue',
    'red',
    'green',
];

const store = useStore();
const settings = useSettingsStore();

const modified = ref(false);
const userSelected = ref({});

const format = (tonal) => {
    const note = Note.get(
        store.showEnharmonics ? Note.enharmonic(tonal) : tonal
    );
    if (note.empty) return '';

    if (settings.pitchNotation === 'helmholtz') {
        return [helmholtz(note.name), ''];
    }

    return [note.pc.replace('b', '♭').replace('#', '♯'), note.oct];
};

const keyPositions = computed(() => store.keyPositions);

const getScaleColor = (octave) => {
    return COLORS_SCALE[octave % COLORS_SCALE.length];
};

const scalePaths = computed(() => {
    if (store.tonic && store.scaleType) {
        const { intervals, empty } = Scale.get(store.scaleType);
        if (empty) return [];
        const paths = [];

        for (let o = -1; o < 7; o++) {
            const notes = intervals.map((i) =>
                Note.transpose(`${store.tonic}${o}`, i)
            );
            notes.push(`${store.tonic}${o + 1}`);
            let pathString = '';

            notes.forEach((n) => {
                const no = Note.get(n);

                const pos = keyPositions.value.find(
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
});

const fill = (tonal) => {
    let octave = +tonal.slice(1);
    if (tonal[1] === '#') octave = +tonal.slice(2);
    return store.showColors ? COLORS_OCTAVE[octave - 1] : '#ced4da'; // gray-500
};

const downloadImage = () => {
    let filename = `bandoneon-${settings.instrument}-${store.side}-${store.direction}`;
    if (store.tonic) {
        filename += '-' + store.tonic.replace('#', 's');
        if (store.chordType) filename += store.chordType;
        if (store.scaleType) filename += '-' + store.scaleType;
    }
    if (modified.value) {
        filename += '-custom';
    }
    filename += '.png';

    download(svg.value, filename);
};

const resetSelected = () => {
    userSelected.value = {};
    modified.value = false;
};

const tonic = computed(() => store.tonic);
const chordType = computed(() => store.chordType);
watch([tonic, chordType], resetSelected);

const selectedNotes = computed(() =>
    Object.keys(userSelected.value).filter((item) => !!userSelected.value[item])
);

const selected = computed(() => {
    if (modified.value) return userSelected.value;

    const result = {};
    const chord = store.chordNotes;
    if (chord) {
        for (let i = 0; i <= chord.length; i++) {
            if (chord[i]) result[chord[i]] = true;
        }
    }
    return result;
});

const toggle = (tonal) => {
    if (!modified.value) {
        userSelected.value = { ...selected.value };
        modified.value = true;
    }
    if (userSelected.value[tonal]) {
        delete userSelected.value[tonal];
    } else {
        userSelected.value[tonal] = true;
    }
};

defineExpose({ modified, resetSelected, downloadImage, selectedNotes });
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
