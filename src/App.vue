<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'petite-vue-i18n';
import { watchEffect } from 'vue';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import { instruments } from './data/index';
import { useSettingsStore } from './stores/settings';

useHead({ title: 'Bandoneon.app' });

const settings = useSettingsStore();
const { locale } = useI18n();

watchEffect(() => {
  const lang = settings.locale;
  locale.value = lang;
  window!.document.querySelector('html')!.lang = lang;
});

// Persist settings to localStorage
try {
  const item = localStorage.getItem('settings');
  if (item) {
    const storedSettings = JSON.parse(item);
    if (!(storedSettings.instrument in instruments)) {
      storedSettings.instrument = 'rheinische142';
    }
    settings.$patch(storedSettings);
  }
} catch {
  // ignore
}

settings.$subscribe((_mutation, state) => {
  localStorage.setItem('settings', JSON.stringify(state));
});
</script>
