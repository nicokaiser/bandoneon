<template>
    <ul class="nav nav-tabs nav-fill d-print-none">
        <li v-for="variant in variants" :key="variant" class="nav-item">
            <a
                v-t="variant"
                :class="[
                    'nav-link',
                    currentVariant === variant ? 'active' : null,
                ]"
                href="#"
                @click.prevent="setVariant(variant)"
            />
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            variants: 'variants',
        }),

        ...mapGetters(['currentVariant']),
    },

    methods: {
        setVariant(variant) {
            if (this.currentVariant === variant) return;

            this.$router.push({
                name: this.$route.name,
                params: { ...this.$route.params, ...{ variant } },
            });
        },
    },
};
</script>
