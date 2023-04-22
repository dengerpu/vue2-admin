import router from './router/index'
import store from './store/index'

// 白名单
const whiteList = ['/login']

// 路由前置导航守卫
router.beforeEach(async (to, from, next) => {
  console.log(store.getters.token)
  // 存在token,进入主页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      console.log('存在token', store.getters.userInfo)
      console.log(!store.getters.userInfo)
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.userInfo) {
        // 触发获取用户信息的Action
        await store.dispatch('GET_USERINFO')
      }
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
