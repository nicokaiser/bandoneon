import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export function useKeyboardNavigation() {
    const store = useStore();

    function setSideAndDirection(side, direction) {
        store.commit('setSide', side);
        store.commit('setDirection', direction);
    }

    function listener({ key }) {
        if (key === 'l') return setSideAndDirection('left', 'open');
        if (key === 'L') return setSideAndDirection('left', 'close');
        if (key === 'r') return setSideAndDirection('right', 'open');
        if (key === 'R') return setSideAndDirection('right', 'close');

        if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
            return store.commit('setTonic', key.toUpperCase());
        }

        if (key === '#') {
            const tonic = store.state.tonic;
            if (tonic && tonic.length === 1) {
                return store.commit('setTonic', tonic + '#');
            }
        }

        if (key === 'M') return store.commit('setChordType', 'M');
        if (key === 'm') return store.commit('setChordType', 'm');
        if (key === '7') return store.commit('setChordType', '7');
    }

    onMounted(() => document.addEventListener('keydown', listener));
    onUnmounted(() => document.removeEventListener('keydown', listener));
}
