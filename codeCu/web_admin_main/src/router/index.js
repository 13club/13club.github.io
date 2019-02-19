import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App'
import Login from '@/view/user/Login/Login'
import Admin from '@/view/Admin'

Vue.use(VueRouter)

export const adminRoutes = []

export const router = new VueRouter({
  routes: [{
    path: '/',
    component: App,
    children: [{
      path: '',
      component: Admin,
      children: [{
        path: '',
        redirect: 'home'
      }]
    }, {
      path: 'login',
      component: Login
    }]
  }, {
    path: '*',
    redirect: '/login'
  }]
})

// const btnsCache = sessionStorage.getItem(BTNS)
// let btns = []

// if (btnsCache) {
//   btns = JSON.parse(btnsCache)

//   const btnObj = {}

//   btns.forEach(btn => {
//     if (btnObj[btn.parentId]) {
//       btnObj[btn.parentId].push(btn.name)
//     } else {
//       btnObj[btn.parentId] = [btn.name]
//     }
//   })
//   console.log(btnObj)
//   router.afterEach((to, from) => {
//     const menuId = to.meta.id
//     const permissions = btnObj[menuId]
//     if (permissions) {
//       Array.prototype.slice.apply(document.getElementsByClassName('permission')).forEach(perm => {
//         console.log(perm)
//         if (permissions.indexOf(perm.dataset.py) === -1) {
//           perm.style.display = 'none'
//         }
//       })
//     }
//   })
// }
