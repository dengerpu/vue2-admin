<template>
  <div class="d-dynamic-table-container">
    <el-card>
      固定顺序：
      <el-checkbox-group v-model="selectData" @change="handleCheckBoxChange">
        <el-checkbox
          v-for="item in checkboxData"
          :label="item"
          :key="item"
        ></el-checkbox>
      </el-checkbox-group>
      <el-table :data="tableData" border stripe>
        <el-table-column
          v-for="item in dynamicTableList"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
        ></el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top: 20px">
      按点击顺序：
      <el-checkbox-group v-model="selectData2" @change="handleCheckBoxChange2">
        <el-checkbox
          v-for="item in checkboxData"
          :label="item"
          :key="item"
        ></el-checkbox>
      </el-checkbox-group>
      <el-table :data="tableData" border stripe>
        <el-table-column
          v-for="item in dynamicTableList2"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  components: {},
  props: {},
  data() {
    return {
      selectData: [],
      selectData2: [],
      checkboxData: [],
      tableData: [
        {
          id: '1',
          ranking: 1,
          title: '标题1',
          author: '作者1',
          desc: '描述1'
        },
        {
          id: '2',
          ranking: 2,
          title: '标题2',
          author: '作者2',
          desc: '描述2'
        }
      ],
      defaultTableList: [
        {
          label: '排名',
          prop: 'ranking'
        },
        {
          label: '标题',
          prop: 'title'
        },
        {
          label: '作者',
          prop: 'author'
        },
        {
          label: '描述',
          prop: 'desc'
        }
      ],
      dynamicTableList: [],
      dynamicTableList2: []
    }
  },
  mounted() {
    this.checkboxData = this.defaultTableList.map((item) => item.label)
    this.selectData = this.checkboxData
    this.dynamicTableList = this.defaultTableList

    this.selectData2 = this.checkboxData
    this.dynamicTableList2 = this.defaultTableList
  },
  methods: {
    handleCheckBoxChange(val) {
      this.dynamicTableList = this.defaultTableList.filter((item) =>
        val.includes(item.label)
      )
    },
    handleCheckBoxChange2(val) {
      this.dynamicTableList2 = []
      val.forEach((item) => {
        this.dynamicTableList2.push(
          ...this.defaultTableList.filter((item2) => item2.label === item)
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
