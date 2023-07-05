<template>
  <div class="d-table-container">
    <div class="d-table-options-container">
      <el-button type="primary" :size="size" icon="el-icon-plus"
        >新增</el-button
      >
      <el-button type="success" :size="size" icon="el-icon-edit"
        >修改</el-button
      >
      <el-button type="danger" :size="size" icon="el-icon-delete"
        >删除</el-button
      >
      <el-button type="warning" :size="size" icon="el-icon-download"
        >导出</el-button
      >
    </div>
    <el-table
      :data="defaultTableData"
      :stripe="stripe"
      :highlight-current-row="isRadio"
      :size="size"
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <template v-if="dataProps && dataProps.length > 0">
        <el-table-column
          v-for="item in dataProps"
          :prop="item.value"
          :label="item.label"
          :key="item.label"
        >
          <template v-slot="scope" v-if="item.dic">
            {{ item.dic[scope.row[item.value]] }}
          </template>
        </el-table-column>
      </template>
      <slot></slot>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { query } from '@/api/common'
import { Message } from 'element-ui'

export default {
  name: 'DTable',
  components: {},
  props: {
    // 查找表格数据方法(不是必传，如果不传，则使用dataSource作为查询条件来查询)
    queryMethod: {
      type: Function
    },
    // 数据源，如果不指定需要自己传递data，或者传递queryMethod查找方法，并且把tableData传递过来
    dataSource: {
      type: Object,
      required: false
    },
    // 表格数据
    tableData: {
      type: Array
    },
    // 表格字段对应关系
    dataProps: {
      type: Array
    },
    // 表格以及按钮大小
    size: {
      type: String,
      default: 'mini'
    },
    // 隔行变色
    stripe: {
      type: Boolean,
      default: true
    },
    // 是否是单选
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /**
     * 表格数据
     * @returns {[]|*[]}
     */
    defaultTableData() {
      if (this.tableData && this.tableData != null) {
        return this.tableData
      } else {
        return this.queryTableData
      }
    },
    /***
     * 表格数据查询方法
     */
    defaultQueryTableData() {
      if (typeof this.queryMethod === 'function') {
        return this.queryMethod
      } else {
        return this.originalQueryDataMethod
      }
    }
  },
  data() {
    return {
      queryTableData: []
    }
  },
  mounted() {
    this.defaultQueryTableData()
  },
  methods: {
    // 默认查询方法
    originalQueryDataMethod() {
      query(this.dataSource).then((res) => {
        if (res?.code === 200) {
          this.queryTableData = res.data.rows
          console.log(this.queryTableData)
        } else {
          Message.error(res.message)
        }
      })
    },
    handleCurrentChange(currentRow, oldCurrentRow, index) {
      console.log(currentRow, oldCurrentRow, index)
    }
  }
}
</script>

<style lang="scss" scoped></style>
