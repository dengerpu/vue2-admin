<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <d-user-card></d-user-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Activity" name="activity">activity</el-tab-pane>
          <el-tab-pane label="Timeline" name="timeline">timeline</el-tab-pane>
          <el-tab-pane label="Account" name="account">account</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import DUserCard from '@/views/profile/components/DUserCard'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  components: { DUserCard },
  props: {},
  data () {
    return {
      activeTab: 'activity'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
