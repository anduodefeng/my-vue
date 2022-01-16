import request from '@/utils/request'

export function getChart(){
  return request({
    url: '/cash/chart',
    method: 'GET'
  })
}

export function getList(data) {
  return request({
    url: '/cash/page',
    method: 'POST',
    data
  })
}

export function getBankNames(){
  return request({
    url: '/cash/bankNames',
    method: 'POST'
  })
}

export function saveCashDetail(data){
  return request({
    url: '/cash/change',
    method: 'POST',
    data
  })
}

export function getCashDetail(data){
  return request({
    url: '/cash/detailPage',
    method: 'POST',
    data
  })
}
