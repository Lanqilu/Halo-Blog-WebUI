import {createRouter, createWebHistory} from 'vue-router'

import BlogCards from "../components/Blog/BlogCard.vue";
import IndexCarousel from "../components/Carousel/IndexCarousel.vue";
import LinkList from "../components/LinkList/LinkList.vue";
import BlogDetails from "../components/Blog/BlogDetails.vue";
import Layout from "../layout/index.vue";
import Tools from "../views/Tools.vue";
import Settings from "../views/Settings.vue";


const routes = [
    {
        path: '/',
        redirect: "/home",
        name: 'Layout',
        component: Layout,
        children: [
            /* 主页 */
            {
                path: 'home',
                components: {
                    indexCarousel: IndexCarousel,
                    blogCards: BlogCards,
                }
            },
            /* 链接导航页 */
            {
                path: 'nav',
                components: {
                    linkList: LinkList,
                }
            },
            /* 博客详情页 */
            {
                path: "/blog/:blogId",
                name: 'BlogDetail',
                components: {
                    blogDetails: BlogDetails,
                    blogContents: () => import("../components/Blog/BlogContents.vue")
                }
            },
            {
                path: "/tools",
                components: {Content: Tools}
            },
            /* 动态 */
            {
                path: "/trends",
                components: {
                    Content: () => import("../views/Trends")
                }
            },
        ]
    },
    /* 设置页 */
    {
        path: '/settings',
        redirect: '/settings/profile',
        component: Settings,
        children: [
            {
                path: 'profile',
                components: {
                    profile: () => import("../components/Setting/profile.vue")
                }
            },
            {
                path: 'account',
                components: {
                    account: () => import("../components/Setting/account.vue")
                }
            },
        ]
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
        path: "/test",
        name: "Test",
        component: () => import("../views/Test/Axios.vue")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Login.vue')
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
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        meta: {
            requireAuth: true
        },
        component: () => import("../views/BlogEdit.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    // history:createWebHashHistory(),
    routes
})

export default router