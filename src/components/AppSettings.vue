<template>
  <div class="bg-neutral-100 dark:bg-neutral-800">
    <div class="mx-auto max-w-screen-md p-6">
      <div class="mb-4">
        <label
          class="block text-xs font-medium text-neutral-500 dark:text-neutral-400"
          for="selectInstrument"
        >
          {{ $t('keyboard') }}
        </label>
        <Select
          id="selectInstrument"
          v-model="settings.instrument"
          class="mt-1"
          :options="
            settings.allInstruments.map((value) => ({
              name: $t(value),
              value,
            }))
          "
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-xs font-medium text-neutral-500 dark:text-neutral-400"
          for="selectPitchNotation"
        >
          {{ $t('pitch_notation') }}
        </label>
        <Select
          id="selectPitchNotation"
          v-model="settings.pitchNotation"
          class="mt-1"
          :options="
            settings.allPitchNotations.map((value) => ({
              name: $t(value),
              value,
            }))
          "
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-xs font-medium text-neutral-500 dark:text-neutral-400"
          for="selectLocale"
        >
          {{ $t('language') }}
        </label>

        <Select
          id="selectLocale"
          v-model="settings.locale"
          class="mt-1"
          :options="
            availableLocales.map((value) => ({
              name: $t('language-' + value),
              value,
            }))
          "
        />
      </div>

      <div v-if="route.name === 'game'" class="mb-4">
        <label
          class="block text-xs font-medium text-neutral-500 dark:text-neutral-400"
          for="selectDifficulty"
        >
          {{ $t('difficulty') }}
        </label>
        <Select
          id="selectDifficulty"
          v-model="settings.difficulty"
          class="mt-1"
          :options="[
            { value: 'easy', name: $t('difficulty-easy') },
            { value: 'medium', name: $t('difficulty-medium') },
          ]"
        />
      </div>

      <div class="flex justify-between text-sm">
        <div>
          <RouterLink
            v-if="route.name !== 'game'"
            :to="{ name: 'game' }"
            class="me-1 underline"
          >
            Play a game!
          </RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <a target="_blank" href="https://github.com/nicokaiser/bandoneon/">
            <GitHubIcon class="h-4 w-4" />
          </a>
          <a
            href="mailto:nico@kaiser.me?subject=Bandoneon.app%20Feedback"
            class="underline"
          >
            Feedback
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../stores/settings';
import { useRoute } from 'vue-router';
import Select from './Select.vue';
import GitHubIcon from './icons/GitHubIcon.vue';

const settings = useSettingsStore();
const route = useRoute();

const { availableLocales } = useI18n({ useScope: 'global' });
</script>
