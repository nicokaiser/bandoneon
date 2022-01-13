import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import App from '@/components/App.vue';

sync(store, router);

const i18n = createI18n({
    messages,
    locale: store.state.locale,
    fallbackLocale: 'en',
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');
