<template>
  <path
    :stroke="stroke"
    :d="d"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-opacity="0.7"
    stroke-width="3px"
    fill="none"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    stroke: string;
    d: string;
  }>(),
  {},
);
</script>
