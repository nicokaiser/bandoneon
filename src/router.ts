import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Game from './pages/Game.vue';

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
