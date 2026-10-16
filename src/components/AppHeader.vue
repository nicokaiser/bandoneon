<template>
  <nav class="flex h-16 w-full items-center gap-2 px-2 print:hidden">
    <div class="flex-1">
      <RouterLink
        class="inline-flex min-h-12 items-center rounded-lg px-3 text-lg font-bold select-none"
        to="/"
      >
        Bandoneon.app
        <span v-if="route.path === '/game'" class="ms-2 text-neutral-500 dark:text-neutral-400">
          Game
        </span>
      </RouterLink>
    </div>
    <button
      class="inline-flex h-12 w-12 touch-manipulation items-center justify-center rounded-lg select-none hover:bg-neutral-100 dark:hover:bg-neutral-800"
      type="button"
      :title="isDark ? 'Light mode' : 'Dark mode'"
      @click.prevent="isDark = !isDark"
    >
      <IconSun v-if="!isDark" class="h-6 w-6" />
      <IconMoon v-else class="h-6 w-6" />
    </button>
    <button
      class="inline-flex h-12 w-12 touch-manipulation items-center justify-center rounded-lg select-none hover:bg-neutral-100 aria-expanded:bg-neutral-900 aria-expanded:text-white dark:hover:bg-neutral-800 dark:aria-expanded:bg-white dark:aria-expanded:text-neutral-950"
      type="button"
      title="Settings"
      :aria-expanded="showMenu"
      @click.prevent="showMenu = !showMenu"
    >
      <IconBars3 class="h-6 w-6" />
    </button>
  </nav>

  <AppSettings v-if="showMenu" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useDark } from '../composables/useDark';
import AppSettings from './AppSettings.vue';
import IconBars3 from './icons/IconBars3.vue';
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';

const route = useRoute();
const showMenu = ref(false);

const { isDark } = useDark();

watch(
  () => route.path,
  () => (showMenu.value = false),
);
</script>
