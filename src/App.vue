<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from './stores/settings';
import TheHeader from './components/TheHeader.vue';

const settings = useSettingsStore();
const { locale } = useI18n();
locale.value = settings.locale;

watch(
  () => settings.locale,
  () => (locale.value = settings.locale)
);
</script>

<template>
  <TheHeader />

  <div class="container px-3 my-4">
    <router-view />
  </div>
</template>

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

.bi {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
