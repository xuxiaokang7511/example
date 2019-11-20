<template>
  <div :class="{'has-logo':showLogo}" style="user-select:none;">
    <logo v-if="showLogo||fullHeader" :collapse="isCollapse" />
    <el-scrollbar v-show="!onlyChild|| oneChild" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="menuText"
        :collapse-transition="false"
        unique-opened
        mode="vertical"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.id" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { clone } from '@/js/libs'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      topMenu: state => state.settings.topMenu,
      currentMenu: state => state.menu.currentMenu,
      onlyChild: state => state.app.onlyChild,
      oneChild: state => state.settings.oneChild,
      fullHeader: state => state.settings.fullHeader
    }),
    ...mapGetters(['sidebar', 'menus', 'menuObj']),
    activeMenu() {
      const route = this.$route
      const { meta, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (name && this.menuObj[name]) {
        return this.menuObj[name].path || ''
      } else {
        return ''
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    menuList() {
      let list = []
      if (this.topMenu) {
        if (this.currentMenu) {
          if (this.currentMenu.children) {
            list = this.makeMenus([...this.currentMenu.children])
          } else {
            list = this.makeMenus([this.currentMenu])
          }
          this.$store.dispatch(
            'app/setOnlyChild',
            this.currentMenu.showCount <= 1
          )
        }
      } else {
        list = this.makeMenus(this.menus)
      }
      return list
    }
  },
  created() {},
  methods: {
    makeMenus(ms) {
      const menus = clone(ms)
      const ret = []
      menus.forEach(menu => {
        menu = this.findFinal(menu)
        if (menu.children) {
          menu.children = this.makeMenus(menu.children)
        }
        ret.push(menu)
      })
      return ret
    },
    findFinal(menu) {
      let ret
      if (menu.children && menu.showCount === 1 && menu.children.length === 1) {
        ret = this.findFinal(menu.children[0])
      } else {
        ret = menu
      }
      return ret
    }
  }
}
</script>
