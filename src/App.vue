<template>
    <TheHeader />

    <div class="container px-3 my-4">
        <router-view />
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import TheHeader from '@/components/TheHeader.vue';
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
