<template>
  <div class="mb-5 flex flex-wrap justify-center gap-x-24 print:hidden">
    <Tabs
      v-model="side"
      class="mb-3"
      :options="[
        { label: t('left'), value: 'left', disabled: readonly },
        { label: t('right'), value: 'right', disabled: readonly },
      ]"
    >
      <template #item="{ item }">
        <div class="w-24">{{ item.label }}</div>
      </template>
    </Tabs>
    <Tabs
      v-model="direction"
      class="mb-3"
      :options="[
        { label: t('close'), value: 'close', disabled: readonly },
        { label: t('open'), value: 'open', disabled: readonly },
      ]"
    >
      <template #item="{ item }">
        <div class="w-24">{{ item.label }}</div>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores/main';
import Tabs from './Tabs.vue';

defineProps<{ readonly?: boolean }>();

const { t } = useI18n();
const store = useStore();
const { side, direction } = storeToRefs(store);
</script>
