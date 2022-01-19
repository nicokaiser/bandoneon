<template>
    <div id="app">
        <TheHeader />

        <div class="container px-3 my-4">
            <TheKeyboard ref="keyboard" />
            <VNavVariant />
            <VNavTonic />
            <VNavDisplay :keyboard-ref="keyboard" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useKeyboardNavigation } from '@/composables/keyboardNavigation';

import TheKeyboard from '@/components/TheKeyboard.vue';
import VNavVariant from '@/components/VNavVariant.vue';
import VNavTonic from '@/components/VNavTonic.vue';
import VNavDisplay from '@/components/VNavDisplay.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useSettingsStore } from '../stores/settings';

useKeyboardNavigation();

const keyboard = ref(null);
const settings = useSettingsStore();
const { locale } = useI18n();

locale.value = settings.locale;
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
</style>
