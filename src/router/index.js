import Vue from 'vue'
import Router from 'vue-router'

// 启用路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/login1',
      name: 'login1',
      component: () => import('@/views/login1')
    },
    {
      path: '/home',
      redirect: '/unApproved',
      name: 'home',
      component: () => import('@/views/home'),
      children: [
        {
          path: '/superManager',
          name: '後臺賬號資料管理',
          component: () => import('@/views/superManager'),
          meta: {
              requireAuth: true
          }
        }, 
        {
          path: '/memberManager',
          name: '會員資料管理',
          component: () => import('@/views/memberManager'),
          meta: {
              requireAuth: true
          }
        }, 
        {
          path: '/unApproved',
          name: '待審核',
          component: () => import('@/views/unApproved'),
          meta: {
              requireAuth: true
          }
        }, 
        {
          path: '/unMerge',
          name: '未合併',
          component: () => import('@/views/unMerge'),
          meta: {
              requireAuth: true
          }
        }, 
        {
          path: '/hasMerge',
          name: '已合併',
          component: () => import('@/views/hasMerge'),
          meta: {
              requireAuth: true
          }
        }, 
        {
          path: '/bidOpeningResult',
          name: '開標結果',
          component: () => import('@/views/bidOpeningResult'),
          meta: {
              requireAuth: true
          }
        },
        {
          path: '/unPublish',
          name: '未發佈',
          component: () => import('@/views/unPublish'),
          meta: {
              requireAuth: true
          }
        },
        {
          path: '/hasPublish',
          name: '已發佈',
          component: () => import('@/views/hasPublish'),
          meta: {
              requireAuth: true
          }
        },
      ]
    },
  ]
})