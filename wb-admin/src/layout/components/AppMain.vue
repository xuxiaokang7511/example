<template>
  <section class="app-main">
    <tags-view v-if="needTagsView" />
    <div :style="{'padding-top':needTagsView?'0':'5px'}">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import TagsView from './TagsView'
import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  components: {
    TagsView
  },
  computed: {
    ...mapState({
      needTagsView: state => state.settings.tagsView
    }),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
// 固定头部的情况
.fixedHeader {
  .app-main {
    // 有标签栏的情况
    &.needTagsView {
      padding-top: calc(#{$tagsViewHeight});
      .tags-view-container {
        position: fixed;
        z-index: 9;
        top: $headerHeight;
      }
    }
    // 没有标签栏的情况
    padding-top: 0;
  }
}
</style>

<style lang="scss" >
#app {
  .main-container {
    background: $bodyBg;
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
    &.onlyChild {
      margin-left: 0px;
      .footer {
        width: calc(100%);
      }
      .fixed-header {
        width: calc(100%);
        left: 0;
      }
    }
  }
}
/* 没有底部的情况
---------------------------------------------------------------- */
.main-container {
  // 头部固定
  &.fixedHeader {
    padding-top: calc(#{$headerHeight});
    .app-main {
      overflow: auto;
    }
  }
  // 头部不固定
  padding-top: 0;
  .app-main {
    /* 64= navbar  64  */
    min-height: calc(100vh - #{$headerHeight});
    width: 100%;
    position: relative;
    overflow: hidden;
  }
}

/* 有底部的情况，但底部不固定
---------------------------------------------------------------- */
.main-container {
  // 有底部
  &.hasFooter {
    // 头部固定
    &.fixedHeader {
      padding-top: calc(#{$headerHeight});
      .app-main {
        min-height: calc(100vh - #{$headerHeight} - #{$footerHeight});
        overflow: auto;
      }
    }
    // 头部不固定
    padding-top: 0;
    .app-main {
      /* 100 = navbar  + footer = 64 + 36 */
      /* REVIEW: 主体最小高度， header + footer 的情况 */
      min-height: calc(100vh - #{$headerHeight} - #{$footerHeight});
    }
  }
}

/* 有底部的情况，底部固定
---------------------------------------------------------------- */
.main-container {
  // 有底部
  &.hasFooter {
    // 底部固定
    &.fixedFooter {
      // 头部固定
      &.fixedHeader {
        padding-top: calc(#{$headerHeight});
        .app-main {
          min-height: calc(100vh - #{$headerHeight} - #{$footerHeight});
          height: calc(100vh - #{$headerHeight} - #{$footerHeight});
          overflow: auto;
          margin-bottom: calc(#{$footerHeight});
        }
      }
      // 头部不固定
      padding-top: 0;
      .app-main {
        margin-bottom: calc(#{$footerHeight});
      }
    }
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
