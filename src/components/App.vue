<template>
    <div id="app">
        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-brand me-auto"
                >
                    Bandoneon.app
                </router-link>
                <ul class="nav">
                    <li class="nav-item">
                        <a
                            v-t="'info'"
                            class="nav-link link-dark"
                            data-bs-toggle="collapse"
                            href="#collapseInfo"
                        />
                    </li>
                    <li class="nav-item">
                        <a
                            v-t="'settings'"
                            class="nav-link link-dark"
                            data-bs-toggle="collapse"
                            href="#collapseSettings"
                        />
                    </li>
                </ul>
            </div>
        </nav>

        <div id="collapseInfo" class="collapse">
            <v-info />
        </div>

        <div id="collapseSettings" class="collapse">
            <div class="border-top bg-light">
                <div class="container py-4">
                    <div class="mb-3">
                        <div class="form-floating">
                            <select
                                id="floatingSelectInstrument"
                                class="form-select"
                                @change="setInstrument($event)"
                            >
                                <option
                                    v-for="instrument in instruments"
                                    :key="instrument"
                                    v-t="instrument"
                                    :selected="currentInstrument === instrument"
                                    :value="instrument"
                                />
                            </select>
                            <label
                                v-t="'keyboard'"
                                for="floatingSelectInstrument"
                            />
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="form-floating">
                            <select
                                id="floatingSelectPitchNotation"
                                class="form-select"
                                @change="setPitchNotation($event)"
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
                            <label
                                v-t="'language'"
                                for="floatingSelectLocale"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container my-5">
            <ul class="nav nav-tabs nav-fill d-print-none">
                <li v-for="variant in variants" :key="variant" class="nav-item">
                    <a
                        v-t="variant"
                        :class="[
                            'nav-link',
                            currentVariant === variant ? 'active' : null,
                        ]"
                        href="#"
                        @click.prevent="setVariant(variant)"
                    />
                </li>
            </ul>

            <v-keyboard
                ref="keyboard"
                :variant="currentVariant"
                :tonic="currentTonic"
                :scale-type="currentScaleType"
                :chord-type="currentChordType"
            />

            <div class="btn-toolbar mb-3 d-print-none">
                <div class="btn-group" style="width: 100%">
                    <button
                        v-for="tonic in tonics"
                        :key="tonic"
                        :class="[
                            'btn',
                            currentTonic === tonic
                                ? 'btn-secondary'
                                : 'btn-outline-secondary',
                        ]"
                        style="width: 8.33%"
                        @click.stop="setTonic(tonic)"
                    >
                        {{ enharmonicNoteName(tonic) }}
                    </button>
                </div>
            </div>

            <div class="btn-toolbar justify-content-between d-print-none">
                <button
                    :class="[
                        'btn',
                        'btn-outline-secondary',
                        enharmonic ? 'active' : null,
                    ]"
                    style="width: 2em"
                    @click.stop="toggleEnharmonic()"
                >
                    {{ enharmonic ? '♯' : '♭' }}
                </button>

                <div class="btn-group">
                    <button
                        v-for="scaleType in scaleTypes"
                        :key="scaleType"
                        v-t="scaleType"
                        :class="[
                            'btn',
                            currentScaleType === scaleType
                                ? 'btn-secondary'
                                : 'btn-outline-secondary',
                        ]"
                        @click.stop="setScaleType(scaleType)"
                    />
                </div>

                <div class="btn-group">
                    <button
                        v-for="chordType in chordTypes"
                        :key="chordType"
                        :class="[
                            'btn',
                            currentChordType === chordType
                                ? 'btn-secondary'
                                : 'btn-outline-secondary',
                        ]"
                        @click.stop="setChordType(chordType)"
                    >
                        {{ chordType }}
                    </button>
                </div>

                <button
                    :class="[
                        'btn',
                        'btn-outline-secondary',
                        colors ? 'active' : null,
                    ]"
                    @click.stop="toggleColors()"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        class="bi bi-palette-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                        />
                    </svg>
                </button>

                <button
                    class="btn btn-outline-secondary"
                    style="line-height: 1em"
                    :title="t('saveImage')"
                    @click.stop="downloadImage()"
                >
                    <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-download"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                        />
                    </svg>
                </button>

                <div class="btn-group">
                    <button
                        class="btn btn-outline-secondary"
                        style="line-height: 1em"
                        :title="t('saveVoicing')"
                        @click.stop="saveVoicing()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pin-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z"
                            />
                        </svg>
                    </button>

                    <button
                        class="btn btn-outline-secondary"
                        style="line-height: 1em"
                        :title="t('resetVoicing')"
                        @click.stop="resetVoicing()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            class="bi bi-arrow-counterclockwise"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                            />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <v-footer />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
</script>

<script>
import 'bootstrap/dist/js/bootstrap.js';
import { mapGetters } from 'vuex';
import Note from '@tonaljs/note';
import VInfo from './VInfo.vue';
import VFooter from './VFooter.vue';
import VKeyboard from './VKeyboard.vue';

