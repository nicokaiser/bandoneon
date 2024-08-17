<template>
  <div class="bg-neutral-100 dark:bg-neutral-800">
    <div class="mx-auto max-w-screen-md p-6">
      <label
        class="mb-4 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
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

      <label
        class="mb-4 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('pitch_notation') }}
        <Select
          v-model="pitchNotation"
          class="mt-1"
          :options="
            pitchNotations.map((value) => ({
              label: t(value),
              value,
            }))
          "
        />
      </label>

      <label
        class="mb-4 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('language') }}
        <Select
          v-model="locale"
          class="mt-1"
          :options="
            availableLocales.map((value) => ({
              label: t('language-' + value),
              value,
            }))
          "
        />
      </label>

      <label
        v-if="route.path === '/game'"
        class="mb-4 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
      >
        {{ t('difficulty') }}
        <Select
          v-model="difficulty"
          class="mt-1"
          :options="
            difficulties.map((value) => ({
              label: t('difficulty-' + value),
              value,
            }))
          "
        />
      </label>

      <div class="flex justify-between text-sm">
        <div>
          <RouterLink
            v-if="route.path !== '/game'"
            class="me-1 underline"
            to="/game"
          >
            Play a game!
          </RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <a target="_blank" href="https://github.com/nicokaiser/bandoneon/">
            <IconGitHub class="h-4 w-4" />
          </a>
          <a
            class="underline"
            href="mailto:nico@kaiser.me?subject=Bandoneon.app%20Feedback"
          >
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
import Select from './Select.vue';
import IconGitHub from './icons/IconGitHub.vue';

const settings = useSettingsStore();
const route = useRoute();

const { instrument, pitchNotation, difficulty, locale } = storeToRefs(settings);

const { availableLocales, t } = useI18n({ useScope: 'global' });
</script>
