<template>
  <div>   
    <div class="block">
      <span>欢迎你，丰盛管理员</span>
      <!-- <router-link class="el-button el-button--primary permission" data-py="xjkc" :to="{name: 'newCourse'}" >新建课程</router-link> -->
      <el-button class="el-button--primary permission" data-py="xjkc" @click="newCourse">新建课程</el-button>
      <el-button class="el-button--primary" @click="refreshCache">刷新缓存</el-button>
    </div>
    <div class="block todayCollect-box">
      <div class="flex-row">
        <div class="todayCollect-item border-normal">
          <div class="revenue item-left"></div>
          <div class="item-right">
            <div class="warning">{{formData.totalStat.income}}</div>
            <div>今日收入</div>
          </div>
        </div>
        <div class="todayCollect-item border-normal">
          <div class="revenue item-left"></div>
          <div class="item-right">
            <div class="warning">{{formData.totalStat.order_num}}</div>
            <div>今日订单</div>
          </div>
        </div>
        <div class="todayCollect-item border-normal">
          <div class="revenue item-left"></div>
          <div class="item-right">
            <div class="warning">{{formData.totalStat.uv}}</div>
            <div>今日UV</div>
          </div>
        </div>
        <div class="todayCollect-item border-normal">
          <div class="revenue item-left"></div>
          <div class="item-right">
            <div class="warning">{{formData.totalStat.pv}}</div>
            <div>今日PV</div>
          </div>
        </div>
      </div>
    </div>

    <div class="block bg-lightBlue table-info small">
       <span>数据总览</span>
       <span class="fr">更多课程数据   >></span>
    </div>
    <div class="block control-box">
      <span>时间:</span>
      <el-date-picker
        v-model="pageData.time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <span>渠道:</span>
      <el-input v-model="pageData.channelName" :maxlength="30"  placeholder="请输入30字以内渠道名称" clearable></el-input>
      <!-- <el-dropdown trigger="click" @command="handleCommand">
          <el-button >
          选择分类<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="a">学习</el-dropdown-item>
          <el-dropdown-item command="b">娱乐</el-dropdown-item>
          <el-dropdown-item command="c">记忆力</el-dropdown-item>
          <el-dropdown-item command="d">书法</el-dropdown-item>
          <el-dropdown-item command="e">国文</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown> -->
      <el-button type="primary" @click="search" class="search-btn permission" data-py="ss">搜索</el-button>
    </div>
    <div class="block control-box">
      
      <div class="flex-row collect-box">
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.uv}}</div>
          <div>UV</div>
        </div>
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.pv}}</div>
          <div>PV</div>
        </div>
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.order_uv}}</div>
          <div>下单UV</div>
        </div>
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.order_num}}</div>
          <div>订单数</div>
        </div>
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.income}}</div>
          <div>总收入</div>
        </div>
        <div class="collect-item">
          <div class="warning">{{formData.channelStat.real_income}}</div>
          <div>实际收入</div>
        </div>
      </div>
    </div>

    <div class="block">
      <el-table :data="pageData.courseList" style="width: 100%">
        <el-table-column  prop="stat_time" label="日期" width="180"></el-table-column>
        <el-table-column prop="uv" label="今日UV" width="120"></el-table-column>
        <el-table-column prop="pv" label="今日PV"  width="120"></el-table-column>
        <el-table-column prop="order_num" label="下单用户数"  width="120"></el-table-column>
        <el-table-column prop="order_num" label="订单数"  width="100"></el-table-column>
        <el-table-column prop="income" label="收入"  width="100"></el-table-column>
        <el-table-column prop="real_income" label="实际收入"  width="180"></el-table-column>
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

<script lang="ts" src="./Home.ts"></script>

<style lang="scss" scoped="" type="text/css" src="./Home.scss"></style>