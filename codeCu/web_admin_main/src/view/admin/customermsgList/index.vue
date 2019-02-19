<template>
  <div class="block">
    <div class="block control-box">
      <el-input v-model="pageData.name" placeholder="请输入客服消息名称" size="middle" clearable></el-input>
      <el-input v-model="pageData.appName" placeholder="请输入店铺名称" size="middle" clearable></el-input>
       <el-select v-model="pageData.scope" placeholder="消息用途" clearable>
        <el-option :key="item.type" :label="item.name" :value="item.type" v-for="item in pageData.scopeList"></el-option>
      </el-select>
      <el-button type="primary" @click="search" class="search-btn permission" data-py="ss">搜索</el-button>
      <el-button type="primary" @click="add" class="permission" data-py="xjkfxx">新建客服消息</el-button>
    </div>
    <div class="block bg-lightBlue table-info small">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{pageData.totalNum}}</span>
       <span>项数据</span>
    </div>
    <div class="block">
      <el-table :data="formData.list" style="width: 100%">
        <el-table-column  prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="客服消息名称"></el-table-column>
        <el-table-column prop="msgtype" label="类型"></el-table-column>
        <el-table-column prop="cid" label="关联课程ID"></el-table-column>
        <el-table-column prop="channel_id" label="关联渠道ID"></el-table-column>
        <el-table-column prop="appName" label="店铺名称">
          <template slot-scope="scope">
            <span v-if="scope.row.appName">{{ scope.row.appName }}</span>
            <span v-else>全部店铺</span>
          </template>
        </el-table-column>
        <el-table-column prop="scopedesc" label="用途"></el-table-column>
        <el-table-column prop="actual_income" label="更新时间"></el-table-column>
        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small" class="permission" data-py="xq">详情</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" class="permission" data-py="sc">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>    
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageData.totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" src="./CustomermsgList.ts"></script>

<style lang="scss" scoped type="text/css" src="./CustomermsgList.scss"></style>

