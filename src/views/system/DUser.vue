<template>
  <div class="d-user-container">
    <el-table :data="userData" border class="d-user-el-table">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column label="头像" align="center">
        <template  v-slot="scope">
          <el-image class="avatar" :src="scope.row.avatar"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="openTime">
        <template #default="{ row }">
          {{row.openTime | parseTime('{y}-{m}-{d}')}}
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="{ row }">
          <div v-if="row.role && row.role.length > 0">
            <el-tag v-for="(item, index) in row.role" :key="index">
              {{item.title}}
            </el-tag>
          </div>
          <div v-else>
            <el-tag>暂无角色</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="d-user-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'DUserList',
  components: {},
  props: {},
  data () {
    return {
      page: {
        pageSize: 5, // 每页的大小
        currentPage: 1 // 当前页数
      },
      userData: [
        {
          role: [
            {
              id: '1',
              title: '超级管理员'
            }
          ],
          _id: '612710a0ec87aa543c9c341d',
          id: '0',
          openTime: '1433088000000',
          username: 'super-admin',
          mobile: '188xxxx0001',
          avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80'
        },
        {
          role: [
            {
              id: '2',
              title: '管理员'
            }
          ],
          _id: '612710a0ec87aa543c9c341e',
          id: '1',
          username: 'admin',
          openTime: '1559318400000',
          mobile: '188xxxx0002',
          avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80'
        },
        {
          role: [
            {
              id: '2',
              title: '管理员'
            }
          ],
          _id: '612710a0ec87aa543c9c341e',
          id: '1',
          username: 'admin',
          openTime: '1559318400000',
          mobile: '188xxxx0002',
          avatar: 'https://robohash.org/3'
        },
        {
          role: [
            {
              id: '2',
              title: '管理员'
            }
          ],
          _id: '612710a0ec87aa543c9c341e',
          id: '1',
          username: 'admin',
          openTime: '1559318400000',
          mobile: '188xxxx0002',
          avatar: 'https://robohash.org/4'
        }
      ]
    }
  },
  methods: {
    handleSizeChange (newPageSize) {
      this.page.pageSize = newPageSize
    },
    handleCurrentChange (newCurrentPage) {
      this.page.currentPage = newCurrentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.d-user-container {
  .d-user-el-table {
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .d-user-pagination {
    padding: 10px 0;
  }
}
</style>
