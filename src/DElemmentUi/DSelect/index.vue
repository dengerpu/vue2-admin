<template>
  <div class="d-select-container" style="width: 100%">
    <el-select
      v-model="value"
      filterable
      :clearable="clearable"
      :remote-method="querySearch"
      :loading="loading"
      @change="getSelect"
      size="mini"
      style="width: 100%"
    >
      <el-option
        v-for="item in searchOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { query } from '@/api/common'
import { Message } from 'element-ui'
import Fuse from 'fuse.js'

export default {
  name: 'DSelect',
  components: {},
  model: {
    prop: 'select',
    event: 'input'
  },
  props: {
    select: {
      type: [String, Boolean, Number],
      require: true
    },
    queryMethod: {
      type: Function
    },
    dataSource: {
      type: Object,
      required: false
    },
    options: {
      type: Array
    },
    // 是否可以清空
    clearable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /***
     * 默认查询方法
     * @returns {default.methods.originalQueryMethod|Function}
     */
    defaultQueryData() {
      if (typeof this.queryMethod === 'function') {
        return this.queryMethod
      } else {
        return this.originalQueryMethod
      }
    },
    defaultOptions() {
      if (this.options !== null) {
        return this.options
      } else {
        return this.searchOptions
      }
    }
  },
  watch: {
    searchOptions() {
      this.initFuse(this.searchOptions)
    }
  },
  mounted() {
    this.defaultQueryData()
  },
  data() {
    return {
      searchOptions: [],
      loading: false,
      value: ''
    }
  },
  methods: {
    /**
     * 默认查询方法
     */
    originalQueryMethod() {
      this.loading = true
      query(this.dataSource).then((res) => {
        this.loading = false
        if (res?.code === 200) {
          this.searchOptions = res.data.rows
        } else {
          Message.error(res.message)
        }
      })
    },
    /***
     * 搜索
     */
    querySearch() {
      if (this.value !== '') {
        this.searchOptions = this.fuse.search(this.value)
      } else {
        this.searchOptions = []
      }
    },
    // 初始化Fuse
    initFuse(list) {
      this.fuse = new Fuse(list, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
          {
            name: 'label',
            weight: 0.7
          },
          {
            name: 'value',
            weight: 0.3
          }
        ]
      })
    },
    getSelect() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
