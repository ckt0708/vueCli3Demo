import Vue from 'vue'
import VueRouter from 'vue-router'
import authApi from '../auth'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
import Login from "../views/Login.vue"
import User from "../views/User.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
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
    // 拦截是否登录
    // beforeEnter:(to,from,next) => {
    //   if(authApi.isAuthenticated() === false){
    //     next("/login")
    //   }else{
    //     next();
    //   }
    // }
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
]

const router = new VueRouter({
  routes,
  // mode:"history",
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     from.name ? next({name: from.name}) : next('/');
//   } else {
//     next();
//   }

//   console.log("t0----------", to, "from2222", from,)
// })

export default router