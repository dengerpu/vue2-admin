<template>
  <div class="d-icon-select-container">
    <el-input
      class="select-search"
      size="mini"
      suffix-icon="el-icon-search"
      v-model="searchInfo"
      @input.native="handelSearch"
      @clear="handelSearch"
      clearable
      placeholder="请输入图标名称"
    ></el-input>
    <div class="d-icons-list">
      <ul class="d-icons">
        <li
          class="d-icons-item"
          v-for="item in filterIcons"
          :key="item"
          @click="selectIcon(item)"
        >
          <IconItem :icon="item" :title="item"></IconItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import icons from './icons'
import IconItem from '@/components/IconItem'
export default {
  name: 'DIconSelect',
  components: { IconItem },
  props: {},
  data() {
    return {
      searchInfo: '',
      filterIcons: icons
    }
  },
  methods: {
    handelSearch() {
      this.filterIcons = icons
      if (this.searchInfo) {
        this.filterIcons = this.filterIcons.filter((item) => {
          return item.includes(this.searchInfo)
        })
      }
    },
    selectIcon(item) {
      this.$emit('selected', item)
      document.body.click()
    },
    reset() {
      this.searchInfo = ''
      this.filterIcons = icons
    }
  }
}
</script>

<style lang="scss" scoped>
.d-icon-select-container {
  width: 400px;
  height: 240px;
  .select-search {
    width: 100%;
    padding: 5px 0;
  }
  .d-icons-list {
    width: 400px;
    height: 200px;
    overflow-y: scroll;
    .d-icons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .d-icons-item {
        width: 120px;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        cursor: pointer;
      }
    }
  }
}
/*滚动条样式*/
div::-webkit-scrollbar {
  width: 10px;
}
div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  //-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
  background-color: rgba(144, 147, 153, 0.5);
}
div::-webkit-scrollbar-track {
  border-radius: 10px;
  //-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: rgba(144, 147, 153, 0.2);
}
</style>
<style lang="scss">
.d-icon-select-container {
  .icon-title {
    padding-left: 5px;
  }
}
</style>
