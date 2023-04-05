import Cookies from 'js-cookie'
import Config from 'src/settings'

const TokenKey = Config.TokenKey

/**
 * 获取token
 * @returns {*}
 */
export function getToken () {
  return Cookies.get(TokenKey)
}

/**
 * 存储token信息
 * @param token
 * @param rememberMe
 * @returns {*}
 */
export function setToken (token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else {
    return Cookies.set(TokenKey, token)
  }
}

/**
 * 移除token
 * @returns {*}
 */
export function removeToken () {
  return Cookies.remove(TokenKey)
}
