import request from '@/js/libs/request'
//  全部菜单
export function getMenus() {
  return request({
    url: '/menu/queryAll',
    method: 'post'
  })
}
// 添加菜单
export function addMenu(data) {
  return request({
    url: '/menu/addMenu',
    method: 'post',
    data
  })
}
export function updateList(data) {
  return request({
    url: '/menu/updateList',
    method: 'POST',
    data
  })
}
export function updateMenu(data) {
  return request({
    url: '/menu/update',
    method: 'put',
    data
  })
}
// 删除
export function deleteMenu(id) {
  return request({
    url: '/menu/delete',
    params: {
      menuId: id
    },
    method: 'delete'
  })
}

export function addPermission(data) {
  return request({
    url: '/permission/add',
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: '/permission/update',
    method: 'put',
    data
  })
}

export function deletePermission(id) {
  return request({
    url: '/permission/delete',
    params: {
      id: id
    },
    method: 'delete'
  })
}

export function getRoles() {
  return request({
    url: '/role/queryAll',
    method: 'get'
  })
}

export function getRole(id) {
  return request({
    url: '/role/query',
    params: {
      roleId: id
    },
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

export function updateRoleMenu(data) {
  return request({
    url: '/role/updateRoleMenu',
    method: 'post',
    data
  })
}
export function addRoleMenu(data) {
  return request({
    url: '/role/addRoleMenu',
    method: 'post',
    data
  })
}
