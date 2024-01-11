import { createRouter, createWebHistory } from 'vue-router'
import cookiePage from '@/components/cookiePage.vue';
import jeroen from '@/components/jeroenPage.vue';
import mainPage from '@/components/main.vue';
import baseGame from '@/components/baseGamePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: mainPage },
        { path: '/cookie', component: cookiePage },
        { path: '/jeroen', component: jeroen },
        { path: '/baseGame', component: baseGame }
    ]
})

export default router