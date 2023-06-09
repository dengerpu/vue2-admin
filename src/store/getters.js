import { generateColors } from '@/utils/theme'
// getters 监听state对象的值的最新状态（计算属性）
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  themeColor: state => state.theme.themeColor,
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(state.theme.themeColor)
    }
  },
  tagsViewList: state => state.tagsView.tagsViewList
}
// 用上面简写的形式
// const getters = {
//   getToken(state) {
//     return state.user.token
//   }
// }
export default getters
