<template>
  <button
    class="rounded-md border border-neutral-400 px-3 py-2 text-sm font-semibold select-none hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-inherit aria-pressed:border-neutral-800 aria-pressed:bg-neutral-800 aria-pressed:text-white aria-pressed:hover:bg-neutral-700 dark:border-neutral-500 dark:hover:bg-neutral-700 dark:disabled:border-neutral-500 dark:disabled:text-neutral-600 dark:disabled:hover:bg-inherit dark:aria-pressed:border-neutral-200 dark:aria-pressed:bg-neutral-100 dark:aria-pressed:text-neutral-900 dark:aria-pressed:hover:bg-neutral-200"
  >
    <slot />
  </button>
</template>
