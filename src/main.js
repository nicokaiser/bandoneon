import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import router from './router';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import App from '@/components/App.vue';

const i18n = createI18n({
    messages,
    locale: 'en',
    fallbackLocale: 'en',
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');
