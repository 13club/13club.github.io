<template>
  <div>
    <el-form :model="formData"  ref="forme" label-width="100px" class="demo-formData"  :rules="formRule">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
      </el-row>

      <el-form-item label="活动名称" prop="title" required>
        <el-input v-model="formData.title"  placeholder="请输入30个字符以内" ></el-input>
      </el-form-item>

     <el-form-item label="有效期" prop="end_time" required>
         <span>生效时间</span>
        <el-date-picker
            v-model="formData.begin_time"
            type="datetime"
            placeholder="选择生效时间"
            value-format="timestamp">
        </el-date-picker>
        <br/>
         <span>过期时间</span>
        <el-date-picker
            v-model="formData.end_time"
            type="datetime"
            placeholder="选择过期时间"
            value-format="timestamp">
        </el-date-picker>
      </el-form-item> 

        <el-form-item label="发放规则" prop="grant_type" required>
            <!-- <el-radio-group v-model="formData.grant_type"> -->
            <el-radio v-model="formData.grant_type" :label="1">每天每人发放1张</el-radio>
            <el-radio v-model="formData.grant_type" :label="2">购买后立即发放一张</el-radio>
            <el-radio v-model="formData.grant_type" :label="3">直接发一张券</el-radio><span style="color: #999; display: inline-block; margin-left: 20px;">此处直接进入首页，并领取一张优惠券</span>
            <!-- </el-radio-group> -->
        </el-form-item> 
        <el-form-item label="选择优惠券" prop="coupon_ids" required>
            <el-autocomplete
                class="inline-input"
                v-model="pageData.couponTitle"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                @blur="couponBlur"
                ></el-autocomplete>
        </el-form-item> 
        <el-form-item label="活动状态" prop="status" required>
            <el-radio-group v-model="formData.status">
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">上线</el-radio>
                <el-radio :label="2">下线</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="适用店铺">
            <el-select v-model="formData.shopid">
                <el-option
                v-for="item in shops"
                :key="item.id"
                :label="item.appName"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
      <!-- 基本信息 end-->
    </el-form>
  </div>
</template>

<script lang="ts" src="./NewActivity.ts"></script>

<style lang="scss" scoped type="text/css" src="./NewActivity.scss"></style>


