<template>
<el-row class="app-nav" :span="24" >
  <el-col >
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      :collapse="collapse"
     >
    <div v-for="(menu,i) in routesConfig" :key="i">
        
        <router-link :to="menu.path" >
            <el-menu-item :index="menu.path" v-if="!menu.children">
                <i class="el-icon-menu el-icon-menu"></i>
                <span slot="title">{{menu.meta.title}}</span>
            </el-menu-item>
        </router-link>

        <el-submenu :index="menu.path" v-if="menu.children">
            <template slot="title">
                <i class="el-icon-menu el-icon-menu"></i>
                <span slot="title">{{menu.meta.title}}</span>
            </template>
            <router-link :to="menu.path+'/'+sub1.path" v-for="(sub1,j) in menu.children" :key="j" v-if="!sub1.children">
                <el-menu-item :index="menu.path+'/'+sub1.path" >
                    <i class="el-icon-menu el-icon-menu"></i>
                    <span slot="title">{{sub1.meta.title}}</span>
                </el-menu-item>
            </router-link>
        </el-submenu>

    </div>
</el-menu>
</el-col>
</el-row>
</template>

<script lang="ts" src="./AppNav.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped src="./AppNav.scss"></style>