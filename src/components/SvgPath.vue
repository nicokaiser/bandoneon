<template>
  <path
    :stroke="stroke"
    :d="d"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="3"
    fill="none"
  />
</template>

<script setup lang="ts">
defineProps<{
  stroke: string;
  d: string;
}>();
</script>
