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
                        v-t="'pitchNotation'"
                        for="floatingSelectPitchNotation"
                    />
                </div>
            </div>

            <div class="my-3">
                <div class="form-floating">
                    <select
                        id="floatingSelectLocale"
                        class="form-select"
                        @change="setLocale($event)"
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

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { locale, availableLocales } = useI18n({ useScope: 'global' });
        const store = useStore();

        return {
            instrument: computed(() => store.state.instrument),
            availableInstruments: computed(() => {
                return Object.keys(store.state.instruments);
            }),
            setInstrument: (value) => store.commit('setInstrument', value),

            pitchNotation: computed(() => store.state.pitchNotation),
            availablePitchNotations: ['helmholtz', 'scientific'],
            setPitchNotation: (value) => {
                store.commit('setPitchNotation', value);
            },

            locale,
            availableLocales,
            setLocale: (event) => {
                store.commit('setLocale', event.target.value);
                locale.value = event.target.value;
            },
        };
    },
};
</script>
