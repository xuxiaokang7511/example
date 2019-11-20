/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const commponentsRouter = {
  path: '/example',
  component: Layout,
  // name: 'Example',
  meta: {
    title: '组件示例'
  },
  children: [
    // Icons
    {
      path: '/icon',
      component: () => import('@/views/components-demo/icons-demo'),
      name: 'Icons',
      meta: { title: '图标' }
    },
    // 上传
    {
      path: 'upload',
      component: () => import('@/views/components-demo/upload'),
      name: 'UploadDemo',
      meta: { title: '上传' }
    },
    {
      path: 'cropper-upload',
      component: () => import('@/views/components-demo/cropper-upload'),
      name: 'CropperUploadDemo',
      meta: { title: '图片裁剪' }
    },
    // 富文本编辑器
    {
      path: 'tinymce5',
      component: () => import('@/views/components-demo/tinymce5'),
      name: 'TinymceDemo5',
      meta: { title: '富文本编辑器' }
    },
    // 自定义加载
    {
      path: 'loading',
      component: () => import('@/views/components-demo/loading'),
      name: 'Loading',
      meta: { title: '自定义加载' }
    },
    // List组件
    {
      path: 'list',
      component: () => import('@/views/components-demo/list'),
      name: 'ListDemo',
      meta: { title: '列表示例' }
    },
    // Cell组件
    {
      path: 'cell',
      component: () => import('@/views/components-demo/cell'),
      name: 'CellDemo',
      meta: { title: '单元格示例' }
    },
    // Anchor组件
    {
      path: 'anchor',
      component: () => import('@/views/components-demo/anchor'),
      name: 'AnchorDemo',
      meta: { title: '锚点示例' }
    },
    // Anchor组件
    {
      path: 'affix',
      component: () => import('@/views/components-demo/affix'),
      name: 'AffixDemo',
      meta: { title: '图钉示例' }
    },
    // Time组件
    {
      path: 'time',
      component: () => import('@/views/components-demo/time'),
      name: 'TimeDemo',
      meta: { title: '相对时间示例' }
    },
    // 小组件
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' }
    }
    // ,
    // // 权限测试页
    // {
    //   path: 'directive',
    //   component: () => import('@/views/permissionTest/directive'),
    //   name: 'DirectivePermission',
    //   meta: {
    //     title: '指令权限',
    //     icon: 'directive'
    //   }
    // }
  ]
}

export default commponentsRouter
