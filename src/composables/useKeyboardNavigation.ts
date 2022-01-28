import { onMounted, onUnmounted } from 'vue';
import { useStore } from '../stores/main';

export function useKeyboardNavigation() {
  const store = useStore();

  function setSideAndDirection(side: string, direction: string) {
    store.$patch({ side, direction });
  }

  function listener({ key }: { key: string }) {
    if (key === 'l') return setSideAndDirection('left', 'open');
    if (key === 'L') return setSideAndDirection('left', 'close');
    if (key === 'r') return setSideAndDirection('right', 'open');
    if (key === 'R') return setSideAndDirection('right', 'close');

    if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
      return store.setTonic(key.toUpperCase());
    }

    if (key === '#') {
      const tonic = store.tonic;
      if (tonic && tonic.length === 1) {
        return store.setTonic(tonic + '#');
      }
    }

    if (key === 'M') return store.setChordType('M');
    if (key === 'm') return store.setChordType('m');
    if (key === '7') return store.setChordType('7');

    if (key === 'Escape') return store.setTonic(null);
  }

  onMounted(() => document.addEventListener('keydown', listener));
  onUnmounted(() => document.removeEventListener('keydown', listener));
}
