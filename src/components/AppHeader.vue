<template>
  <header>
    <nav class="mx-auto flex min-h-16 w-full items-center p-2">
      <div class="flex-1">
        <RouterLink
          class="btn-ghost inline-flex min-h-12 select-none flex-wrap items-center justify-center rounded-lg px-4 text-xl font-semibold [@media(hover:hover)]:hover:bg-neutral-100 [@media(hover:hover)]:hover:dark:bg-neutral-800"
          to="/"
        >
          Bandoneon.app
          <span
            v-if="route.path === '/game'"
            class="ms-2 text-neutral-500 dark:text-neutral-400"
          >
            Game
          </span>
        </RouterLink>
      </div>
      <div class="flex-none">
        <button
          class="inline-flex h-12 w-12 select-none flex-wrap items-center justify-center rounded-lg font-semibold [@media(hover:hover)]:hover:bg-neutral-100 [@media(hover:hover)]:hover:dark:bg-neutral-800"
          @click.prevent="isDark = !isDark"
        >
          <IconSun v-if="!isDark" class="h-5 w-5" />
          <IconMoon v-else class="h-5 w-5" />
        </button>

        <button
          class="inline-flex h-12 w-12 select-none flex-wrap items-center justify-center rounded-lg font-semibold [@media(hover:hover)]:hover:bg-neutral-100 [@media(hover:hover)]:hover:dark:bg-neutral-800"
          type="button"
          title="Settings"
          @click.prevent="menu = !menu"
        >
          <IconBars3 class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <AppSettings v-if="menu" />
  </header>
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
