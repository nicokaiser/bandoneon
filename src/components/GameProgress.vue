<template>
  <div class="progress mt-4">
    <div
      class="progress-bar bg-success"
      role="progressbar"
      :style="`width: ${correct * 100}%`"
    ></div>
    <div
      class="progress-bar bg-warning"
      role="progressbar"
      :style="`width: ${partial * 100}%`"
    ></div>
    <div
      class="progress-bar bg-danger"
      role="progressbar"
      :style="`width: ${wrong * 100}%`"
    ></div>
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
