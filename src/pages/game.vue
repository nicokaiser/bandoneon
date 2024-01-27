<template>
  <div class="mx-auto max-w-screen-md p-6">
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
        :opacity="
          idx === currentPosition || typeof guessed[idx] === 'number' ? 1 : 0.5
        "
      />
    </SvgKeyboard>

    <NavVariant :readonly="currentPosition > 0" />
    <NavTonic />

    <!-- Medium mode: display octave buttons -->
    <div
      v-if="difficulty !== 'easy'"
      class="mb-2 flex flex-wrap justify-center"
    >
      <Button
        v-for="octave in octaves"
        :key="octave"
        :disabled="!tonic"
        class="m-1 w-12"
        @click.prevent="oct = octave"
      >
        {{ formatOctave(octave) }}
      </Button>
    </div>

    <Progress
      class="mt-8"
      :values="[
        { value: progress[2], color: '#22c55e' /* green-500 */ },
        { value: progress[1], color: '#eab308' /* yellow-500 */ },
        { value: progress[0], color: '#ef4444' /* red-500 */ },
      ]"
    />
  </div>

  <Modal v-model="isModalOpen">
    <div class="px-4 py-8 text-center">
      <p class="mb-8">
        <strong>{{ correctPercentage }}%</strong>
        {{ t('correct') }}
      </p>
      <Button
        @click.prevent="
          isModalOpen = false;
          newGame();
        "
      >
        {{ t('try_again') }}
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'petite-vue-i18n';
import Button from '../components/Button.vue';
import Progress from '../components/Progress.vue';
import Modal from '../components/Modal.vue';
import NavTonic from '../components/NavTonic.vue';
import NavVariant from '../components/NavVariant.vue';
import SvgButton from '../components/SvgButton.vue';
import SvgKeyboard from '../components/SvgKeyboard.vue';
import { useKeyboard } from '../composables/useKeyboard';
import { useStore } from '../stores/main';
import { useSettingsStore } from '../stores/settings';

useKeyboard();

const currentPosition = ref(0);
const guessed = ref<number[]>([]);
const oct = ref<number | null>(null);
const positions = ref<[number, number, string][]>([]);
const isModalOpen = ref(false);

const { t } = useI18n();

const store = useStore();
const { tonic, keyPositions } = storeToRefs(store);

const settings = useSettingsStore();
const { pitchNotation, difficulty } = storeToRefs(settings);

const formatOctave = (octave: number) => {
  if (pitchNotation.value === 'scientific') {
    return '' + octave;
  }
  const noteName = tonic.value || 'X';
  return (
    (octave < 3 ? noteName : noteName.toLowerCase()) +
    (octave > 3 ? '’'.repeat(octave - 3) : '') +
    (octave < 2 ? ','.repeat(-(octave - 2)) : '')
  );
};

const fillColor = (idx: number) => {
  if (
    guessed.value[idx] === 2 ||
    (difficulty.value === 'easy' && guessed.value[idx] === 1)
  )
    return '#22c55e'; // green-500
  if (guessed.value[idx] === 1) return '#eab308'; // yellow-500
  if (guessed.value[idx] === 0) return '#ef4444'; // red-500
  return 'transparent';
};

const label = (idx: number) => {
  if (idx === currentPosition.value) return tonic.value || '?';
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
    isModalOpen.value = true;
  }
}

watch([tonic, oct], () => {
  if (tonic.value && (difficulty.value === 'easy' || oct.value)) {
    check();
  }
});

const progress = computed(() => {
  if (positions.value.length === 0) return [0, 0, 0];

  const result = [0, 0, 0];

  for (const g of guessed.value) {
    if (g === 2 || (g === 1 && difficulty.value === 'easy')) result[2]++;
    else if (g === 1) result[1]++;
    else if (g === 0) result[0]++;
  }

  return result.map((value) => value / positions.value.length);
});

const correctPercentage = computed(() => Math.round(progress.value[2] * 100));

// Keyboard shortcuts for octave
function keydownListener({ key }: { key: string }) {
  if (!tonic.value) return;
  for (const octave of octaves.value) {
    if (key === '' + octave) oct.value = octave;
  }
}
onMounted(() => document.addEventListener('keydown', keydownListener));
onUnmounted(() => document.removeEventListener('keydown', keydownListener));
</script>