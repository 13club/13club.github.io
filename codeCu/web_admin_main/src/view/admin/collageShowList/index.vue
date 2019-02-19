<template>
  <div class="showlist">
    <el-row>
      <el-col :span="4" :offset="2"><h3>基本信息</h3></el-col>
      <el-col :span="4" :offset="14" v-if="readonly"><el-button type="primary" @click="readonly=false">编辑</el-button></el-col>
    </el-row>
    <el-form ref="form" label-width="100px">
      <el-form-item v-for="(item, index) in showlist" :key="index">
        <el-input :value="item.activity_name" disabled>
          <span slot="prepend" v-if="index === 0">拼团活动列表</span>
          <span slot="prepend" v-else style="visibility: hidden;">拼团活动列表</span>
          <div slot="append" v-if="!readonly">
            <i :class="['el-icon-arrow-down', index === showlist.length - 1? 'gray' : '']" @click="down(index)"></i>
            <i :class="['el-icon-arrow-up', index === 0 ? 'gray' : '']" @click="up(index)"></i>
            <i class="el-icon-delete" @click="del(index)"></i>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!readonly" :style="showlist.length === 0 ? 'margin-left: 15px;' : 'margin-left: 122px;'" :label="showlist.length === 0 ? '拼团活动列表' : ''">
        <el-autocomplete
            style="width: 300px"
            placeholder="输入拼团活动名搜索"
            v-model="collageName"
            :fetch-suggestions="queryCollageAsync"
            :trigger-on-focus="false"
            value-key="activity_name"
            @select="val => {showlist.push(val); collageName=''}">
          </el-autocomplete>
      </el-form-item>
      <el-form-item style="margin: 100px 0 0 100px;" v-if="!readonly">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="readonly=true">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'
const { groupShowlist, grouplist, groupShowlistUpdate } = AdminInt
export default {
  data() {
    return {
      readonly: true,
      form: {},
      showlist: [],
      collageName: ''
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => vm.$store.dispatch('setBreadCrumb', [{
      title: '拼团展示管理'
    }]))
  },
  created() {
    groupShowlist(null, res => {
      this.showlist = res.data
    })
  },
  methods: {
    queryCollageAsync (name, cb) {
      if (name){
        grouplist({
          page: 1,
          q: name,
          state: 1
        }, res => {
          if (res.status === 200) {
            cb(res.data.list.filter(l => this.showlist.every(i => i.id !== l.id)))
          } else {
            cb([])
            this.$message.error('查询失败')
          }
        })
      }
    },
    save() {
      let r = []
      this.showlist.forEach((o, i) => {
        r.push({
          id: o.id,
          show_num: ++i
        })
      })
      groupShowlistUpdate(r, res => {
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              location.reload()
            }
          })
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    down(index) {
      if (index === this.showlist.length -1) return;
      const course = this.showlist.splice(index, 1)
      this.showlist.splice(index + 1, 0, ...course)
    },
    up(index) {
      if (index === 0) return;
      const course = this.showlist.splice(index, 1)
      this.showlist.splice(index - 1, 0, ...course)
    },
    del(index) {
      this.showlist.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.showlist {
  & .el-form-item__content {
    margin: 0 !important;
  }
  & .el-input-group__prepend {
    background-color: transparent !important;
    color: #606266 !important;
    border: none;
  }
  & .el-input__inner {
    border-radius: 5px;
  }
  & .el-input-group__append {
    background: transparent !important;
    border: none !important;
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
}
</style>


