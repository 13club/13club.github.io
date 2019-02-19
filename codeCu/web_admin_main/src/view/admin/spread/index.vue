<template>
  <div   class="block">
    <div  class="block">
      <el-input v-model="pageData.channel" placeholder="请输入渠道名称" size="middle" clearable @keyup.enter.native="handlesearch"></el-input>
      <el-button type="primary" @click="handlesearch" class="search-btn permission" data-py="ss">搜索</el-button>
      <el-button type="primary" @click="pageData.centerDialogVisible = true" class="permission" data-py="xjtg">新建推广</el-button> 
    </div>
    <div class="block">
      <el-dialog  title="新建推广"  :visible.sync="pageData.centerDialogVisible"  width="30%"  center>
        <el-row>
          <el-col :span="6" class="align-right">推广名称</el-col>
          <el-col :span="18"><el-input v-model="pageData.channelName" placeholder="请输入推广名称" size="small" @keyup.enter.native="focusChannelId"></el-input></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pageData.centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSpread">确 定</el-button>
        </span>
      </el-dialog>   
    </div>
    <div class="block">
      <el-dialog title="修改推广名称" :visible.sync="pageData.dialogEditShow" width="30%" center>
        <el-row>
          <el-col :span="6" class="align-right">推广名称</el-col>
          <el-col :span="18"><el-input v-model="pageData.channelName" placeholder="请输入推广名称" size="small"></el-input></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pageData.dialogEditShow = false">取 消</el-button>
          <el-button type="primary" @click="editSpread">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="block">
      <el-table :data="pageData.tableData" style="width: 100%">
        <el-table-column prop="channel_id" label="推广ID" width="80"></el-table-column>
        <el-table-column prop="channel_name" label="推广名称" width="120">
          <template scope="scope">
            <span>{{ scope.row.channel_name }}</span>
            <i class="el-icon-edit" title="修改推广名称" @click="pageData.channelId=scope.row.channel_id;pageData.channelName=scope.row.channel_name;pageData.dialogEditShow=true"></i>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="推广链接" width="220"></el-table-column>
        <el-table-column prop="mini_link" label="小程序链接" width="220"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="income" label="总收入" width="80">
          <template slot-scope="scope">
              <span>{{scope.row.income}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="real_income" label="实际收入" width="80">
          <template slot-scope="scope">
              <span>{{scope.row.real_income}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="order_num" label="订单数" width="80"></el-table-column>
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

<script lang="ts" src="./Spread.ts"></script>

<style lang="scss" src="./Spread.scss" scoped type="text/css"></style>