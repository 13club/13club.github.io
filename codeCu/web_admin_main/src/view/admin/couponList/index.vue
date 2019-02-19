<template>
  <div class="block">
    <div class="block control-box">
      <el-input v-model="pageData.couponName" placeholder="请输入优惠券名称" size="middle" clearable @keyup.enter.native="handlesearch"></el-input>
      <el-select v-model="pageData.status" placeholder="优惠券状态" clearable>
        <el-option :key="1" label="已上架" :value="1"></el-option>
        <el-option :key="0" label="已下架" :value="0"></el-option>
      </el-select>
      <el-button type="primary" @click="handlesearch" class="search-btn permission" data-py="ss">搜索</el-button>
      <router-link class="el-button el-button--primary permission" data-py="xjyhq" :to="{name: 'newCoupon'}">新建优惠券</router-link>
    </div>
    <div class="block bg-lightBlue table-info small">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{pageData.totalNum}}</span>
       <span>项数据</span>
    </div>
    <div class="block">
      <el-table :data="pageData.couponList" style="width: 100%">
        <el-table-column  prop="coupon_id" label="优惠券编号" width="100"></el-table-column>
        <el-table-column prop="title" label="优惠券名称" width="240"></el-table-column>
        <el-table-column prop="grant_limit_num" label="领取限制"  width="100">
          <template slot-scope="scope">
              每人{{scope.row.grant_limit_num}}张
          </template>
        </el-table-column>
        <el-table-column prop="grant_num" label="创建数量"  width="100"></el-table-column>
        <!-- <el-table-column prop="price" label="使用数量"  width="80"></el-table-column> -->
        <el-table-column prop="price" label="优惠券金额"  width="100"></el-table-column>
        <el-table-column prop="time" label="有效期"  width="200">
          <template slot-scope="scope">
              <span v-if="scope.row.type == 1">{{scope.row.time}}</span>
              <span v-if="scope.row.type == 2">领到券当日开始{{scope.row.fixed_term}}天内有效</span>
              <span v-if="scope.row.type == 3">领到券次日开始{{scope.row.fixed_begin_term}}天内有效</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="操作"  width="100">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" class="permission" data-py="xq" type="text" size="small">详情</el-button>
            <el-button type="text" class="permission" data-py="sj" size="small" v-if="scope.row.status == 1" @click="updateStatus(scope.$index)">下架</el-button>
            <el-button type="text" class="permission danger" data-py="xj" size="small" v-if="scope.row.status == 0" @click="updateStatus(scope.$index)">上架</el-button>
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

<script lang="ts" src="./CouponList.ts"></script>

<style lang="scss" scoped type="text/css" src="./CouponList.scss"></style>

