<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Collapse } from 'bootstrap';

const collapse = ref();
let bsCollapse: Collapse;

onMounted(() => {
  bsCollapse = new Collapse(collapse.value, { toggle: false });
});

onUnmounted(() => bsCollapse.dispose());

const show = () => bsCollapse.show();
const hide = () => bsCollapse.hide();
const toggle = () => bsCollapse.toggle();

defineExpose({ show, hide, toggle });
</script>

<template>
  <div ref="collapse" class="collapse">
    <slot />
  </div>
</template>
