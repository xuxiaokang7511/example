<template>
  <!-- <div v-resize="handleScroll"> -->
  <div>
    <div ref="point" :class="classes" :style="styles">
      <slot></slot>
    </div>
    <div v-show="slot" :style="slotStyle"></div>
  </div>
</template>
<script>
import { on, off } from '@/js/libs/event'
const prefixCls = 'wb-affix'
function getScroll(target, top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}
function getOffset(element) {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  // const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  // const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop
    // ,
    // left: rect.left + scrollLeft - clientLeft
  }
}
export default {
  name: 'Affix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    // eslint-disable-next-line
    offsetBottom: {
      type: Number
    },
    // container: [String, HTMLElement]
    // HTMLElement 在 SSR 下不支持
    // eslint-disable-next-line
    container: null
  },
  data() {
    return {
      affix: false,
      styles: {},
      slot: false,
      slotStyle: {},
      scrollContainer: null
    }
  },
  computed: {
    offsetType() {
      let type = 'top'
      if (this.offsetBottom >= 0) {
        type = 'bottom'
      }
      return type
    },
    classes() {
      return [
        {
          [`${prefixCls}`]: this.affix
        }
      ]
    }
  },
  watch: {
    container() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.removeListener()
  },
  activated() {
    this.init()
  },
  deactivated() {
    this.removeListener()
  },
  methods: {
    handleScroll() {
      const affix = this.affix
      const scrollTop = getScroll(window, true)
      const elOffset = getOffset(this.$el)
      const windowHeight = window.innerHeight
      const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight
      // Fixed Top
      if (
        elOffset.top - this.offsetTop < scrollTop &&
        this.offsetType === 'top' &&
        !affix
      ) {
        this.affix = true
        this.slotStyle = {
          width: this.$refs.point.clientWidth + 'px',
          height: this.$refs.point.clientHeight + 'px'
        }
        this.slot = true
        this.styles = {
          top: `${this.offsetTop}px`,
          // left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        }
        this.$emit('on-change', true)
      } else if (
        elOffset.top - this.offsetTop > scrollTop &&
        this.offsetType === 'top' &&
        affix
      ) {
        this.slot = false
        this.slotStyle = {}
        this.affix = false
        this.styles = null
        this.$emit('on-change', false)
      }
      // Fixed Bottom
      if (
        elOffset.top + this.offsetBottom + elHeight >
          scrollTop + windowHeight &&
        this.offsetType === 'bottom' &&
        !affix
      ) {
        this.affix = true
        this.styles = {
          bottom: `${this.offsetBottom}px`,
          // left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        }
        this.$emit('on-change', true)
      } else if (
        elOffset.top + this.offsetBottom + elHeight <
          scrollTop + windowHeight &&
        this.offsetType === 'bottom' &&
        affix
      ) {
        this.affix = false
        this.styles = null
        this.$emit('on-change', false)
      }

      // if (
      //   this.styles &&
      //   elOffset.left &&
      //   this.styles.left !== `${elOffset.left}px`
      // ) {
      //   this.styles.left = `${elOffset.left}px`
      // }
    },
    getContainer() {
      this.scrollContainer = this.container
        ? typeof this.container === 'string'
          ? document.querySelector(this.container)
          : this.container
        : window
    },
    removeListener() {
      off(this.scrollContainer, 'scroll', this.handleScroll)
      off(window, 'resize', this.handleScroll)
    },
    init() {
      this.removeListener()
      this.getContainer()
      on(this.scrollContainer, 'scroll', this.handleScroll)
      on(window, 'resize', this.handleScroll)
      this.$nextTick(() => {
        this.handleScroll()
      })
    }
  }
}
</script>
<style lang="css">
.wb-affix {
  position: fixed;
  z-index: 8;
}
</style>
