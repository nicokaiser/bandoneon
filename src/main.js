import Vue from 'vue'
import VueRouter from "vue-router"
import { sync } from 'vuex-router-sync'
import store from './store'
import App from './components/App.vue'
import VueI18n from 'vue-i18n'
import de from './i18n/de.json';
import en from './i18n/en.json';
import es from './i18n/es.json';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueI18n)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: "/:variant?",
    },
    {
      name: 'scale',
      path: "/:variant/scale/:tonic/:scaleType",
    },
    {
      name:'chord',
      path: "/:variant/chord/:tonic/:chordType",
    }
  ],
})

const i18n = new VueI18n({
  messages: { de, en, es },
  locale: store.state.language,
  fallbackLocale: 'en'
})

sync(store, router)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
