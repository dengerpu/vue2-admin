<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="route-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
.app-main {
  padding: 20px;
}
.route-transform-leave-active,
.route-transform-enter-active {
  transition: all 0.5s;
}

.route-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
