import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";



const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: {name: 'Home'}
    },
    {
        path: '/404',
        name: 'Error404',
        component: () => import("../views/404.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login.vue")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/blog/add', // 注意放在 /blog/:blogId 之前
        name: 'BlogAdd',
        meta: {
            requireAuth: true
        },
        component: () => import("../views/BlogEdit.vue")
    },
    {
        path: '/blog/:blogId', // 注意放在 /blog/:blogId/edit 之前
        name: 'BlogDetail',
        component: () => import('../views/BlogDetail.vue')
    },
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        meta: {
            requireAuth: true
        },
        component: () => import("../views/BlogEdit.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    // history:createWebHashHistory(),
    routes
})

export default router