<template>
  <div class="block">
    <div class="block control-box">
      <el-select v-model="qtype" clearable placeholder="搜索类型" @change="change" @clear="searchType=''">
        <el-option
          v-for="(item,i) in typeList"
          :key="i"
          :label="item.title"
          :value="item.key">
        </el-option>
      </el-select>

      <el-input v-model="name" :placeholder="searchType" size="middle" clearable></el-input>
      <span>下单时间:</span>
       <el-date-picker
        v-model="time"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        @change="days=''"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-radio-group v-model="days" @change="changeDays">
        <el-radio :label="7">近7天</el-radio>
        <el-radio :label="30">近30天</el-radio>
      </el-radio-group>
      <div style="margin: 20px 0">
        店铺：<el-select v-model="shopId" placeholder="请选择">
            <el-option label='全部店铺' value="" />
            <el-option
              v-for="item in shops"
              :key="item.id"
              :label="item.appName"
              :value="item.id">
            </el-option>
          </el-select>
        
        成团人数：<el-input v-model="groupNum" placeholder="请输入成团人数" size="middle" clearable></el-input>
        <el-button type="primary" @click="getList" class="search-btn">搜索</el-button>
        <el-button type="primary" @click="addRefund" class="search-btn">新增退款</el-button>
      </div>
      <div style="margin: 20px 0">
        <el-radio-group v-model="status" @change="changeStatus">
          <el-radio-button :label="0">待操作退款</el-radio-button>
          <el-radio-button :label="1">退款中</el-radio-button>
          <el-radio-button :label="2">退款完成</el-radio-button>
          <el-radio-button label="3">退款失败</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="block bg-lightBlue table-info small" style="margin-bottom: 10px; padding: 5px 10px; border-radius: 5px;">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{totalNum}}</span>
       <span>项数据</span>
    </div>
     <div class="block">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="order_no" label="订单编号" width="200">
          <template slot-scope="scope">
            <span  class="info">{{scope.row.order_no}}</span>
            <br/>
            <span class="blue">{{scope.row.trade_no}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activity_name" label="团活动名称" width="160"></el-table-column>
        <el-table-column prop="ogid" label="团ID"  width="100"></el-table-column>
        <el-table-column prop="buy_time" label="购买时间" width="160">
          <template slot-scope="scope">
            {{formatTime(new Date(scope.row.buy_time))}}
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="收入" width="80">
          <template slot-scope="scope">
            {{(scope.row.fee/100).toFixed(2)}}元
          </template>
        </el-table-column>
        <el-table-column prop="channel_name" label="渠道来源"></el-table-column>
        <el-table-column prop="shop_name" label="店铺"></el-table-column>
        <el-table-column prop="uname" label="用户昵称"></el-table-column>
        <el-table-column prop="refund_status" label="退款操作" width="160">
          <template slot-scope="scope">
            <div v-if="scope.row.refund_status === 0">
              <el-button @click="refund(scope.row)" type="text" size="small">操作退款</el-button>
            </div>
            <div v-if="scope.row.refund_status === 1">退款中 <el-button @click="upgrade(scope.row.refund_no)" type="text">更新</el-button></div>
            <div v-if="scope.row.refund_status === 2">退款完成</div>
            <div v-if="scope.row.refund_status === 3">退款失败</div>
            <div v-if="scope.row.refund_status === 3">重新退款</div>
            <div> {{formatTime(new Date(scope.row.refund_time))}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>    
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'
import { formatTime } from '@/api/common'

export default {
  data() {
    return {
      totalNum:0,
      pageSize:20,
      currentPage:1,
      list: [],
      searchType:'',
      qtype: '',
      groupNum: '',
      shops: [],
      time: [],
      name: '',
      days: 0,
      shopId: '',
      status: 0,
      typeList:[{
          key:'activity_name',
          title:'活动名称'
      },{
          key:'uname',
          title:'用户昵称'
      },{
          key:'channelName',
          title:'渠道名称'
      },{
          key:'ogid',
          title:'拼团ID编号'
      },{
          key:'wechat_no',
          title:'微信订单号'
      }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() {
    AdminInt.shopGet(res => {
      this.shops = res.data
    })
    this.getList()
  },
  computed: {
    start: {
      get() {
        return this.time && +new Date(this.time[0]) || ''
      },
      set(val) {
        this.time[0] = val
      }
    },
    end: {
        get() {
        return this.time && +new Date(this.time[1]) || ''
      },
      set(val) {
        this.time[1] = val
      }
    }
  },
  methods: {
    formatTime,
    upgrade(refund_no) {
      AdminInt.refundQuery({refund_no}, res => {
        this.getList()
      })
    },
    // 添加退款
    addRefund() {
      this.$prompt('请输入需要退款订单的订单号，添加到退款列表', '新增退款', {
        inputPlaceholder: '请输入订单中心中，灰色文字的订单号',
        confirmButtonText: '确认添加',
        cancelButtonText: '取消操作',
        inputValidator: val => {
          return !!val
        },
      }).then(obj => {
        AdminInt.refundGroupAdd({
          orderno: obj.value
        }, res => {
          if (res.status === 200) {
            this.$alert('已经添加成功，你可以对该笔订单进行退款操作了。', '添加成功', {
              confirmButtonText: '知道了',
              callback: () => {
                this.getList()
              }
            })
          } else {
            this.$alert(res.msg, '添加失败', {
              confirmButtonText: '知道了'
            })
          }
        })
      })
    },
    // 执行退款
    refund(item) {
      this.$confirm('确认对该用户订单执行退款操作吗？点击确认后，将对该用户执行退款', '操作退款', {
        confirmButtonText: '确认退款',
        cancelButtonText: '取消操作',
        type: '',
      }).then(() => {
        AdminInt.refundGroupApply({
          refund_id: item.refund_id
        }, res => {
          if (res.status === 200) {
            if (res.data.refund_status === 1) { 
              this.$alert('已经成功发起退款，请重新查看订单状态', '退款中', {
                confirmButtonText: '知道了',
                callback: () => {
                  this.getList()
                }
              })
            } else if (res.data.refund_status === 2){
              this.$alert('已经退款成功，请重新查看订单状态', '退款成功', {
                confirmButtonText: '知道了',
                callback: () => {
                  this.getList()
                }
              })
            } else {
              this.$alert(res.data.err_msg, '退款失败', {
                confirmButtonText: '知道了'
              })
            }
          } else {
            this.$alert('系统错误，请30秒后再试；如果多次出现错误，请联系研发同学。', '退款失败', {
              confirmButtonText: '知道了'
            })
          }
        })
      })
    },
    getList() {
      if (this.qtype && !this.name) return this.$message.info(`请输入${this.searchType}`)
      else if (!this.qtype && this.name) return this.$message.info(`请选择搜索类型`)
      else if (this.groupNum && Number(this.groupNum) < 2) return this.$message.info(`成团人数不能小于2`)
      AdminInt.refundGroupList({
        qtype: this.qtype,
        q: this.name,
        shopId: this.shopId,
        groupNum: this.groupNum,
        status: this.status,
        start: this.start,
        end: this.end,
        page: this.currentPage
      }, res => {
        this.list = res.data.list
        this.totalNum = res.data.totalNum
      })
    },
    changeDays() {
      this.time = []
      let c = new Date()
      c.setDate(c.getDate() - this.days)
      const start = new Date(c.getFullYear() + '-' + (c.getMonth() + 1) + '-' + c.getDate() + ' 00:00:00')

      this.start = +start
      this.end = +new Date()
      this.getList()
    },
    changeStatus(status) {
      this.status = status
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = Number(val)
      this.getList()
    },
    change(val) {
      this.typeList.forEach(ele => {
        if(ele.key == val){
          this.searchType = ele.title
          return
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-refund-dialog {
  .el-message-box__btns {
    display: flex;
    justify-content: 'space-around'
  }
}
</style>

