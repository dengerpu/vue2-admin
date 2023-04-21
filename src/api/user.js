import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo () {
  return request({
    url: '/sys/user'
  })
}
