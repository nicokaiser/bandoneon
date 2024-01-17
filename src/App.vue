<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from './stores/settings';
import AppHeader from './components/AppHeader.vue';

const settings = useSettingsStore();
const { locale } = useI18n();
locale.value = settings.locale;

watch(
  () => settings.locale,
  () => (locale.value = settings.locale),
);
</script>

<template>
  <AppHeader />

  <div class="container px-3 my-4">
    <RouterView />
  </div>
</template>

<style lang="scss">
$enable-transitions: true;
$transition-collapse: height 0.2s ease !default;
$transition-collapse-width: width 0.2s ease !default;
$btn-transition: none;
$nav-link-transition: none;

$primary: #dee2e6; // $gray-300
$body-color-dark: #f8f9fa; // $gray-100

@import 'bootstrap/scss/bootstrap';

.container {
  max-width: 750px;
}

.bi {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
