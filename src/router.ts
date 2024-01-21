import { createRouter, createWebHistory } from 'vue-router';
import Game from './pages/Game.vue';
import Home from './pages/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'game',
      path: '/game',
      component: Game,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home' }),
    },
  ],
});
