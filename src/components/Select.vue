<template>
  <div class="relative">
    <select
      :id="id"
      class="relative block w-full appearance-none rounded-md border-0 bg-white p-2.5 pe-9 text-sm ring-1 ring-inset ring-neutral-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75 dark:bg-neutral-900 dark:ring-neutral-600"
      @input="onInput"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.name }}
      </option>
    </select>

    <span
      class="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2.5"
    >
      <span
        class="h-5 w-5 text-neutral-400 dark:text-neutral-500"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    default: null,
  },
  options: {
    type: Object,
    default: () => {},
  },
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value);
</script>
