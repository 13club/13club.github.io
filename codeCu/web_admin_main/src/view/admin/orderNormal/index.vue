<template>
  <div class="block">
    <div class="block control-box">
      <a :href="pageData.downloadUrl" style="display:none" ref="download" download></a>
      <el-select v-model="pageData.qtype" clearable placeholder="搜索类型" @change="typeCommand" @clear="pageData.searchType=''">
        <el-option
          v-for="(item,i) in pageData.typeList"
          :key="i"
          :label="item.title"
          :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="pageData.name" :placeholder="pageData.searchType" size="middle" clearable></el-input>
      <el-dropdown trigger="click"  @command="platCommand">
        <el-button >
            {{ pageData.searchPlat || '来源类型'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="(item,i) in pageData.platList" :key="i" :command="item.key">{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>下单时间:</span>
       <el-date-picker
        v-model="pageData.time"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div style="margin: 20px 0">
        <el-input v-model="pageData.shopName" placeholder="请输入店铺名称" size="middle" clearable @keyup.enter.native="search"></el-input>
        <el-button type="primary"  @click="search" class="search-btn permission" data-py="ss">搜索</el-button>
        <el-button @click="download" class="permission" data-py="dcexcel">导出excel</el-button>
      </div>
    </div>
    <div class="block bg-lightBlue table-info small">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{pageData.totalNum}}</span>
       <span>项数据</span>
    </div>
    <div class="block">
      <el-table :data="formData.list" style="width: 100%">
        <el-table-column  prop="order_no" label="编号/微信订单号" width="200">
          <template slot-scope="scope">
            <span  class="info">{{scope.row.order_no}}</span>
            <br/>
            <span class="blue">{{scope.row.trade_no}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="课程名称" width="160"></el-table-column>
        <el-table-column prop="ctime" label="购买时间"  width="100"></el-table-column>
        <!-- <el-table-column prop="fee" label="课程收入" width="80"></el-table-column>
        <el-table-column prop="scale" label="分成比例"></el-table-column>
        <el-table-column prop="actual_income" label="实际收入"></el-table-column>
        <el-table-column prop="coupon_fee" label="优惠金额"></el-table-column> -->
        <el-table-column prop="price" label="课程售价" width="80"></el-table-column>
        <el-table-column prop="wx_cash_fee" label="支付金额"></el-table-column>
        <el-table-column prop="scale" label="分成比例"></el-table-column>
        <el-table-column prop="actual_income" label="实际收入"></el-table-column>
        <el-table-column prop="coupon_fee" label="丰盛劵"></el-table-column>
        <el-table-column prop="wx_coupon_fee" label="微信劵"></el-table-column>

        <el-table-column prop="channel_name" label="渠道来源">
          <template slot-scope="scope">
            <span >{{scope.row.channel_name || '丰盛'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="little_id" label="来源类型">
          <template slot-scope="scope">
            <span v-if="scope.row.little_id == 101">丰盛课堂小程序</span>
            <span v-if="scope.row.little_id == 0">公众号</span>
          </template>
        </el-table-column>
        <el-table-column prop="uname" label="用户昵称"></el-table-column>
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

<script lang="ts" src="./Order.ts"></script>

<style lang="scss" scoped type="text/css" src="./Order.scss"></style>

