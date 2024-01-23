import { onMounted, onUnmounted } from 'vue';
import { useStore } from '../stores/main';

export function useKeyboard() {
  const store = useStore();

  function setSideAndDirection(
    side: 'left' | 'right',
    direction: 'open' | 'close',
  ) {
    store.$patch({ side, direction });
  }

  function listener({ key }: { key: string }) {
    // Side and direction
    if (key === 'l') return setSideAndDirection('left', 'open');
    if (key === 'L') return setSideAndDirection('left', 'close');
    if (key === 'r') return setSideAndDirection('right', 'open');
    if (key === 'R') return setSideAndDirection('right', 'close');

    // Tonic
    if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(key)) {
      return store.setTonic(key.toUpperCase());
    }
    if (['C', 'D', 'F', 'G', 'A'].includes(key)) {
      return store.setTonic(key + '#');
    }

    // Chord
    if (key === 'M') return store.setChordType('M');
    if (key === 'm') return store.setChordType('m');
    if (key === '7') return store.setChordType('7');

    // Escape
    if (key === 'Escape') return store.setTonic(null);
  }

  onMounted(() => document.addEventListener('keydown', listener));
  onUnmounted(() => document.removeEventListener('keydown', listener));
}
