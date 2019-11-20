import request from '@/js/libs/request'

export function getExcel() {
  return request({
    url: '/excel/getExcel',
    method: 'get'
  })
}
export function getAllExcel({ pageNum = 1, pageSize = 10 }) {
  return request({
    url: '/excel/getAllExcel',
    method: 'get',
    params: { pageNum, pageSize }
  })
}
export function impExcel(file) {
  // @RequestParam
  const data = new FormData()
  data.append('file', file)
  return request({
    url: '/excel/impExcel',
    method: 'post',
    data: data
  })
}
