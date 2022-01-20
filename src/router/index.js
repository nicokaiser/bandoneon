import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

export default new createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home,
        },
    ],
});
