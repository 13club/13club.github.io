// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'Vuex'
import App from './App.vue'
import { router, adminRoutes } from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { USERNAME, COOKID, HESTORY, BASEURL, MENUS, BTNS } from './api/storge'
import { getCookie } from './api/cookie'
import axios from 'axios'
// import { Quill } from 'vue-quill-editor'
// import VueQuillEditor from 'vue-quill-editor'
// const Font = Quill.import('formats/font')
// Font.whitelist = ['Arial', '宋体', '黑体', '微软雅黑']
// Quill.register(Font, true)
// 设置
// const globalOption = {
  // modules: {
  //   toolbar: {
  //     container: [
  //       [{
  //         'font': ['Arial', '宋体', '黑体', '微软雅黑']
  //       }]
  //     ]
  //   }
  // }
// }

// 使用
// Vue.use(VueQuillEditor, globalOption)

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 如果没有登录
  if (to.path.indexOf('login') === -1 && !sessionStorage[USERNAME]) {
    localStorage.setItem(HESTORY, to.fullPath)
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 面包屑
  store.commit('setBreadCrumb', [{
    title: to.meta.title,
    path: to.fullPath
  }])
})
// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = BASEURL // 这是调用数据接口

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = getCookie(COOKID) // 获取Cookie
    if (!config.params) {
      config.params = {}
    }
    config.params.token = (token || '')
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

const menus = sessionStorage.getItem(MENUS)
const btns = sessionStorage.getItem(BTNS)
if (menus) {
  const menu = JSON.parse(menus)
  menu.forEach(item => {
    adminRoutes.push(toRoute(item))
  })
  router.options.routes[0].children[0].children.push(...adminRoutes)
  router.addRoutes(router.options.routes)
}

if (btns) {
  const btn = JSON.parse(btns)
  let btnRouter = []
  btn.forEach(item => {
    if (item.url) {
      btnRouter.push({
        name: item.url,
        path: item.url,
        component: () => import('@/view/admin/' + item.url),
        meta: {id: item.id}
      })
    }
  })
  router.options.routes[0].children[0].children.push(...btnRouter)
  router.addRoutes(router.options.routes)
}

function toRoute (item, prefix = '/') {
  return {
    name: item.url,
    path: prefix + item.url,
    component: item.children ? { template: '<div><router-view></router-view></div>' } : () => import('@/view/admin/' + item.url),
    children: (item.children && item.children.map(children => toRoute(children, ''))) || null,
    meta: {
      title: item.name,
      icon: item.icon,
      id: item.id
    }
  }
}

require('./permMixin')

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
