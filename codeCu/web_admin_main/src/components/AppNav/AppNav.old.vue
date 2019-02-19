<template>
<el-row class="app-nav" :span="24" >
  <el-col >
    <el-menu
      default-active="/admin/home"
      class="el-menu-vertical-demo"
      :collapse="collapse"
     >
    <div v-for="(menu,i) in routesConfig" :key="i" v-if="menu.meta">
        
        <router-link :to="'/admin/'+menu.path" >
            <el-menu-item :index="'/admin/'+menu.path" v-if="!menu.children && menu.meta.inNav">
                <i class="el-icon-menu" v-if="menu.meta.icon" :class="'el-icon-'+menu.meta.icon"></i>
                <span slot="title">{{menu.meta.title}}</span>
            </el-menu-item>
        </router-link>

        <el-submenu :index="'/admin/'+menu.path" v-if="menu.children">
            <template slot="title">
                <i class="el-icon-menu" v-if="menu.meta.icon" :class="'el-icon-'+menu.meta.icon"></i>
                <span slot="title">{{menu.meta.title}}</span>
            </template>
            <router-link :to="'/admin/'+menu.path+'/'+sub1.path" v-for="(sub1,j) in menu.children" :key="j" v-if="sub1.meta && !sub1.children && sub1.meta.inNav">
                <el-menu-item :index="'/admin/'+menu.path+'/'+sub1.path" >
                    <i class="el-icon-menu" v-if="sub1.meta.icon" :class="'el-icon-'+sub1.meta.icon"></i>
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