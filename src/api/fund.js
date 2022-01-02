import request from '@/utils/request'

export function getFundList(data){
    return request({
        url: '/fund/page',
        method: 'POST',
        data
    })
}

export function getFundInfos(data){
    return request({
        url: '/fund/fundInfos',
        method: 'POST',
        data
    })
}

export function getFundInfo(data){
    return request({
        url: '/fund/getFundInfo',
        method: 'POST',
        data
    })
}

export function saveFundDetail(data){
    return request({
        url: '/fund/change',
        method: 'POST',
        data
    })
}

export function getFundDetail(data){
    return request({
        url: '/fund/detailPage',
        method: 'POST',
        data
    })
}