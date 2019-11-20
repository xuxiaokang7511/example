<template>
  <content-main
    title-height="48px"
    show-foot
    style="padding-left:16px;padding-right:16px;padding-bottom:10px;"
  >
    <template #title>
      <span style="font-size:14px;font-weight:bold;">用户列表</span>
    </template>
    <template #right>
      <el-button icon="el-icon-plus" style="margin-right:18px;" size="mini" @click="userAdd">创建用户</el-button>
    </template>
    <div style="padding-left:16px;padding-right:16px;margin-top:5px;">
      <el-table v-loading="listLoading" :data="userList" :header-row-style="{height:'55px'}">
        <el-table-column fixed align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.userName" placement="bottom">
              <span>{{ scope.row.userName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="职务">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="手机" min-width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" min-width="165" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" min-width="165" label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户操作" width="300px">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-refresh" @click="resetPwd(scope)">重置密码</el-button>
            <el-button size="small" icon="el-icon-edit" @click="userEdit(scope)">编辑</el-button>
            <el-button
              size="small"
              :icon="scope.row.valid ? 'el-icon-close':'el-icon-check'"
              @click="userDelete(scope)"
            >{{ scope.row.valid ? '禁用':'启用' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #foot>
      <pagination
        v-show="page.total/page.pageSize>1"
        style="padding-left:16px;"
        :total="page.total"
        :background="false"
        :page.sync="page.pageNum"
        :limit.sync="page.pageSize"
        @pagination="getUsers"
      />
    </template>

    <el-dialog
      :visible.sync="dialogUserVisible"
      :before-close="closeUser"
      :title="dialogUserType==='edit'?'编辑用户':'创建用户'"
    >
      <el-form
        ref="user"
        :model="user"
        :rules="userRules"
        label-width="80px"
        style="padding:10px 16px;max-width:460px;"
      >
        <el-form-item label="用户名" prop="userName" required>
          <el-input v-model="user.userName" type="text" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId" style="height:42px;" required>
          <el-select v-model="user.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in rolesList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" prop="title">
          <el-input v-model="user.title" type="text" placeholder="用户职务" />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="user.phoneNumber" type="text" placeholder="手机号码" />
        </el-form-item>
        <el-form-item label="密码">
          <div>
            初始密码:
            <b>{{ defualtPwd }}</b>
          </div>
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="cancleUser">取消</el-button>
          <el-button type="primary" @click="confirmUser">{{ dialogUserType==='edit'?'保存':'确定' }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </content-main>
</template>

<script>
import { clone } from '@/js/libs'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const defaultUser = {
  userId: 0,
  userName: '',
  roleId: null,
  title: '',
  phoneNumber: '',
  valid: true
}
export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      defualtPwd: '123456',
      dialogUserVisible: false,
      dialogUserType: 'new', // new edit
      user: Object.assign({}, defaultUser),
      userRules: {
        userName: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: ['blur', 'change']
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: ['blur', 'change']
          }
        ],
        title: [
          {
            required: false
          }
        ],
        phoneNumber: [
          {
            required: false
          }
        ]
      },
      rolesList: [],
      userList: [],
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getRoles()
    this.getUsers()
  },
  methods: {
    async getRoles() {
      try {
        const res = await this.$store.dispatch('permission/getRoles')
        this.rolesList = res.data
      } catch (error) {
        // this.$message.error(error.message)
      }
    },
    async getUsers() {
      try {
        this.listLoading = true
        const { data, page } = await this.$store.dispatch(
          'user/getUsers',
          this.page
        )
        this.userList = data
        this.page = page
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
        // this.$message.error(error.message)
      }
    },
    userAdd() {
      this.user = Object.assign({}, defaultUser)
      this.dialogUserType = 'new'
      this.dialogUserVisible = true
      this.$nextTick(() => {
        this.$refs['user'].clearValidate()
      })
    },
    userEdit(scope) {
      this.user = clone(scope.row)
      this.dialogUserType = 'edit'
      this.dialogUserVisible = true
      this.$nextTick(() => {
        this.$refs['user'].clearValidate()
      })
    },
    userDelete({ row }) {
      const action = row.valid ? '禁用' : '启用'
      this.$confirm(`确认${action}『${row.userName}』用户？`, 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            const { msg } = await this.$store.dispatch('user/updateUser', {
              userId: row.userId,
              valid: !row.valid
            })
            this.getUsers()
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
    },
    resetPwd({ row }) {
      this.$confirm(
        `确认将『${row.userName}』用户的密码重置为:${this.defualtPwd}？`,
        'Warning',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async() => {
          try {
            const user = {
              userId: row.userId,
              userName: row.userName,
              valid: row.valid,
              pwd: this.defualtPwd
            }
            const { msg } = await this.$store.dispatch('user/updateUser', user)
            this.getUsers()
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
    },
    closeUser(done) {
      this.$refs['user'].resetFields()
      done()
    },
    cancleUser() {
      this.dialogUserVisible = false
      this.$refs['user'].resetFields()
    },
    confirmUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitUser()
        } else {
          return false
        }
      })
    },
    async submitUser() {
      const isEdit = this.dialogUserType === 'edit'
      let retMsg = ''
      try {
        if (isEdit) {
          const user = {
            userId: this.user.userId,
            userName: this.user.userName,
            valid: this.user.valid,
            roleId: this.user.roleId,
            title: this.user.title,
            phoneNumber: this.user.phoneNumber
          }
          const { msg } = await this.$store.dispatch('user/updateUser', user)
          retMsg = msg
        } else {
          const user = {
            userName: this.user.userName,
            valid: this.user.valid,
            roleId: this.user.roleId,
            pwd: this.defualtPwd,
            title: this.user.title,
            phoneNumber: this.user.phoneNumber
          }
          const { msg } = await this.$store.dispatch('user/addUser', user)
          retMsg = msg
        }
        this.getUsers()
        this.cancleUser()
        this.$message({
          message: retMsg,
          type: 'success'
        })
      } catch (error) {
        // this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
