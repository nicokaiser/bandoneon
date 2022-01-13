<template>
    <div id="app">
        <nav class="navbar navbar-light">
            <div class="container px-3 py-2">
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-brand me-auto mb-0 h1"
                >
                    Bandoneon.app
                </router-link>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSettings"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

        <div id="collapseSettings" class="collapse">
            <VSettings />
        </div>

        <div class="container px-3 my-4">
            <VKeyboard ref="keyboard" />
            <VVariantNav />
            <VTonicNav />

            <div class="mb-2 text-center d-print-none">
                <div class="btn-group mx-2">
                    <button
                        v-for="item in scaleTypes"
                        :key="item"
                        v-t="item"
                        :class="[
                            'btn btn-outline-secondary my-2',
                            item === scaleType ? 'active' : null,
                        ]"
                        @click.stop="setScaleType(item)"
                    />
                </div>

                <div class="btn-group mx-2">
                    <button
                        v-for="item in chordTypes"
                        :key="item"
                        :class="[
                            'btn btn-outline-secondary my-2',
                            item === chordType ? 'active' : null,
                        ]"
                        @click.stop="setChordType(item)"
                    >
                        {{ item }}
                    </button>
                </div>

                <div class="btn-group mx-2">
                    <button
                        class="btn btn-outline-secondary my-2"
                        style="width: 2em"
                        @click.stop="toggleEnharmonics()"
                    >
                        {{ showEnharmonics ? '♯' : '♭' }}
                    </button>

                    <button
                        :class="[
                            'btn btn-outline-secondary my-2',
                            showColors ? 'active' : null,
                        ]"
                        @click.stop="toggleColors()"
                    >
                        <BIconPaletteFill />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('saveImage')"
                        @click.stop="downloadImage()"
                    >
                        <BIconDownload />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('saveVoicing')"
                        @click.stop="saveVoicing()"
                    >
                        <BIconPinFill />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('resetVoicing')"
                        @click.stop="resetVoicings()"
                    >
                        <BIconArrowCounterclockwise />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import keyboard from '@/mixins/keyboard';

const { t } = useI18n();
</script>

<script>
import 'bootstrap/js/src/collapse';
import { mapMutations, mapState } from 'vuex';
import BIconArrowCounterclockwise from '@/components/BIconArrowCounterclockwise.vue';
import BIconDownload from '@/components/BIconDownload.vue';
import BIconPaletteFill from '@/components/BIconPaletteFill.vue';
import BIconPinFill from '@/components/BIconPinFill.vue';
import VKeyboard from '@/components/VKeyboard.vue';
import VSettings from '@/components/VSettings.vue';
import VVariantNav from '@/components/VVariantNav.vue';
import VTonicNav from '@/components/VTonicNav.vue';

export default {
    components: {
        BIconArrowCounterclockwise,
        BIconDownload,
        BIconPaletteFill,
        BIconPinFill,
        VKeyboard,
        VSettings,
        VVariantNav,
        VTonicNav,
    },

    mixins: [keyboard],

    computed: {
        modified() {
            return this.$refs.keyboard.modified;
        },

        ...mapState([
            'variants',
            'variant',
            'tonic',
            'scaleType',
            'scaleTypes',
            'chordType',
            'chordTypes',
            'showColors',
            'showEnharmonics',
            'instrument',
            'instruments',
        ]),
    },

    methods: {
        downloadImage() {
            this.$refs.keyboard.downloadImage();
        },

        saveVoicing() {
            if (!this.$refs.keyboard.modified) return;

            const selected = this.$refs.keyboard.fetchSelected();

            const notes = Object.keys(selected).filter(
                (item) => !!selected[item]
            );

            this.$store.commit('saveUserChord', notes);
        },

        resetVoicings() {
            this.$refs.keyboard.resetSelected();
            this.$store.commit('resetUserChords');
        },

        ...mapMutations([
            'setScaleType',
            'setChordType',
            'toggleEnharmonics',
            'toggleColors',
        ]),
    },
};
</script>

<style lang="scss">
$enable-transitions: true;
$transition-collapse: height 0.2s ease !default;
$transition-collapse-width: width 0.2s ease !default;
$btn-transition: none;
$nav-link-transition: none;

@import 'bootstrap/scss/bootstrap';

.container {
    max-width: 750px;
}

.navbar-toggler {
    border: 0;
    padding: 0;
    margin: 0.25em 0;
}
</style>
