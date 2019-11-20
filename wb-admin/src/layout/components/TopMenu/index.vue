<template>
  <el-menu
    mode="horizontal"
    :default-active="activeMenu"
    :text-color="headerText"
    :active-text-color="headrActiveText"
  >
    <el-menu-item v-for="menu in topMenus" :key="menu.id" :index="menu.path">
      <app-link :to="menu.path" class="height">
        <svg-icon style="vertical-align: -0.25em;" :icon-class="menu.icon" class="height" />
        <span class="height" style="padding-left:6px;font-size: 16px;">{{ menu.label }}</span>
      </app-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'

import AppLink from '@/layout/components/Sidebar/Link'

export default {
  components: { AppLink },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    ...mapGetters(['menus', 'menuObj']),
    topMenus: function() {
      return this.menus.map(m => {
        let path = ''
        const { icon, id, label, page, children } = m
        if (children) {
          path = this.getPagePath(this.findChildrenPath(children))
        } else {
          path = this.getPagePath(page)
        }
        return {
          icon,
          id,
          label,
          path
        }
      })
    },
    activeMenu() {
      const route = this.$route
      if (route.path.startsWith('/redirect/')) {
        return
      }
      return this.currentMenuPath()
    }
  },
  created() {},
  methods: {
    currentMenuPath() {
      const topIds = this.topMenus.map(m => m.id)
      let ids = []
      const menu = this.route2Menu(this.$route)
      if (menu) {
        ids = menu.pages.map(p => p.id)
      }
      let selectIndex = 0
      for (let i = 0; i < topIds.length; i++) {
        const id = topIds[i]
        const index = ids.indexOf(id)
        if (index > -1) {
          selectIndex = i
          break
        }
      }
      this.$store.dispatch('menu/setCurrentMenu', this.menus[selectIndex])
      return this.topMenus[selectIndex].path
    },
    findChildrenPath(children) {
      let page = ''
      for (let i = 0; i < children.length; i++) {
        const menu = children[i]
        if (menu.children) {
          page = this.findChildrenPath(menu.children)
          if (page !== '') {
            break
          }
        } else {
          if (!menu.hidden) {
            page = menu.page
            break
          }
        }
      }
      return page
    },
    getPagePath(page) {
      return this.menuObj[page].path
    },
    route2Menu(route) {
      let ret = null
      if (route && route.name && this.menuObj[route.name]) {
        ret = this.menuObj[route.name]
      }
      return ret
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.height {
  display: inline-block;
  height: calc(#{$headerHeight});
  line-height: calc(#{$headerHeight});
}
.el-menu {
  background-color: transparent !important;

  .el-menu-item:hover {
    @include headerActiveColor();
    border-bottom-width: 3px;
    background-color: transparent !important;
  }
}
</style>
