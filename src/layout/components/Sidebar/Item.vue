<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MenuItem',
  functional: true,
  props: {
    // 菜单图标
    icon: {
      type: String,
      default: ''
    },
    // 菜单名称
    title: {
      type: String,
      default: ''
    }
  },
  render(createElement, context) {
    const { icon, title } = context.props
    const vNodes = []
    if (icon) {
      // 如果菜单图标是element-ui自带的，采用i标签渲染
      if (icon.includes('el-icon')) {
        vNodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 如果是svg图标，采用自定义组件来展示
        vNodes.push(<svg-icon icon-class={icon} />)
      }
    }
    if (title) {
      vNodes.push(<span slot="title">{title}</span>)
    }
    return vNodes
  }
}
</script>
<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
