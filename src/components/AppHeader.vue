<template>
  <header
    class="mx-auto flex h-16 max-w-screen-md items-center justify-between px-4"
  >
    <RouterLink :to="{ name: 'home' }" class="px-2 py-1 text-xl font-medium">
      Bandoneon.app
      <span v-if="route.name === 'game'" class="ms-2 text-neutral-400">
        Game
      </span>
    </RouterLink>

    <div class="inline-flex items-center gap-1">
      <!--
      <button class="p-2">
        <QuestionMarkCircleIcon class="h-5 w-5" />
      </button>
      -->

      <button type="button" class="p-2" title="Settings" @click="menu = !menu">
        <Bars3Icon class="h-5 w-5" />
      </button>
    </div>
  </header>

  <AppSettings v-if="menu" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppSettings from './AppSettings.vue';
import Bars3Icon from './icons/Bars3Icon.vue';
// import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon.vue';

const route = useRoute();
const menu = ref(false);

watch(
  () => route.path,
  () => (menu.value = false),
);
</script>
