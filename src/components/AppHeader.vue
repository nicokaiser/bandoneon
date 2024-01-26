<template>
  <header
    class="mx-auto flex h-16 w-full max-w-screen-md items-center justify-between px-4"
  >
    <RouterLink to="/" class="px-2 py-1 text-xl font-medium">
      Bandoneon.app
      <span
        v-if="route.path === '/game'"
        class="ms-2 text-neutral-500 dark:text-neutral-400"
      >
        Game
      </span>
    </RouterLink>

    <div class="inline-flex items-center gap-1">
      <button class="p-2" @click="isDark = !isDark">
        <Icon v-if="!isDark" class="h-5 w-5" icon="heroicons:sun-20-solid" />
        <Icon v-else class="h-5 w-5" icon="heroicons:moon-20-solid" />
      </button>

      <button type="button" class="p-2" title="Settings" @click="menu = !menu">
        <Icon class="h-5 w-5" icon="heroicons:bars-3-20-solid" />
      </button>
    </div>
  </header>

  <AppSettings v-if="menu" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDark } from '../composables/useDark';
import { Icon } from '@iconify/vue';
import AppSettings from './AppSettings.vue';

const route = useRoute();
const menu = ref(false);

const { isDark } = useDark();

watch(
  () => route.path,
  () => (menu.value = false),
);
</script>
