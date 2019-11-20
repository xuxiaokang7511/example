<template>
  <content-main
    title-height="48px"
    style="padding-left:16px;padding-right:16px;padding-bottom:10px;"
  >
    <template #title>
      <span style="font-size:14px;font-weight:bold;">角色列表</span>
    </template>
    <template #right>
      <router-link to="/role/create">
        <el-button size="mini" icon="el-icon-plus" style="margin-right:18px;">创建角色</el-button>
      </router-link>
    </template>
    <div style="padding-left:16px;padding-right:16px;padding-top:5px;">
      <el-table v-loading="listLoading" :data="rolesList" :header-row-style="{height:'55px'}">
        <el-table-column fixed align="left" label="#" width="60">
          <template slot-scope="scope">{{ scope.row.roleId }}</template>
        </el-table-column>
        <el-table-column align="left" label="角色名">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column align="left" label="是否超管" min-width="120">
          <template slot-scope="scope">{{ scope.row.roleStatus===1?'超级管理员':'普通管理员' }}</template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" min-width="165">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" min-width="165">
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="200">
          <template slot-scope="scope">
            <router-link :to="'/role/edit/'+scope.row.roleId" style="margin-right:15px;">
              <el-button size="small" icon="el-icon-edit">编辑</el-button>
            </router-link>
            <el-button
              :icon="scope.row.deleteStatus===1?'el-icon-check':'el-icon-close'"
              size="small"
              @click="handleDelete(scope)"
            >{{ scope.row.deleteStatus?'启用':'禁用' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </content-main>
</template>

<script>
export default {
  name: 'RolePermissionList',
  data() {
    return {
      listLoading: true,
      rolesList: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 每次进入路由执行
      vm.getRoles()
    })
  },
  created() {
    // this.getRoles()
  },
  methods: {
    async getRoles() {
      try {
        this.listLoading = true
        const res = await this.$store.dispatch('permission/getRoles')
        this.rolesList = res.data
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
        // this.$message.error(error.message)
      }
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      // this.role = clone(scope.row)
      this.$nextTick(() => {
        this.setArr(this.routes, this.role.permissions.map(item => item))
      })
    },
    handleDelete({ $index, row }) {
      //   if (row.deleteStatus) {
      //     // 启用角色
      //     this.$confirm('确认启用角色？', 'Warning', {
      //       confirmButtonText: '确认',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     })
      //       .then(async () => {
      //         try {
      //           const { msg, data } = await this.$store.dispatch(
      //             'permission/updateRole',
      //             {
      //               roleId: row.roleId,
      //               deleteStatus: 0
      //             }
      //           )
      //           this.$set(this.rolesList, $index, data)
      //           this.$message({
      //             type: 'success',
      //             message: msg
      //           })
      //         } catch (error) {
      //           // this.$message.error(error.message)
      //         }
      //       })
      //       .catch(err => {
      //         console.error(err)
      //       })
      //   } else {
      //     // 禁用角色
      //     this.$confirm('确认禁用角色？', 'Warning', {
      //       confirmButtonText: '确认',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     })
      //       .then(async () => {
      //         try {
      //           const { msg, data } = await this.$store.dispatch(
      //             'permission/updateRole',
      //             {
      //               roleId: row.roleId,
      //               deleteStatus: 1
      //             }
      //           )
      //           this.$set(this.rolesList, $index, data)
      //           this.$message({
      //             type: 'success',
      //             message: msg
      //           })
      //         } catch (error) {
      //           // this.$message.error(error.message)
      //         }
      //       })
      //       .catch(err => {
      //         console.error(err)
      //       })
      //   }

      const action = row.deleteStatus ? '禁用' : '启用'
      this.$confirm(`确认${action}『${row.roleName}』？`, 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            const { msg } = await this.$store.dispatch(
              'permission/updateRole',
              {
                roleId: row.roleId,
                deleteStatus: !row.deleteStatus
              }
            )
            this.getRoles()
            this.$message({
              type: 'success',
              message: msg
            })
          } catch (error) {
            // this.$message.error(error.message)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
