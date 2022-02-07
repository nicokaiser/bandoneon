<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../stores/settings';
import { useRoute } from 'vue-router';

const settings = useSettingsStore();
const route = useRoute();

const { availableLocales } = useI18n({ useScope: 'global' });
</script>

<template>
  <div class="bg-light">
    <div class="container px-3 py-4">
      <div class="my-3">
        <div class="form-floating">
          <select
            id="floatingSelectInstrument"
            v-model="settings.instrument"
            class="form-select"
          >
            <option
              v-for="item in settings.allInstruments"
              :key="item"
              v-t="item"
              :value="item"
            />
          </select>
          <label v-t="'keyboard'" for="floatingSelectInstrument" />
        </div>
      </div>
      <div class="my-3">
        <div class="form-floating">
          <select
            id="floatingSelectPitchNotation"
            v-model="settings.pitchNotation"
            class="form-select"
          >
            <option
              v-for="item in settings.allPitchNotations"
              :key="item"
              v-t="item"
              :value="item"
            />
          </select>
          <label v-t="'pitch_notation'" for="floatingSelectPitchNotation" />
        </div>
      </div>
      <div class="my-3">
        <div class="form-floating">
          <select
            id="floatingSelectLocale"
            v-model="settings.locale"
            class="form-select"
          >
            <option
              v-for="item in availableLocales"
              :key="item"
              v-t="'language-' + item"
              :value="item"
            />
          </select>
          <label v-t="'language'" for="floatingSelectLocale" />
        </div>
      </div>
      <div v-if="route.name === 'game'" class="my-3">
        <div class="form-floating">
          <select
            id="floatingSelectDifficulty"
            v-model="settings.difficulty"
            class="form-select"
          >
            <option
              v-for="item in ['easy', 'medium']"
              :key="item"
              v-t="'difficulty-' + item"
              :value="item"
            />
          </select>
          <label v-t="'difficulty'" for="floatingSelectDifficulty" />
        </div>
      </div>
      <div class="mb-0 d-flex justify-content-between text-muted small">
        <div>
          <RouterLink
            v-if="route.name !== 'game'"
            :to="{ name: 'game' }"
            class="link-secondary me-1"
          >
            Play a game!
          </RouterLink>
        </div>
        <a
          href="mailto:nico@kaiser.me?subject=Bandoneon.app%20Feedback"
          class="link-secondary"
          >Feedback</a
        >
      </div>
    </div>
  </div>
</template>
