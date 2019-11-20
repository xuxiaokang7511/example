import { clone } from '@/js/libs'
import { isExternal } from '@/js/libs/validate'
import path from 'path'

const state = {
  menus: [],
  menuObj: {},
  currentMenu: null
}

function resolvePath(basePath, routePath) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(basePath)) {
    return basePath
  }
  return path.resolve(basePath, routePath)
}

/**
 * 设置 menuObj 的 basePath 和 path
 * @param {*} menuObj
 * @param {*} routes
 * @param {*} basePath
 */
function fillMenuPath(menuObj, routes, basePath) {
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.name || tmp.children) {
      if (tmp.children && tmp.children.length > 0) {
        fillMenuPath(menuObj, tmp.children, tmp.path)
      } else {
        const _obj = menuObj[tmp.name]
        if (_obj) {
          _obj.basePath = basePath
          _obj.redirect = tmp.redirect || ''
          _obj.path = resolvePath(basePath, tmp.path)
        }
      }
    }
  })
}

/**
 * 设置 menuObj 的 paths 和 ids ，并过滤掉没有path的
 */
function fillMenuParent(menuObj, menus, pages = []) {
  menus.forEach(menu => {
    const tmp = { ...menu }

    const tmpPages = [...pages]
    const _page = {
      id: tmp.id || null,
      icon: tmp.icon || null,
      label: tmp.label || null,
      page: tmp.page || null
    }
    tmpPages.push(_page)

    if (tmp.children && tmp.children.length > 0) {
      fillMenuParent(menuObj, tmp.children, tmpPages)
    } else {
      const _obj = menuObj[tmp.page]
      if (_obj) {
        if (_obj.path) {
          _obj.pages = tmpPages
        } else {
          delete menuObj[tmp.page]
        }
      }
    }
  })
}
/**
 * 过滤隐藏的菜单，并分别统计每个菜单项中的最终子菜单数量
 * @param {*} children
 * @param {*} menuObj
 */
function childCount(children, menuObj) {
  let count = 0
  const delArr = []
  for (let i = 0; i < children.length; i++) {
    const menu = children[i]
    if (menu.children) {
      const ret = childCount(menu.children, menuObj)
      menu.showCount = ret.count
      menu.children = ret.children
      count = count + ret.count
      if (menu.children.length === 0 && !menuObj[menu.page]) {
        delArr.push(i)
      }
    } else {
      if (menuObj[menu.page] && !menu.hidden) {
        menu.showCount = 1
        count++
      } else {
        delArr.push(i)
      }
    }
  }
  children = children.filter((m, index) => {
    return delArr.indexOf(index) === -1
  })
  return { count, children }
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_MENUOBJ: (state, menuObj) => {
    state.menuObj = menuObj
  },
  SET_CURRENTMENU: (state, currentMenu) => {
    state.currentMenu = currentMenu
  }
}

const actions = {
  setMenu({ commit }, { menus, menuObj }) {
    commit('SET_MENUS', menus)
    commit('SET_MENUOBJ', menuObj)
  },
  setCurrentMenu({ commit }, menu) {
    commit('SET_CURRENTMENU', menu)
  },
  handleMenu({ commit, state }, routes) {
    const menuObj = clone(state.menuObj)
    fillMenuPath(menuObj, routes, '')
    fillMenuParent(menuObj, state.menus)

    let menus = clone(state.menus)
    menus = childCount(menus, menuObj).children

    commit('SET_MENUOBJ', menuObj)
    commit('SET_MENUS', menus)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
