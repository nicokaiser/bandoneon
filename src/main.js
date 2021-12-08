import { createApp } from 'vue'
import { sync } from 'vuex-router-sync'
import { store } from './store'
import { router } from './router';
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import App from './components/App.vue'

const app = createApp(App);

const i18n = createI18n({
  messages,
  locale: store.state.locale,
  fallbackLocale: 'en',
})

app.use(router);
app.use(store);
app.use(i18n);

sync(store, router)

app.mount('#app');
