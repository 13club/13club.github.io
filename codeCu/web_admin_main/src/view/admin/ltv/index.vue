<template>
  <div class="ltv">
      <p class="remark">生命周期价值 <span class="blue"> 数据截止到一小时前</span></p>
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
        <el-table-column prop="date" label="日期" width="100"/>
        <el-table-column prop="fansNum" label="新增粉丝" width="80" />
        <el-table-column prop="usersNum" label="转换用户" width="80" />
        <el-table-column :formatter="formatter" label="LTV_1" />
        <el-table-column :formatter="formatter" label="LTV_2" />
        <el-table-column :formatter="formatter" label="LTV_3" />
        <el-table-column :formatter="formatter" label="LTV_4" />
        <el-table-column :formatter="formatter" label="LTV_5" />
        <el-table-column :formatter="formatter" label="LTV_6" />
        <el-table-column :formatter="formatter" label="LTV_7" />
        <el-table-column :formatter="formatter" label="LTV_14" />
        <el-table-column :formatter="formatter" label="LTV_30" />
        <el-table-column :formatter="formatter" label="LTV_60" />
        <el-table-column :formatter="formatter" label="LTV_90" />
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
<script lang="ts" src="./ltv.ts"></script>
<style lang="scss" scoped>
.ltv {
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



