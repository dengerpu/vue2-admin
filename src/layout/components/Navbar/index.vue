<template>
  <div class="navbar-container">
    <hamburger
      id="guide-hamburger"
      @toggleClick="toggleSideBar"
      class="fl"
    ></hamburger>
    <Breadcrumb id="guide-breadcrumb" class="fl"></Breadcrumb>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  components: { Hamburger, Breadcrumb },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  align-items: center;
  .hamburger-container {
    width: 20px;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
