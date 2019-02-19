<template>
  <div class="access">
      <p class="remark">推送数据 <span class="blue"> 数据截止到一小时前</span></p>

      <div class="control-box">
        统计时间： <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          @change="days=''"
          :picker-options="pickerOptions">
        </el-date-picker>
         <el-radio-group v-model="days" @change="changeDays">
             <el-radio :label="7">近7天</el-radio>
             <el-radio :label="30">近30天</el-radio>
        </el-radio-group>

        消息类型：
          <el-select v-model="type" placeholder="请选择">
              <el-option label="全部" :value="-1" />
              <el-option label="模板消息" :value="2" />
              <el-option label="客服消息" :value="1" />
          </el-select>
        <div style="margin: 20px 0">
        推送类型：
          <el-select v-model="scope" placeholder="请选择">
              <el-option label="全部" :value="-1" />
              <el-option label="推荐" :value="1" />
              <el-option label="浏览发券" :value="2" />
              <el-option label="券过期提醒" :value="3" />
              <el-option label="推荐发券" :value="5" />
              <el-option label="默认" :value="0" />
          </el-select>
          店铺：<el-select v-model="shopId" placeholder="请选择">
          <el-option label='全部店铺' :value="-1" />
          <el-option
            v-for="item in shops"
            :key="item.id"
            :label="item.appName"
            :value="item.id">
          </el-option>
        </el-select>
          排序：
          <el-radio-group v-model="sortField" @change="changeSortField">
            <el-radio-button label="uv">访客数</el-radio-button>
            <el-radio-button label="paidFee">付款金额</el-radio-button>
            <el-radio-button label="arpu">ARPU值</el-radio-button>
          </el-radio-group>
          <span class="blue">删除过的渠道号，这里仍然展示数据哦～</span>
          
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </div>
       <el-table :data="pageData.tableData" border style="width: 100%; font-size: 12px; color: #000;">
        <el-table-column prop="msgName" label="消息名称"></el-table-column>
        <el-table-column prop="type" label="消息类型">
          <template scope="scope">
            <span v-if="scope.row.type === 1">客服消息</span>
            <span v-if="scope.row.type === 2">模板消息</span>
          </template>
        </el-table-column>
        <el-table-column prop="scope" label="推送类型">
          <template scope="scope">
            <span v-if="scope.row.scope === 0">默认</span>
            <span v-if="scope.row.scope === 1">推荐</span>
            <span v-if="scope.row.scope === 2">浏览发券</span>
            <span v-if="scope.row.scope === 3">券过期提醒</span>
            <span v-if="scope.row.scope === 5">推荐发券</span>
          </template>
        </el-table-column>
        <el-table-column prop="pushedNum" label="触达用户数"></el-table-column>
        <el-table-column prop="uv" label="访客数"></el-table-column>
        <el-table-column prop="pv" label="浏览量"></el-table-column>
        <el-table-column prop="orderedUserNum" label="下单访客数"></el-table-column>
        <el-table-column prop="paidOrderNum" label="付款订单数"></el-table-column>
        <el-table-column prop="paidFee" label="付款金额">
          <template scope="scope">
            {{(scope.row.paidFee/100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="arpu" label="ARPU值"></el-table-column>
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
<script>
import { AdminInt } from '../../../api/admin'

export default {
    data() {
        return {
            days: 0,
            type: -1,
            scope: -1,
            time: [],
            shopId: -1,
            shops: [],
            sortField: 'arpu',
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                tableData: [],
                channelName: '',
                title: ''
            },
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
    created () {
        this.getList()
        this.shopGet()
    },
    methods: {
        shopGet() {
            AdminInt.shopGet(res => {
                this.shops = res.data
            })
        },
        handleCurrentChange(val) {
            this.pageData.currentPage = Number(val)
            this.getList()
        },
        search() {
            this.pageData.currentPage = 1
            this.getList()
        },
        getList() {
          this.pageData.tableData = []
          AdminInt.pushGet({
            shopid: this.shopId < 0 ? '' : this.shopId,
            type: this.type < 0 ? '' : this.type,
            scope: this.scope < 0 ? '' : this.scope,
            start: this.start,
            end: this.end,
            page: this.pageData.currentPage,
            sortField: this.sortField
          }, res => {
            if(res && res.data && res.status === 200) {
              this.pageData.total = res.data.totalNum
              this.pageData.pageSize = res.data.pageSize
              this.pageData.currentPage = res.data.page
              res.data.list.forEach(item => this.pageData.tableData.push(item))
            }
          });
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
        changeSortField (field) {
          this.sortField = field
          this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
 .access {
  .el-input--middle {
      width: 200px;
  }
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



