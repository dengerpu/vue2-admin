<template>
  <div class="d-user-account-container">
    <el-form :model="userInfo" ref="userInfoForm" label-width="80px" size="mini" :rules="userInfoRules">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="userInfo.nickName"></el-input>
        <span>用户昵称不作为登录使用</span>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
        <span>手机号码不能重复</span>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button size="mini" style="margin-left: 50px" type="primary">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DUserAccount',
  components: {},
  computed: {
    userInfoRules () {
      const checkPhone = (rule, value, callback) => {
        const pattern = /^1[3-9][0-9]{9}$/
        if (!pattern.test(value)) {
          callback(new Error('手机号不合法'))
        } else {
          callback()
        }
      }
      const rules = {
        nickName: [
          { required: true, message: '', trigger: 'blur' },
          { min: 2, max: 15, message: '昵称长度在 2 到 15个字段', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
      return rules
    }
  },
  props: {},
  data () {
    return {
      userInfo: {
        nickName: this.$store.getters.userInfo.nickName || '',
        phone: this.$store.getters.userInfo.phone || '',
        gender: this.$store.getters.userInfo.gender || ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.d-user-account-container {
  span {
    color: rgb(192, 192, 192);
    margin-left: 15px;
  }
}
</style>

<style lang="scss">
.d-user-account-container {
  .el-input {
    width: 30%;
  }
}
</style>
