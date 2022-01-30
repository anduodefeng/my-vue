import request from '@/utils/request'

export function getChart(){
  return request({
    url: '/creditCard/chart',
    method: 'GET'
  })
}

export function getList(data) {
  return request({
    url: '/creditCard/page',
    method: 'POST',
    data
  })
}

export function getBankNames(){
  return request({
    url: '/creditCard/bankNames',
    method: 'GET'
  })
}

export function getBankInfo(bankName){
  return request({
    url: '/creditCard/bankInfo/'+bankName,
    method: 'GET'
  })
}

export function saveDetail(data){
  return request({
    url: '/creditCard/change',
    method: 'POST',
    data
  })
}

export function getDetailChart(data){
  return request({
    url: '/creditCard/detailChart/'+data,
    method: 'GET'
  })
}

export function getDetail(data){
  return request({
    url: '/creditCard/detailPage',
    method: 'POST',
    data
  })
}
