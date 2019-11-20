module.exports = {
  title: '管理系统',

  /**
   * @type {string} dark | light | color
   * @description 主色
   */
  color: 'light',

  /**
   * @type {string} dark | light
   * @description 风格
   */
  style: 'light',

  /**
   * @type {boolean} true | false
   * @description 是否开启 tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description tag 图标
   */
  tagsIcon: true,

  /**
   * @type {boolean} true | false
   * @description 面包屑 图标
   */
  breadcrumbIcon: true,

  /**
   * @type {boolean} true | false
   * @description 是否开启 footer
   */
  footer: true,

  /**
   * @type {boolean} true | false
   * @description 是否开启 topMenu
   */
  topMenu: false,

  /**
   * @type {boolean} true | false
   * @description 是否固定 footer
   */
  fixedFooter: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定 footer
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否在 sidebar 中显示 logo
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description 只有一个菜单是否在 sidebar 中显示
   */
  oneChild: false,

  /**
   * @type {boolean} true | false
   * @description 头部通栏
   */
  fullHeader: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'development'
}
