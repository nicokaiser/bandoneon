import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';

export default new createRouter({
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
            name: '404',
            path: '/:pathMatch(.*)*',
            redirect: () => ({ name: 'home' }),
        },
    ],
});
