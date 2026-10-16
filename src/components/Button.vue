<template>
  <button
    class="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg bg-neutral-100 px-3 text-base font-semibold select-none hover:bg-neutral-200 active:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-neutral-100 in-[.segmented]:bg-transparent in-[.segmented]:disabled:hover:bg-transparent aria-pressed:bg-neutral-900 aria-pressed:text-white aria-pressed:hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:disabled:hover:bg-neutral-800 dark:aria-pressed:bg-white dark:aria-pressed:text-neutral-950 dark:aria-pressed:hover:bg-neutral-200"
  >
    <slot />
  </button>
</template>
