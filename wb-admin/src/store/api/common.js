import request from '@/js/libs/request'

export function imgUpload(file) {
  return request({
    url: '/file/imgUpload',
    method: 'post',
    data: file
  })
}
