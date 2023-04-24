<template>
  <div class="navbar-container">
    <hamburger @toggleClick="toggleSideBar"></hamburger>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  components: { Hamburger },
  props: {},
  data () {
    return {}
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  .hamburger-container{
    width: 20px;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
