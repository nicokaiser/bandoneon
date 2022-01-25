<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';
import { useRoute } from 'vue-router';

const settings = useSettingsStore();

const instrument = computed(() => settings.instrument);
const allInstruments = computed(() => settings.allInstruments);
const setInstrument = (value) => (settings.instrument = value);

const pitchNotation = computed(() => settings.pitchNotation);
const allPitchNotations = computed(() => settings.allPitchNotations);
const setPitchNotation = (value) => (settings.pitchNotation = value);

const { locale, availableLocales } = useI18n({ useScope: 'global' });

const setLocale = (value) => {
  settings.locale = value;
  locale.value = value;
};

const difficulty = computed(() => settings.difficulty);
const setDifficulty = (value) => (settings.difficulty = value);

const route = useRoute();
</script>

<template>
  <div class="bg-light">
    <div class="container px-3 py-4">
      <div class="my-3">
        <div class="form-floating">
          <select
            id="floatingSelectInstrument"
            class="form-select"
            @change="setInstrument($event.target.value)"
          >
            <option
              v-for="item in allInstruments"
              :key="item"
              v-t="item"
              :selected="item === instrument"
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
            class="form-select"
            @change="setPitchNotation($event.target.value)"
          >
            <option
              v-for="item in allPitchNotations"
              :key="item"
              v-t="item"
              :selected="item === pitchNotation"
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
            class="form-select"
            @change="setLocale($event.target.value)"
          >
            <option
              v-for="item in availableLocales"
              :key="item"
              v-t="'language-' + item"
              :selected="locale === item"
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
            class="form-select"
            @change="setDifficulty($event.target.value)"
          >
            <option
              v-for="item in ['easy', 'medium']"
              :key="item"
              v-t="'difficulty-' + item"
              :selected="difficulty === item"
              :value="item"
            />
          </select>
          <label v-t="'difficulty'" for="floatingSelectDifficulty" />
        </div>
      </div>

      <div class="mb-0 d-flex justify-content-between text-muted small">
        <div>
          <router-link
            v-if="route.name !== 'game'"
            :to="{ name: 'game' }"
            class="link-secondary me-1"
          >
            Play a game!
          </router-link>
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
