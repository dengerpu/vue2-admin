<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from '@/utils/storage'
export default {
  name: 'app',
  // vuex数据持久化（也可以用插件vuex-persistedstate）stall
  mounted () {
    window.addEventListener('beforeunload', this.saveState)
    try {
      getItem('state') && this.$store.replaceState(Object.assign({}, this.$store.state, getItem('state')))
    } catch (err) {
      console.log(err)
    }
    removeItem('state')
  },
  methods: {
    saveState () {
      setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>
