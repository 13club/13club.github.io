<template>
  <div class="ls">
      <p class="remark">留存统计 <span class="blue"> 数据截止到一小时前</span></p>

      <div class="control-box">
        统计时间： <el-date-picker
          v-model="pageData.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
        店铺：<el-select v-model="pageData.shopId" placeholder="请选择">
          <el-option label='全部店铺' :value="-1" />
          <el-option
            v-for="item in pageData.shops"
            :key="item.id"
            :label="item.appName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary"  @click="search" class="search-btn permission" data-py="ss">搜索</el-button>
      </div>

      <el-table :data="pageData.tableData" border style="width: 100%; font-size: 12px; color: #000;">
            <el-table-column prop="date" label="日期" width="110"/>
            <el-table-column prop="usersTotalNum" label="总用户数" />
            <el-table-column prop="newUsersNum" label="新增用户" />
            <el-table-column prop="activeUsersNum" label="日活跃用户" />
            <el-table-column prop="newFansNum" label="新关注粉丝" />
            <el-table-column prop="fansCVR" label="粉丝当日转化率" />
            <el-table-column prop="fansToUserNum" label="粉丝当日转化用户" />
            <el-table-column prop="retain_2" label="次日留存" />
            <el-table-column prop="retain_3" label="3日留存" />
            <el-table-column prop="retain_4" label="4日留存" />
            <el-table-column prop="retain_5" label="5日留存" />
            <el-table-column prop="retain_6" label="6日留存" />
            <el-table-column prop="retain_7" label="7日留存" />
            <el-table-column prop="retain_14" label="14日留存" />
            <el-table-column prop="retain_30" label="30日留存" />
        </el-table>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts" src="./ls.ts"></script>
<style lang="scss" scoped>
 .ls {
  font-size: 14px;
  .remark{
    padding: 1.25em;
    background-color: rgba(242, 242, 242, 1);
    span {
      margin-left: 1em;
    }
  }
  .control-box {
    padding: 30px 0;
  }
}
</style>



