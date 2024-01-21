<template>
  <button
    :disabled="disabled"
    :class="{
      'rounded-md border px-3 py-1.5 font-medium': true,
      'border-neutral-800 bg-neutral-800 text-white hover:bg-neutral-700 dark:border-neutral-200 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200':
        active,
      'border-neutral-400 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700':
        !active && !disabled,
      'cursor-not-allowed border-neutral-400 text-neutral-300 dark:border-neutral-600 dark:text-neutral-600':
        disabled,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  active: Boolean,
  disabled: Boolean,
});
</script>
