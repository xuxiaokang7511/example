import request from '@/js/libs/request'

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function getUsers(data) {
  return request({
    url: '/user/queryAll',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/delete',
    params: {
      userId: id
    },
    method: 'delete'
  })
}

export function resetPwd(data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}
