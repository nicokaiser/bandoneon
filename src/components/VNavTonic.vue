<template>
    <div class="mb-2 text-center d-print-none">
        <button
            v-for="item in notes"
            :key="item"
            :class="[
                'btn btn-outline-secondary mx-1 my-1',
                item === tonic ? 'active' : null,
            ]"
            style="width: 3.2em"
            @click.stop="toggleTonic(item)"
        >
            {{ noteName(item) }}
        </button>
    </div>
</template>

<script>
import { enharmonic } from '@tonaljs/note';
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['notes', 'showEnharmonics', 'tonic']),
    },

    methods: {
        noteName(name) {
            if (!this.showEnharmonics) return name.replace('#', '♯');

            if (name.length === 2 && name[1] === '#') {
                return enharmonic(name).replace('b', '♭');
            }

            return name;
        },

        toggleTonic(value) {
            if (value === this.tonic) {
                this.$store.commit('setTonic', null);
            } else {
                this.$store.commit('setTonic', value);
            }
        },
    },
};
</script>
