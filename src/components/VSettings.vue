<template>
    <div class="bg-light">
        <div class="container py-4">
            <div class="mb-3">
                <div class="form-floating">
                    <select
                        id="floatingSelectInstrument"
                        class="form-select"
                        @change="
                            $store.commit('setInstrument', $event.target.value)
                        "
                    >
                        <option
                            v-for="instrument in Object.keys(instruments)"
                            :key="instrument"
                            v-t="instrument"
                            :selected="currentInstrument === instrument"
                            :value="instrument"
                        />
                    </select>
                    <label v-t="'keyboard'" for="floatingSelectInstrument" />
                </div>
            </div>

            <div class="mb-3">
                <div class="form-floating">
                    <select
                        id="floatingSelectPitchNotation"
                        class="form-select"
                        @change="
                            $store.commit(
                                'setPitchNotation',
                                $event.target.value
                            )
                        "
                    >
                        <option
                            v-for="item in ['helmholtz', 'scientific']"
                            :key="item"
                            v-t="item"
                            :selected="pitchNotation === item"
                            :value="item"
                        />
                    </select>
                    <label
                        v-t="'pitchNotation'"
                        for="floatingSelectPitchNotation"
                    />
                </div>
            </div>

            <div class="mb-3">
                <div class="form-floating">
                    <select
                        id="floatingSelectLocale"
                        class="form-select"
                        @change="setLocale($event)"
                    >
                        <option
                            v-for="item in ['de', 'en', 'es']"
                            :key="item"
                            v-t="'language-' + item"
                            :selected="locale === item"
                            :value="item"
                        />
                    </select>
                    <label v-t="'language'" for="floatingSelectLocale" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            currentInstrument: 'instrument',
            instruments: 'instruments',
            pitchNotation: 'pitchNotation',
        }),
    },

    methods: {
        setLocale(event) {
            this.$store.commit('setLocale', event.target.value);
            this.locale = event.target.value;
        },
    },
};
</script>
