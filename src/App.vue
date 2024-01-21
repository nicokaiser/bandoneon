<template>
  <AppHeader />
  <RouterView />
</template>

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
