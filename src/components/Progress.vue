<template>
  <div
    class="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
  >
    <div
      v-for="(value, i) of values"
      :key="i"
      class="flex h-full overflow-hidden"
      :style="`width: ${value.value * 100}%; background-color: ${value.color}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  values: Array<{ label?: string; value: number; color?: string }>;
}>();
</script>
