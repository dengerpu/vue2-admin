<template>
  <div>
    <d-upload-excel :onSuccess="onSuccess"></d-upload-excel>
    <el-table :data="tableData" border class="d-upload-excel-table">
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
.d-upload-excel-table {
  margin-top: 20px;
}
</style>
