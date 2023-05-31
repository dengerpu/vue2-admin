<template>
  <div class="export-excel-container">
    export-excel
    <el-table
      :data="routes"
      row-key="path"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="菜单名称" prop="meta.title"></el-table-column>
      <el-table-column label="菜单图标" prop="meta.icon"></el-table-column>
      <el-table-column label="菜单名称" prop="meta.title"></el-table-column>
      <el-table-column label="菜单角色" prop="meta.roles"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { constantRoutes, asyncRoutes } from '@/router'
export default {
  name: 'export-excel',
  components: {},
  props: {},
  data() {
    return {
      routes: [...constantRoutes, ...asyncRoutes]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
