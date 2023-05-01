import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    tagsViewList: getItem('tagsViews') || []
  },
  mutations: {
    /**
     * 添加tag
     * @param state
     * @param tag
     * @constructor
     */
    ADD_TAGS_VIEWList (state, tag) {
      // 判断tag是否已经存在
      const isExist = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isExist) {
        state.tagsViewList.push(tag)
        setItem('tagsViews', state.tagsViewList)
      }
    }
  },
  actions: {
    /**
     * 添加tag
     * @param commit
     * @param tag
     */
    add_tagsViewsList ({ commit }, tag) {
      commit('ADD_TAGS_VIEWList', tag)
    }
  }
}
