<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <h3 style="margin-top:30px;margin-left:30px;">重置密码</h3>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="margin-left:60px;">
          <el-form
            ref="resetForm"
            :rules="resetRules"
            :model="resetForm"
            label-width="120px"
            style="max-width:400px;"
          >
            <el-form-item label="输入原密码：" prop="oldpwd">
              <el-input
                ref="oldpwd"
                v-model="resetForm.oldpwd"
                placeholder="请输入原密码"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="设置新密码：" prop="newpwd">
              <el-input
                ref="newpwd"
                v-model="resetForm.newpwd"
                type="password"
                placeholder="请输入新密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="再次输入：" prop="twopwd">
              <el-input
                ref="twopwd"
                v-model="resetForm.twopwd"
                type="password"
                placeholder="再次输入新密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="success"
                style="min-width:120px"
                @click.native.prevent="handleReset"
              >确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatePassword1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (value === this.resetForm.oldpwd) {
        callback(new Error('新密码不能和原密码一致'))
      } else {
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (!(value === this.resetForm.newpwd)) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        oldpwd: '',
        newpwd: '',
        twopwd: ''
      },
      resetRules: {
        oldpwd: [
          { required: true, trigger: 'change', validator: validatePassword }
        ],
        newpwd: [
          { required: true, trigger: 'change', validator: validatePassword1 }
        ],
        twopwd: [
          { required: true, trigger: 'change', validator: validatePassword2 }
        ]
      },
      loading: false
    }
  },
  mounted() {
    if (this.resetForm.oldpwd === '') {
      this.$refs.oldpwd.focus()
    } else if (this.resetForm.newpwd === '') {
      this.$refs.newpwd.focus()
    } else if (this.resetForm.twopwd === '') {
      this.$refs.twopwd.focus()
    }
  },
  methods: {
    handleReset() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          this.loading = true
          const oldPwd = this.resetForm.oldpwd
          const newPwd = this.resetForm.newpwd
          this.$store
            .dispatch('user/resetPwd', { oldPwd, newPwd })
            .then(({ msg }) => {
              this.$message({
                type: 'success',
                message: msg
              })
              this.$refs.resetForm.resetFields()
              this.loading = false
            })
            .catch(({ msg }) => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>

