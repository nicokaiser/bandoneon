<template>
  <div class="bg-neutral-100 dark:bg-neutral-800">
    <div class="mx-auto max-w-(--breakpoint-md) p-6">
      <div class="mb-4">
        <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {{ t('keyboard') }}
          <Select
            v-model="instrument"
            class="mt-1"
            :options="
              Object.keys(instruments).map((value) => ({
                label: t(value),
                value,
              }))
            "
          />
        </label>
      </div>

      <div class="mb-4">
        <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {{ t('pitch_notation') }}
        </label>
        <div class="mt-1 flex w-full flex-row gap-2">
          <Button
            v-for="value in pitchNotations"
            :key="value"
            class="w-full bg-white dark:bg-neutral-900"
            :aria-pressed="value === pitchNotation"
            @click="pitchNotation = value"
          >
            {{ t(value) }}
          </Button>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {{ t('language') }}
        </label>
        <div class="mt-1 flex w-full flex-row gap-2">
          <Button
            v-for="value in availableLocales"
            :key="value"
            class="w-full bg-white dark:bg-neutral-900"
            :aria-pressed="value === locale"
            @click="locale = value"
          >
            {{ t('language-' + value) }}
          </Button>
        </div>
      </div>

      <div v-if="route.path === '/game'" class="mb-4">
        <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {{ t('difficulty') }}
        </label>
        <div class="mt-1 flex w-full flex-row gap-2">
          <Button
            v-for="value in difficulties"
            :key="value"
            class="w-full bg-white dark:bg-neutral-900"
            :aria-pressed="value === difficulty"
            @click="difficulty = value"
          >
            {{ t('difficulty-' + value) }}
          </Button>
        </div>
      </div>

      <div class="flex justify-between text-sm">
        <div>
          <RouterLink v-if="route.path !== '/game'" class="me-1 underline" to="/game">
            Play a game!
          </RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <a target="_blank" href="https://github.com/nicokaiser/bandoneon/">
            <IconGitHub class="h-4 w-4" />
          </a>
          <a class="underline" href="mailto:nico@kaiser.me?subject=Bandoneon.app%20Feedback">
            Feedback
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { difficulties, instruments, pitchNotations } from '../data/index';
import { useSettingsStore } from '../stores/settings';
import Button from './Button.vue';
import Select from './Select.vue';
import IconGitHub from './icons/IconGitHub.vue';

const settings = useSettingsStore();
const route = useRoute();

const { instrument, pitchNotation, difficulty, locale } = storeToRefs(settings);

const { availableLocales, t } = useI18n({ useScope: 'global' });
</script>
