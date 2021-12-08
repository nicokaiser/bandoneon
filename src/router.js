import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';

export const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/:variant?',
            component: App,
        },
        {
            name: 'scale',
            path: '/:variant/scale/:tonic/:scaleType',
            component: App,
        },
        {
            name: 'chord',
            path: '/:variant/chord/:tonic/:chordType',
            component: App,
        },
    ],
});
