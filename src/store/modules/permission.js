import {constantRoutes, asyncRoutes} from '@/router'

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []
  
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })
  
    return res
}

const actions = {
    generateRoutes({commit}, roles){
        return new Promise(resolve => {
            let accessRoutes
            accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
            
            commit('SET_ROUTES', accessRoutes)
            resolve(accessRoutes)
        })
    }
}

const mutations = {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
}

const state = {
    routes: [],
    addRoutes: []
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}