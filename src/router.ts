import { createRouter, createWebHistory } from 'vue-router';
import game from './pages/game.vue';
import index from './pages/index.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/game',
      component: game,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => '/',
    },
  ],
});
