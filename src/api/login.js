import request from '@/utils/request.js'

/***
 * 登陆请求
 * @param username 用户名
 * @param password 密码
 * @param code 验证码
 * @param uuid
 * @returns {*}
 */
export function login (username, password, code, uuid) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}
