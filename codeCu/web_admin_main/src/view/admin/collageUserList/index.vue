<template>
  <div>
    <div class="control-box">
      活动名称：
      <el-input v-model="form.name" placeholder="请输入拼团活动名称" clearable size="middle" />
      开团时间： <el-date-picker
        v-model="form.time"
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
      <br/>
      <br/>
      用户昵称：
      <el-input v-model="form.nickName" placeholder="请输入团长及团员昵称" clearable size="middle" />
      渠道名称：
      <el-input v-model="form.channelName" placeholder="请输入开团渠道名称" clearable size="middle" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div style="margin-bottom: 20px">
      <el-radio-group v-model="state" @change="changeState">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="1">拼团中</el-radio-button>
        <el-radio-button :label="2">已成团</el-radio-button>
        <el-radio-button :label="3">拼团失败</el-radio-button>
      </el-radio-group>
    </div>
    <el-table :data="tableData" border style="width: 100%; font-size: 12px; color: #000;" :span-method="arraySpanMethod" :cell-style="cellStyle">
      <el-table-column prop="id" label="拼团活动ID"></el-table-column>
      <el-table-column prop="activity_name" label="拼团活动名称"></el-table-column>
      <el-table-column label="拼团价/拼团人数">
        <template scope="scope">
          {{(scope.row.group_price /100).toFixed(2)}}/{{scope.row.group_num}}
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="参团用户">
        <template scope="scope">
          <ul>
            <li v-for="(user, i) in scope.row.users" :key="i">
              <span v-if="user.is_admin === 1">团长：</span>{{user.uname}}
            </li>
            <li v-for="(user, i) in scope.row.temp_users" :key="i" style="color: #66b1ff">
              {{user.uname}}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="open_time" label="开团时间">
        <template scope="scope">
          <span>{{ formatTime(new Date(scope.row.open_time)) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suc_time" label="成团时间">
        <template scope="scope">
          <span>{{ scope.row.status === 2 && formatTime(new Date(scope.row.mtime)) || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="拼团状态">
        <template scope="scope">
          <span v-if="scope.row.status == 0">预开团</span>
          <div v-if="scope.row.status == 1">
            <span>拼团中</span>
            <el-button type="danger" size="small" @click.native="manualCollage(scope.row.id)">手动成团</el-button>
          </div>
          <span v-if="scope.row.status == 2">已成团<span v-if="scope.row.isOkBySys" style="color: #66b1ff">（系统成团）</span></span>
          <span v-if="scope.row.status == 3">拼团失败</span>
        </template>
      </el-table-column>
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
import { AdminInt } from '@/api/admin'
import { formatTime } from '@/api/common'

export default {
  data() {
    return {
      state: '',
      days: '',
      tableData: [],
      form: {
        channelName: '',
        nickName: '',
        name: '',
        time: []
      },
      pageData: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
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
        this.form.time[0] = val
      }
    },
    end: {
        get() {
        return this.time && +new Date(this.time[1]) || ''
      },
      set(val) {
        this.form.time[1] = val
      }
    }
  },
  created() {
    this.list()
  },
  methods: {
    formatTime: formatTime,
    cellStyle({ row, column, rowIndex, columnIndex }) {
      rowIndex++
      if (!!(rowIndex & 1) && columnIndex > 0) {
        return {
          display: 'none'
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 6]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    handleCurrentChange(val) {
      this.pageData.currentPage = Number(val)
      this.list()
    },
    manualCollage(ogid) {
      AdminInt.groupOpengroupManual({
        ogid
      }, res => {
        if(res.status === 200) {
          this.$message({
            message: '手动成团成功',
            type: 'success',
            duration: 1000,
            onClose: () => this.$router.go(0)
          })
        } {
           this.$message({
            message: '手动成团失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    list() {
      let start = null,end = null, time = this.form.time
      if(time && time.length != 0){
        start = new Date(time[0]).getTime()
        end = new Date(time[1]).getTime()
      }
      this.tableData = []
      AdminInt.groupOpengroupList({
        q: this.form.name,
        nickName: this.form.nickName,
        channelName: this.form.channelName,
        state: this.state,
        page: this.pageData.currentPage,
        start,
        end
      }, res => {
        res.data.list.forEach(item => {
          this.tableData.push({id : '开团渠道：' + item.channel_name})
          this.tableData.push(item)
          this.pageData.total = res.data.totalNum
          this.pageData.pageSize = res.data.pageSize
          this.pageData.currentPage = res.data.page
        })
      })
    },
    search() {
      let start = null,end = null, time = this.form.time
      if(time && time.length != 0){
        start = new Date(time[0]).getTime()
        end = new Date(time[1]).getTime()
      }
      this.list(start, end);
    },
    changeDays() {
      this.form.time = []
      let c = new Date()
      c.setDate(c.getDate() - this.days)
      const start = new Date(c.getFullYear() + '-' + (c.getMonth() + 1) + '-' + c.getDate() + ' 00:00:00')

      this.start = +start
      this.end = +new Date()
      this.list()
    },
    changeState(state) {
      this.state = state
      this.list()
    }
  }
}
</script>
<style lang="scss" scoped>
.control-box {
  padding: 30px 0;
}
.row-list {
  td {
    display: none;
  }
}
</style>

