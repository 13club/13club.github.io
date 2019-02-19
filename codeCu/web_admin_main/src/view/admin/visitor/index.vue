<template>
  <div class="access">
    <p class="remark">渠道数据 <span class="blue"> 数据截止到一小时前</span></p>

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
      店铺：<el-select v-model="shopId" placeholder="请选择">
          <el-option label='全部店铺' :value="-1" />
          <el-option
            v-for="item in shops"
            :key="item.id"
            :label="item.appName"
            :value="item.id">
          </el-option>
        </el-select>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <el-row :gutter="50">
      <el-col :span="12">
        <h2>新访客 {{ newRate }}%</h2>
      </el-col>
      <el-col :span="12">
        <h2>老访客 {{ oldRate }}%</h2>
      </el-col>
    </el-row>
    <el-row :gutter="50" style="margin-top: 30px;">
      <el-col :span="12">
        <el-table :data="newPVAndUVSum" border style="width: 100%; font-size: 12px; color: #000;">
          <el-table-column prop="pv" label="浏览量"></el-table-column>
          <el-table-column prop="uv" label="访客数"></el-table-column>
          <el-table-column prop="avePV" label="平均访问页数"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
         <el-table :data="oldPVAndUVSum" border style="width: 100%; font-size: 12px; color: #000;">
          <el-table-column prop="pv" label="浏览量"></el-table-column>
          <el-table-column prop="uv" label="访客数"></el-table-column>
          <el-table-column prop="avePV" label="平均访问页数"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    
    <el-row :gutter="50" style="margin-top: 30px;">
      <el-col :span="12">
         <el-table :data="channelNew5" border style="width: 100%; font-size: 12px; color: #000;">
           <el-table-column label="访问来源TOP5" label-class-name="green-title">
            <el-table-column type="index" label="排名"></el-table-column>
            <el-table-column prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column prop="pv" label="浏览量(PV)"></el-table-column>
           </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
         <el-table :data="channelOld5" border style="width: 100%; font-size: 12px; color: #000;">
           <el-table-column label="访问来源TOP5" label-class-name="blue-title">
            <el-table-column type="index" label="排名"></el-table-column>
            <el-table-column prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column prop="pv" label="浏览量(PV)"></el-table-column>
           </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="50" style="margin-top: 30px;">
      <el-col :span="12">
         <el-table :data="courseNew5" border style="width: 100%; font-size: 12px; color: #000;">
           <el-table-column label="访问课程TOP5" label-class-name="green-title">
            <el-table-column type="index" label="排名"></el-table-column>
            <el-table-column prop="title" label="课程名称"></el-table-column>
            <el-table-column prop="pv" label="浏览量(PV)"></el-table-column>
           </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
         <el-table :data="courseOld5" border style="width: 100%; font-size: 12px; color: #000;">
          <el-table-column label="访问课程TOP5" label-class-name="blue-title">
            <el-table-column type="index" label="排名"></el-table-column>
            <el-table-column prop="title" label="课程名称"></el-table-column>
            <el-table-column prop="pv" label="浏览量(PV)"></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { AdminInt } from '../../../api/admin'

export default {
    data() {
        return {
          newRate: 0,
          oldRate: 0,
          newPVAndUVSum: [],
          oldPVAndUVSum: [],
          courseOld5: [],
          courseNew5: [],
          channelOld5: [],
          channelNew5: [],
          days: 0,
          time: [],
          shopId: -1,
          shops: [],
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
        search() {
            this.getList()
        },
        getList() {
          AdminInt.getVisitorList({
            shopid: this.shopId < 0 ? '' : this.shopId,
            start: this.start,
            end: this.end,
          }, res => {
            if(res && res.data && res.status === 200) {
              this.channelNew5 = res.data.channelNew5
              this.channelOld5 = res.data.channelOld5
              this.courseNew5 = res.data.courseNew5
              this.courseOld5 = res.data.courseOld5
              this.newPVAndUVSum = [res.data.newPVAndUVSum]
              this.oldPVAndUVSum = [res.data.oldPVAndUVSum]
              const totalUV = res.data.newPVAndUVSum.uv + res.data.oldPVAndUVSum.uv
              if (totalUV !== 0) {
                this.newRate = ((res.data.newPVAndUVSum.uv/totalUV) * 100).toFixed(2)
                this.oldRate = ((res.data.oldPVAndUVSum.uv/totalUV) * 100).toFixed(2)
              }
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
h2 {
  text-align: center;
}
.green-title {
  background: #fff;
  border: none;
  color: rgb(51, 204, 204);
  font-size: 18px;
}
.blue-title {
  background: #fff;
  border: none;
  color: #0099FF;
  font-size: 18px;
}
</style>



