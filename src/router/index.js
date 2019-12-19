import Vue from 'vue'
import VueRouter from 'vue-router'
import authApi from '../auth'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
import Login from "../views/Login.vue"
import User from "../views/User.vue"


Vue.use(VueRouter)

/**
 *  => 按需加载 
 *  component: (resolve) => {
        require(['../views/User.vue'], resolve)
    },
 *  @param {boolean} keepAlive [是否缓存页面]
 *  @param {boolean} requireAuth [ 是否需要登录才能进入的页面]
 */

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            keepAlive: true,
            requireAuth: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            requireAuth: true
        },
    },
    {
        path: '/user',
        name: 'user',
        component: (resolve) => {
            require(['../views/User.vue'], resolve)
        },
        meta: {
            requireAuth: true
        },
    },
]

const router = new VueRouter({
    routes,
    // mode:"history",
})


// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    // 判断是否需要登录权限
    if (to.matched.some(res => res.meta.requireAuth)) {
        // 判断是否登录
        if (localStorage.getItem('ifLogin')) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router