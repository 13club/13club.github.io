<template>
  <div>
    <el-form :model="pageData"  ref="forme" label-width="120px" class="demo-pageData">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
      </el-row>

      <el-form-item label="优惠券名称" prop="title" >
        <el-input v-model="pageData.title"  disabled></el-input>
      </el-form-item>

      <el-form-item label="发放的总数量" prop="grant_num" >
        <el-input v-model="pageData.grant_num" type="number" disabled></el-input>
        <span class="cele">张</span>
        <el-button type="text" @click="pageData.showCountAdd = true" class="permission" data-py="zjsl">增加数量</el-button>
      </el-form-item>

      <el-form-item label="优惠金额" prop="fee1"  >
        <el-input v-model="pageData.fee1" type="number" disabled></el-input>
        <span class="cele">元</span>
      </el-form-item>

      <el-form-item label="满多少元可用" prop="fee1"  >
        <el-input v-model="pageData.use_fee1" type="number" disabled></el-input>
        <span class="cele">元</span>
      </el-form-item>

      <el-form-item label="每人限领" prop="grant_limit_num"  >
        <el-input v-model="pageData.grant_limit_num"  type="number"  disabled></el-input>
        <span class="cele">张</span>
      </el-form-item>

     <el-form-item label="有效期" prop="type"  class="time_choose">
         <el-radio-group v-model="pageData.type">
                <el-radio :label="1" disabled v-if="pageData.type == 1">
                    <span>固定日期</span>
                    <div class="marL30">
                        <span>生效时间</span>                        
                            <el-input v-model="pageData.startTime"  disabled></el-input>
                        <br/>
                        <span>过期时间</span>
                        <el-input v-model="pageData.endTime"  disabled></el-input>
                        <el-button type="text" @click="pageData.showTimeDelay = true" class="permission" data-py="ycrq">延长日期</el-button>
                    </div>
                </el-radio>
                <el-radio :label="2" disabled v-if="pageData.type == 2">
                    <span>领到券当日开始N天内有效</span>
                    <div  class="marL30">
                        <span>有效天数</span>
                        <el-input v-model="pageData.fixed_term"  disabled></el-input>                        
                    </div>
                </el-radio>
                <el-radio :label="3" disabled v-if="pageData.type == 3">
                    <span>领到券次日开始N天内有效</span>
                    <div  class="marL30">
                        <span>有效天数</span>
                        <el-input v-model="pageData.fixed_begin_term" disabled></el-input>                       
                    </div>
                </el-radio>
            </el-radio-group>        
      </el-form-item>
      <el-form-item label="使用范围" prop="scopes" >

        <div v-if="pageData.scope">指定课程</div>
        <div v-else>全部课程
            <div style="color: #ccc">如果课程设置为不支持优惠券，则优惠券仍然不可使用</div>
        </div>
        <div v-for="(course, index) in pageData.scopes" :key="index" style="margin: 15px 0;" v-show="pageData.scope">
            <el-input :value="course.title" disabled/>
        </div>
      </el-form-item>
        <el-form-item label="状态" prop="status" >
            <el-radio-group v-model="pageData.status">
                <el-radio :label="0" disabled v-if="pageData.status == 0">草稿</el-radio>
                <el-radio :label="1" disabled v-if="pageData.status == 1">上线</el-radio>
            </el-radio-group>
        </el-form-item>
      <!-- 基本信息 end-->
       <!-- 辅助信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">辅助信息</el-col>
      </el-row>

      <el-form-item label="优惠券编号" prop="coupon_id" >
        <el-input v-model="pageData.coupon_id"  disabled></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="coupon_id" >
        <el-input :value="pageData.grant_num - pageData.receiveCount"  disabled></el-input>
      </el-form-item>
      <el-form-item label="发放人次" prop="coupon_id" >
        <el-input :value="`${pageData.userCount}人/${pageData.receiveCount}次`"  disabled></el-input>
      </el-form-item>
      <el-form-item label="使用数量" prop="useCount" >
        <el-input v-model="pageData.useCount"  disabled></el-input>
      </el-form-item>
       <!-- 辅助信息 end -->
    </el-form>
    <el-dialog
        title=""
        :visible.sync="pageData.showCountAdd"
        width="30%"
        center>
        <span>增加的数量</span>
        <el-input v-model="pageData.add_count"  placeholder="请输入30个字符以内" type="number"></el-input>
        <span class="cele">张</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pageData.showCountAdd = false">取 消</el-button>
            <el-button type="primary" @click="addCount">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title=""
        :visible.sync="pageData.showTimeDelay"
        width="30%"
        center>
        <span>过期时间</span>
        <el-date-picker
            v-model="pageData.delay_time"
            type="datetime"
            placeholder="重新选择过期时间"
            value-format="timestamp">
        </el-date-picker>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pageData.showTimeDelay = false">取 消</el-button>
            <el-button type="primary" @click="delayTime">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Coupon.ts"></script>

<style lang="scss" scoped type="text/css" src="./Coupon.scss"></style>


