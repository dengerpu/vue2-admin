<template>
  <el-card class="d-user-card-container">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <!--用户信息-->
    <div class="d-user-card-profile">
      <div class="d-box-center">
        <d-profile :img="this.$store.getters.userInfo.avatarPath">
          <div>Hello</div>
          {{this.$store.getters.userInfo.nickName}}
        </d-profile>
      </div>
      <div class="d-user-info">
        <div class="d-user-name center">{{this.$store.getters.userInfo.username}}</div>
        <div class="d-user-role center">{{this.$store.getters.userInfo.nickName}}</div>
      </div>
    </div>

    <!--用户描述-->
    <d-user-describe icon="education" title="Education">
      <span>Chongqing University of Posts and Telecommunications</span>
    </d-user-describe>
    <d-user-describe icon="skill" title="Skills">
      <div class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="70" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="18" />
      </div>
      <div class="progress-item">
        <span>Css</span>
        <el-progress :percentage="12" />
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success" />
      </div>
    </d-user-describe>
  </el-card>
</template>

<script>
import globalInfo from '@/settings.js'
import DProfile from '@/components/DProfile'
import DUserDescribe from '@/views/profile/components/DUserDescribe'
export default {
  name: 'DUserCard',
  components: { DUserDescribe, DProfile },
  props: {},
  data () {
    return {
      globalInfo
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.d-user-card-container {
  .d-box-center {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .d-user-card-profile {
    .d-user-info {
      padding-top: 20px;
      .d-user-name {
        font-weight: bold;
      }
      .d-user-role {
        padding-top: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #777;
      }
    }
  }

}
.center {
  text-align: center;
}
</style>
