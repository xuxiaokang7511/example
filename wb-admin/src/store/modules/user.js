import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  resetPwd
} from '@/store/api/user'
import { login, logout, getInfo } from '@/store/api/login'
import router, { resetRouter, constantRoutes } from '@/router'

const state = {
  token: false,
  username: '',
  // https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  rolename: '',
  roleStatus: 0,
  userId: '',
  // 1：专家，0：办公室人员
  usertype: 1
  // ,
  // permissions: []
}

/**
 * 递归处理服务端获取的菜单列表
 * @param {Array} menus_source
 */
function transMenus(menus_source) {
  const menus = []
  const menuList = {}

  menus_source.forEach(menu => {
    const tmp = { ...menu }
    if (tmp.children && tmp.children.length > 0) {
      const tMenu = transMenus(tmp.children)
      tmp.children = tMenu.menus
      Object.assign(menuList, tMenu.menuList)
    } else {
      delete tmp.children
    }
    // 有子菜单或者有page属性，过滤掉子菜单、page属性都没有的
    if (tmp.page || tmp.children) {
      // note 菜单id 改为 id
      if (tmp.menuId) {
        const id = tmp.menuId
        delete tmp.menuId
        tmp.id = id
      }
      menus.push(tmp)
      if (!tmp.children) {
        // 将最终子菜单推到扁平化数组中
        if (!menuList[tmp.page]) {
          menuList[tmp.page] = tmp
        }
      }
    }
  })
  return { menus, menuList }
}
/**
 * 是否需要在菜单中显示
 * @param roles
 * @param route
 */
function isMenus(route) {
  return !route.hidden || route.name
}

/**
 * 从constantRoutes中提取需要的菜单
 * @param {*} routes
 */
function baseMenus(routes) {
  const base_menus = []
  const base_menuList = {}

  routes.forEach(route => {
    const tmp = { ...route }
    let menu = {}
    if (tmp.children && tmp.children.length > 0) {
      if (isMenus(tmp)) {
        const tMenu = baseMenus(tmp.children)
        if (!tmp.hidden) {
          const children = tMenu.base_menus
          if (children.length > 1) {
            // note: 菜单对象
            menu.page = tmp.name
            menu.label = tmp.meta.title || '页面'
            menu.icon = tmp.meta.icon || ''
            menu.children = children
            menu.id = tmp.name
          } else {
            // 合并层级
            menu = children[0]
          }
          base_menus.push(menu)
        }
        Object.assign(base_menuList, tMenu.base_menuList)
      }
    } else {
      if (isMenus(tmp)) {
        // note: 菜单对象
        menu.page = tmp.name
        menu.label = tmp.meta.title || '页面'
        menu.icon = tmp.meta.icon || ''
        menu.id = tmp.name
        if (!tmp.hidden) {
          base_menus.push(menu)
        }
        base_menuList[menu.page] = menu
      }
    }
  })

  return { base_menus, base_menuList }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLENAME: (state, rolename) => {
    state.rolename = rolename
  },
  SET_ROLENAMESTATUS: (state, roleStatus) => {
    state.roleStatus = roleStatus
  },
  SET_USERTYPE: (state, usertype) => {
    state.usertype = usertype
  }

  // ,
  // SET_PERMISSIONS: (state, permissions) => {
  //   state.permissions = permissions
  // }
}

const actions = {
  // user login
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      // @RequestParam
      // const data = new FormData()
      // data.append('userName', username.trim())
      // data.append('passWord', password)

      // @RequestBod
      const userInfo = {
        userName: username.trim(),
        pwd: password
      }
      login(userInfo)
        .then(response => {
          commit('SET_TOKEN', true)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('验证失败，请重新登录。')
          }
          const { userPermission } = data
          const {
            roleName,
            roleStatus,
            userName,
            userType,
            userId,
            menus_source
            // permissionList
          } = userPermission

          // todo: 模拟的用户拥有权限的菜单，服务端需要更换menuList为menus_source
          const { menus, menuList } = transMenus(menus_source)
          const { base_menus, base_menuList } = baseMenus(constantRoutes)

          commit('SET_ROLENAME', roleName)
          commit('SET_ROLENAMESTATUS', roleStatus)
          commit('SET_USERNAME', userName)
          commit('SET_USERID', userId)
          commit('SET_USERTYPE', userType)
          resolve({
            roleStatus,
            menuList,
            menus: [...base_menus, ...menus],
            menuObj: {
              ...base_menuList,
              ...menuList
            }
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', false)
          commit('SET_ROLENAME', '')

          // reset visited views and cached views
          dispatch('tagsView/delAllViews', null, { root: true })

          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    // console.log('resetToken')
    return new Promise(resolve => {
      commit('SET_TOKEN', false)
      commit('SET_ROLENAME', '')
      resolve()
    })
  },

  // 重置角色
  resetRole({ commit, dispatch }) {
    return new Promise(async(resolve, reject) => {
      try {
        commit('SET_TOKEN', true)

        const { userPermission } = await dispatch('getInfo')
        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch(
          'permission/generateRoutes',
          userPermission,
          { root: true }
        )

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // getUsers
  getUsers({ commit }, { pageNum = 1, pageSize = 10 }) {
    return new Promise((resolve, reject) => {
      // @RequestParam
      const data = new FormData()
      data.append('pageNum', pageNum)
      data.append('pageSize', pageSize)
      getUsers(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // addUser
  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      // @RequestBody
      addUser(user)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // updateUser
  updateUser({ commit }, user) {
    // debugger
    return new Promise((resolve, reject) => {
      updateUser(user)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // updateUser
  resetPwd({ commit }, { oldPwd, newPwd }) {
    // debugger
    return new Promise((resolve, reject) => {
      const data = { oldPwd, newPwd }
      resetPwd(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // deleteUser
  deleteUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      deleteUser(userId)
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
