<template>
  <div :style="{ width: width, height: height }" class="d-profile-container">
    <div class="d-profile-info">
      <div class="d-profile-info-container">
        <slot></slot>
      </div>
    </div>
    <div
      :style="{ backgroundImage: `url(${img})` }"
      class="d-profile-img"
    ></div>
  </div>
</template>

<script>
import globalInfo from '@/settings'
export default {
  name: 'DProfile',
  components: {},
  props: {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    img: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      globalInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.d-profile-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  .d-profile-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    .d-profile-info-container {
      padding: 20px;
      text-align: center;
    }
  }
  .d-profile-img {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    background-image: url('https://blog-1300527744.cos-website.ap-chongqing.myqcloud.com/img/icon.png');
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}
.d-profile-container:hover {
  .d-profile-img {
    transform: rotate(-110deg);
  }
}
</style>
