const menus_source = [
  {
    id: 14,
    label: '组件示例',
    icon: 'example',
    children: [
      { id: 18, label: '图标', icon: 'icon', page: 'Icons' },
      { id: 19, label: '上传', icon: 'upload', page: 'UploadDemo' },
      { id: 20, label: '图片裁剪', icon: 'edit', page: 'CropperUploadDemo' },
      { id: 21, label: '富文本编辑器', icon: 'tinymce', page: 'TinymceDemo5' },
      { id: 22, label: '自定义加载', icon: 'loading', page: 'Loading' },
      { id: 23, label: '列表', icon: 'list', page: 'ListDemo' },
      { id: 24, label: '单元格', icon: 'cell', page: 'CellDemo' },
      { id: 25, label: '锚点', icon: 'anchor', page: 'AnchorDemo' },
      { id: 26, label: '图钉', icon: 'affix', page: 'AffixDemo' },
      { id: 27, label: '相对时间', icon: 'time', page: 'TimeDemo' },
      { id: 28, label: '小组件', icon: 'component', page: 'ComponentMixinDemo' }
    ]
  },
  {
    id: 5,
    label: '系统设置',
    icon: 'setting',
    children: [
      { id: 6, label: '用户管理', icon: 'peoples', page: 'User' },
      { id: 12, label: '菜单管理', icon: 'menumanage', page: 'Menu' },
      {
        id: 8,
        page: 'RolePermission',
        label: '角色管理',
        icon: 'lock',
        children: [
          {
            id: 9,
            page: 'CreateRolePermission',
            label: '创建角色',
            icon: 'lock',
            hidden: true
          },
          {
            id: 10,
            page: 'RolePermissionList',
            label: '角色权限',
            icon: 'lock'
          },
          {
            id: 11,
            page: 'EditRolePermission',
            label: '编辑角色',
            icon: 'edit',
            hidden: true
          }
        ]
      },
      { id: 7, label: '布局主题', icon: 'layout', page: 'Theme' },
      { id: 13, label: 'Element主题', icon: 'theme', page: 'Element' }
    ]
  }
]

export { menus_source }
