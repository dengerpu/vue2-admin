import request from '@/utils/request'

/***
 * 登陆请求
 * @param username 用户名
 * @param password 密码
 * @param code 验证码
 * @param uuid
 * @returns {*}
 */
export function login (username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

/**
 * 退出登陆(退出登陆时不需要调用接口)
 * @returns {*}
 */
export function logout () {
  return request({
    url: '/logout'
  })
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo () {
  return request({
    url: '/sys/user'
  })
}
