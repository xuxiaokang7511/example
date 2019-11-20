const getters = {
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  rolename: state => state.user.rolename,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  cachedViews: state => state.tagsView.cachedViews,
  menus: state => state.menu.menus,
  menuObj: state => state.menu.menuObj,
  errorLogs: state => state.errorLog.logs

  // token: state => state.user.token,
  // visitedViews: state => state.tagsView.visitedViews,
  // roleStatus: state => state.user.roleStatus,
  // permissions: state => state.user.permissions,
  // permission_routes: state => state.permission.routes,
}
export default getters
