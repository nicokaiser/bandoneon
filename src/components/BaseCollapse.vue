<template>
    <div ref="collapse" class="collapse">
        <slot />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Collapse } from 'bootstrap';

const collapse = ref(null);
let bsCollapse;

onMounted(() => {
    bsCollapse = new Collapse(collapse.value, { toggle: false });
});

onUnmounted(() => {
    bsCollapse.dispose();
});

const show = () => bsCollapse.sho();
const hide = () => bsCollapse.hide();
const toggle = () => bsCollapse.toggle();

defineExpose({ show, hide, toggle });
</script>