export default {
    components: {
        VInfo,
        VFooter,
        VKeyboard,
    },

    data() {
        return {
            tonics: [
                'C',
                'C#',
                'D',
                'D#',
                'E',
                'F',
                'F#',
                'G',
                'G#',
                'A',
                'A#',
                'B',
            ],
            showSettings: false,
        };
    },

    computed: {
        variants() {
            return this.$store.state.variants;
        },

        colors() {
            return this.$store.state.colors;
        },

        enharmonic() {
            return this.$store.state.enharmonic;
        },

        scaleTypes() {
            return this.$store.state.scaleTypes;
        },

        chordTypes() {
            return this.$store.state.chordTypes;
        },

        instruments() {
            return Object.keys(this.$store.state.instruments);
        },

        currentInstrument() {
            return this.$store.state.instrument;
        },

        pitchNotation() {
            return this.$store.state.pitchNotation;
        },

        ...mapGetters([
            'currentVariant',
            'currentScaleType',
            'currentChordType',
            'currentTonic',
        ]),
    },

    mounted() {
        document.addEventListener('keypress', ({ key }) => {
            if (key === 'l') return this.setVariant('left-open');
            if (key === 'L') return this.setVariant('left-close');
            if (key === 'r') return this.setVariant('right-open');
            if (key === 'R') return this.setVariant('right-close');

            if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
                return this.setTonic(key.toUpperCase(), true);
            }

            if (
                key === '#' &&
                this.currentTonic &&
                this.currentTonic.length === 1
            ) {
                this.setTonic(this.currentTonic + '#');
            }

            if (key === 'M') return this.setChordType('M');
            if (key === 'm') return this.setChordType('m');
            if (key === '7') return this.setChordType('7');

            if (key === 'C') return this.toggleColors();
        });
    },

    methods: {
        setVariant(variant) {
            if (this.currentVariant === variant) return;

            this.$router.push({
                name: this.$route.name,
                params: { ...this.$route.params, ...{ variant } },
            });
        },

        setTonic(tonic, force = false) {
            if (this.currentTonic === tonic) {
                if (!force)
                    this.$router.push({
                        name: 'home',
                        params: {
                            variant: this.currentVariant,
                        },
                    });

                return;
            }

            if (this.currentScaleType) {
                this.$router.push({
                    name: 'scale',
                    params: {
                        variant: this.currentVariant,
                        tonic,
                        scaleType: this.currentScaleType,
                    },
                });

                return;
            }

            this.$router.push({
                name: 'chord',
                params: {
                    variant: this.currentVariant,
                    tonic,
                    chordType: this.currentChordType || 'M',
                },
            });
        },

        enharmonicNoteName(name) {
            if (!this.enharmonic) return name.replace('#', '♯');

            if (name.length === 2 && name[1] === '#') {
                return Note.enharmonic(name).replace('b', '♭');
            }

            return name;
        },

        setScaleType(scaleType) {
            if (this.currentScaleType === scaleType) return;

            this.$router.push({
                name: 'scale',
                params: {
                    variant: this.currentVariant,
                    tonic: this.currentTonic || 'C',
                    scaleType,
                },
            });
        },

        setChordType(chordType) {
            if (this.currentChordType === chordType) return;

            this.$router.push({
                name: 'chord',
                params: {
                    variant: this.currentVariant,
                    tonic: this.currentTonic || 'C',
                    chordType,
                },
            });
        },

        setPitchNotation(event) {
            this.$store.commit('setPitchNotation', event.target.value);
        },

        setLocale(event) {
            this.$store.commit('setLocale', event.target.value);
            this.locale = event.target.value;
        },

        toggleEnharmonic() {
            this.$store.state.enharmonic = !this.$store.state.enharmonic;
        },

        toggleColors() {
            this.$store.state.colors = !this.$store.state.colors;
        },

        toggleSettings() {
            this.showSettings = !this.showSettings;
        },

        setInstrument(event) {
            this.$store.commit('setInstrument', event.target.value);
        },

        downloadImage() {
            this.$refs.keyboard.downloadImage();
        },

        saveVoicing() {
            if (!this.$refs.keyboard.modified) return;

            const selected = this.$refs.keyboard.fetchSelected();
            const pitches = [];

            for (let c in selected) {
                if (selected[c]) pitches.push(c);
            }

            const chord = `${this.currentTonic}${this.currentChordType}`;

            const left = ['left-open', 'left-close'];
            const right = ['right-open', 'left-close'];

            const variants = {
                'left-open': left,
                'left-close': left,
                'right-open': right,
                'right-close': right,
            };

            for (const variant of variants[this.currentVariant]) {
                this.$store.state.chords[variant][chord] = pitches;
            }

            window.localStorage.setItem(
                'chords',
                JSON.stringify(this.$store.state.chords)
            );
        },

        resetVoicing() {
            this.$store.state.chords = JSON.parse(
                JSON.stringify(this.$store.state.originalChords)
            );
            window.localStorage.removeItem('chords');
            this.$refs.keyboard.resetSelected();
        },
    },
};
</script>

<style lang="scss">
$enable-transitions: true;
$btn-transition: none;
$nav-link-transition: none;

$primary: #bcac76;
$secondary: #776f54;
$light: #f8f9fa;

@import 'bootstrap/scss/bootstrap';

body {
    min-width: 750px;
}

.container {
    max-width: 750px;
}
</style>
