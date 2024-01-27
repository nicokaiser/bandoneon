<template>
  <div
    role="group"
    aria-orientation="horizontal"
    class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 h-10 flex items-center font-medium text-sm gap-1"
  >
    <button
      v-for="option of options"
      :key="option.value"
      :aria-checked="option.value === modelValue"
      :disabled="option.disabled"
      class="my-1 h-8 px-2 py-1 rounded-md text-neutral-500 aria-checked:text-inherit aria-checked:bg-white aria-checked:dark:bg-neutral-900 aria-checked:shadow-sm disabled:cursor-not-allowed disabled:opacity-75"
      @click.prevent="emit('update:modelValue', option.value)"
    >
      <slot name="item" :item="option">{{ option.label }}</slot>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    options: Array<{ label: string; value: string; disabled?: boolean }>;
    modelValue?: string;
  }>(),
  {
    options: () => [],
    modelValue: undefined,
  },
);

const emit = defineEmits(['update:modelValue']);
</script>
