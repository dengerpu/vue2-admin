<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon-class="icon"></svg-icon>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Hamburger',
  components: {},
  props: {},
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    icon () {
      return this.$store.getters.sidebar.opened ? 'hamburger-opened' : 'hamburger-closed'
    }
  },
  data () {
    return {}
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  cursor: pointer;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
