<template>
  <button
    class="select-none rounded-md border border-neutral-400 px-3 py-2 text-sm font-semibold hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-inherit aria-pressed:border-neutral-800 aria-pressed:bg-neutral-800 aria-pressed:text-white aria-pressed:hover:bg-neutral-700 dark:border-neutral-500 dark:hover:bg-neutral-700 disabled:dark:border-neutral-500 disabled:dark:text-neutral-600 disabled:dark:hover:bg-inherit aria-pressed:dark:border-neutral-200 aria-pressed:dark:bg-neutral-100 aria-pressed:dark:text-neutral-900 aria-pressed:dark:hover:bg-neutral-200"
  >
    <slot />
  </button>
</template>
