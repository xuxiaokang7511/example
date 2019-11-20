const methods = {
  getThemeColor() {
    if (this.$store.state.settings.theme.color === 'light') {
      return 'light'
    } else if (this.$store.state.settings.theme.color === 'color') {
      return 'color'
    } else {
      return 'dark'
    }
  },
  getThemeStyle() {
    if (this.$store.state.settings.theme.style === 'light') {
      return 'light'
    } else {
      return 'dark'
    }
  },
  getTheme() {
    return this.getThemeColor() + '-' + this.getThemeStyle()
  },
  getStyle(element, attr) {
    if (element.currentStyle) {
      return element.currentStyle[attr]
    } else {
      return getComputedStyle(element, false)[attr]
    }
  },
  setMainBg(color) {
    document.querySelector('.main-container').style.backgroundColor = color
  },
  setRouteTitle(title, route) {
    // set tagsview title
    if (this.$route.name === route.name) {
      const _route = Object.assign({}, route, { title })
      this.$store.dispatch('tagsView/updateVisitedView', _route)
    }
    // set page title
    document.title = title
  }
}
export default methods
