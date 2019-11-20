<template>
  <el-row class="h-full" type="flex" justify="space-around" style="padding-bottom:10px;">
    <el-col
      :span="handleType?14:24"
      class="h-full"
      style="padding-left:16px;"
      :style="{'padding-right':handleType?'0':'16px'}"
    >
      <content-main title-height="48px">
        <template #title>
          <span style="font-size:16px;font-weight:bold;">菜单目录</span>
          <span v-if="!handleType" style="font-size:12px;">(可拖动排序)</span>
        </template>
        <template #right>
          <el-button
            v-if="!handleType"
            size="mini"
            type="text"
            style="margin-right:18px;"
            @click="addRootNode"
          >创建根菜单</el-button>
        </template>
        <el-tree
          :data="menuList"
          node-key="id"
          default-expand-all
          draggable
          :highlight-current="!!handleType"
          :allow-drag="allowDrag"
          :expand-on-click-node="false"
          @node-drag-start="handleDragStart"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
        >
          <span slot-scope="{ node,data }" class="custom-tree-node">
            <span>
              <svg-icon :icon-class="data.icon" size="12px" />
              <span style="padding-left:4px;">{{ data.label }}</span>
            </span>
            <span v-if="!handleType" style="padding-right:8px;">
              <el-button icon="el-icon-plus" size="mini" type="text" @click="() => addNode(data)">新增</el-button>
              <el-button
                icon="el-icon-edit"
                size="mini"
                type="text"
                @click="() => editNode(data)"
              >编辑</el-button>
              <el-button
                v-if="node.isLeaf"
                icon="el-icon-delete"
                size="mini"
                type="text"
                @click="() => deleteNode(data)"
              >删除</el-button>
            </span>
          </span>
        </el-tree>
      </content-main>
    </el-col>
    <el-col v-if="handleType" class="h-full" style="padding-left:4px;padding-right:16px;">
      <content-main title-height="48px" :show-flag="false">
        <template #title>
          <span style="font-size:14px;font-weight:bold;">{{ handleTitle }}</span>
        </template>
        <template #right>
          <el-button v-if="handleType" size="mini" @click="cancle">关闭</el-button>
          <el-button
            v-if="handleType"
            size="mini"
            style="margin-right:18px;"
            @click="confirmRole"
          >保存</el-button>
        </template>
        <el-form
          v-if="handleType"
          ref="form"
          :model="menu"
          :rules="menuRules"
          label-width="80px"
          style="padding:10px 16px;max-width:460px;"
        >
          <el-form-item label="名称" prop="label">
            <el-input v-model="menu.label" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="page">
            <el-select v-model="menu.page" filterable clearable placeholder="请选择路由">
              <el-option
                v-for="item in pages"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-select v-model="menu.icon" clearable placeholder="请选择图标">
              <el-option
                v-for="item in icons"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <svg-icon :icon-class="item.value" class-name="disabled" />
                <span style="padding-left:10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="隐藏" prop="hidden">
            <el-switch v-model="menu.hidden"></el-switch>
          </el-form-item>
        </el-form>
      </content-main>
    </el-col>
  </el-row>
</template>

<script>
const defaultMenu = {
  id: '',
  parentId: 0,
  label: '',
  icon: '',
  page: '',
  hidden: false,
  sort: 0
}

import svgIcons from '@/assets/icons/svg-icons'
import { asyncRoutes } from '@/router'
// import { TreeList } from '@/store/api/permission'

