import { getItem, setItem } from '@/utils/storage'
import { DEFAULT_THEME_COLOR } from '@/settings'

export default {
  namespaced: true,
  state: {
    themeColor: getItem('themeColor') || DEFAULT_THEME_COLOR
  },
  mutations: {
    SET_THEME_COLOR (state, color) {
      state.themeColor = color
    }
  },
  actions: {
    setThemeColor ({ commit }, color) {
      setItem('themeColor', color)
      commit('SET_THEME_COLOR', color)
    }
  }
}
