<template>
  <div>
    <el-form :model="pageData"  ref="forme" label-width="100px" class="demo-pageData">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
      </el-row>

      <el-form-item label="活动名称" prop="title">
        <el-input v-model="pageData.title"  placeholder="请输入30个字符以内" disabled></el-input>
      </el-form-item>

     <el-form-item label="有效期" prop="end_time">
         <span>生效时间</span>
        <el-input v-model="pageData.startTime"  placeholder="请输入30个字符以内" disabled></el-input>
        <br/>
         <span>过期时间</span>
        <el-input v-model="pageData.endTime"  placeholder="请输入30个字符以内" disabled></el-input>
      </el-form-item> 

        <el-form-item label="发放规则" prop="grant_type">
            <!-- <el-radio-group v-model="pageData.grant_type"> -->
              <el-radio v-model="pageData.grant_type" disabled :label="1" v-if="pageData.grant_type == 1">每天每人发放1张</el-radio>
              <el-radio v-model="pageData.grant_type" disabled :label="2" v-if="pageData.grant_type == 2">购买后立即发放一张</el-radio>
              <el-radio v-model="pageData.grant_type" disabled :label="3" v-if="pageData.grant_type == 3">直接发一张券</el-radio>
              <span v-if="pageData.grant_type == 3" style="color: #999; display: inline-block; margin-left: 20px;">此处直接进入首页，并领取一张优惠券</span>
            <!-- </el-radio-group> -->
        </el-form-item> 
        <el-form-item label="选择优惠券" prop="coupon_ids">
            <el-input v-for="(item,index) in pageData.coupons" v-bind:key="index" v-model="item.title" placeholder="请输入30个字符以内" disabled></el-input>
        </el-form-item> 
        <el-form-item label="适用店铺" prop="appName">
            <el-input :value="pageData.appName" disabled></el-input>
        </el-form-item> 
        <el-form-item label="活动状态" prop="status">
            <el-radio-group v-model="pageData.status">
                <el-radio disabled :label="0"  v-if="pageData.status == 0">草稿</el-radio>
                <el-radio disabled :label="1"  v-if="pageData.status == 1">上线</el-radio>
                <el-radio disabled :label="2"  v-if="pageData.status == 2">下线</el-radio>
            </el-radio-group>
        </el-form-item>
      <!-- 基本信息 end-->
    </el-form>
    <div style="color: #999;">此处展示当前的活动状态，只支持在列表 编辑 上线/失效 操作。</div>
  </div>
</template>

<script lang="ts" src="./Activity.ts"></script>

<style lang="scss" scoped type="text/css" src="./Activity.scss"></style>


