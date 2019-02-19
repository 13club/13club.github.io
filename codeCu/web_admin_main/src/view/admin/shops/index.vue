<template>
  <div class="act-diagram">
    <div class="control-box">
      <el-button type="primary" class="permission" data-py="lrxdp" @click="$router.push('/shop')">录入新店铺</el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="店铺ID" />
      <el-table-column prop="appName" label="名称" />
      <el-table-column prop="appType" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.appType===1">公众号</span>
          <span v-else>小程序</span>
        </template>
      </el-table-column>
      <el-table-column prop="appid" label="APPID" />
      <el-table-column prop="developid" label="原始ID" />
      <el-table-column prop="type" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/courseGroups?shopid='+scope.row.id" class="permission" data-py="fz">课程分组</router-link>
          <router-link :to="'/banner?shopid='+scope.row.id" class="permission" data-py="banner">banner图</router-link>
          <router-link :to="'/actDiagram?shopid='+scope.row.id" class="permission" data-py="hdt">活动图</router-link>
          <router-link :to="'/shop?shopid='+scope.row.id" class="permission" data-py="xq">详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'

const { findAllShop } = AdminInt
export default {
  name: 'actDiagram',
  data() {
    return {
      list: []
    }
  },
  created() {
    findAllShop(null, data => {
      if (data.status === 200) {
        this.list = JSON.parse(data.data)
      } else {
        this.$message.error('查询失败')
      }
    })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.act-diagram {
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

