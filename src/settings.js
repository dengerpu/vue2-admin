module.exports = {
  /**
   * @description 网站标题
   */
  zhTitle: '爱写bug的小邓程序员',
  enTitle: 'Vue-admin',
  /***
   * @description 网站logo
   */
  logo: 'https://blog-1300527744.cos-website.ap-chongqing.myqcloud.com/img/icon.png',
  /**
   * @description 是否显示 tagsView
   */
  tagsView: true,
  /**
   * @description 固定头部
   */
  fixedHeader: true,
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
   */
  passCookieExpires: 1,
  /**
   * @description token key
   */
  TokenKey: 'token',
  /**
   * token时间戳
   */
  TIME_STAMP: 'timeStamp',
  /**
   * token过期时间 2小时
   */
  TOKEN_TIMEOUT_VALUE: 200 * 3600 * 1000,
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,
  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,
  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,
  /**
   * 底部文字，支持html语法
   */
  footerTxt: '© 2018-2022',
  /**
   * 备案号
   */
  caseNumber: ''
}
