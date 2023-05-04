<template>
  <div class="d-user-describe">
    <div class="d-user-describe-section">
      <div class="d-user-describe-section-header">
        <i :class="icon" v-if="isElIcon(icon)"></i>
        <svg-icon :icon-class="icon" v-else></svg-icon>
        <span class="d-user-describe-header-title">{{ title }}</span>
        <span v-if="info" class="fr d-user-describe-header-info">{{info}}</span>
      </div>
      <div class="d-user-describe-content">
        <slot></slot>
        <div v-if="!info" style="height: 15px"></div>
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
    },
    info: {
      type: String
    }
  },
  methods: {
    isElIcon (icon) {
      if (icon.includes('el-icon')) return true
      else return false
    }
  }
}
</script>

<style lang="scss" scoped>
.d-user-describe {
  .d-user-describe-section {
    font-size: 14px;
    //padding: 15px 0;
    .d-user-describe-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 5px;
      margin-bottom: 10px;
      span {
        margin-left: 5px;
      }
      .d-user-describe-header-title {
        font-weight: bold;
      }
      .d-user-describe-header-info {
        color: #666;
      }
    }
    .d-user-describe-content {
      padding: 5px 10px;
    }
  }
}
</style>
