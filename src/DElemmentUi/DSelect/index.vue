<template>
  <div class="d-select-container">
    <el-select
      v-model="value"
      @change="getSelectValue"
      :remote-method="queryData"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'DSelect',
  components: {},
  props: {
    queryMethod: {
      type: Function
    }
  },
  computed: {
    defaultQueryData() {
      if (typeof this.queryMethod === 'function') {
        return this.queryMethod
      } else {
        return this.originalQueryMethod
      }
    }
  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    originalQueryMethod() {},

    /**
     * 获取选中的值
     */
    getSelectValue() {
      console.log(this.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
