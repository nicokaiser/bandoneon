import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import { sync } from 'vuex-router-sync'
import { store } from './store'
import { createI18n } from 'vue-i18n'
import App from './components/App.vue'
import de from './i18n/de.json'
import en from './i18n/en.json'
import es from './i18n/es.json'

const app = createApp(App);

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: "/:variant?",
      component: App,
    },
    {
      name: 'scale',
      path: "/:variant/scale/:tonic/:scaleType",
      component: App,
    },
    {
      name:'chord',
      path: "/:variant/chord/:tonic/:chordType",
      component: App,
    },
  ],
})

const i18n = createI18n({
  messages: { de, en, es },
  locale: store.state.language,
  fallbackLocale: 'en',
})

app.use(router);
app.use(store);
app.use(i18n);

sync(store, router)

app.mount('#app');

// import VueLocalStorage from 'vue-localstorage'
