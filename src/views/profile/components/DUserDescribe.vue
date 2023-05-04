<template>
  <div class="d-user-describe">
    <div class="d-user-describe-section">
      <div class="d-user-describe-section-header">
        <svg-icon :icon-class="icon"></svg-icon>
        <span>{{ title }}</span>
      </div>
      <div class="d-user-describe-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DUserDescribe',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.d-user-describe {
  .d-user-describe-section {
    font-size: 14px;
    padding: 15px 0;
    .d-user-describe-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 5px;
      margin-bottom: 10px;
      font-weight: bold;
      span {
        margin-left: 5px;
      }
    }
    .d-user-describe-content {
      padding: 5px 10px;
    }
  }
}
</style>
