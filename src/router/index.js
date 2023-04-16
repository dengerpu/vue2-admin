import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
