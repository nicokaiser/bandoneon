<template>
    <ul class="nav nav-fill d-print-none">
        <li v-for="item in variants" :key="item" class="nav-item">
            <a
                :class="[
                    'nav-link',
                    variant === item ? 'active' : 'link-secondary',
                ]"
                href="#"
                @click.prevent="$store.commit('setVariant', item)"
            >
                {{ t(item) }}
            </a>
        </li>
    </ul>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            variant: 'variant',
            variants: 'variants',
        }),
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
