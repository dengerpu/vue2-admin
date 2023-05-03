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
    ADD_TAGS (state, tag) {
      // 判断tag是否已经存在
      const isExist = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isExist) {
        state.tagsViewList.push(tag)
        setItem('tagsViews', state.tagsViewList)
      }
    },
    /**
     * 移除tags
     * @param state
     * @param params {type: "index" || "right" || "other", || "all", index: number}
     * @constructor
     *  splice(删除/替换/插入) 删除元素：第一个参数：从这个索引开始删除
     *  第二个参数：传入要删除几个元素（如果没有传，就删除后面所有元素）
     */
    REMOVE_TAGS (state, params) {
      if (params.type === 'index') {
        state.tagsViewList.splice(params.index, 1)
      } else if (params.type === 'other') {
        const path = state.tagsViewList[params.index].path
        state.tagsViewList = state.tagsViewList.filter(tag => {
          return tag.meta.affix || tag.path === path
        })
      } else if (params.type === 'right') {
        state.tagsViewList.splice(params.index + 1)
      } else if (params.type === 'all') {
        const affixTags = state.tagsViewList.filter(tag => tag.meta.affix)
        state.tagsViewList = affixTags
      }
      setItem('tagsViews', state.tagsViewList)
    }
  },
  actions: {
    /**
     * 添加tag
     * @param commit
     * @param tag
     */
    add_tags ({ commit }, tag) {
      commit('ADD_TAGS', tag)
    },
    /***
     * 删除tags
     * @param commit
     * @param params
     */
    remove_tags ({ commit }, params) {
      commit('REMOVE_TAGS', params)
    }
  }
}
