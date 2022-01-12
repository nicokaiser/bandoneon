export default {
    data: () => ({
        keydownListener: null,
    }),

    mounted() {
        this.keydownListener = ({ key }) => {
            if (key === 'l')
                return this.$store.commit('setVariant', 'left-open');
            if (key === 'L')
                return this.$store.commit('setVariant', 'left-close');
            if (key === 'r')
                return this.$store.commit('setVariant', 'right-open');
            if (key === 'R')
                return this.$store.commit('setVariant', 'right-close');

            if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
                return this.$store.commit('setTonic', key.toUpperCase());
            }

            if (key === '#') {
                const { tonic } = this.$store.state;
                if (tonic && tonic.length === 1) {
                    this.$store.commit('setTonic', tonic + '#');
                }
            }

            if (key === 'M') return this.$store.commit('setChordType', 'M');
            if (key === 'm') return this.$store.commit('setChordType', 'm');
            if (key === '7') return this.$store.commit('setChordType', '7');
        };

        document.addEventListener('keydown', this.keydownListener);
    },

    unmounted() {
        if (this.keydownListener) {
            document.removeEventListener('keydown', this.keydownListener);
        }
    },
};
