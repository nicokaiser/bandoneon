<template>
  <path
    :stroke="stroke"
    :d="d"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="4"
    fill="none"
  />
</template>

<script setup lang="ts">
defineProps<{
  stroke: string;
  d: string;
}>();
</script>
