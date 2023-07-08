<template>
  <div class="d-table-container">
    <div class="d-table-query-container">
      <slot name="query"></slot>
    </div>
    <div class="d-table-options-container">
      <el-form>
        <el-form-item>
          <slot name="add"></slot>
          <el-button
            v-if="!$slots.add"
            type="primary"
            :size="size"
            icon="el-icon-plus"
            >新增</el-button
          >
        </el-form-item>
        <el-form-item>
          <slot name="see"></slot>
          <el-button
            v-if="!$slots.see"
            type="success"
            :style="{
              backgroundColor: '#13ce66',
              borderColor: '#13ce66'
            }"
            :size="size"
            icon="el-icon-view"
            >查看</el-button
          >
        </el-form-item>
        <el-form-item>
          <slot name="edit"></slot>
          <el-button
            v-if="!$slots.edit"
            type="success"
            :size="size"
            icon="el-icon-edit"
            >修改</el-button
          >
        </el-form-item>
        <el-form-item>
          <slot name="del"></slot>
          <el-button
            v-if="!$slots.del"
            type="danger"
            :size="size"
            icon="el-icon-delete"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <slot name="export"></slot>
          <el-button
            v-if="!$slots.export"
            type="warning"
            :size="size"
            icon="el-icon-download"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
      <slot name="button"></slot>
    </div>
    <el-table
      :data="defaultTableData"
      :stripe="stripe"
      :highlight-current-row="isRadio"
      :size="size"
      @current-change="handleTableCurrentChange"
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
      <slot name="table"></slot>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-table-pagination-container">
      <div
        class="d-table-pagination"
        :class="['d-table-pagination-' + pagePosition]"
      >
        <slot name="pagination"></slot>
        <el-pagination
          v-if="!$slots.pagination"
          @size-change="handleSizeChange"
          @current-change="handlePageCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { query } from '@/api/common'
import { Message } from 'element-ui'
const position = ['left', 'center', 'right']
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
    },
    pagePosition: {
      type: String,
      validator: (value) => position.includes(value),
      default: 'center'
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
    },
    __dataSource__() {
      const source = this.dataSource
      source.table.page = this.page.currentPage
      source.table.size = this.page.pageSize
      return source
    }
  },
  data() {
    return {
      // 默认查询方法返回的数据
      queryTableData: [],
      // 当前行数据
      currenRow: null,
      // 总共多少条数据
      total: 0,
      page: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.defaultQueryTableData()
  },
  methods: {
    // 默认查询方法
    originalQueryDataMethod() {
      query(this.__dataSource__).then((res) => {
        if (res?.code === 200) {
          this.queryTableData = res.data.rows
          this.total = res.data.count
        } else {
          Message.error(res.message)
        }
      })
    },
    // 点击表格行事件
    handleTableCurrentChange(currentRow) {
      this.currenRow = currentRow
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.defaultQueryTableData()
    },
    handlePageCurrentChange(val) {
      this.page.currentPage = val
      this.defaultQueryTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.d-table-container {
  .d-table-options-container {
    .el-form {
      display: flex;
      .el-form-item {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .d-table-pagination-container {
    margin: 5px 0;
  }
  .d-table-pagination-center {
    display: flex;
    justify-content: center;
  }
  .d-table-pagination-left {
    float: left;
  }
  .d-table-pagination-right {
    float: right;
  }
}
</style>
