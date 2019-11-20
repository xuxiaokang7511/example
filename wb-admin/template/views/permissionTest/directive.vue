<template>
  <div class="app-container">
    <div style="margin-top:30px;">
      <div>
        <span v-permit="'article:add'" class="permission-alert">
          拥有
          <el-tag class="permission-tag" size="small">创建文章权限</el-tag>可以看到
        </span>
        <el-tag
          v-permit="'article:add'"
          class="permission-sourceCode"
          type="info"
        >v-permit="'article:add'"</el-tag>
      </div>

      <div>
        <span v-permit="'user:add'" class="permission-alert">
          拥有
          <el-tag class="permission-tag" size="small">创建用户权限</el-tag>可以看到
        </span>
        <el-tag
          v-permit="'user:add'"
          class="permission-sourceCode"
          type="info"
        >v-permit="'user:add'"</el-tag>
      </div>

      <div>
        <span v-permit="'article:add'" class="permission-alert">
          宽松匹配：拥有其中一个就可以看到
          <div>
            <el-tag class="permission-tag" size="small">创建用户权限</el-tag>
            <el-tag class="permission-tag" size="small">创建文章权限</el-tag>
          </div>
        </span>
        <el-tag
          v-permit="'user:add,article:add'"
          class="permission-sourceCode"
          type="info"
        >v-permit="'user:add,article:add'"</el-tag>
      </div>

      <div>
        <span v-permit="'user:add+article:add'" class="permission-alert">
          严格匹配：同时拥有才可以看到
          <div>
            <el-tag class="permission-tag" size="small">创建用户权限</el-tag>
            <el-tag class="permission-tag" size="small">创建文章权限</el-tag>
          </div>
        </span>
        <el-tag
          v-permit="'user:add+article:add'"
          class="permission-sourceCode"
          type="info"
        >v-permit="'user:add+article:add'"</el-tag>
      </div>
    </div>

    <div style="margin-top:60px;">
      <aside>
        在某些情况下，不适合使用 v-permit。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。
        <br />e.g.
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermit('article:add')" label="创建文章">
          拥有创建文章权限的可以看到
          <el-tag class="permission-sourceCode" type="info">v-if="checkPermit('article:add')"</el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermit('user:add')" label="创建用户">
          拥有创建用户权限的可以看到
          <el-tag class="permission-sourceCode" type="info">v-if="checkPermit('user:add')"</el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermit('user:add,article:add')" label="宽松验证">
          拥有创建文章、创建用户权限的其中一个就可以看到
          <el-tag
            class="permission-sourceCode"
            type="info"
          >v-if="checkPermit('user:add,article:add')"</el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermit('user:add+article:add')" label="严格验证">
          同时拥有创建文章、创建用户权限的才可以看到
          <el-tag
            class="permission-sourceCode"
            type="info"
          >v-if="checkPermitStrict('user:add+article:add')"</el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectivePermission',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

