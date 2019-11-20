<template>
  <div>
    <div class="refresh-icon" title="刷新" @click="refresh">
      <i class="el-icon-refresh-right" style="display: inline-block;"></i>
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.id">
          <svg-icon
            v-if="showIcon && item.icon"
            style="font-size:12px;vertical-align: -0.05em;margin-left: 3px;"
            :class="{'no-redirect':item.redirect==='noRedirect'||index==levelList.length-1}"
            :icon-class="item.icon"
          />
          <span
            v-if="item.redirect==='noRedirect'||index==levelList.length-1"
            class="no-redirect"
            :class="{'pl-show-icon':showIcon}"
          >{{ item.title }}</span>
          <a
            v-else
            :class="{'pl-show-icon':showIcon}"
            @click.prevent="handleLink(item)"
          >{{ item.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters(['menuObj']),
    showIcon() {
      return this.$store.state.settings.breadcrumbIcon
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // matched 参考：https://router.vuejs.org/zh/api/#路由对象属性

      // 菜单和路由的修改
      const obj = this.menuObj[this.$route.name]
      const dashboard = this.menuObj['Dashboard']
      let matched = [
        {
          id: dashboard.id,
          path: dashboard.path,
          title: dashboard.label,
          icon: dashboard.icon,
          redirect: dashboard.path
        }
      ]

      if (obj && !this.isDashboard(obj)) {
        const pages = obj.pages ? obj.pages.filter(p => p.id) : []
        if (pages.length < 1) {
          pages.push({
            id: obj.id,
            path: obj.path,
            title: obj.label,
            icon: obj.icon,
            redirect: obj.redirect
          })
          matched = matched.concat(pages)
        } else {
          matched = matched.concat(
            pages.map((p, index) => {
              let path = ''
              let redirect = ''
              if (p.page && this.menuObj[p.page]) {
                path = this.menuObj[p.page].path
                redirect = this.menuObj[p.page].redirect
              }
              if (!path) {
                redirect = 'noRedirect'
              }
              return {
                id: p.id,
                path,
                title: p.label,
                icon: p.icon,
                redirect
              }
            })
          )
        }
      }
      this.levelList = matched
    },
    isDashboard(obj) {
      if (!obj) {
        return false
      }
      const name = obj.page
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
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
      let compilePath = ''
      try {
        compilePath = this.pathCompile(path)
      } catch (error) {
        console.log(error)
      }
      if (compilePath) {
        this.$router.push(compilePath)
      }
    },
    refresh() {
      console.log('refresh')
      const { fullPath, name } = this.$route
      this.$store.dispatch('tagsView/delCachedView', { name }).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.refresh-icon {
  display: inline-block;
  font-size: 18px;
  color: #687185;
  height: $headerHeight;
  line-height: calc(#{$headerHeight} + 5px);
  width: auto;
  padding: 0 12px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 15px;
  // height: $headerHeight;
  // line-height: calc(#{$headerHeight} + 5px);
  // margin-left: 8px;
  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    @include headerText();
  }

  .no-redirect {
    font-size: 14px;
    @include headerSecondText();
    cursor: text;
  }
  .pl-show-icon {
    padding-left: 4px;
    padding-right: 3px;
  }
}
</style>
