<template>
  <div class="d-excel-export-to-excel-container">
    <el-dialog
      title="导出excel"
      width="30%"
      :visible="excelDialog"
      @close="handleCancel"
    >
      <el-form label-width="80px">
        <el-form-item label="文件名:">
          <el-input placeholder="请输入文件名" v-model="filename"></el-input>
        </el-form-item>
        <el-form-item label="文件格式:">
          <el-select v-model="filetype" placeholder="请选择文件格式">
            <el-option
              v-for="item in filetypes"
              :label="item"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { USER_RELATIONS, formatJson } from '@/components/DExportToExcel/utils'
export default {
  name: 'DExportToExcel',
  components: {},
  props: {
    excelDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    excelData: {
      type: Array
    }
  },
  data() {
    return {
      filename: '用户表',
      filetype: 'xlsx',
      filetypes: ['xlsx', 'csv', 'txt']
    }
  },
  methods: {
    handleCancel() {
      this.$emit('closeExcelDialog')
      this.filename = '用户表'
      this.filetype = 'xlsx'
    },
    async handleConfirm() {
      const data = formatJson(USER_RELATIONS, this.excelData)
      const excel = await import('./Export2Excel')
      excel.export_json_to_excel({
        // excel表头
        header: Object.keys(USER_RELATIONS),
        // excel数据（二维数组结构）
        data,
        // 文件名称
        filename: this.filename || '表格',
        // 是否自动列宽
        autoWidth: true,
        // 文件类型
        bookType: this.filetype || 'xlsx'
      })
      this.$emit('closeExcelDialog')
      this.filename = '用户表'
      this.filetype = 'xlsx'
    }
  }
}
</script>

<style lang="scss" scoped>
.d-excel-export-to-excel-container {
}
</style>
