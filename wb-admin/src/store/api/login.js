import request from '@/js/libs/request'
export function login(data) {
  return request({
    url: '/user/authLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'post',
    noBox: true
  })
  // return new Promise((resolve, reject) => {
  //   reject(new Error('错误'))
  // })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
