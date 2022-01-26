import request from '@/utils/request'

export function getChart(data){
    return request({
      url: '/portfolio/chart/'+data,
      method: 'GET'
    })
}

export function getPortfolioList(data){
    return request({
        url: '/portfolio/page',
        method: 'POST',
        data
    })
}

export function getPortfolioInfos(data){
    return request({
        url: '/portfolio/infos',
        method: 'POST',
        data
    })
}

export function getPortfolioInfo(data){
    return request({
        url: '/portfolio/info',
        method: 'POST',
        data
    })
}

export function savePortfolioChange(data){
    return request({
        url: '/portfolio/change',
        method: 'POST',
        data
    })
}

export function getDetailChart(data){
    return request({
        url: '/portfolio/detail/chart/'+data,
        method: 'GET',
    })
}

export function getPortfolioDetail(data){
    return request({
        url: '/portfolio/detailPage',
        method: 'POST',
        data
    })
}