export default {
  name: 'Menu',
  data() {
    return {
      listLoading: true,
      pages: [],
      icons: [],
      menuList: [],
      menu: null,
      handleType: '',
      menuRules: {
        label: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: ['blur', 'change']
          }
        ],
        icon: [],
        page: [],
        hidden: []
      }
    }
  },
  computed: {
    handleTitle: function() {
      if (this.handleType === 'add') {
        return '添加子菜单'
      } else if (this.handleType === 'root') {
        return '添加根菜单'
      } else if (this.handleType === 'edit') {
        return '编辑菜单'
      } else {
        return ''
      }
    }
  },
  created() {
    this.getMenus()
    this.pages = this.transRoutes(asyncRoutes)
    this.getIcons()
  },
  methods: {
    async getMenus() {
      try {
        this.listLoading = true
        const res = await this.$store.dispatch('permission/getMenus')
        this.menuList = res.data
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
        // this.$message.error(error.message)
      }
    },
    getIcons() {
      this.icons = svgIcons.map(icon => {
        return {
          value: icon,
          label: icon
        }
      })
    },
    transRoutes(routes) {
      let res = []
      routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
          tmp.children = this.transRoutes(tmp.children)
          if (tmp.children.length > 0) {
            res = [...res, ...tmp.children]
          }
        } else {
          if (tmp.name) {
            res.push({
              value: tmp.name,
              label: tmp.meta && tmp.meta.title ? tmp.meta.title : tmp.name
            })
          }
        }
      })
      return res
    },
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    addRootNode() {
      this.handleType = 'root'
      this.menu = Object.assign({}, defaultMenu)
      const length = this.menuList.length
      if (length > 0) {
        this.menu.sort = this.menuList[length - 1].sort + 1
      }
    },
    deleteNode(data) {
      this.$confirm(`确认删除『${data.label}』?`, 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          const { msg } = await this.$store.dispatch(
            'permission/deleteMenu',
            data.id
          )
          this.getMenus()
          this.$message({
            type: 'success',
            message: msg
          })
        } catch (error) {
          console.log(error)
        }
      })
    },
    addNode(data) {
      this.handleType = 'add'
      this.menu = Object.assign({}, defaultMenu)
      this.menu.parentId = data.id
      if (data.children && data.children.length > 0) {
        const length = data.children.length
        this.menu.sort = data.children[length - 1].sort + 1
      }
    },
    editNode(data) {
      this.handleType = 'edit'
      this.menu = data
    },
    confirmRole() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.submit()
        } else {
          return false
        }
      })
    },
    async submit() {
      let retMsg = ''
      const menu = {
        hidden: this.menu.hidden,
        icon: this.menu.icon,
        label: this.menu.label,
        id: this.menu.id,
        page: this.menu.page,
        parentId: this.menu.parentId,
        sort: this.menu.sort
      }
      try {
        if (this.handleType === 'add' || this.handleType === 'root') {
          const { msg } = await this.$store.dispatch('permission/addMenu', menu)
          retMsg = msg
        } else if (this.handleType === 'edit') {
          const { msg } = await this.$store.dispatch(
            'permission/updateMenu',
            menu
          )
          retMsg = msg
        }
        this.getMenus()
        this.$message({
          message: retMsg,
          type: 'success'
        })
        this.cancle()
      } catch (error) {
        console.log(error)
      }
    },
    cancle() {
      this.$refs['form'].resetFields()
      this.$nextTick(() => {
        this.menu = null
        this.handleType = ''
      })
    },
    allowDrag(draggingNode) {
      return !this.handleType
    },
    handleDragStart(node, ev) {
      // 节点开始拖拽时触发的事件
      console.log('开始拖拽', node.data.id, node.data.parentId)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // 拖拽结束时（可能未成功）触发的事件
      const str = ['结束:']
      const label = dropNode && dropNode.label
      // before、after、inner
      if (dropType === 'none') {
        str.push('位置无变化')
      } else if (dropType === 'before') {
        str.push('拖拽到【' + label + '】节点前')
      } else if (dropType === 'after') {
        str.push('拖拽到【' + label + '】节点后')
      } else if (dropType === 'inner') {
        str.push('拖拽到【' + label + '】节点内')
      }
      console.log(str.join(' '))
    },
    async handleDrop(draggingNode, dropNode, dropType, ev) {
      // 拖拽成功完成时触发的事件
      // console.log(this.menuList)
      console.log(dropNode)

      const changeList = []
      const id = draggingNode.data.id
      // before、after、inner
      if (dropType === 'before' || dropType === 'after') {
        let parentId = 0
        let sameLevelList = []
        if (!dropNode.parent || dropNode.parent.level === 0) {
          sameLevelList = [...this.menuList]
        } else {
          parentId = dropNode.parent.data.id
          sameLevelList = [...dropNode.parent.data.children]
        }
        sameLevelList.forEach(({ id }, sort) => {
          changeList.push({ id, parentId, sort })
        })
      } else if (dropType === 'inner') {
        const parentId = dropNode.data.id
        const sort = dropNode.data.children.length - 1
        changeList.push({ id, parentId, sort })
      }
      console.log(changeList)
      try {
        const { msg } = await this.$store.dispatch(
          'permission/updateList',
          changeList
        )
        this.getMenus()
        this.$message({
          message: msg,
          type: 'success'
        })
      } catch (error) {
        console.log(dropNode && dropNode.label, ' 拖拽完成: ', dropType)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main {
  /deep/ .el-tree-node__content {
    height: 36px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 3px 10px 5px 3px;
    margin-top: 3px;
  }
}

.disabled {
  pointer-events: none;
}
</style>
