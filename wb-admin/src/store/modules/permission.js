import { asyncRoutes, constantRoutes } from '@/router'
import {
  getMenus,
  addMenu,
  updateList,
  updateMenu,
  deleteMenu,
  addPermission,
  updatePermission,
  deletePermission,
  getRoles,
  getRole,
  updateRole,
  addRoleMenu,
  updateRoleMenu
} from '@/store/api/permission'

/**
 * 通过判断 meta.menu 当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.menu) {
    /*
     * 如果这个路由 meta 有 menu 属性,就需要判断用户是否拥有此 menu 权限
     */
    return menus.indexOf(route.meta.menu) > -1
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      if (tmp.children && !tmp.hidden) {
        // 如果所有子菜单都是不显示的，那么这个菜单也设为不显示
        tmp.hidden = !tmp.children.some(item => !item.hidden)
      }

      res.push(tmp)
    }
  })

  return res
}

/**
 * 通过 menus 判断当前用户是否有权限
 * @param roles
 * @param route
 */
function isInMenus(menus, route) {
  return (route.name && menus[route.name]) || route.path === '*'
}

function filterRoutes(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterRoutes(tmp.children, menus)
      if (tmp.children.length > 0) {
        res.push(tmp)
      }
    } else {
      if (isInMenus(menus, tmp)) {
        res.push(tmp)
      }
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  // 获取路由
  generateRoutes({ commit }, { roleStatus, menuList }) {
    return new Promise(resolve => {
      const accessedRoutes = filterRoutes(asyncRoutes, menuList)
      // let accessedRoutes
      // if (roleStatus === 1) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAndFill(asyncRoutes, menuList)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // getMenus
  getMenus() {
    return getMenus()
  },
  // addMenu
  addMenu({ commit }, menu) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      // const menuInfo = {
      //   hidden: menu.get,
      //   icon: menuCode.trim(),
      //   label: menuName.trim(),
      //   menuId: menuCode.trim(),
      //   page: menuName.trim(),
      //   parentId: menuCode.trim()
      // }
      addMenu(menu)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // updateMenu
  updateMenu({ commit }, menu) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      // const menuInfo = {
      //   menuId,
      //   menuName: menuName.trim(),
      //   menuCode: menuCode.trim()
      // }
      updateMenu(menu)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // updateList
  updateList({ commit }, changeList) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      // const menuinfo = {
      //   menuList: menuList
      // }
      console.log(changeList)
      updateList(changeList)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // deleteMenu
  deleteMenu({ commit }, menuId) {
    return new Promise((resolve, reject) => {
      deleteMenu(menuId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // addPermission
  addPermission({ commit }, { permissionCode, permissionName, menuId }) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      const permissionInfo = {
        permissionCode: permissionCode.trim(),
        permissionName: permissionName.trim(),
        menuId
      }
      addPermission(permissionInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // updatePermission
  updatePermission(
    { commit },
    { permissionId, permissionCode, permissionName, menuId }
  ) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      const permissionInfo = {
        permissionId,
        permissionCode: permissionCode.trim(),
        permissionName: permissionName.trim(),
        menuId
      }
      updatePermission(permissionInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // deletePermission
  deletePermission({ commit }, permissionId) {
    return new Promise((resolve, reject) => {
      deletePermission(permissionId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // getRoles
  getRoles() {
    return getRoles()
  },
  // getRoles
  getRole({ commit }, id) {
    return getRole(id)
  },
  // updateRole
  updateRole({ commit }, roleInfo) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      updateRole(roleInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // addRoleMenu
  addRoleMenu({ commit }, roleInfo) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      addRoleMenu(roleInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // updateRoleMenu
  updateRoleMenu({ commit }, roleInfo) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      updateRoleMenu(roleInfo)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
