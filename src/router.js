import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';

export const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: App,
        },
    ],
});
