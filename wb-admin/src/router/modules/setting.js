/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingRouter = {
  path: '/syssetting',
  component: Layout,
  redirect: 'noRedirect',
  // name: 'SysSetting',
  meta: {
    title: '系统设置',
    icon: 'setting'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/permission/user'),
      name: 'User',
      meta: {
        title: '用户管理'
      }
    },
    {
      path: '/menu',
      component: () => import('@/views/permission/menu'),
      name: 'Menu',
      meta: {
        title: '菜单管理',
        icon: 'menumanage'
      }
    },
    {
      path: '/theme',
      component: () => import('@/views/theme/index'),
      name: 'Theme',
      meta: {
        title: '布局主题'
      }
    },
    {
      path: '/theme/element',
      component: () => import('@/views/theme/element'),
      name: 'Element',
      meta: {
        title: 'Element主题'
      }
    }
  ]
}

export default settingRouter
