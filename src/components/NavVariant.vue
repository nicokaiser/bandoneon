<template>
  <div class="mb-4 flex flex-wrap justify-center gap-x-24 print:hidden">
    <label
      :class="{
        'mb-3 inline-flex cursor-pointer items-center text-neutral-500': true,
        'cursor-not-allowed': readonly,
      }"
    >
      <span
        :class="{
          'me-3 w-24 select-none text-end': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            store.side === 'left',
        }"
      >
        {{ t('left') }}
      </span>
      <Switch
        :checked="store.side === 'right'"
        :disabled="readonly"
        @change="onSideChange"
      />
      <span
        :class="{
          'ms-3 w-24 select-none text-start': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            store.side === 'right',
        }"
      >
        {{ t('right') }}
      </span>
    </label>

    <label
      :class="{
        'mb-3 inline-flex cursor-pointer items-center text-neutral-500': true,
        'cursor-not-allowed': readonly,
      }"
    >
      <span
        :class="{
          'me-3 w-24 select-none text-end': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            store.direction === 'close',
        }"
      >
        {{ t('close') }}
      </span>
      <Switch
        :checked="store.direction === 'open'"
        :disabled="readonly"
        @change="onDirectionChange"
      />
      <span
        :class="{
          'ms-3 w-24 select-none text-start': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            store.direction === 'open',
        }"
      >
        {{ t('open') }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/main';
import { useI18n } from 'vue-i18n';
import Switch from './Switch.vue';

const props = defineProps({
  readonly: Boolean,
});

const store = useStore();
const { t } = useI18n();

const onSideChange = (event: Event) => {
  if (props.readonly) return;
  const checked = (event.target as HTMLInputElement).checked;
  store.side = checked ? 'right' : 'left';
};

const onDirectionChange = (event: Event) => {
  if (props.readonly) return;
  const checked = (event.target as HTMLInputElement).checked;
  store.direction = checked ? 'open' : 'close';
};
</script>
