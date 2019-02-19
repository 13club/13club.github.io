<template>
  <div class="course-groups">
    <div style="margin: 15px 0;">店铺名称： {{shop.appName}}</div>
    <div class="control-box">
      <el-button type="primary" class="permission" data-py="xjfz" @click="$router.push(`/courseGroupsDetail?shopid=${$route.query.shopid}`)">新建分组</el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="分组名称" />
      <el-table-column prop="userName" label="排序">
        <template slot-scope="scope">
          <i :class="['el-icon-arrow-down', scope.$index === list.length - 1? 'gray' : '']" @click="down(scope.$index)"></i>
          <i :class="['el-icon-arrow-up', scope.$index === 0 ? 'gray' : '']" @click="up(scope.$index)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="显示状态">
        <template slot-scope="scope">
          <span v-if="scope.row.isValid === 'Y'">显示中</span>
          <span v-else>未显示</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isValid === 'Y'" @click="setValid(scope.row.id, 'N')" class="permission" data-py="xj" type="text" size="small">下架</el-button>
          <el-button v-if="scope.row.isValid === 'N'" @click="setValid(scope.row.id, 'Y')" class="permission" data-py="sj" type="text" size="small">上架</el-button>
          <el-button v-if="scope.row.isValid === 'N'" @click="del(scope.row.id)" class="permission" data-py="sc" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="管理">
        <template slot-scope="scope">
          <router-link :to="'/courseGroupsDetail?groupId=' + scope.row.id"  class="permission" data-py="xq">详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'

const { findAllCourseGroup, groupSort, setValid, deleteGroup, findShop } = AdminInt
export default {
  name: 'courseGroups',
  data() {
    return {
      list: [],
      shop: {}
    }
  },
  created() {
    const shopid = this.$route.query.shopid
    if (shopid) {
      findAllCourseGroup({shopid}, data => {
        if (data.status === 200) {
          this.list = JSON.parse(data.data)
        } else {
          this.$message.error('查询失败')
        }
      })

      findShop({shopid}, data => {
        if (data.status === 200)
          this.shop = Object.assign({}, this.shop, data.data)
      })
    } else {
      this.$message.warning('地址栏参数缺少shopid')
    }
  },
  methods: {
    del(id) {

      this.$confirm('确认删除分组吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGroup({info: {id}}, data => {
          if (data.status === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose() {
                location.reload()
              }
            })
          } else this.$message.error('操作失败')
        })
      }).catch(() => {})
    },
    setValid(id, isValid) {
      setValid({ info: {id, isValid} }, data => {
        if (data.status === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose() {
              location.reload()
            }
          })
        } else this.$message.error('操作失败')
      })
    },
    down(index) {
      if (index === this.list.length -1) return;
      const c = this.list[index]
      const c1 = this.list[index + 1]

      const temp_sn = c1.sn
      c1.sn = c.sn
      c.sn = temp_sn
      
      groupSort({info: JSON.stringify([c, c1])}, data => {
        if (data.status === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose() {
              location.reload()
            }
          })
        } else this.$message.error('操作失败')
      })
    }, 
    up(index) {
      if (index === 0) return;
      const c = this.list[index]
      const c1 = this.list[index - 1]

      const temp_sn = c1.sn
      c1.sn = c.sn
      c.sn = temp_sn
      
      groupSort({info: encodeURIComponent(JSON.stringify([c, c1]))}, data => {
        if (data.status === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose() {
              location.reload()
            }
          })
        } else this.$message.error('操作失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.course-groups {
  & a {
    color: #409EFF;
  }
  & i {
      font-size: 25px;
      margin: 0 10px;
      cursor: pointer;
      color: #66b1ff;
      &.gray {
        color: #ccc;
        cursor: not-allowed;
      }
  }
}
</style>

