<template>
  <div class="login-box">
    <div class="head extra-large align-center">
        丰盛课堂-运营后台
    </div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <el-input placeholder="用户名/邮箱" v-model="form.username" @keyup.enter.native="handlelogin">
            <template slot="prepend">
              <i class="user icon"></i>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="密码" v-model="form.password" type="password" @keyup.enter.native="handlelogin" ref="passwordInput">
            <template slot="prepend">
              <i class="password icon"></i>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="row-height1">
        <el-col :span="12">
          <el-checkbox v-model="form.remember">记住账号</el-checkbox>
        </el-col>
        <el-col :span="12" class="align-right">
          <span class="blue small">无法登陆</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="danger" class="login" @click="handlelogin">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { loginInt } from "./../../../api/user"
import { setCookie } from "./../../../api/cookie"
import { USERNAME, COOKID, HESTORY, EXPIREDAYS, PASSWORD, MENUS, BTNS } from "./../../../api/storge"
import Vue from "vue"
import Component from "vue-class-component"
import { adminRoutes, router } from '../../../router'

export default {
  data() {
    return {
      checked: false,
      form: {
        username: localStorage.getItem(USERNAME) || '',
        password: localStorage.getItem(PASSWORD) || '',
        remember: localStorage.getItem(PASSWORD) != null
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage[USERNAME]) {
      next(from.path)
    } else {
      next()
    }
  },
  methods: {
    handlelogin() {
      if (this.form.remember) { // 记住密码
        localStorage.setItem(USERNAME, this.form.username)
      }
      let login = loginInt.login(this.form, (res) => {
        if (res.status == 200) {
          const data = JSON.parse(res.data)
          let menus = [], buttons = [], obj = {}, delObjId = [], m = []
          data.menuData.forEach((item) => {
            if (item.type === 'menu') {
                menus.push(item)
            } else if (item.type === 'button') {
                buttons.push(item)
            }
          })
          menus.forEach(item => obj[item.id + '_' + item.id] = item)

          Object.keys(obj).forEach(item => {
            if (obj[item].parentId && obj[obj[item].parentId+'_' + obj[item].parentId]){
              let children = obj[obj[item].parentId+'_' + obj[item].parentId].children || []
              children.push(obj[item])
              obj[obj[item].parentId+'_' + obj[item].parentId].children = children
              delObjId.push(item)
            }
          })

          delObjId.forEach(sn => delete obj[sn])

          Object.keys(obj).forEach(item => {
            m.push(obj[item])
          })

          sessionStorage.setItem(MENUS, JSON.stringify(m))
          sessionStorage.setItem(BTNS, JSON.stringify(buttons))
          if (this.form.remember) { // 记住密码
            localStorage.setItem(PASSWORD, this.form.password)
          }
          sessionStorage.setItem(USERNAME, this.form.username)
          setCookie(COOKID, data.token, EXPIREDAYS)
          window.location.href = '/'
        } else {
          this.$message.error('登录失败')
        }
      })
    },
    parseUrl(str) {
      upperCase = str.slice(0,1).toUpperCase() + str.slice(1)
      return upperCase + '/' + upperCase;
    }
  }
}
</script>

<style lang="scss" scoped type="text/css" src="./Login.scss" ></style>
