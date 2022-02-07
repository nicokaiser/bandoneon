import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import GameView from './views/GameView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    {
      name: 'game',
      path: '/game',
      component: GameView,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home' }),
    },
  ],
});
