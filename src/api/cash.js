import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/cash/page',
    method: 'post',
    data
  })
}
