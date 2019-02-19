<template>
  <div class="block">
    <div class="block control-box">
      兑书活动名称：<el-input v-model="name" size="middle" clearable></el-input>
      <el-button type="primary" @click="getList" class="search-btn">搜索</el-button>
      <div style="margin: 20px 0; display: flex; justify-content: space-between;">
        <el-radio-group v-model="status" @change="changeStatus">
          <el-radio-button :label="''">全部</el-radio-button>
          <el-radio-button :label="1">进行中</el-radio-button>
          <el-radio-button :label="2">已过期</el-radio-button>
          <el-radio-button :label="0">草稿</el-radio-button>
        </el-radio-group>
        <div>
          <!-- <el-button type="primary">展示管理</el-button> -->
          <el-button type="primary" data-py="xjdh" class="permission" @click.native="$router.push('/exchangeNew?edit=1')">新建兑换</el-button>
        </div>
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
        <el-table-column prop="id" label="活动ID"></el-table-column>
        <el-table-column prop="activity_name" label="活动名称" width="200"></el-table-column>
        <el-table-column prop="price" label="课程原价">
          <template slot-scope="scope">
            {{(scope.row.price/100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="exchange_fee" label="兑换价格/剩余数量">
          <template slot-scope="scope">
            {{(scope.row.exchange_fee/100).toFixed(2)}}/
            {{scope.row.exchange_total_num - scope.row.exchange_num}}
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="创建时间">
          <template slot-scope="scope">
            {{formatTime(new Date(scope.row.ctime))}}
          </template>
        </el-table-column>
        <el-table-column prop="is_living" label="活动状态">
          <template slot-scope="scope">
            <!-- 默认0；1--激活（上架）；2---删除（停止 -->
            <div v-if="scope.row.is_living === 0">
              <p>草稿</p>
              <el-button @click.native="editStatus(scope.row.id, 1)" type="danger" size="small">激活</el-button>
            </div>
            <div v-if="scope.row.is_living === 1">
              <p>进行中</p>
              <el-button @click.native="editStatus(scope.row.id, 2)" type="danger" size="small">下架</el-button>
            </div>
            <div v-if="scope.row.is_living === 2">已过期</div>
          </template>
        </el-table-column>
        <el-table-column prop="uname" label="操作">
          <template slot-scope="scope">
            <el-button @click.native="$router.push(`/exchangeNew?id=${scope.row.id}`)" type="primary" size="small">查看详情</el-button>
            <br />
            <el-button v-if="scope.row.is_living === 0" @click.native="$router.push(`/exchangeNew?edit=1&id=${scope.row.id}`)" size="small" type="text">编辑</el-button>
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
      name: '',
      status: ''
    }
  },
  created() {
    AdminInt.shopGet(res => {
      this.shops = res.data
    })
    this.getList()
  },
  methods: {
    formatTime,
    editStatus(id, status) {
      AdminInt.exchangeEditStatus({
        id,
        is_living:status
      }, res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功',
            duration: 1000,
            onClose: () => {
              this.getList()
            }
          })
        } else {
          this.$message.warning('修改失败')
        }
      })
    },
    getList() {
      AdminInt.exchangeFindall({
        q: this.name,
        status: this.status,
        page: this.currentPage
      }, res => {
        this.list = res.data.list
        this.totalNum = res.data.totalNum
      })
    },
    changeStatus(status) {
      this.status = status
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = Number(val)
      this.getList()
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