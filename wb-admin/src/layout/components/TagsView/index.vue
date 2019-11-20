<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="flex">
      <div v-if="showLR" class="bts" @click="moveSpan(-500)">
        <div class="bt">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
      <div v-resize="lrCurrentTag" class="tv">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
          <draggable
            v-model="visitedViews"
            :move="checkMove"
            ghost-class="ghost"
            @choose="chooseDrag"
          >
            <router-link
              v-for="tag in visitedViews"
              ref="tag"
              :key="tag.path"
              :class="isActive(tag)?'active':''"
              :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
              tag="span"
              class="tags-view-item"
              @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
              @contextmenu.prevent.native="openMenu(tag,$event)"
            >
              <svg-icon v-if="showIcon && tag.meta.icon" :icon-class="tag.meta.icon" />
              <svg-icon v-else icon-class="circle" />
              {{ tag.title | ellipsis(16,false) }}
              <span
                v-if="!isAffix(tag)"
                class="el-icon-close"
                @click.prevent.stop="closeSelectedTag(tag)"
              />
              <span v-else class="pr-span"></span>
            </router-link>
          </draggable>
        </scroll-pane>
      </div>
      <div v-if="showLR" class="bts" @click="moveSpan(500)">
        <div class="bt">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div v-else class="bts">
        <div class="bt-none">&nbsp;</div>
      </div>
      <div v-if="!showLR" class="bts">
        <div class="bt-none">&nbsp;</div>
      </div>
      <div v-if="false" class="bts">
        <el-dropdown @command="handleCommand">
          <div class="dr-bt">
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="refresh">
              <i class="el-icon-refresh-right"></i>刷新
            </el-dropdown-item>
            <el-dropdown-item
              v-if="false && !(selectedTag&&selectedTag.meta&&selectedTag.meta.affix)"
              command="close"
            >关闭</el-dropdown-item>
            <el-dropdown-item v-if="!isFrist" command="closeLeft">
              <i class="el-icon-back"></i>关闭左侧
            </el-dropdown-item>
            <el-dropdown-item v-if="!isLast" command="closeRight">
              <i class="el-icon-right"></i>关闭右侧
            </el-dropdown-item>
            <el-dropdown-item command="closeOther">
              <i class="el-icon-close"></i>关闭其他
            </el-dropdown-item>
            <el-dropdown-item command="closeAll">
              <i class="el-icon-error"></i>全部关闭
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag">
        <i class="el-icon-refresh-right"></i>&nbsp;&nbsp;刷新
      </li>
      <!-- <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li> -->
      <li v-if="!isFrist" @click="closeLeft">
        <i class="el-icon-back"></i>&nbsp;&nbsp;关闭左侧
      </li>
      <li v-if="!isLast" @click="closeRight">
        <i class="el-icon-right"></i>&nbsp;&nbsp;关闭右侧
      </li>
      <li @click="closeOthersTags">
        <i class="el-icon-close"></i>&nbsp;&nbsp;关闭其他
      </li>
      <li @click="closeAllTags">
        <i class="el-icon-error"></i>&nbsp;&nbsp;全部关闭
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import draggable from 'vuedraggable'

