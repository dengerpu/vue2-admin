// getters 监听state对象的值的最新状态（计算属性）
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  sidebar: state => state.app.sidebar
}
// 用上面简写的形式
// const getters = {
//   getToken(state) {
//     return state.user.token
//   }
// }
export default getters
