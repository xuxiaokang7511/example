<template>
  <div class="content-main" :class="{nohead:!showHead}">
    <content-head v-if="showHead" :height="titleHeight" :show-flag="showFlag">
      <slot name="title"></slot>
      <template #right>
        <slot name="right"></slot>
      </template>
    </content-head>
    <content-body
      v-if="showBody"
      :top="showHead?titleHeight:'0px'"
      :foot-height="showFoot?footHeight:'0px'"
      :show-foot="showFoot"
    >
      <slot />
      <template #foot>
        <slot name="foot"></slot>
      </template>
    </content-body>
  </div>
</template>

<script>
import ContentHead from './ContentHead'
import ContentBody from './ContentBody'
export default {
  name: 'ContentMain',
  components: { ContentHead, ContentBody },
  props: {
    /**
     * 标题栏高度，默认值：48px
     */
    titleHeight: {
      type: String,
      default: '48px'
    },
    /**
     * 底部栏高度，默认值：48px
     */
    footHeight: {
      type: String,
      default: '48px'
    },
    /**
     * 显示标记，默认值：true
     */
    showFlag: {
      type: Boolean,
      default: true
    },
    /**
     * 显示头部，默认值：true
     */
    showHead: {
      type: Boolean,
      default: true
    },
    /**
     * 显示主体，默认值：true
     */
    showBody: {
      type: Boolean,
      default: true
    },
    /**
     * 显示底部，默认值：true
     */
    showFoot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main {
  width: 100%;
  height: 100%;
  /deep/ .content-body {
    border-top: none;
  }
  &.nohead {
    /deep/ .content-body {
      border-top: 1px solid #e6e6e6;
    }
  }
}
</style>
