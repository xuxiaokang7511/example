import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/js/libs/get-page-title'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 取消之前路由还未完成的请求，避免上一个路由的请求结果在当前路由页面提示
  // store.dispatch('axios/clearCancles')

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.state.user.token
  // console.log('beforeEach ' + hasToken + ' ' + store.getters.role)
  // debugger
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // 确定用户是否已经通过getinfo获取了权限角色
      if (store.getters.rolename) {
        next()
      } else {
        try {
          // get user info
          const userPermission = await store.dispatch('user/getInfo')

          const { roleStatus, menuList, menus, menuObj } = userPermission
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            { roleStatus, menuList }
          )

          await store.dispatch('menu/setMenu', { menus, menuObj })

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          await store.dispatch('menu/handleMenu', store.state.permission.routes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error.message || error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
