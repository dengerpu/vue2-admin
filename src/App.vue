<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
  // vuex数据持久化（也可以用插件vuex-persistedstate）stall
  // mounted () {
  //   window.addEventListener('beforeunload', this.saveState)
  //   try {
  //     sessionStorage.getItem('state') && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('state'))))
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   sessionStorage.removeItem('state')
  // },
  // methods: {
  //   saveState () {
  //     sessionStorage.setItem('state', JSON.stringify(this.$store.state))
  //   }
  // }
}
</script>
