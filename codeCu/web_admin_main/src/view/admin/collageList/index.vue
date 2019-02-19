<template>
  <div>
    <div class="control-box">
      拼团活动名称：
      <el-input v-model="pageData.name" placeholder="请输入拼团活动名称" clearable size="middle" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div style="margin: 20px 0; display: flex; justify-content: space-between;">
      <el-radio-group v-model="filterField" @change="changeFilterField">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="1">进行中</el-radio-button>
        <el-radio-button label="0">草稿</el-radio-button>
      </el-radio-group>
      <div>
        <el-button type="primary" class="permission" data-py="ptbanner" @click.native="$router.push('/collageBannerList')">拼团banner管理</el-button>
        <el-button type="primary" class="permission" data-py="zsgl" @click.native="$router.push('/collageShowList')">展示管理 </el-button>
        <el-button type="primary" class="permission" data-py="xjpt" @click.native="$router.push('/collage?edit=1')">新建拼团</el-button>
      </div>
    </div>
    <el-table :data="pageData.tableData" border style="width: 100%; font-size: 12px; color: #000;">
      <el-table-column prop="id" width="80" label="活动ID"></el-table-column>
      <el-table-column prop="activity_name" label="拼团活动名称"></el-table-column>
      <el-table-column prop="price" label="课程原价">
         <template slot-scope="scope">
            <span>{{ (scope.row.price/100).toFixed(2) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="group_price" label="拼团价/参团人数">
        <template slot-scope="scope">
            <p>{{ (scope.row.group_price/100).toFixed(2) }}</p>
            <p>{{ scope.row.group_num }}</p>
          </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间">
         <template slot-scope="scope">
            <span>{{ formatTime(new Date(scope.row.ctime)) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="is_living" label="活动状态">
         <template slot-scope="scope">
            <span v-if="scope.row.is_living === 0">草稿</span>
            <span v-if="scope.row.is_living === 1">进行中</span>
            <span v-if="scope.row.is_living === 2">已下架</span>
            <el-button type="danger" size="small" v-if="scope.row.is_living == 0" @click.native="updateState(scope.row.id, scope.row.cid, 1)">激活</el-button>
            <el-button type="danger" size="small" v-if="scope.row.is_living == 1" @click.native="updateState(scope.row.id, scope.row.cid, 2)">下架</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native="$router.push(`/collage?id=${scope.row.id}`)">查看详情</el-button>
          <el-button type="text" v-if="scope.row.is_living == 0" size="small" @click.native="$router.push(`/collage?id=${scope.row.id}&edit=1`)">编辑</el-button>

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

const { grouplist, groupSaveOrUpdate } = AdminInt

export default {
  data() {
    return {
      filterField: '',
      pageData: {
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
      }
    }
  },
  created() {
    this.list()
  },
  methods: {
    formatTime: formatTime,
    updateState(id, cid, state) {
      groupSaveOrUpdate({
        id,
        cid,
        is_living: state
      }, res => {
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list(this.pageData.name, this.filterField)
            }
          })
        }
      })
    },
    search() {
      this.list(this.pageData.name)
    },
    list(name, state) {
      grouplist({
        page: this.pageData.currentPage,
        q: name,
        state
      }, res => {
        this.pageData.tableData = res.data.list
        this.pageData.total = res.data.totalNum
        this.pageData.pageSize = res.data.pageSize
        this.pageData.currentPage = res.data.page
      })
    },
    handleCurrentChange () {
  
    },
    changeFilterField (q) {
      this.list(this.pageData.name, q)
      // console.log(q)
    }
  }
}
</script>

