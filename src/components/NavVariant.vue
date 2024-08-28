<template>
  <div class="mb-5 flex flex-wrap justify-center gap-x-24 print:hidden">
    <ButtonGroup class="mb-3">
      <Button
        v-for="value in ['left', 'right']"
        :key="value"
        :aria-pressed="side === value"
        class="w-28"
        @click="side = value === 'left' ? 'left' : 'right'"
      >
        {{ t(value) }}
      </Button>
    </ButtonGroup>
    <ButtonGroup class="mb-3">
      <Button
        v-for="value in ['close', 'open']"
        :key="value"
        :aria-pressed="direction === value"
        class="w-28"
        @click="direction = value === 'close' ? 'close' : 'open'"
      >
        {{ t(value) }}
      </Button>
    </ButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores/main';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';

defineProps<{ readonly?: boolean }>();

const { t } = useI18n();
const store = useStore();
const { side, direction } = storeToRefs(store);
</script>
