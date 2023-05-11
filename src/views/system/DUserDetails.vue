<template>
  <div class="d-user-details-container">
    <!--操作 这里懒得写样式，用了el-descriptions-->
    <el-descriptions style="width: 1024px; margin: 0 auto" border>
      <template slot="extra">
        <el-button type="primary" v-print="printObj" size="small">
          打印
        </el-button>
      </template>
    </el-descriptions>
    <!--打印区域信息-->
    <div>
      <div id="printbox" class="d-user-details-box">
        <div class="d-user-details-title">用户信息</div>
        <div class="d-user-details-header">
          <!--头部信息-->
          <el-descriptions
            :column="2"
            class="d-user-details-header-left"
            border
          >
            <el-descriptions-item label="姓名">
              {{ userInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              {{ userInfo.gender }}
            </el-descriptions-item>
            <el-descriptions-item label="民族">
              {{ userInfo.nationality }}
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
              {{ userInfo.mobile }}
            </el-descriptions-item>
            <el-descriptions-item label="居住地">
              {{ userInfo.province }}
            </el-descriptions-item>
            <el-descriptions-item label="入职时间">
              {{ userInfo.nationality }}
            </el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">
              <div class="d-user-details-header-remark">
                <el-tag v-for="(item, index) in userInfo.remark" :key="index">
                  {{ item }}
                </el-tag>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="详细地址" :span="2">
              {{ userInfo.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!--头像-->
          <el-image
            class="d-user-details-header-avatar"
            :src="userInfo.avatar"
            :preview-src-list="[userInfo.avatar]"
          ></el-image>
        </div>
        <!--中间内容-->
        <div class="d-user-details-center">
          <el-descriptions border direction="vertical" :column="1">
            <el-descriptions-item label="教育/工作经历">
              <ul class="d-user-details-educator">
                <li v-for="(item, index) in userInfo.experience" :key="index">
                  <span
                    >{{ item.startTime | parseTime('{y}-{m}-{d}') }}
                    ---
                    {{ item.endTime | parseTime('{y}-{m}-{d}') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              {{ userInfo.major }}
            </el-descriptions-item>
            <el-descriptions-item label="荣誉">
              <ul class="d-user-details-center-glory">
                <li v-for="(item, index) in userInfo.glory" :key="index">
                  {{ item }}
                </li>
              </ul>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!--尾部信息-->
        <div class="d-user-details-footer">
          签字：___________日期:___________
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import print from 'vue-print-nb'
export default {
  name: 'DUserDetails',
  components: {},
  props: {},
  directives: {
    print
  },
  data() {
    return {
      printObj: {
        // 打印区域
        id: 'printbox',
        // 打印标题
        popTitle: '用户信息',
        beforeOpenCallback(vue) {
          console.log('打开之前')
        },
        openCallback(vue) {
          console.log(vue)
          console.log('执行了打印')
        },
        closeCallback(vue) {
          console.log('关闭了打印工具')
        }
      },
      userInfo: {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        remark: ['超级管理员', 'BOSS'],
        experience: [
          {
            startTime: '1538323200000',
            endTime: '1551369600000',
            title: '清华大学',
            desc: '研究生'
          },
          {
            startTime: '1614528000000',
            endTime: '1625068800000',
            title: '阿里巴巴',
            desc: '程序员'
          }
        ],
        openTime: '1433088000000',
        username: '爱写bug的小邓程序员',
        title: '超级管理员',
        mobile: '18888888888',
        avatar:
          'https://blog-1300527744.cos-website.ap-chongqing.myqcloud.com/img/icon.png',
        gender: '男',
        nationality: '汉',
        province: '重庆市',
        address: '重庆市南岸区江南水岸',
        major: '软件工程',
        glory: ['前端工程师', '全栈工程师']
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.d-user-details-container {
}
// https://github.com/Power-kxLee/vue-print-nb/issues/136
// 要打印的盒子，在sass语法中，要写在最外面
.d-user-details-box {
  width: 1024px;
  overflow: hidden;
  margin: 0 auto;
  .d-user-details-title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    padding: 5px 0;
  }
  // 头部信息
  .d-user-details-header {
    display: flex;
    .d-user-details-header-left {
      flex-grow: 1;
      .d-user-details-header-remark {
        .el-tag:nth-child(even) {
          margin: 0 10px;
        }
      }
    }
    .d-user-details-header-avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
  }
  // 中间信息
  .d-user-details-center {
    .d-user-details-educator {
      li span:nth-child(even) {
        margin: 0 10px;
      }
    }
    .d-user-details-center-glory {
      list-style: disc;
      padding-left: 20px;
      li {
        line-height: 25px;
      }
    }
  }
  // 尾部信息
  .d-user-details-footer {
    float: right;
    margin-top: 10px;
  }
}
</style>
