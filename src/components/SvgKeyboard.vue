<template>
  <svg
    ref="svg"
    class="keyboard mb-4"
    viewBox="0 0 690 410"
    width="720"
    height="428"
  >
    <slot />
  </svg>
</template>

<style scoped>
.keyboard {
  width: 100%;
  height: calc(100% / 720 * 428);
  max-height: calc(90vh - 5em);
}
</style>
