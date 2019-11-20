<template>
  <content-main
    title-height="48px"
    show-foot
    style="padding-left:16px;padding-right:16px;padding-bottom:10px;"
  >
    <template #title>
      <span style="font-size:14px;font-weight:bold;">{{ isEdit?"编辑角色":"创建角色" }}</span>
    </template>
    <template #right>
      <el-button
        v-loading="loading"
        style="margin-right:18px;"
        size="mini"
        :icon="!isEdit?'el-icon-plus':'el-icon-edit'"
        @click="confirmRole"
      >{{ !isEdit?'确定':'保存' }}</el-button>
    </template>
    <div style="padding-left:16px;padding-right:16px;padding-top:10px;">
      <el-form ref="role" :model="role" :rules="roleRules" label-width="80px" label-position="left">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" placeholder="角色名称" maxlength="10" style="width:300px;" />
        </el-form-item>
        <el-form-item label="拥有权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            style="margin-top:8px;width:300px;"
          ></el-tree>
        </el-form-item>
      </el-form>
    </div>
  </content-main>
</template>

<script>
const defaultRole = {
  roleId: '',
  roleName: '',
  createTime: '',
  updateTime: '',
  permissions: [],
  deleteStatus: 1
}

export default {
  name: 'RoleDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      listLoading: true,
      role: Object.assign({}, defaultRole),
      roleRules: {
        roleName: [
          {
            required: true,
            message: '请输入角色称',
            trigger: ['blur', 'change']
          }
        ]
      },
      menuList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMenus()
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        if (id && this.$route.name === 'EditRolePermission') {
          this.getRole(id, this.$route)
        }
      } else {
        this.listLoading = false
        this.role = Object.assign({}, defaultRole)
      }
    },
    async getRole(id, currentRoute) {
      try {
        this.listLoading = true
        const { data } = await this.$store.dispatch('permission/getRole', id)
        this.role = data
        // 默认数据
        // this.role.permissions = [1, 2, 3, 4, 6, 8, 9, 10, 11, 5]
        this.setArr(this.role.menuList)
        this.listLoading = false
        const title = `${(this.$store.getters.menuObj[this.$route.name] &&
          this.$store.getters.menuObj[this.$route.name].label) ||
          '编辑角色'}-${id}`
        // set tagsview + page title
        this.setRouteTitle(title, currentRoute)
      } catch (error) {
        this.listLoading = false
      }
    },
    async getMenus() {
      try {
        const res = await this.$store.dispatch('permission/getMenus')
        this.menuList = res.data
      } catch (error) {
        // this.$message.error(error.message)
      }
    },
    // 获取选中的权限
    getArr() {
      const arr = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ]
      return arr
    },
    // 清除选中
    clearArr() {
      this.$refs.tree.setCheckedKeys([])
    },
    // 设置选中的
    setArr(arr) {
      arr = arr.filter(key => {
        return this.$refs.tree.getNode(key).isLeaf
      })
      this.$refs.tree.setCheckedKeys(arr)
    },
    confirmRole() {
      this.$refs.role.validate(valid => {
        if (valid) {
          this.loading = true
          this.submitRole()
        } else {
          return false
        }
      })
    },
    async submitRole() {
      const list = this.getArr()
      console.log(list)
      try {
        this.role.permissions = list
        const { roleId, roleName } = this.role
        const sysRole = { roleId, roleName: roleName.trim() }
        if (this.isEdit) {
          await this.$store.dispatch('permission/updateRoleMenu', {
            list,
            sysRole
          })
        } else {
          await this.$store.dispatch('permission/addRoleMenu', {
            list,
            sysRole
          })
          this.$refs['role'].resetFields()
          this.clearArr()
        }
        this.loading = false
        this.$notify({
          title: '成功',
          dangerouslyUseHTMLString: true,
          message: `
            <div>角色名称: ${roleName}</div>
            <div>拥有菜单: ${list.length}个</div>
          `,
          type: 'success'
        })
      } catch (error) {
        this.loading = false
        // this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// padding: 5px 45px 5px 50px;
/deep/.el-table th.is-leaf,
/deep/.el-table td {
  border-bottom: none;
}
/deep/.el-table::before {
  height: 0;
}

// .postInfo-container {
//   position: relative;
//   @include clearfix;
//   margin-bottom: 10px;

//   .postInfo-container-item {
//     float: left;
//   }
// }
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
