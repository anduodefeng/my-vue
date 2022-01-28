import request from '@/utils/request'

export function getIndexData(){
    return request({
      url: '/dashboard/index',
      method: 'GET'  
    })
}