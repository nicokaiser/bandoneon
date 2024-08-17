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
          v-for="item in scaleTypes"
          :key="item"
          :aria-pressed="item === scaleType"
          @click.prevent="store.setScaleType(item)"
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
          v-for="item in chordTypes"
          :key="item"
          :aria-pressed="item === chordType"
          @click.prevent="store.setChordType(item)"
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
        <Button @click.prevent="showEnharmonics = !showEnharmonics">
          {{ showEnharmonics ? '♯' : '♭' }}
        </Button>

        <Button
          :aria-pressed="showColors"
          @click.prevent="showColors = !showColors"
        >
          <IconPalette class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          class="button"
          :title="t('save_image')"
          @click.prevent="emit('download')"
        >
          <IconArrowDownTray class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          :title="t('save_voicing')"
          :disabled="!modified || !chordType"
          @click.prevent="emit('save')"
        >
          <IconPin class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>

        <Button
          :title="t('reset_voicing')"
          :disabled="!isUserChord"
          @click.prevent="emit('reset')"
        >
          <IconArrowUturnLeft class="inline-block h-5 w-5 align-[-0.25em]" />
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { storeToRefs } from 'pinia';
import { chordTypes, scaleTypes } from '../data/index';
import { useStore } from '../stores/main';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';
import IconArrowDownTray from './icons/IconArrowDownTray.vue';
import IconArrowUturnLeft from './icons/IconArrowUturnLeft.vue';
import IconPalette from './icons/IconPalette.vue';
import IconPin from './icons/IconPin.vue';

defineProps<{ modified: boolean }>();

const emit = defineEmits<{
  download: [];
  save: [];
  reset: [];
}>();

const { t } = useI18n();
const store = useStore();
const { scaleType, showColors, showEnharmonics, chordType, isUserChord } =
  storeToRefs(store);
</script>
