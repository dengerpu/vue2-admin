import { login } from '@/api/login.js'
import { getItem, setItem } from '@/utils/storage'

const user = {
  // 全局state对象,用于保存所有组件的公共数据
  state: {
    token: getItem('token')
  },
  // 唯——个可以修改state值的方法(同步执行)
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    // 未简化代码
    // Login (context, userInfo) {
    //   context.commit('SET_TOKEN',userInfo)
    // }
    // 这里统一使用解构赋值

    // 登陆
    Login ({ commit }, userInfo) {
      // const remeberMe = userInfo.remeberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(res => {
          // 将token信息保存到localstorage中
          // setToken(res.data.token, remeberMe)
          setItem('token', res.data.token)
          // 将token存储到vueX中
          commit('SET_TOKEN', res.data.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
