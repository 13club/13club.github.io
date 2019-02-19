<template>
  <div id="admin" class="admin">
   <input type="password" name="password1" autocomplete="off" style="position: fixed; top: -999px; left: -999px"/>
    <el-header>
      <div class="el-common header-main">
        <img src="./../assets/img/logo.png" alt="" class="logo">
        <span class="extra-large">丰盛-运营管理后台</span>
        <i class="el-icon-menu collapse-menu" @click="toggleCollapseMenu"></i>
        <div class="fr head-controller">
          <i class="el-icon-question"></i>
          <img src="./../assets/img/logo.png" alt="" class="user-icon">
          <span>{{userName}}</span>
          <el-dropdown  @command="handleCommand" v-if="userName">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="upadtePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="layout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>             
          <router-link class="login-btn" :to="{name: 'login'}" v-if="!userName">登录</router-link>
        </div>
      </div>
    </el-header>
    <el-container class="el-box">
      <el-container class="el-common">
        <el-aside>
          <app-nav :collapse="collapse"/>
        </el-aside>
        <el-container>
          <el-main>
            <div class="main-head"><bread-crumb/></div>
            <router-view/>
          </el-main>
          <el-footer>&copy;丰盛️版权所有 {{now}}</el-footer>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog
    title="修改密码"
    :visible.sync="updatePasswordDialog"
    width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
     
      <el-input label="新密码" type="password" v-model="password" auto-complete="off"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updatePasswordDialog = false, password = ''">取 消</el-button>
      <el-button type="primary" @click="changePassword">确 定</el-button>
    </span>
  </el-dialog>
  </div> 
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import AppNav from "@/components/AppNav/AppNav.vue"
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue"
import { USERNAME,COOKID, USER }  from "./../api/storge"
import { delCookie } from "./../api/cookie"
import { AdminInt } from '../api/admin'

export default {
  components: {
    AppNav,
    BreadCrumb
  },
  data() {
    return {
      userName: sessionStorage[USERNAME] || '',
      now: new Date().getFullYear(),
      collapse: false,
      updatePasswordDialog: false,
      password: ''
    }
  },
  methods: {
    toggleCollapseMenu() {
      this.collapse = !this.collapse
    }, 
    handleCommand (command) {
      this[command]()
    },
    layout() {
      sessionStorage.clear()
      // localStorage.clear()
      delCookie(COOKID)
      delCookie(USER)
      this.$message.success('退出成功')
      this.$router.push('/login')
    },
    upadtePassword() {
      this.updatePasswordDialog = true
    },
    changePassword() {
      if(!this.password) {
          this.$message.warning('新密码不能为空')
          return
      }
      AdminInt.changeManageUserPwd({password: this.password}, res => {
          if (res.status === 200) {
              this.updatePasswordDialog = false
              this.password =''
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                    this.layout()
                }
              })
          } else 
              this.$message.success('修改失败')
      })
    }
  }
}
</script>

<style lang="scss" scopedtype="text/css" >
.admin{
  height: 100%;
  & .el-aside {
      & .app-nav {
          height: 100%;
          & .el-col {
              height: 100%;
              & .el-menu {
                  height: 100%;
              }
          }
      }
  }
  & .el-header{
    $height:60px;
    padding: 0;
    border-bottom: 2px solid #3ac9ab;
    box-shadow: 0 0 0 #dddddd;
    & .header-main{
      height: $height;
      line-height: $height;
      & .logo{
        height: 30px;
        width: 30px;
        margin-right: 10px;
        float: left;
        margin-top: 15px;
      }
      & .head-controller{
        height: $height;
        line-height: $height;
        & .user-icon{
          height: 30px;
          width: 30px;
          /* margin-top: 15px; */
          position: relative;
          top: 8px;
        }
        & .el-icon-question:before{
          font-size: 20px;
        }
        & .login-btn{
          text-decoration: none;
        }
      }
    }
  }
  & .el-box {
    min-height: calc(100% - 60px) !important;
  }
  & .el-common{
    height: auto !important;
    min-width: 1400px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  & .el-pagination {
    margin-top: 30px;
    text-align: center;
  }
  & .el-footer {
    text-align: center;
    line-height: 60px;
  }
}
.search-btn {
  margin-right: 100px !important;
}
.collapse-menu {
  margin-left: 3em;
  font-size: 30px;
  color: #409EFF;
  cursor: pointer;
}
</style>
