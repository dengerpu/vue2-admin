<template>
  <ul class="context-menu-container">
    <li @click="refreshTag">{{this.$t('tagsView.refresh')}}</li>
    <li v-if="!isFixTag" @click="closeTag(index, isActive)">{{this.$t('tagsView.close')}}</li>
    <li v-if="!isFixTag" @click="closeRightTags(index)">{{this.$t('tagsView.closeRight')}}</li>
    <li @click="closeOtherTags(index)">{{this.$t('tagsView.closeOthers')}}</li>
    <li @click="closeAllTags(index)">{{this.$t('tagsView.closeAll')}}</li>
  </ul>
</template>

<script>
import { refreshTag, closeTag, closeRightTags, closeOtherTags, closeAllTags } from './index'

export default {
  name: 'ContextMenu',
  components: {},
  props: {
    index: {
      type: Number,
      required: true
    },
    isFixTag: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    refreshTag,
    closeTag,
    closeRightTags,
    closeOtherTags,
    closeAllTags
  }
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 9999;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
