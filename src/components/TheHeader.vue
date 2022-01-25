<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseCollapse from '@/components/BaseCollapse.vue';
import TheSettings from '@/components/TheSettings.vue';

const route = useRoute();
const collapse = ref(null);
const toggle = () => collapse.value.toggle();

watch(
  () => route.path,
  () => collapse.value.hide()
);
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container px-3 py-2">
      <router-link :to="{ name: 'home' }" class="navbar-brand me-auto mb-0 h1">
        Bandoneon.app
        <span v-if="route.name === 'game'" class="ms-2 text-muted"> Game </span>
      </router-link>

      <button class="navbar-toggler" type="button" @click="toggle">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <BaseCollapse ref="collapse">
    <TheSettings />
  </BaseCollapse>
</template>

<style scoped>
.navbar-toggler {
  border: 0;
  padding: 0;
  margin: 0.25em 0;
}
</style>
