import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        name: 'books',
        path: '/',
        component: () => import('../views/Books.vue'),
    },
    {
        name: 'progress',
        path: '/progress',
        component: () => import('../views/Progress.vue'),
    },
    {
        name: 'settings',
        path: '/settings',
        component: () => import('../views/Settings.vue'),
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('../views/About.vue'),
    },
    {
        name: 'recite',
        path: '/editor/:index',
        component: () => import('../views/Recite.vue')
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router