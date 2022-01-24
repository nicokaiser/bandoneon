<template>
    <router-view />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings';

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
