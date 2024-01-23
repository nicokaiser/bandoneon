<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="flex-1">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'petite-vue-i18n';
import { useSettingsStore } from './stores/settings';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

const settings = useSettingsStore();
const { locale } = useI18n();
locale.value = settings.locale;

watch(
  () => settings.locale,
  () => (locale.value = settings.locale),
);
</script>
