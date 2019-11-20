<template>
  <div class="navbar">
    <logo
      v-if="(showLogo&&onlyChild&&!oneChild||(fixedHeader&&fullHeader))"
      :collapse="true"
      class="logo"
    />

    <hamburger
      v-if="!onlyChild || oneChild"
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <top-menu v-if="topMenu"></top-menu>
    <breadcrumb v-else id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log v-if="false" class="errLog-container right-menu-item hover-effect" />

        <screenfull v-if="false" id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <el-avatar :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"></el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>{{ username }}</el-dropdown-item>
          <router-link to="/reset">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Logo from './Sidebar/Logo'
import Breadcrumb from './Breadcrumb'
import TopMenu from './TopMenu'
import Hamburger from './Hamburger'
import ErrorLog from './ErrorLog'
import Screenfull from '@/components/Screenfull'
import Search from './HeaderSearch'

export default {
  components: {
    TopMenu,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    Search,
    Logo
  },
  computed: {
    ...mapState({
      topMenu: state => state.settings.topMenu,
      onlyChild: state => state.app.onlyChild,
      oneChild: state => state.settings.oneChild,
      fixedHeader: state => state.settings.fixedHeader,
      fullHeader: state => state.settings.fullHeader,
      username: state => state.user.username
    }),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      try {
        await this.$store.dispatch('user/logout')
        // const url = this.$route.fullPath
        const url = '/'
        this.$router.push(`/login?redirect=${url}`)
      } catch (error) {
        // this.$message.error(error.message)
      }
    }
  }
}
</script>
<style>
.popper__arrow {
  box-sizing: border-box !important;
}
</style>

<style lang="scss" scoped>
.mobile {
  .navbar {
    .logo {
      display: none;
    }
  }
}
.navbar {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  user-select: none;
  @include headerBg();
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .logo {
    float: left;
    width: $sideBarWidth;
    background-color: transparent !important;
    @include headerText();
  }

  .hamburger-container {
    line-height: calc(#{$headerHeight} + 4px);
    height: 100%;
    float: left;
    cursor: pointer;
    @include headerText();
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .el-menu {
    float: left;
    &.el-menu--horizontal {
      border-bottom: none;
    }
  }
  /deep/ .el-menu--horizontal > .el-menu-item {
    height: calc(#{$headerHeight});
    line-height: calc(#{$headerHeight});
    // min-width: 120px;
  }
  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom-width: 3px;
    font-weight: bold;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $headerHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      @include headerText();
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        height: calc(#{$headerHeight} - 12px);
        margin-top: 12px;
        position: relative;

        .user-avatar {
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: calc(#{$headerHeight}/ 2 - 32px + 25px);
          font-size: 12px;
        }
      }
    }
  }
}
.el-popper[x-placement^='bottom'] {
  margin-top: 6px !important;
  margin-left: 10px;
}
</style>
