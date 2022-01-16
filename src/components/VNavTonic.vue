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
                {{ formatNote(item) }}
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
                {{ formatNote(item) }}
            </button>
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { enharmonic } from '@tonaljs/note';

const store = useStore();

const notes = computed(() => store.state.notes);

const tonic = computed(() => store.state.tonic);

const formatNote = (name) => {
    if (!store.state.showEnharmonics) return name.replace('#', '♯');
    if (name.length === 2 && name[1] === '#') {
        return enharmonic(name).replace('b', '♭');
    }
    return name;
};

const toggleTonic = (value) => {
    if (value === store.state.tonic) {
        store.commit('setTonic', null);
    } else {
        store.commit('setTonic', value);
    }
};
</script>
