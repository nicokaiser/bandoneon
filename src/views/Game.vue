<template>
    <svg
        ref="svg"
        class="keyboard mb-4"
        viewBox="0 0 690 410"
        width="720"
        height="428"
    >
        <g v-for="([x, y, tonal], idx) in positions" :key="idx">
            <circle
                :cx="x + 29"
                :cy="y + 29"
                r="28"
                :fill="idx === currentPosition ? '#ced4da' : fillColor(idx)"
                :stroke="idx === currentPosition ? '#495057' : strokeColor(idx)"
                :stroke-width="idx === currentPosition ? 2 : 1"
            />

            <text
                v-if="
                    idx === currentPosition || typeof guessed[idx] === 'number'
                "
                :x="x + 29"
                :y="y + 36"
                fill="#212529"
                font-size="20px"
                text-anchor="middle"
            >
                <tspan>
                    {{ idx === currentPosition ? tonic : format(tonal)[0] }}
                </tspan>
                <tspan dx="2" font-size="16px">
                    {{ idx === currentPosition ? oct : format(tonal)[1] }}
                </tspan>
            </text>

            <text
                v-else-if="typeof guessed[idx] !== 'number'"
                :x="x + 29"
                :y="y + 36"
                fill="#ced4da"
                font-size="20px"
                text-anchor="middle"
            >
                ?
            </text>
        </g>
    </svg>

    <NavVariant :readonly="currentPosition > 0" />
    <NavTonic :disabled="isFinished" />

    <div v-if="!easyMode" class="mb-2 text-center">
        <button
            v-for="octave in octaves"
            :key="octave"
            :disabled="!tonic"
            :class="[
                'btn btn-outline-secondary mx-1 my-2',
                oct === octave ? 'active' : null,
            ]"
            style="width: 3.2em"
            @click="toggleOctave(octave)"
        >
            {{ formatOctave(octave) }}
        </button>
    </div>

    <div class="progress mt-4">
        <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="`width: ${progress[2]}%`"
        ></div>

        <div
            class="progress-bar bg-warning"
            role="progressbar"
            :style="`width: ${progress[1]}%`"
        ></div>

        <div
            class="progress-bar bg-danger"
            role="progressbar"
            :style="`width: ${progress[0]}%`"
        ></div>
    </div>

    <div class="row mt-4">
        <div class="col-4 align-self-center align-middle">
            {{ currentPosition }} / {{ positions.length }}
        </div>
        <div class="col-4 align-self-center text-center fw-bold">
            {{ progress[2] }}% {{ t('correct') }}
        </div>
        <div class="col-4 align-self-center text-end">
            <!--
            <button
                v-if="isFinished"
                class="btn btn-sm btn-outline-secondary mx-2"
            >
                Download
            </button>
            -->

            <button class="btn btn-sm btn-outline-danger" @click="newGame">
                Neues Spiel
            </button>
        </div>
    </div>

    <BaseModal ref="modal">
        <p class="text-center m-4 fs-5">
            <strong>{{ correctPercentage }}%</strong>
            {{ t('correct') }}
        </p>

        <div class="text-center m-4">
            <button
                class="btn btn-primary"
                @click="
                    $refs.modal.hide();
                    newGame();
                "
            >
                {{ t('try_again') }}
            </button>
        </div>
    </BaseModal>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from '@/stores/main';
import { useSettingsStore } from '@/stores/settings';
import { useI18n } from 'vue-i18n';
import Note from '@tonaljs/note';
import helmholtz from '@/helpers/helmholtz';
import NavVariant from '@/components/NavVariant.vue';
import NavTonic from '@/components/NavTonic.vue';
import BaseModal from '@/components/BaseModal.vue';

const svg = ref(null);
const modal = ref(null);

const currentPosition = ref(0);
const guessed = ref([]);
const oct = ref(null);
const positions = ref([]);

const store = useStore();
const settings = useSettingsStore();
const { t } = useI18n();

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

const formatOctave = (octave) => {
    if (settings.pitchNotation === 'scientific') {
        return octave;
    }
    const noteName = tonic.value || 'X';
    return (
        (octave < 3 ? noteName : noteName.toLowerCase()) +
        (octave > 3 ? '’'.repeat(octave - 3) : '') +
        (octave < 2 ? ','.repeat(-(octave - 2)) : '')
    );
};

const keyPositions = computed(() => store.keyPositions);

const fillColor = (idx) => {
    if (
        guessed.value[idx] === 2 ||
        (easyMode.value && guessed.value[idx] === 1)
    )
        return '#a3cfbb'; // green-200
    if (guessed.value[idx] === 1) return '#ffe69c'; // yellow-200
    if (guessed.value[idx] === 0) return '#f1aeb5'; // red-200
    return '#f8f9fa'; // gray-100
};

const strokeColor = (idx) => {
    if (
        guessed.value[idx] === 2 ||
        (easyMode.value && guessed.value[idx] === 1)
    )
        return '#146c43'; // green-500
    if (guessed.value[idx] === 1) return '#cc9a06'; // yellow-600
    if (guessed.value[idx] === 0) return '#b02a37'; // red-600
    return '#6c757d'; // gray-600
};

const octaves = computed(() => {
    return Array.from(
        new Set(
            positions.value.map((position) => {
                const name = position[2];
                return name[name.length - 1];
            })
        )
    )
        .map((item) => parseInt(item, 10))
        .sort();
});

const tonic = computed(() => store.tonic);

const toggleOctave = (value) => {
    oct.value = oct.value === value ? null : value;
};

const isFinished = computed(
    () => currentPosition.value >= positions.value.length
);

function resetGame() {
    currentPosition.value = 0;
    oct.value = null;
    guessed.value = [];
    store.setTonic(null);

    const array = [...keyPositions.value];
    const random = array.map(Math.random);
    array.sort((a, b) => random[array.indexOf(a)] - random[array.indexOf(b)]);
    positions.value = array;
}

function newGame() {
    store.$patch({
        side: Math.random() < 0.5 ? 'right' : 'left',
        direction: Math.random() < 0.5 ? 'open' : 'close',
    });

    resetGame();
}

onMounted(() => newGame());
watch(keyPositions, () => resetGame());

function check() {
    if (positions.value.length <= currentPosition.value) return;

    const solution = positions.value[currentPosition.value][2];

    if (tonic.value + oct.value === solution) {
        guessed.value[currentPosition.value] = 2;
    } else if (tonic.value === solution.substr(0, solution.length - 1)) {
        guessed.value[currentPosition.value] = 1;
    } else {
        guessed.value[currentPosition.value] = 0;
    }

    currentPosition.value++;
    store.setTonic(null);
    oct.value = null;

    /*
    if (currentPosition.value >= positions.value.length) {
        modal.value.show();
    }
    */
}

watch([tonic, oct], () => {
    if (tonic.value && (easyMode.value || oct.value)) {
        check();
    }
});

const easyMode = computed(() => settings.difficulty === 'easy');

const progress = computed(() => {
    if (positions.value.length === 0) return [0, 0, 0];

    const result = [0, 0, 0];

    for (const g of guessed.value) {
        if (g === 2 || (g === 1 && easyMode.value)) result[2]++;
        else if (g === 1) result[1]++;
        else if (g === 0) result[0]++;
    }

    return result.map((value) =>
        Math.round((value / positions.value.length) * 100)
    );
});

const correctPercentage = computed(() => progress.value[2]);
</script>

<style scoped>
svg.keyboard {
    width: 100%;
    height: calc(100% / 720 * 428);
    max-height: calc(90vh - 5em);
}

svg.keyboard text {
    user-select: none;
    cursor: default;
}
</style>
