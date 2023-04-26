import { getItem, setItem } from '@/utils/storage'

const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  language: getItem('lang') || 'zh'
}

const mutations = {
  /**
   * 设置菜单栏切换
   * @param state
   * @constructor
   */
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
  },
  /**
   * 设置国际化
   * @param state
   * @param lang
   * @constructor
   */
  SET_LANGUAGE: (state, lang) => {
    setItem('lang', lang)
    state.language = lang
  }
}

const actions = {
  /**
   * 菜单栏切换
   * @param commit
   */
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  /**
   * 语言国家化切换
   * @param commit
   * @param lang
   */
  setLanguage ({ commit }, lang) {
    commit('SET_LANGUAGE', lang)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
