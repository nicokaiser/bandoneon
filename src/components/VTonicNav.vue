<template>
    <div class="mb-2 text-center d-print-none">
        <span class="d-inline-block text-nowrap">
            <button
                v-for="item in notes.slice(0, 6)"
                :key="item"
                :class="[
                    'btn btn-outline-secondary mx-1 my-1',
                    item === tonic ? 'active' : null,
                ]"
                style="width: 3em"
                @click.stop="toggleTonic(item)"
            >
                {{ noteName(item) }}
            </button>
        </span>

        <span class="d-inline-block text-nowrap">
            <button
                v-for="item in notes.slice(6)"
                :key="item"
                :class="[
                    'btn btn-outline-secondary mx-1 my-1',
                    item === tonic ? 'active' : null,
                ]"
                style="width: 3em"
                @click.stop="toggleTonic(item)"
            >
                {{ noteName(item) }}
            </button>
        </span>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { enharmonic } from '@tonaljs/note';

export default {
    setup() {
        const store = useStore();

        return {
            notes: computed(() => store.state.notes),
            showEnharmonics: computed(() => store.state.showEnharmonics),
            tonic: computed(() => store.state.tonic),

            noteName: (name) => {
                if (!store.state.showEnharmonics) return name.replace('#', '♯');

                if (name.length === 2 && name[1] === '#') {
                    return enharmonic(name).replace('b', '♭');
                }

                return name;
            },

            toggleTonic: (value) => {
                if (value === store.state.tonic) {
                    store.commit('setTonic', null);
                } else {
                    store.commit('setTonic', value);
                }
            },
        };
    },
};
</script>
