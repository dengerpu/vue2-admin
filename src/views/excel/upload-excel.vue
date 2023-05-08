<template>
  <div class="upload-excel-container">
    <div class="upload-excel-head">
      <d-upload-excel :onSuccess="onSuccess" class="fl"></d-upload-excel>
    </div>
    <el-table :data="tableData" border class="upload-excel-table">
      <el-table-column
        v-for="item in tableDataHeader"
        :key="item"
        :prop="item"
        :label="item"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import DUploadExcel from '@/components/DUploadExcel/index.vue'
import { generateTableData } from '@/components/DUploadExcel/utils'

export default {
  name: 'UploadExcel',
  components: { DUploadExcel },
  props: {},
  data() {
    return {
      tableData: [],
      tableDataHeader: []
    }
  },
  methods: {
    onSuccess(excelData) {
      this.tableDataHeader = excelData.header
      this.tableData = excelData.results
      // 上传到服务器需要转换的数据集合
      console.log(generateTableData(excelData.results))
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel-container {
  .upload-excel-head {
    overflow: hidden;
  }
  .upload-excel-table {
    margin-top: 20px;
  }
}
</style>
