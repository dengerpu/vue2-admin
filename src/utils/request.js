import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index.js'
import { isCheckTimeout } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + requestURL
  timeout: 5000
})

const TOKEN = 'token'

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // token已经过期(主动处理)
      if (isCheckTimeout()) {
        store.dispatch('LOGOUT')
        return Promise.reject(new Error('token 失效，请重新登陆！'))
      }
      // 每次请求将token携带过去
      config.headers[TOKEN] = store.getters.token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 401 认证失败(token过期或失效或非法) 403 权限不足
      if (res.code === 401) {
        store.dispatch('LOGOUT')
      }
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
