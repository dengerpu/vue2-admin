<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Link',
  props: {
    // 要跳转的链接地址
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 判断是否是外部链接
    isExternal () {
      return isExternal(this.to)
    },
    type () {
      // 如果是外部链接，就用a标签，不是外部标签就使用<router-link>
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps (to) {
      // 是外部链接添加属性  <a :href="to" target="_blank" rel="noopener"></a>
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 不是外部链接  <router-link :to="to"></router-link>
      return {
        to: to
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
