<template>
    <div>
        <nav class="navbar navbar-light">
            <div class="container px-3 py-2">
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-brand me-auto mb-0 h1"
                >
                    Bandoneon.app
                </router-link>

                <button
                    class="navbar-toggler"
                    type="button"
                    @click.stop="toggleSettings"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

        <VCollapse ref="settingsCollapse">
            <VSettings />
        </VCollapse>
    </div>
</template>

<script>
import { ref } from 'vue';
import VCollapse from '@/components/VCollapse.vue';
import VSettings from '@/components/VSettings.vue';

export default {
    components: {
        VSettings,
        VCollapse,
    },

    setup() {
        const settingsCollapse = ref(null);

        return {
            settingsCollapse,
            toggleSettings: () => settingsCollapse.value.toggle(),
        };
    },
};
</script>
