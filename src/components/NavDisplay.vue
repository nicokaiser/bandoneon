<template>
  <div class="flex flex-wrap justify-center print:hidden">
    <div class="flex flex-col items-center">
      <div
        class="mb-1 text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('scale') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button
          v-for="item in allScaleTypes"
          :key="item"
          :active="item === scaleType"
          @click="store.setScaleType(item)"
        >
          {{ t(item) }}
        </Button>
      </ButtonGroup>
    </div>

    <div class="flex flex-col items-center">
      <div
        class="mb-1 text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('chord') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button
          v-for="item in allChordTypes"
          :key="item"
          :active="item === chordType"
          @click="store.setChordType(item)"
        >
          {{ item }}
        </Button>
      </ButtonGroup>
    </div>

    <div class="flex flex-col items-center">
      <div
        class="mb-1 text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('display') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button @click="showEnharmonics = !showEnharmonics">
          {{ showEnharmonics ? '♯' : '♭' }}
        </Button>

        <Button :active="showColors" @click="showColors = !showColors">
          <PaletteIcon class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          class="button"
          :title="t('save_image')"
          @click="emit('download')"
        >
          <DownloadIcon class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          :title="t('save_voicing')"
          :disabled="!modified || !chordType"
          @click="emit('save')"
        >
          <PinIcon class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          :title="t('reset_voicing')"
          :disabled="!isUserChord"
          @click="emit('reset')"
        >
          <ArrowUturnLeftIcon class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from '../stores/main';
import ArrowUturnLeftIcon from './icons/ArrowUturnLeftIcon.vue';
import DownloadIcon from './icons/DownloadIcon.vue';
import PaletteIcon from './icons/PaletteIcon.vue';
import PinIcon from './icons/PinIcon.vue';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';
import { storeToRefs } from 'pinia';

defineProps({
  modified: Boolean,
});

const emit = defineEmits(['download', 'save', 'reset']);

const { t } = useI18n();
const store = useStore();
const {
  scaleType,
  allScaleTypes,
  allChordTypes,
  showColors,
  showEnharmonics,
  chordType,
  isUserChord,
} = storeToRefs(store);
</script>
