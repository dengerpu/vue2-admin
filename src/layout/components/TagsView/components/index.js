import router from '@/router'
/**
 * 刷新当前tag标签
 */
export function refreshTag () {
  this.$router.go(0)
}
/**
 * 关闭当前tag标签
 */
export function closeTag (index, isActive = false) {
  this.$store.dispatch('tagsView/remove_tags', {
    type: 'index',
    index
  })
  const tag = this.$store.getters.tagsViewList[index]
  if (isActive) {
    toLastTag(this.$store.getters.tagsViewList, tag)
  }
}
/**
 * 关闭其他tags标签
 */
export function closeOtherTags (index) {
  this.$store.dispatch('tagsView/remove_tags', {
    type: 'other',
    index
  })
}
/**
 * 关闭所有tags标签
 */
export function closeAllTags (index) {
  this.$store.dispatch('tagsView/remove_tags', {
    type: 'all',
    index
  })
  const tag = this.$store.getters.tagsViewList[index]
  toLastTag(this.$store.getters.tagsViewList, tag)
}
/**
 * 关闭右侧tags
 */
export function closeRightTags (index) {
  this.$store.dispatch('tagsView/remove_tags', {
    type: 'right',
    index
  })
}

/**
 * 跳转到最后一个tag
 */
export function toLastTag (tagsList, tag) {
  const lastTag = tagsList.splice(-1)[0]
  if (lastTag) {
    router.push(lastTag.fullPath)
  } else {
    if (tag.name === 'Dashboard') {
      router.replace({ path: '/redirect' + tag.fullPath })
    } else {
      router.push('/')
    }
  }
}
