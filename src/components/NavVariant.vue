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
          'font-medium text-neutral-800 dark:text-neutral-100': side === 'left',
        }"
      >
        {{ t('left') }}
      </span>
      <Switch
        :checked="side === 'right'"
        :disabled="readonly"
        @change="onSideChange"
      />
      <span
        :class="{
          'ms-3 w-24 select-none text-start': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            side === 'right',
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
            direction === 'close',
        }"
      >
        {{ t('close') }}
      </span>
      <Switch
        :checked="direction === 'open'"
        :disabled="readonly"
        @change="onDirectionChange"
      />
      <span
        :class="{
          'ms-3 w-24 select-none text-start': true,
          'font-medium text-neutral-800 dark:text-neutral-100':
            direction === 'open',
        }"
      >
        {{ t('open') }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { useStore } from '../stores/main';
import Switch from './Switch.vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
  readonly: Boolean,
});

const { t } = useI18n();
const store = useStore();
const { side, direction } = storeToRefs(store);

const onSideChange = (event: Event) => {
  if (props.readonly) return;
  const checked = (event.target as HTMLInputElement).checked;
  side.value = checked ? 'right' : 'left';
};

const onDirectionChange = (event: Event) => {
  if (props.readonly) return;
  const checked = (event.target as HTMLInputElement).checked;
  direction.value = checked ? 'open' : 'close';
};
</script>
