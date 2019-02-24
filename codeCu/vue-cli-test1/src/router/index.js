import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import Home from '@/components/home'
import index from '@/components/index'
import HelloWorld from '@/components/HelloWorld'
import Kuaidi from '@/components/Kuaidi'
import userlist from '@/components/userlist'
import login from '@/components/login/login'
import map from '@/components/map'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: Home,
        children: [{
            path: '',
            component: index,
          },
          {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
          },
          {
            path: '/kuaidi',
            name: 'Kuaidi',
            component: Kuaidi
          },
          {
            path: '/userlist',
            name: 'userlist',
            component: userlist
          },
          {
            path: '/map',
            name: 'map',
            component: map
          }
        ]
      },
      {
        path: 'login',
        component: login
      }
    ]
  }, {
    path: '*',
    redirect: '/login'
  }]
})
