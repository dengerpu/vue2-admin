import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index.js'
import { getToken } from '@/utils/auth.js'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + requestURL
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // TODO 这里是用store.getters.token 还是 getToken()
    if (store.getters.token) {
      // 每次请求将token携带过去
      config.headers.Authorization = getToken()
    }
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
