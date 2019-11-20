import variables from '@/assets/styles/variables.scss'
const computed = {
  // 顶栏字体色
  headerText() {
    const color = this.getThemeColor()
    return variables[color + 'HeaderText']
  },
  // 顶栏导航选中菜单色
  headrActiveText() {
    const color = this.getThemeColor()
    return variables[color + 'HeaderActiveText']
  },
  // 菜单字体色
  menuText() {
    const style = this.getThemeStyle()
    return variables[style + 'MenuText']
  },
  mainScroll() {
    return this.$store.state.settings.fixedFooter &&
      this.$store.state.settings.footer &&
      this.$store.state.settings.fixedHeader
      ? '.app-main'
      : ''
  }
}
export default computed
