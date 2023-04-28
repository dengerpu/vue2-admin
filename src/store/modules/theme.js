import { getItem, setItem } from '@/utils/storage'
import { DEFAULT_THEME_COLOR } from '@/settings'
import variables from '@/styles/variables.scss'

export default {
  namespaced: true,
  state: {
    themeColor: getItem('themeColor') || DEFAULT_THEME_COLOR,
    variables
  },
  mutations: {
    SET_THEME_COLOR (state, color) {
      state.themeColor = color
      state.variables.menuBg = color
    }
  },
  actions: {
    setThemeColor ({ commit }, color) {
      setItem('themeColor', color)
      commit('SET_THEME_COLOR', color)
    }
  }
}
