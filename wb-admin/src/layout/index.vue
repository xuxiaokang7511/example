<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-show="!onlyChild || oneChild" class="sidebar-container" />
    <div
      :class="{hasFooter:needFooter,onlyChild:onlyChild&&!oneChild,'fixedHeader':fixedHeader,'fixedFooter': needFooter&&fixedFooter}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main :class="{'needTagsView':needTagsView}" />
      <main-footer v-if="needFooter" :class="{'fixed-footer':fixedFooter}"></main-footer>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, MainFooter, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    MainFooter,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      needFooter: state => state.settings.footer,
      fixedFooter: state => state.settings.fixedFooter,
      onlyChild: state => state.app.onlyChild,
      oneChild: state => state.settings.oneChild,
      fullHeader: state => state.settings.fullHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
        fullHeader: this.fixedHeader && this.fullHeader
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  left: $sideBarWidth;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s ease-in-out;
  transition: left 0.28s ease-in-out;
}
.fullHeader .fixed-header {
  width: 100% !important;
  left: 0;
  z-index: 1002;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
  left: 54px;
}
.hideSidebar.fullHeader .fixed-header {
  width: calc(100% - 54px);
  left: 0;
}
.mobile .fixed-header {
  width: 100%;
  left: 0;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: all 0.28s ease-in-out;
}
.hideSidebar .fixed-footer {
  width: calc(100% - 54px);
}
.mobile .fixed-footer {
  width: 100%;
}
</style>
<style lang="scss">
.tags-view-container {
  // width: calc(100vw - #{$sideBarWidth} - 18px);
  width: calc(100vw - #{$sideBarWidth} - 6px);
}
.onlyChild .tags-view-container {
  width: calc(100vw - 18px);
}
.hideSidebar .tags-view-container {
  width: calc(100vw - 54px - 18px);
}
.hideSidebar .onlyChild .tags-view-container {
  width: calc(100vw - 18px);
}
.mobile .tags-view-container {
  width: calc(100vw - 18px);
}
.mobile .onlyChild .tags-view-container {
  width: calc(100vw - 18px);
}
</style>
