<script setup>
import { computed } from 'vue';
import { useStore } from '@/stores/main';
import { enharmonic } from '@tonaljs/note';

const store = useStore();
const notes = computed(() => store.allNotes);
const tonic = computed(() => store.tonic);

const format = (noteName) => {
    if (!store.showEnharmonics) {
        return noteName.replace('#', '♯');
    }

    if (noteName.length === 2 && noteName[1] === '#') {
        return enharmonic(noteName).replace('b', '♭');
    }

    return noteName;
};

const toggleTonic = (value) => {
    store.setTonic(value === store.tonic ? null : value);
};
</script>

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
                @click="toggleTonic(item)"
            >
                {{ format(item) }}
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
                @click="toggleTonic(item)"
            >
                {{ format(item) }}
            </button>
        </span>
    </div>
</template>
