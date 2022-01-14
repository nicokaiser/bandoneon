<template>
    <div ref="collapse" class="collapse">
        <slot />
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import Collapse from 'bootstrap/js/src/collapse';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const collapse = ref(null);
        let bsCollapse;

        onMounted(() => {
            bsCollapse = new Collapse(collapse.value, {
                toggle: props.visible,
            });
        });

        onUnmounted(() => {
            bsCollapse.dispose();
        });

        return {
            collapse,

            show: () => bsCollapse.show(),
            hide: () => bsCollapse.hide(),
            toggle: () => bsCollapse.toggle(),
        };
    },
};
</script>
