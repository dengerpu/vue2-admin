<template>
  <div class="d-upload-excel-container">
    <div
      class="d-upload-excel-box"
      @click="handleUpload"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="d-upload-excel-icon el-icon-upload"></i>
      <span class="d-upload-excel-text">
        将文件拖到此处，或
        <el-button type="text" :loading="loading">点击上传</el-button>
      </span>
    </div>
    <input
      ref="d-excel-upload-input"
      class="d-excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="inputHandleChange"
    />
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from '@/components/DUploadExcel/utils'
import { Message } from 'element-ui'

export default {
  name: 'DUploadExcel',
  components: {},
  props: {
    beforeUpload: {
      type: Function,
      required: false
    },
    onSuccess: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    /***
     * 点击上传按钮或者组件，触发上传
     */
    handleUpload() {
      // 点击上传按钮后，触发隐藏域input的点击事件
      this.$refs['d-excel-upload-input'].click()
    },
    inputHandleChange(e) {
      const files = e.target.files
      const uploadFile = files[0]
      if (!uploadFile) {
        Message.error('文件上传失败')
        return null
      }
      this.upload(uploadFile)
    },
    upload(file) {
      this.$refs['d-excel-upload-input'].value = null
      // 如果没用指定上传前的回调函数，直接读取数据
      if (!this.beforeUpload) {
        this.readExcelData(file)
      }
      // 如果指定了上传前回调函数，那么只有返回 true 才会执行后续操作
      if (this.beforeUpload) {
        this.readExcelData(file)
      }
    },
    /**
     * 读取excel中的数据（异步）
     * @param file
     */
    readExcelData(file) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        // 读取操作完成时触发
        fileReader.onload = (e) => {
          // 1. 获取解析到的数据
          const data = e.target.result
          // 2. 利用 XLSX 对数据进行解析
          const workbook = XLSX.read(data, { type: 'array' })
          // 3. 获取第一张表格(工作簿)名称
          const firstSheetName = workbook.SheetNames[0]
          // 4. 只读取 Sheet1（第一张表格）的数据
          const worksheet = workbook.Sheets[firstSheetName]
          // 5. 解析数据表头
          const header = getHeaderRow(worksheet)
          // 6. 解析数据体
          const results = XLSX.utils.sheet_to_json(worksheet)
          // 7. 传入解析之后的数据
          this.generateData({ header, results })
          // 8. loading 处理
          this.loading = false
          // 9. 异步完成
          resolve()
        }
        // 启动读取指定的 Blob 或 File 内容
        fileReader.readAsArrayBuffer(file)
      })
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    /**
     * 拖拽文本释放时触发
     */
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      // 正在上传
      if (this.loading) return null
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        Message.warning('您还没有上传文件')
        return null
      }
      const file = files[0]
      if (!isExcel(file)) {
        Message.error('文件必须是 .xlsx, .xls, .csv 格式')
        return null
      }
      // 触发上传事件
      this.upload(file)
      e.stopPropagation()
      e.preventDefault()
    },
    /**
     * 拖拽悬停时触发
     * @param e
     */
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      // 在新位置生成源项的副本
      e.dataTransfer.dropEffect = 'copy'
    }
  }
}
</script>

<style lang="scss" scoped>
.d-upload-excel-container {
  .d-upload-excel-box {
    border: 1px dashed #bbb;
    width: 400px;
    height: 100px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .d-upload-excel-icon {
      display: block;
      font-size: 60px;
    }
    .d-upload-excel-text {
      display: block;
      em {
        font-style: normal;
        color: #409eff;
      }
    }
  }
  .d-upload-excel-box:hover {
    border: 1px dashed #409eff;
    cursor: pointer;
  }
  .d-excel-upload-input {
    display: none;
  }
}
</style>
