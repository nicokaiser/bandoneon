<template>
    <div id="app">
        <nav class="navbar navbar-light">
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
            <v-settings />
        </div>

        <div class="container my-5">
            <v-variants />

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
                        enharmonicSelected ? 'active' : null,
                    ]"
                    style="width: 2em"
                    @click.stop="
                        $store.state.enharmonic = !$store.state.enharmonic
                    "
                >
                    {{ enharmonicSelected ? '♯' : '♭' }}
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
                    @click.stop="$store.state.colors = !$store.state.colors"
                >
                    <b-icon-palette-fill />
                </button>

                <button
                    class="btn btn-outline-secondary"
                    style="line-height: 1em"
                    :title="t('saveImage')"
                    @click.stop="downloadImage()"
                >
                    <b-icon-download />
                </button>

                <div class="btn-group">
                    <button
                        class="btn btn-outline-secondary"
                        style="line-height: 1em"
                        :title="t('saveVoicing')"
                        @click.stop="saveVoicing()"
                    >
                        <b-icon-pin-fill />
                    </button>

                    <button
                        class="btn btn-outline-secondary"
                        style="line-height: 1em"
                        :title="t('resetVoicing')"
                        @click.stop="resetVoicing()"
                    >
                        <b-icon-arrow-counterclockwise />
                    </button>
                </div>
            </div>
        </div>

        <v-footer />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<script>
import 'bootstrap/js/src/collapse';
import { mapGetters, mapState } from 'vuex';
import { enharmonic } from '@tonaljs/note';
import BIconArrowCounterclockwise from './BIconArrowCounterclockwise.vue';
import BIconDownload from './BIconDownload.vue';
import BIconPaletteFill from './BIconPaletteFill.vue';
import BIconPinFill from './BIconPinFill.vue';
import VInfo from './VInfo.vue';
import VFooter from './VFooter.vue';
import VKeyboard from './VKeyboard.vue';
import VSettings from './VSettings.vue';
import VVariants from './VVariants.vue';

export default {
    components: {
        BIconArrowCounterclockwise,
        BIconDownload,
        BIconPaletteFill,
        BIconPinFill,
        VInfo,
        VFooter,
        VKeyboard,
        VSettings,
        VVariants,
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
        ...mapState({
            variants: 'variants',
            scaleTypes: 'scaleTypes',
            chordTypes: 'chordTypes',
            colors: 'colors',
            enharmonicSelected: 'enharmonic',
            currentInstrument: 'instrument',
            instruments: 'instruments',
            pitchNotation: 'pitchNotation',
        }),

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

            if (key === 'C') {
                this.$store.state.colors = !this.$store.state.colors;
            }
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
            if (!this.enharmonicSelected) return name.replace('#', '♯');

            if (name.length === 2 && name[1] === '#') {
                return enharmonic(name).replace('b', '♭');
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

@import 'bootstrap/scss/bootstrap';

body {
    min-width: 750px;
}

.container {
    max-width: 750px;
}
</style>
