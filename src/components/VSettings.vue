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
                            v-for="item in Object.keys(instruments)"
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
                            v-for="item in ['helmholtz', 'scientific']"
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
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState([
            'instrument',
            'instruments',
            'pitchNotation',
            'showColors',
        ]),
    },

    methods: {
        setLocale(event) {
            this.$store.commit('setLocale', event.target.value);
            this.locale = event.target.value;
        },

        ...mapMutations(['setInstrument', 'setPitchNotation', 'setShowColors']),
    },
};
</script>
