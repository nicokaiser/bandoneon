import { computed, onScopeDispose, ref, watchEffect } from 'vue';

export function useDark() {
  let mediaQuery: MediaQueryList | undefined;
  const preferredDark = ref(false);

  const handler = (event: MediaQueryListEvent) => {
    preferredDark.value = event.matches;
  };

  const cleanup = () => {
    if (!mediaQuery) return;
    mediaQuery.removeEventListener('change', handler);
  };

  const stopWatch = watchEffect(() => {
    const isSupported =
      window &&
      'matchMedia' in window &&
      typeof window.matchMedia === 'function';
    if (!isSupported) return;
    cleanup();
    mediaQuery = window!.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handler);
    preferredDark.value = mediaQuery.matches;
  });

  onScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = undefined;
  });

  const system = computed(() => (preferredDark.value ? 'dark' : 'light'));
  const mode = ref(localStorage.getItem('color-scheme') || 'auto');

  const isDark = computed<boolean>({
    get() {
      if (mode.value === 'auto') return system.value === 'dark';
      return mode.value === 'dark';
    },
    set(v) {
      const modeValue = v ? 'dark' : 'light';
      mode.value = system.value === modeValue ? 'auto' : modeValue;
      localStorage.setItem('color-scheme', mode.value);
    },
  });

  watchEffect(() => {
    const el = window?.document.querySelector('html');
    if (!el) return;
    const value = mode.value === 'auto' ? system.value : mode.value;
    for (const v of ['light', 'dark']) {
      if (value === v) {
        el.classList.add(v);
      } else {
        el.classList.remove(v);
      }
    }
  });

  return { isDark, mode, system };
}
