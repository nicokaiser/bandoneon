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
                            v-for="item in availableInstruments"
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
                            v-for="item in availablePitchNotations"
                            :key="item"
                            v-t="item"
                            :selected="item === pitchNotation"
                            :value="item"
                        />
                    </select>
                    <label
                        v-t="'pitch_notation'"
                        for="floatingSelectPitchNotation"
                    />
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

            <p class="mb-0 text-end text-muted small">
                <a
                    href="mailto:nico@kaiser.me?subject=Bandoneon.app%20Feedback"
                    class="link-secondary"
                    >Feedback</a
                >
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';
import { useRoute } from 'vue-router';

const settings = useSettingsStore();

const instrument = computed(() => settings.instrument);
const availableInstruments = computed(() => settings.availableInstruments);
const setInstrument = (value) => (settings.instrument = value);

const pitchNotation = computed(() => settings.pitchNotation);
const availablePitchNotations = computed(
    () => settings.availablePitchNotations
);
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
