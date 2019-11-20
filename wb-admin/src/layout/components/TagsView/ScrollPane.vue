<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing
// import { Tween } from '@createjs/tweenjs'
export default {
  name: 'ScrollPane',
  data() {
    return {
      // tween: null
      interval: null,
      isMoving: false
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll(e) {
      if (this.isMoving) return
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft =
        $scrollWrapper.scrollLeft + (-1 * eventDelta) / 4
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$parent.$refs.tag

      let firstTag = null
      let lastTag = null
      let left = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        left = 0
      } else if (lastTag === currentTag) {
        left = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          left = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          left = beforePrevTagOffsetLeft
        }
      }
      left !== null && this.tween($scrollWrapper, left)
    },
    move(span) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper

      let left = $scrollWrapper.scrollLeft + span
      const maxLeft = $scrollWrapper.scrollWidth - $containerWidth

      if (left < 0) {
        left = 0
      } else if (left > maxLeft) {
        left = maxLeft
      }
      this.tween($scrollWrapper, left)
    },
    tween(el, left) {
      if (this.isMoving) return
      const start = el.scrollLeft
      let i = 0
      const offset = left - el.scrollLeft
      if (offset === 0) return
      this.isMoving = true
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, offset, 200))
        if ((offset / Math.abs(offset)) * (next - left) >= 0) {
          el.scrollLeft = left
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          el.scrollLeft = next
        }
        i++
      }, 16.7)
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b
      return (-c / 2) * (--t * (t - 2) - 1) + b
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
      display: none;
    }
    .el-scrollbar__wrap {
      padding-top: 2px;
      // height: calc(#{$tagsViewHeight} + 15px);
      height: calc(#{$tagsViewHeight} + 19px);
      /*定义滚动条轨道 内阴影+圆角*/
      &::-webkit-scrollbar-track {
        background: transparent !important;
      }
      /*定义滑块 内阴影+圆角*/
      &::-webkit-scrollbar-thumb {
        background-color: transparent !important;
      }
    }
  }
}
</style>
