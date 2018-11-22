import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
// 班机航线平台
import PlatformLog from '@/views/manage/log'
import PlatformMenu from '@/views/manage/menu'
import PlatformOrg from '@/views/manage/organization'
import PlatformRole from '@/views/manage/role'
import PlatformUser from '@/views/manage/user'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/log',
      name: 'platform.log',
      component: PlatformLog
    },
    {
      path: '/menu',
      name: 'platform.menu',
      component: PlatformMenu
    },
    {
      path: '/org',
      name: 'platform.org',
      component: PlatformOrg
    },
    {
      path: '/role',
      name: 'platform.role',
      component: PlatformRole
    },
    {
      path: '/',
      name: 'platform.user',
      component: PlatformUser
    }
  ]
})
