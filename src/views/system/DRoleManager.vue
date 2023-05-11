<template>
  <div class="d-role-list-container">
    <el-table :data="roleList" border>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="title" label="角色名称"></el-table-column>
      <el-table-column prop="describe" label="角色描述"></el-table-column>
      <el-table-column>
        <template>
          <el-button type="success" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DRoleList',
  components: {},
  props: {},
  data() {
    return {
      roleList: [
        {
          id: '1',
          title: '超级管理员',
          describe: '唯一账号，可以操作系统所有功能'
        },
        {
          id: '2',
          title: '管理员',
          describe: '由超管指定，可以为多个，协助超管管理系统'
        },
        {
          id: '3',
          title: '人事经理',
          describe: '主管人事相关业务'
        },
        {
          id: '4',
          title: '销售经理',
          describe: '主管销售相关业务'
        },
        {
          id: '5',
          title: '保安队长',
          describe: '主管安保相关业务'
        },
        {
          id: '6',
          title: '员工',
          describe: '普通员工'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
