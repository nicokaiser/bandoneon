<template>
  <div
    class="flex-start flex h-3 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
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
