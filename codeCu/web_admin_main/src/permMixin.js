import Vue from 'vue'
import { BTNS } from './api/storge'

const btnsCache = sessionStorage.getItem(BTNS)
let btnObj = {}

if (btnsCache) {
  let btns = JSON.parse(btnsCache)

  btns.forEach(btn => {
    if (btnObj[btn.parentId]) {
      btnObj[btn.parentId].push(btn.name)
    } else {
      btnObj[btn.parentId] = [btn.name]
    }
  })
}

Vue.mixin({

  mounted () {
    if (this.$route && this.$route.meta && this.$route.meta.id) {
      const menuId = this.$route.meta.id
      const permissions = btnObj[menuId]
      if (permissions) {
        // 存在部分权限  则把未拥有权限的菜单隐藏
        Array.prototype.slice.apply(document.getElementsByClassName('permission')).forEach(perm => {
          if (permissions.indexOf(perm.dataset.py) === -1) {
            perm.style.display = 'none'
          }
        })
      } else {
        // 不存在任何权限 隐藏所有菜单
        Array.prototype.slice.apply(document.getElementsByClassName('permission')).forEach(perm => {
          perm.style.display = 'none'
        })
      }
    }
  }

})
