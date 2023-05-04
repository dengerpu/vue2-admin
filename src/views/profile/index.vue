<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <d-user-card></d-user-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Activity" name="activity">
            <d-user-activity author-img="https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80" author-name="Iron Man" article-from="Shared publicly" date="7:30 PM today">
              <p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>
            </d-user-activity>
            <d-user-activity author-img="https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80" author-name="Captain American" date="7:30 PM today">
              Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.
            </d-user-activity>
            <d-user-activity author-img="https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg?imageView2/1/w/80/h/80" author-name="Captain American" date="7:30 PM today">
              Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.
            </d-user-activity>
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="timeline">
            <d-time-line></d-time-line>
          </el-tab-pane>
          <el-tab-pane label="Account" name="account">
            <d-user-account></d-user-account>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import DUserCard from '@/views/profile/components/DUserCard'
import DUserActivity from '@/views/profile/components/DUserActivity'
import DTimeLine from '@/views/profile/components/DTimeLine'
import DUserAccount from '@/views/profile/components/DUserAccount'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  components: { DTimeLine, DUserActivity, DUserCard, DUserAccount },
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
