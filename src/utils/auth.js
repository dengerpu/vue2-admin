import Cookies from 'js-cookie'
import Config from '@/settings.js'
import { setItem, getItem } from '@/utils/storage'

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

/***
 * 获取时间戳
 * @returns {string|*}
 */
export function getItemStamp () {
  return getItem(Config.TIME_STAMP)
}

/***
 * 设置时间戳
 */
export function setTimeStamp () {
  setItem(Config.TIME_STAMP, Date.now())
}

/**
 * 判断token是否过期
 */
export function isCheckTimeout () {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getItemStamp()
  return currentTime - timeStamp > Config.TOKEN_TIMEOUT_VALUE
}
