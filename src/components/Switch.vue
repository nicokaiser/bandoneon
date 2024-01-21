<template>
  <div class="relative inline-flex items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      :checked="checked"
      :disabled="disabled"
    />
    <div
      class="peer h-8 w-[60px] rounded-full bg-neutral-800 after:absolute after:start-[4px] after:top-[3px] after:h-[26px] after:w-[26px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 dark:bg-neutral-100 dark:after:bg-neutral-800"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  checked: Boolean,
  disabled: Boolean,
});
</script>
