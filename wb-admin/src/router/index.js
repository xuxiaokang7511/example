import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import settingRouter from './modules/setting'
import commponentsRouter from './modules/commponents'
// import excelRouter from './modules/excel'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'

/**
 * 基础路由的属性说明
 * Note: 当子菜单中菜单数量>1才会显示，否则就跟父菜单合并
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   (默认 false)，当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * redirect: 'noRedirect'         重定向地址，在面包屑中点击会重定向去的地址，当设置为 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，最终子路由一定要填写，父路由可以不写!!!不然使用<keep-alive>时会出现各种问题
 * meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，则当前tag会被固定在 tags-view中（不可被删除）
    activeMenu: '/article/list'  如果设置了path, 则高亮显示(显示为选中效果)你设置path对应对侧边栏菜单
  }
 */

/**
 * 基础路由：constantRoutes
 * 没有权限要求的基页，所有人都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500'),
    hidden: true
  },
  {
    path: '/',
    // name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true
        }
      }, {
        path: 'reset',
        component: () => import('@/views/reset/index'),
        hidden: true,
        name: 'ResetPwd',
        meta: {
          title: '重置密码',
          icon: 'password'
        }
      }
    ]
  }
]

/**
 * 动态路由的属性说明
 * redirect: 'noRedirect'         重定向地址，在面包屑中点击会重定向去的地址，当设置为 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，最终子路由一定要填写，父路由可以不写!!!不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，则当前tag会被固定在 tags-view中（不可被删除）
    activeMenu: '/article/list'  如果设置了path, 则高亮显示(显示为选中效果)你设置path对应对侧边栏菜单
  }
 */

/**
 * 动态路由：asyncRoutes
 * 需要根据用户权限动态加载的路由
 */
export const asyncRoutes = [
  // 文章管理
  // {
  //   path: '/article',
  //   component: Layout,
  //   // name: 'Article',
  //   redirect: '/article/list',
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/article/create'),
  //       name: 'CreateArticle',
  //       meta: {
  //         title: '创建文章',
  //         activeMenu: '/article/list'
  //       }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/article/edit'),
  //       name: 'EditArticle',
  //       meta: {
  //         title: '编辑文章',
  //         activeMenu: '/article/list'
  //       }
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/article/list'),
  //       name: 'ArticleList',
  //       meta: {
  //         title: '文章管理'
  //       }
  //     }
  //   ]
  // },
  // 组件示例
  commponentsRouter,
  // excle
  // excelRouter,
  // 系统设置
  settingRouter,
  // 角色权限
  {
    path: '/role',
    component: Layout,
    // name: 'RolePermission',
    redirect: '/role/list',
    children: [
      {
        path: 'create',
        component: () => import('@/views/permission/role/create'),
        name: 'CreateRolePermission',
        meta: {
          activeMenu: '/role/list',
          title: '创建角色'
        }
      },
      {
        path: 'list',
        component: () => import('@/views/permission/role/list'),
        name: 'RolePermissionList',
        meta: {
          noCache: true,
          title: '角色权限'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/permission/role/edit'),
        name: 'EditRolePermission',
        meta: {
          activeMenu: '/role/list',
          title: '编辑角色'
        }
      }
    ]
  },

  // #region 屏蔽的路由

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // #endregion

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
