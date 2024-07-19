import { createHead } from '@unhead/vue';
import { createI18n } from 'petite-vue-i18n';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import App from './App.vue';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import './style.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const i18n = createI18n({
  legacy: false,
  messages: { en, de, es },
  locale: 'en',
  fallbackLocale: 'en',
});

const pinia = createPinia();
const head = createHead();

const app = createApp(App);
app.use(pinia);
app.use(head);
app.use(router);
app.use(i18n);
app.mount('#app');