export default {
  components: { ScrollPane, draggable },
  data() {
    return {
      menuPath: '',
      visible: false,
      top: 0,
      left: 0,
      affixTags: [],
      showLR: false
    }
  },
  computed: {
    visitedViews: {
      // getter
      get: function() {
        return this.$store.state.tagsView.visitedViews
      },
      // setter
      set: function(views) {
        this.$store.dispatch('tagsView/setVisitedView', views)
      }
    },
    historyViews() {
      return this.$store.state.tagsView.historyViews
    },
    showIcon() {
      return this.$store.state.settings.tagsIcon
    },
    routes() {
      return this.$store.state.permission.routes
    },
    selectedTag() {
      if (this.menuPath) {
        return this.visitedViews.find(route => route.path === this.menuPath)
      } else {
        return this.visitedViews.find(route => route.path === this.$route.path)
      }
    },
    selectedIndex() {
      if (this.menuPath) {
        return this.visitedViews.findIndex(
          route => route.path === this.menuPath
        )
      } else {
        return this.visitedViews.findIndex(
          route => route.path === this.$route.path
        )
      }
    },
    isFrist() {
      return this.selectedIndex === 0
    },
    isLast() {
      return this.selectedIndex === this.visitedViews.length - 1
    }
  },
  watch: {
    $route() {
      this.fixedViews()
      this.addTags()
      this.moveToCurrentTag()
    },
    visitedViews: function() {
      this.lrCurrentTag('visitedViews')
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
    this.fixedViews()
  },
  methods: {
    chooseDrag(evt) {
      // console.log(evt)
      const draggedIndex = evt.oldDraggableIndex
      const draggedTag = this.visitedViews[draggedIndex]

      if (draggedTag) {
        if (
          evt.originalEvent.srcElement.className === 'el-icon-close' ||
          this.isAffix(draggedTag)
        ) {
          evt.returnValue = false
          evt.originalEvent.returnValue = false
          return false
        }
        this.$router.push({
          path: draggedTag.path,
          query: draggedTag.query,
          fullPath: draggedTag.fullPath
        })
        // if (this.isAffix(draggedTag)) {
        //   evt.returnValue = false
        //   evt.originalEvent.returnValue = false
        //   return false
        // }
      }
    },
    checkMove(evt) {
      const draggedTag = evt.draggedContext.element
      const relatedTag = evt.relatedContext.element
      if (this.isAffix(draggedTag) || this.isAffix(relatedTag)) {
        return false
      } else {
        return true
      }
    },
    fixedViews() {
      // cachedViews visitedViews 清理
      const menuObj = this.$store.getters.menuObj
      const vs = []
      this.$store.state.tagsView.visitedViews.forEach(v => {
        const view = Object.assign({}, v)
        const menu = menuObj[view.name]
        if (!menu) {
          vs.push(view)
        } else if (!view.path) {
          vs.push(view)
        } else {
          if (
            view.meta &&
            (!view.meta.title ||
              view.meta.title !== menu.label ||
              !view.meta.icon ||
              view.meta.icon !== menu.icon)
          ) {
            view.meta.title = menu.label
            view.meta.icon = menu.icon

            console.log('初始化时 label或icon 不一致，修正')
            this.$store.dispatch('tagsView/updateVisitedView', view)
          }
        }
      })
      vs.forEach(view => {
        this.$store.dispatch('tagsView/delView', view)
      })
    },
    lrCurrentTag(from) {
      // if (typeof from === 'object') {
      //   from = 'resize'
      // }
      // console.log('from ' + from)
      setTimeout(() => {
        this.leftRight()
        setTimeout(() => {
          this.moveToCurrentTag()
        }, 0)
      }, 0)
    },
    leftRight() {
      if (this.$refs.scrollPane && this.$refs.scrollPane.scrollWrapper) {
        const scrollWrapper = this.$refs.scrollPane.scrollWrapper
        this.showLR =
          scrollWrapper.scrollWidth > scrollWrapper.parentElement.offsetWidth
      }
    },
    moveSpan(span) {
      this.$refs.scrollPane.move(span)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag && tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name, fullPath, path, meta, query } = this.$route
      if (name) {
        const obj = this.$store.getters.menuObj[name]
        if (obj && meta) {
          // 以menu中的图标和名称优先
          meta.icon = obj.icon
          meta.title = obj.label
        }
        const tag = {
          fullPath,
          path,
          name,
          query: JSON.parse(JSON.stringify(query)),
          meta: JSON.parse(JSON.stringify(meta))
        }
        this.$store.dispatch('tagsView/addView', tag)
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              console.log('fullPath 不一致，修正')
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    handleCommand(command) {
      if (command === 'refresh') {
        this.refreshSelectedTag()
      } else if (command === 'close') {
        this.closeSelectedTag(this.selectedTag)
      } else if (command === 'closeLeft') {
        this.closeLeft()
      } else if (command === 'closeRight') {
        this.closeRight()
      } else if (command === 'closeOther') {
        this.closeOthersTags()
      } else if (command === 'closeAll') {
        this.closeAllTags()
      }
    },
    refreshSelectedTag() {
      this.$store
        .dispatch('tagsView/delCachedView', this.selectedTag)
        .then(() => {
          const { fullPath } = this.selectedTag
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
        })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store
        .dispatch('tagsView/delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag()
        })
    },
    closeAllTags() {
      this.$store.dispatch('tagsView/delAllViews').then(({ historyViews }) => {
        if (
          this.selectedTag &&
          this.affixTags.some(tag => tag.path === this.selectedTag.path)
        ) {
          return
        }
        this.toLastView(historyViews, this.selectedTag)
      })
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ historyViews }) => {
          if (this.isActive(view)) {
            this.toLastView(historyViews, view)
          }
        })
    },
    closeLeft() {
      const index = this.selectedIndex
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delLeftViews', index).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeRight() {
      const index = this.selectedIndex
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delRightViews', index).then(() => {
        this.moveToCurrentTag()
      })
    },
    toLastView(historyViews, view) {
      const latestView = historyViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view && view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      this.menuPath = tag.path
      const menuMinWidth = 105
      // const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      // const rect = this.$el.getBoundingClientRect()
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX + 15 // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY
      // this.top = rect.top + rect.height
      this.visible = true
      // this.selectedTag = tag
    },
    closeMenu() {
      this.menuPath = ''
      this.visible = false
    }
  }
}
</script>
<style lang="css">
.ghost {
  opacity: 0.5;
  background-color: #c8ebfb !important;
}
</style>
<style lang="scss" scoped>
.el-popper {
  margin-top: 6px;
  &.el-dropdown-menu--medium {
    .el-dropdown-menu__item {
      font-size: 13px;
    }
  }
}
$tagViewSpanActiveBg: rgba(45, 140, 240, 0.15);
$tagViewSpanActiveColor: rgba(45, 140, 240, 1);
$tagViewSpanHoverBg: rgba(45, 140, 240, 0.06);
$tagViewSpanHoverColor: rgba(45, 140, 240, 0.6);
.tags-view-container {
  // transition: all 0.5s;
  height: $tagsViewHeight;
  background: $tagsViewBg;
  overflow: hidden;
  .flex {
    display: flex;
    margin-left: 12px;
    .bts {
      flex-grow: 0;
      padding-top: 6px;
      .bt {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        color: #515a6e;
      }
      .bt-none {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #515a6e;
        cursor: default;
      }
      .dr-bt {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: #fff;
        font-size: #515a6e;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .tv {
      flex-grow: 1;
      overflow: hidden;
    }
  }
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      .svg-icon {
        margin-right: 3px;
        width: 0.8em;
        height: 0.8em;
        vertical-align: -0.16em;
        fill: currentColor;
        overflow: hidden;
        color: #d8dadc;
      }
      .el-icon-close {
        width: 18px;
        height: 18px;
        line-height: 14px;
        font-size: 20px;
        vertical-align: 0px;
        display: inline-block;
        margin-right: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.7);
          display: inline-block;
          vertical-align: -2px;
          margin-left: -1px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
      user-select: none;
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: calc(#{$tagsViewHeight} - 10px);
      line-height: calc(#{$tagsViewHeight} - 11px);
      // border: 1px solid #d8dce5;
      color: #808695;
      font-size: 14px;
      background: #fff;
      border-radius: 1px;
      padding: 1px 4px 0 10px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        // background-color: $tagViewSpanActiveBg !important;
        color: $tagViewSpanActiveColor;
        .svg-icon {
          vertical-align: -0.16em;
          color: $tagViewSpanActiveColor;
        }
      }
      &:hover {
        // opacity: 0.8;
        // background-color: $tagViewSpanHoverBg !important;
        color: $tagViewSpanHoverColor;
        .svg-icon {
          color: $tagViewSpanHoverColor;
        }
        &.active {
          // opacity: 1;
          // background-color: $tagViewSpanActiveBg !important;
          color: $tagViewSpanActiveColor;
          .svg-icon {
            color: $tagViewSpanActiveColor;
          }
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
  .pr-span {
    padding-right: 5px;
  }
}
</style>
