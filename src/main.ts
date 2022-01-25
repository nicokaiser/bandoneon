import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import router from './router';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import App from './App.vue';

const i18n = createI18n({
    messages,
    locale: 'en',
    fallbackLocale: 'en',
});

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        persist?: boolean;
    }
}

const pinia = createPinia();
pinia.use(({ options, store }) => {
    if (!options.persist) return;

    const fromStorage = localStorage.getItem(store.$id);
    if (fromStorage) store.$patch(JSON.parse(fromStorage));

    store.$subscribe((mutation, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state));
    });
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
