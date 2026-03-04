import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/los',
    },
    {
        path: '/los',
        name: 'LosSimulation',
        component: () => import('@modules/los/pages/LosSimulationPage.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
