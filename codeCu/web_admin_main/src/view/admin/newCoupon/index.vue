<template>
  <div>
    <el-form :model="formData"  ref="forme" label-width="120px" class="demo-formData"  :rules="formRule">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
      </el-row>

      <el-form-item label="优惠券名称" prop="title" required>
        <el-input v-model="formData.title"  placeholder="请输入30个字符以内" ></el-input>
      </el-form-item>

      <el-form-item label="发放的总数量" prop="grant_num" required>
        <el-input v-model="formData.grant_num"  placeholder="请输入30个字符以内" type="number"></el-input>
        <span class="cele">张</span>
      </el-form-item>

      <el-form-item label="优惠金额" prop="fee1" required >
        <el-input v-model="formData.fee1"  placeholder="请输入30个字符以内"  type="number" ></el-input>
        <span class="cele">元</span>
      </el-form-item>

      <el-form-item label="满多少元可用" prop="use_fee1" required >
        <el-input v-model="formData.use_fee1"  placeholder="请输入30个字符以内"  type="number" ></el-input>
        <span class="cele">元</span>
      </el-form-item>

      <el-form-item label="每人限领" prop="grant_limit_num" required >
        <el-input v-model="formData.grant_limit_num"  type="number"  placeholder="请输入30个字符以内" :max="10"></el-input>
        <span class="cele">张</span>
      </el-form-item>

     <el-form-item label="有效期" prop="type" required class="time_choose">
         <el-radio-group v-model="formData.type">
                <el-radio :label="1">
                    <span>固定日期</span>
                    <div class="marL30">
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
                    </div>
                </el-radio>
                <el-radio :label="2">
                    <span>领到券当日开始N天内有效</span>
                    <div  class="marL30">
                        <span>有效天数</span>
                        <el-input v-model="formData.fixed_term"  type="number" placeholder="请输入有效天数"></el-input>                        
                    </div>
                </el-radio>
                <el-radio :label="3">
                    <span>领到券次日开始N天内有效</span>
                    <div  class="marL30">
                        <span>有效天数</span>
                        <el-input v-model="formData.fixed_begin_term"  type="number" placeholder="请输入有效天数"></el-input>                        
                    </div>
                </el-radio>
            </el-radio-group>        
      </el-form-item>
      <el-form-item label="使用范围" prop="scope1" >

        <el-radio-group v-model="formData.scope1" style="display: block;">
            <el-radio label="">全部课程

            <p style="color: #ccc">如果课程设置为不支持优惠券，则优惠券仍然不可使用</p>
            </el-radio>
            <div style="height: 20px"></div>
            <el-radio :label="1">指定课程</el-radio>
        </el-radio-group>
        <div v-for="(course, index) in formData.courses" :key="index" style="margin: 15px 0;" v-show="formData.scope1==1">
            <el-input :value="course.title" disabled/> <i class="el-icon-delete" @click="del(index)"></i>
        </div>
        <el-autocomplete
            style="width: 300px; margin: 20px 0;"
            placeholder="请输入课程名称"
            v-model="formData.courseTitle"
            :fetch-suggestions="queryCourseAsync"
            :trigger-on-focus="false"
            value-key="title"
            :disabled="formData.scope1!=1"
            @select="val => {formData.courses.push(val); formData.courseTitle=''}">
        </el-autocomplete>
      </el-form-item>
        <el-form-item label="活动状态" prop="status" required>
            <el-radio-group v-model="formData.status">
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">上线</el-radio>
            </el-radio-group>
        </el-form-item>

         <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
      <!-- 基本信息 end-->
    </el-form>
  </div>
</template>

<script lang="ts" src="./NewCoupon.ts"></script>

<style lang="scss" scoped type="text/css" src="./NewCoupon.scss"></style>


