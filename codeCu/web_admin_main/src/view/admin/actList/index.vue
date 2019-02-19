<template>
  <div class="block">
    <div class="block control-box">
      <el-input v-model="pageData.actName" placeholder="请输入活动名称" size="middle" clearable @keyup.enter.native="handlesearch"></el-input>
      <el-input v-model="pageData.appName" placeholder="请输入店铺名称" size="middle" clearable @keyup.enter.native="handlesearch"></el-input>
      <el-button type="primary" @click="handlesearch" class="search-btn permission" data-py="ss">搜索</el-button>
      <router-link class="el-button el-button--primary permission" data-py="xjyhhd" :to="{name: 'newActivity'}">新建优惠活动</router-link>
    </div>
    <div class="block bg-lightBlue table-info small">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{pageData.totalNum}}</span>
       <span>项数据</span>
    </div>
    <div class="block">
      <el-table :data="pageData.actList" style="width: 100%">
        <el-table-column  prop="act_id" label="活动ID" width="100"></el-table-column>
        <el-table-column prop="title" label="活动名称" width="240"></el-table-column>
        <el-table-column prop="beginTime" label="创建时间"  width="120"></el-table-column>
        <el-table-column prop="endTime" label="过期时间"  width="120"></el-table-column>
        <el-table-column prop="appName" label="店铺名称"  width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.appName">{{ scope.row.appName }}</span>
            <span v-else>全部店铺</span>
          </template>
        </el-table-column>
        <el-table-column prop="grant_type" label="类型"  width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.grant_type == 1">每天每人发放1张 </span>
            <span v-if="scope.row.grant_type == 2">购买后立即发放一张</span>
            <span v-if="scope.row.grant_type == 3">直接发一张券</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"  width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">发放中</span>
            <span v-if="scope.row.status == 0">草稿</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="操作"  width="160">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small" class="permission" data-py="xq">详情</el-button>
            <el-button type="text" class="permission danger" data-py="sxian" size="small"v-if="scope.row.status == 0" @click="updateStatus(scope.$index)">上线</el-button>
            <el-button type="text" class="permission" data-py="sxiao" size="small" v-if="scope.row.status == 1" @click="updateStatus(scope.$index)">失效</el-button>
            <el-button type="text" class="permission" data-py="tg" size="small" v-if="scope.row.status == 1 && scope.row.grant_type == 3" @click="showDialog(scope.$index)">推广</el-button>
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
    <div  class="block">
      <el-dialog  title="优惠券链接"  :visible.sync="pageData.centerDialogVisible"  width="30%"  center>
        <el-row>
          <el-col :span="6" class="align-right">优惠券链接地址</el-col>
          <el-col :span="18">{{pageData.act_link}}</el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pageData.centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>   
    </div>
  </div>
</template>

<script lang="ts" src="./ActList.ts"></script>

<style lang="scss" scoped type="text/css" src="./ActList.scss"></style>

