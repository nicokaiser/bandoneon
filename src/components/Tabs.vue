<template>
  <div
    class="flex h-10 items-center gap-1 rounded-lg bg-neutral-100 p-1 text-sm font-medium dark:bg-neutral-800"
    role="group"
    aria-orientation="horizontal"
  >
    <button
      v-for="option of options"
      :key="option.value"
      class="my-1 h-8 select-none rounded-md px-2 py-1 text-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 aria-checked:bg-white aria-checked:text-inherit aria-checked:shadow-sm aria-checked:dark:bg-neutral-900"
      :aria-checked="option.value === modelValue"
      :disabled="option.disabled"
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
