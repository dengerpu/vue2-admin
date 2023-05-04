<template>
  <div class="d-user-activity-container">
    <div class="d-user-activity-header">
      <div class="d-user-activity-user-icon">
        <img :src="authorImg" alt="">
      </div>
      <div class="d-user-activity-info">
        <div class="d-user-activity-info-author">{{ authorName }}</div>
        <div class="d-user-activity-info-notes">
          <span class="d-user-activity-info-notes-from">{{ articleFrom }}</span>
          <span class="divider">-</span>
          <span class="d-user-activity-info-notes-time">{{ date }}</span>
        </div>
      </div>
    </div>
    <div class="d-user-activity-content">
      <slot/>
    </div>
    <div class="d-user-activity-footer">
      <ul class="d-user-activity-footer-info">
        <li>
          <span class="d-user-activity-footer-link">
            <i class="el-icon-map-location"></i>
            ChongQing
          </span>
        </li>
        <li>
          <span class="d-user-activity-footer-link">
            <i class="el-icon-share"></i>
            share
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DUserActivity',
  components: {},
  props: {
    authorImg: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      require: true
    },
    articleFrom: {
      type: String,
      default: '@爱写bug的小邓程序员'
    },
    date: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.d-user-activity-container {
  color: #666;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d2d6de;
  .d-user-activity-header {
    display: flex;
    .d-user-activity-user-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .d-user-activity-info-author {
      color: #000;
    }
    .d-user-activity-info {
      margin-left: 10px;
      .d-user-activity-info-notes {
        padding: 2px 0;
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
  .d-user-activity-content {
    padding: 10px 0;
    font-size: 14px;
  }
  .d-user-activity-footer {
    font-size: 14px;
    .d-user-activity-footer-info {
      padding: 5px 0;
      margin-bottom: 10px;
      display: flex;
      li:nth-child(even){
        padding: 0 10px;
      }
    }
  }
}
.divider {
  padding: 0 2px;
}
</style>
