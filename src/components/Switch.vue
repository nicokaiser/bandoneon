<template>
  <div class="relative inline-flex items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      :checked="checked"
      :disabled="disabled"
    />
    <div
      class="peer h-8 w-[60px] rounded-full border border-neutral-300 after:absolute after:start-[4px] after:top-[3px] after:h-[26px] after:w-[26px] after:rounded-full after:bg-neutral-800 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 dark:after:bg-neutral-100"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  checked: Boolean,
  disabled: Boolean,
});
</script>
