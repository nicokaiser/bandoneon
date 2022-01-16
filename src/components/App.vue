<template>
    <div id="app">
        <TheHeader />

        <div class="container px-3 my-4">
            <TheKeyboard ref="keyboard" />
            <VNavVariant />
            <VNavTonic />

            <div class="mb-2 text-center d-print-none">
                <div class="btn-group mx-2">
                    <button
                        v-for="item in scaleTypes"
                        :key="item"
                        :class="[
                            'btn btn-outline-secondary my-2',
                            item === scaleType ? 'active' : null,
                        ]"
                        @click.stop="setScaleType(item)"
                    >
                        {{ t(item) }}
                    </button>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useKeyboardNavigation } from '@/composables/keyboardNavigation';
import BIconArrowCounterclockwise from '@/components/BIconArrowCounterclockwise.vue';
import BIconDownload from '@/components/BIconDownload.vue';
import BIconPaletteFill from '@/components/BIconPaletteFill.vue';
import BIconPinFill from '@/components/BIconPinFill.vue';
import TheKeyboard from '@/components/TheKeyboard.vue';
import VNavVariant from '@/components/VNavVariant.vue';
import VNavTonic from '@/components/VNavTonic.vue';
import TheHeader from '@/components/TheHeader.vue';

useKeyboardNavigation();

const keyboard = ref(null);
const store = useStore();
const { t } = useI18n();

const downloadImage = () => keyboard.value.downloadImage();
const saveVoicing = () => {
    if (keyboard.value.modified) {
        const selected = keyboard.value.fetchSelected();
        const notes = Object.keys(selected).filter((item) => !!selected[item]);
        store.commit('saveUserChord', notes);
    }
};

const resetVoicings = () => {
    keyboard.value.resetSelected();
    store.commit('resetUserChords');
};

const scaleTypes = computed(() => store.state.scaleTypes);
const scaleType = computed(() => store.state.scaleType);
const setScaleType = (value) => store.commit('setScaleType', value);

const chordTypes = computed(() => store.state.chordTypes);
const chordType = computed(() => store.state.chordType);
const setChordType = (value) => store.commit('setChordType', value);

const showColors = computed(() => store.state.showColors);
const toggleColors = () => store.commit('toggleColors');
const showEnharmonics = computed(() => store.state.showEnharmonics);
const toggleEnharmonics = () => store.commit('toggleEnharmonics');
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
