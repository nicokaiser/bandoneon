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
      <button class="p-2" @click.prevent="isDark = !isDark">
        <IconSun v-if="!isDark" class="h-5 w-5" />
        <IconMoon v-else class="h-5 w-5" />
      </button>

      <button
        type="button"
        class="p-2"
        title="Settings"
        @click.prevent="menu = !menu"
      >
        <IconBars3 class="h-5 w-5" />
      </button>
    </div>
  </header>

  <AppSettings v-if="menu" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDark } from '../composables/useDark';

import AppSettings from './AppSettings.vue';
import IconBars3 from './icons/IconBars3.vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';

const route = useRoute();
const menu = ref(false);

const { isDark } = useDark();

watch(
  () => route.path,
  () => (menu.value = false),
);
</script>
