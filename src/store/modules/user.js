import { getUserInfo, login, logout } from '@/api/user'
import { getItem, removeAll, setItem } from '@/utils/storage'

const user = {
  // 全局state对象,用于保存所有组件的公共数据
  state: {
    token: getItem('token') || '',
    userInfo: null
  },
  // 唯——个可以修改state值的方法(同步执行)
  mutations: {
    // 保存token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 保存用户信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
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
    },
    // 获取用户信息
    async GET_USERINFO ({ commit }) {
      console.log('Action获取用户信息')
      const res = await getUserInfo()
      commit('SET_USERINFO', res.data)
      console.log(res)
      return res
    },
    // 退出登陆
    LOGOUT (context) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          context.commit('SET_TOKEN', '')
          context.commit('SET_USERINFO', null)
          removeAll()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
