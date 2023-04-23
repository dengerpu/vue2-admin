import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index')
      },
      {
        path: 'error/401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'Page 401', noCache: true }
      },
      {
        path: 'error/404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'Page 404', noCache: true }
      },
      {
        path: 'documentation/index',
        component: () => import('@/views/document/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
