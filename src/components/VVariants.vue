<template>
    <ul class="nav nav-fill d-print-none">
        <li v-for="variant in variants" :key="variant" class="nav-item">
            <a
                :class="[
                    'nav-link',
                    currentVariant === variant ? 'active' : 'link-secondary',
                ]"
                href="#"
                @click.prevent="setVariant(variant)"
            >
                {{ t(variant) }}
            </a>
        </li>
    </ul>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

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

<style scoped>
.nav {
    border-bottom: 1px solid #dee2e6;
}

.nav .nav-link {
    border-bottom: 1px solid transparent;
    margin-bottom: -1px;
}

.nav .nav-link.active {
    border-bottom: 3px solid #0d6efd;
    margin-bottom: -1px;
}
</style>
