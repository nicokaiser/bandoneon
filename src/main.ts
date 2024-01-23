import { createI18n } from 'petite-vue-i18n';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import de from './locales/de.json';
import en from './locales/en.json';
import router from './router';
import './style.css';

const i18n = createI18n({
  legacy: false,
  messages: { en, de },
  locale: 'en',
  fallbackLocale: 'en',
});

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean;
  }
}

const pinia = createPinia();
pinia.use(({ options, store }) => {
  if (!options.persist) return;

  const fromStorage = localStorage.getItem(store.$id);
  if (fromStorage) store.$patch(JSON.parse(fromStorage));

  store.$subscribe((_mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
