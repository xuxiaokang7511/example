<template>
  <div :class="anchorLinkClasses">
    <a
      :class="linkTitleClasses"
      :href="href"
      :data-scroll-offset="scrollOffset"
      :data-href="href"
      :title="title"
      @click.prevent="goAnchor"
    >{{ title }}</a>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'AnchorLink',
  inject: ['anchorCom'],
  props: {
    // eslint-disable-next-line
    href: String,
    // eslint-disable-next-line
    title: String,
    scrollOffset: {
      type: Number,
      default() {
        return this.anchorCom.scrollOffset
      }
    }
  },
  data() {
    return {
      prefix: 'wb-anchor-link'
    }
  },
  computed: {
    anchorLinkClasses() {
      return [
        this.prefix,
        this.anchorCom.currentLink === this.href ? `${this.prefix}-active` : ''
      ]
    },
    linkTitleClasses() {
      return [`${this.prefix}-title`]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.anchorCom.init()
    })
  },
  methods: {
    goAnchor() {
      this.currentLink = this.href
      this.anchorCom.handleHashChangeUrl(this.href)
      // console.log('goAnchor')
      this.anchorCom.handleScrollTo()
      // this.anchorCom.$emit('on-select', this.href)
      // const isRoute = this.$router
      // if (isRoute) {
      //   this.$router.push(this.href, () => {})
      // } else {
      //   window.location.href = this.href
      // }
    }
  }
}
</script>
<style lang="css">
.wb-anchor-link {
  padding: 8px 0 8px 16px;
  line-height: 1;
}
.wb-anchor-link-title {
  display: block;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  color: #515a6e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}
.wb-anchor-link-title:only-child {
  margin-bottom: 0;
}
.wb-anchor-link-active > .wb-anchor-link-title {
  color: #2d8cf0;
}
.wb-anchor-link .wb-anchor-link {
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
