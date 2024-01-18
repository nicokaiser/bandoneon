<template>
  <SvgKeyboard>
    <SvgButton
      v-for="([x, y, tonal], idx) in positions"
      :key="idx"
      :x="x"
      :y="y"
      :tonal="tonal"
      :label="label(idx)"
      :selected="idx === currentPosition"
      :color="fillColor(idx)"
      :opacity="label(idx) === '?' ? 0.5 : 1"
    />
  </SvgKeyboard>

  <NavVariant :readonly="currentPosition > 0" />
  <NavTonic />

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

  <GameProgress
    :correct="progress[2]"
    :partial="progress[1]"
    :wrong="progress[0]"
  />

  <BaseModal ref="modal">
    <p class="text-center m-4 fs-5">
      <strong>{{ correctPercentage }}%</strong>
      {{ t('correct') }}
    </p>

    <div class="text-center m-4">
      <button
        class="btn btn-primary"
        @click="
          modal.hide();
          newGame();
        "
      >
        {{ t('try_again') }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { useKeyboard } from '../composables/useKeyboard';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';
import { useI18n } from 'vue-i18n';
import NavVariant from '../components/NavVariant.vue';
import NavTonic from '../components/NavTonic.vue';
import BaseModal from '../components/BaseModal.vue';
import GameProgress from '../components/GameProgress.vue';
import SvgKeyboard from '../components/SvgKeyboard.vue';
import SvgButton from '../components/SvgButton.vue';

useKeyboard();

const modal = ref();

const currentPosition = ref(0);
const guessed = ref<number[]>([]);
const oct = ref<number | null>(null);
const positions = ref<[number, number, string][]>([]);

const store = useStore();
const settings = useSettingsStore();
const { t } = useI18n();

const formatOctave = (octave: number) => {
  if (settings.pitchNotation === 'scientific') {
    return '' + octave;
  }
  const noteName = tonic.value || 'X';
  return (
    (octave < 3 ? noteName : noteName.toLowerCase()) +
    (octave > 3 ? '’'.repeat(octave - 3) : '') +
    (octave < 2 ? ','.repeat(-(octave - 2)) : '')
  );
};

const keyPositions = computed(() => store.keyPositions);

const fillColor = (idx: number) => {
  if (guessed.value[idx] === 2 || (easyMode.value && guessed.value[idx] === 1))
    return '#198754'; // green
  if (guessed.value[idx] === 1) return '#ffc107'; // yellow
  if (guessed.value[idx] === 0) return '#dc3545'; // red
  return '#ced4da'; // gray-400
};

const label = (idx: number) => {
  if (idx === currentPosition.value) return tonic.value || '';
  if (typeof guessed.value[idx] === 'number') return undefined;
  return '?';
};

const octaves = computed(() => {
  return Array.from(
    new Set(
      positions.value.map((position) => {
        const name = position[2];
        return name[name.length - 1];
      }),
    ),
  )
    .map((item) => parseInt(item, 10))
    .sort();
});

const tonic = computed(() => store.tonic);

const toggleOctave = (value: number) => {
  oct.value = oct.value === value ? null : value;
};

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

  if (
    tonic.value !== null &&
    oct.value !== null &&
    tonic.value + oct.value === solution
  ) {
    guessed.value[currentPosition.value] = 2;
  } else if (tonic.value === solution.substr(0, solution.length - 1)) {
    guessed.value[currentPosition.value] = 1;
  } else {
    guessed.value[currentPosition.value] = 0;
  }

  currentPosition.value++;
  store.setTonic(null);
  oct.value = null;

  if (currentPosition.value >= positions.value.length) {
    modal.value.show();
  }
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

  return result.map((value) => value / positions.value.length);
});

const correctPercentage = computed(() => Math.round(progress.value[2] * 100));
</script>

<style scoped>
.keyboard {
  width: 100%;
  height: calc(100% / 720 * 428);
  max-height: calc(90vh - 5em);
}

.keyboard text {
  user-select: none;
  cursor: default;
}
</style>
