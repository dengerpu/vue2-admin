import { getUserInfo, login } from '@/api/user'
import { getItem, removeAll, setItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import router from '@/router'

const user = {
  // 全局state对象,用于保存所有组件的公共数据
  state: {
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || null
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
    login ({ commit }, userInfo) {
      // const remeberMe = userInfo.remeberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(res => {
          // 将token信息保存到localstorage中
          // setToken(res.data.token, remeberMe)
          setItem('token', res.data.token)
          // 将token存储到vueX中
          commit('SET_TOKEN', res.data.token)
          // 保存登陆时间
          setTimeStamp(Date.now())
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async getUserInfo ({ commit }) {
      const res = await getUserInfo()
      if (res && res.code === 200) {
        commit('SET_USERINFO', res.data)
        setItem('userInfo', JSON.stringify(res.data))
        return res
      }
    },
    // 退出登陆
    logout (context) {
      return new Promise((resolve, reject) => {
        context.commit('SET_TOKEN', '')
        context.commit('SET_USERINFO', null)
        removeAll()
        router.push('/login')
      })
    }
  }
}

export default user
