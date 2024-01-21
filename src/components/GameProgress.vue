<template>
  <div class="mt-8 flex w-full flex-col gap-4">
    <div
      class="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
    >
      <div
        class="flex h-full items-center justify-center overflow-hidden break-all bg-green-500"
        :style="`width: ${correct * 100}%`"
      ></div>
      <div
        class="flex h-full items-center justify-center overflow-hidden break-all bg-yellow-500"
        :style="`width: ${partial * 100}%`"
      ></div>

      <div
        class="flex h-full items-center justify-center overflow-hidden break-all bg-red-500"
        :style="`width: ${wrong * 100}%`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  correct: {
    type: Number,
    default: 0,
  },
  partial: {
    type: Number,
    default: 0,
  },
  wrong: {
    type: Number,
    default: 0,
  },
});
</script>
