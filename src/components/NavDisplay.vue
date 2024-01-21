<template>
  <div class="flex flex-wrap justify-center print:hidden">
    <div class="flex flex-col items-center">
      <div class="mb-1 text-xs font-medium text-neutral-400">
        {{ t('scale') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button
          v-for="item in store.allScaleTypes"
          :key="item"
          :active="item === store.scaleType"
          @click="store.setScaleType(item)"
        >
          {{ t(item) }}
        </Button>
      </ButtonGroup>
    </div>

    <div class="flex flex-col items-center">
      <div class="mb-1 text-xs font-medium text-neutral-400">
        {{ t('chord') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button
          v-for="item in store.allChordTypes"
          :key="item"
          :active="item === store.chordType"
          @click="store.setChordType(item)"
        >
          {{ item }}
        </Button>
      </ButtonGroup>
    </div>

    <div class="flex flex-col items-center">
      <div class="mb-1 text-xs font-medium text-neutral-400">
        {{ t('display') }}
      </div>
      <ButtonGroup class="mx-2 mb-3">
        <Button @click="store.showEnharmonics = !store.showEnharmonics">
          {{ store.showEnharmonics ? '♯' : '♭' }}
        </Button>

        <Button
          :active="store.showColors"
          @click="store.showColors = !store.showColors"
        >
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
          :disabled="!modified || !store.chordType"
          @click="emit('save')"
        >
          <PinIcon class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          :title="t('reset_voicing')"
          :disabled="!store.isUserChord"
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

defineProps({
  modified: Boolean,
});

const emit = defineEmits(['download', 'save', 'reset']);

const store = useStore();
const { t } = useI18n();
</script>
