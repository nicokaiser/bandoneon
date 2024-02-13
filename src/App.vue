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
import { watchEffect } from 'vue';
import { useI18n } from 'petite-vue-i18n';
import { useSettingsStore } from './stores/settings';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { useHead } from '@unhead/vue';

useHead({ title: 'Bandoneon.app' });

// Umami
if (import.meta.env.VITE_UMAMI_HOST && import.meta.env.VITE_UMAMI_ID) {
  useHead({
    script: [
      {
        src: import.meta.env.VITE_UMAMI_HOST + '/script.js',
        async: true,
        defer: true,
        'data-website-id': import.meta.env.VITE_UMAMI_ID,
      },
    ],
  });
}

const settings = useSettingsStore();
const { locale } = useI18n();

watchEffect(() => {
  const lang = settings.locale;
  locale.value = lang;
  window!.document.querySelector('html')!.lang = lang;
});

// Persist settings to localStorage
const storedSettings = localStorage.getItem('settings');
if (storedSettings) settings.$patch(JSON.parse(storedSettings));
settings.$subscribe((_mutation, state) => {
  localStorage.setItem('settings', JSON.stringify(state));
});
</script>
