<template>
  <div class="d-permission-manager-container">
    <el-table
      :data="permissions"
      border
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="permissionName" label="权限名称"></el-table-column>
      <el-table-column prop="permissionMark" label="权限标记"></el-table-column>
      <el-table-column prop="permissionDesc" label="权限描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DPermissionManager',
  components: {},
  props: {},
  data() {
    return {
      permissions: [
        {
          id: '1',
          permissionName: '员工管理',
          permissionMark: 'userManage',
          permissionDesc: '员工管理菜单',
          children: [
            {
              id: '1-1',
              permissionName: '分配角色',
              permissionMark: 'distributeRole',
              permissionDesc: '为员工分配角色',
              children: [
                {
                  id: '1-1-1',
                  permissionName: '新增',
                  permissionMark: 'add',
                  permissionDesc: '新增按钮'
                }
              ]
            },
            {
              id: '1-2',
              permissionName: '导入员工',
              permissionMark: 'importUser',
              permissionDesc: '通过 excel 导入员工'
            },
            {
              id: '1-3',
              permissionName: '删除员工',
              permissionMark: 'removeUser',
              permissionDesc: '删除员工'
            }
          ]
        },
        {
          id: '2',
          permissionName: '角色列表',
          permissionMark: 'roleList',
          permissionDesc: '角色列表菜单',
          children: [
            {
              id: '2-1',
              permissionName: '分配权限',
              permissionMark: 'distributePermission',
              permissionDesc: '为角色分配权限'
            }
          ]
        },
        {
          id: '3',
          permissionName: '权限列表',
          permissionMark: 'permissionList',
          permissionDesc: '权限列表菜单',
          children: []
        },
        {
          id: '4',
          permissionName: '文章排名',
          permissionMark: 'articleRanking',
          permissionDesc: '文章排名菜单',
          children: []
        },
        {
          id: '5',
          permissionName: '创建文章',
          permissionMark: 'articleCreate',
          permissionDesc: '创建文章页面',
          children: []
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
