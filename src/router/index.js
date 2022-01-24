import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/assetsTotal',
    children: [{
      path: 'assetsTotal',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '资产总览', icon: 'assets-overview' }
    }]
  },

  {
    path: '/assets',
    component: Layout,
    meta: { title: '资金', icon: 'assets-amount' },
    redirect: '/assets/cashIndex',
    children: [
      {
        path: 'cashIndex',
        name: 'cashIndex',
        component: () => import('@/views/assets/cash/index'),
        meta: { title: '现金', icon: 'money' }
      },
      {
        path: 'cashDetail',
        name: 'cashDetail',
        hidden: true,
        component: () => import('@/views/assets/cash/detail'),
        meta: { title: '明细', icon: 'money' }
      },
      {
        path: 'fund',
        name: 'fund',
        meta: { title: '基金', icon: 'financial' },
        component: () => import('@/views/assets/fund/index'),
        children: [
          {
            path: 'indexFund',
            name: 'indexFund',
            component: () => import('@/views/assets/fund/index-fund/index'),
            meta: { title: '指数基金', icon: 'money'}
          },
          {
            path: 'indexFundDetail',
            name: 'indexFundDetail',
            hidden: true,
            component: () => import('@/views/assets/fund/index-fund/detail'),
            meta: { title: '指数基金', icon: 'money'}
          },
          {
            path: 'activeFund',
            name: 'activeFund',
            component: () => import('@/views/assets/fund/active-fund/index'),
            meta: { title: '主动基金', icon: 'money'}
          },
          {
            path: 'activeFundDetail',
            name: 'activeFundDetail',
            hidden: true,
            component: () => import('@/views/assets/fund/active-fund/detail'),
            meta: { title: '主动基金', icon: 'money'}
          },
          {
            path: 'monetaryFund',
            name: 'monetaryFund',
            component: () => import('@/views/assets/fund/monetary-fund/index'),
            meta: { title: '货币基金', icon: 'money'}
          },
          {
            path: 'monetaryFundDetail',
            name: 'monetaryFundDetail',
            hidden: true,
            component: () => import('@/views/assets/fund/monetary-fund/detail'),
            meta: { title: '货币基金', icon: 'money'}
          },
          {
            path: 'ETFFund',
            name: 'ETFFund',
            component: () => import('@/views/assets/fund/etf-fund/index'),
            meta: { title: 'ETF基金', icon: 'money'}
          },
          {
            path: 'ETFFundDetail',
            name: 'ETFFundDetail',
            hidden: true,
            component: () => import('@/views/assets/fund/etf-fund/detail'),
            meta: { title: 'ETF基金', icon: 'money'}
          },
        ]
      },
      {
        path: 'portfolio',
        name: 'portfolio',
        meta: { title: '组合', icon: 'financial' },
        component: () => import('@/views/assets/portfolio/index'),
        children: [
          {
            path: 'egg-roll',
            name: 'egg-roll',
            component: () => import('@/views/assets/portfolio/egg-roll/index'),
            meta: { title: '蛋卷平台', icon: 'money'}
          },
          {
            path: 'egg-roll-detail',
            name: 'egg-roll-detail',
            hidden: true,
            component: () => import('@/views/assets/portfolio/egg-roll/detail'),
            meta: { title: '蛋卷平台', icon: 'money'}
          },
          {
            path: 'qie-man',
            name: 'qie-man',
            component: () => import('@/views/assets/portfolio/qie-man/index'),
            meta: { title: '且慢平台', icon: 'money'}
          },
          {
            path: 'qie-man-detail',
            name: 'qie-man-detail',
            hidden: true,
            component: () => import('@/views/assets/portfolio/qie-man/detail'),
            meta: { title: '且慢平台', icon: 'money'}
          }
        ]
      }
    ]
  },
  {
    path: '/debt',
    component: Layout,
    redirect: '/debt/creditIndex/',
    meta: { title: '负债', icon: 'debt' },
    children: [
      {
        path: 'creditIndex',
        component: () => import('@/views/debt/credit-card/index'),
        name: 'creditIndex',
        meta: { title: '信用卡', icon: 'credit'},
      },
      {
        path: 'creditDetail',
        hidden: true,
        component: () => import('@/views/debt/credit-card/detail'),
        name: 'creditDetail',
        meta: { title: '信用卡', icon: 'credit'},
      },
      {
        path: 'otherDebt',
        component: () => import('@/views/debt/other-debt/index'), 
        name: 'otherDebt',
        meta: { title: '其他', icon: 'other' },
      }
    ]
  }
]

/**
 * 动态路由，需要配合权限使用,根据请求user/info接口返回的roles列表
 * @returns 
 */
export const asyncRoutes = [
  {
    path: '/myRoutes1',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tree/index'),
        name: 'Icons',
        meta: { title: '我的路由', icon: 'tree', roles: ['test'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
