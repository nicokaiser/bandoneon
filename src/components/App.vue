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
                        <ColorsIcon />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('saveImage')"
                        @click.stop="downloadImage()"
                    >
                        <DownloadIcon />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('saveVoicing')"
                        @click.stop="saveVoicing()"
                    >
                        <PinIcon />
                    </button>

                    <button
                        class="btn btn-outline-secondary my-2"
                        :title="t('resetVoicing')"
                        @click.stop="resetVoicings()"
                    >
                        <ResetIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from '@/stores/main';
import { useI18n } from 'vue-i18n';
import { useKeyboardNavigation } from '@/composables/keyboardNavigation';

import ResetIcon from '@/components/icon/ResetIcon.vue';
import DownloadIcon from '@/components/icon/DownloadIcon.vue';
import ColorsIcon from '@/components/icon/ColorsIcon.vue';
import PinIcon from '@/components/icon/PinIcon.vue';

import TheKeyboard from '@/components/TheKeyboard.vue';
import VNavVariant from '@/components/VNavVariant.vue';
import VNavTonic from '@/components/VNavTonic.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useSettingsStore } from '../stores/settings';

useKeyboardNavigation();

const keyboard = ref(null);
const store = useStore();
const settings = useSettingsStore();
const { t, locale } = useI18n();

locale.value = settings.locale;

const downloadImage = () => keyboard.value.downloadImage();
const saveVoicing = () => {
    if (keyboard.value.modified) {
        const selectedNotes = keyboard.value.selectedNotes;
        store.saveUserChord(selectedNotes);
    }
};

const resetVoicings = () => {
    keyboard.value.resetSelected();
    store.resetUserChords();
};

const scaleTypes = computed(() => store.availableScaleTypes);
const scaleType = computed(() => store.scaleType);
const setScaleType = (value) => store.setScaleType(value);

const chordTypes = computed(() => store.availableChordTypes);
const chordType = computed(() => store.chordType);
const setChordType = (value) => store.setChordType(value);

const showColors = computed(() => store.showColors);
const toggleColors = () => (store.showColors = !store.showColors);
const showEnharmonics = computed(() => store.showEnharmonics);
const toggleEnharmonics = () =>
    (store.showEnharmonics = !store.showEnharmonics);
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
