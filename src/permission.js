import router from './router/index'
import store from './store/index'

// 白名单
const whiteList = ['/login']

// 路由前置导航守卫
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  // 存在token,进入主页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 不存在token的情况，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
