<template>
  <div class="course-groups-detail">
    <el-row>
      <el-col :span="4" :offset="2"><h3>基本信息</h3></el-col>
      <el-col :span="4" :offset="14" v-if="readonly"><el-button type="primary" @click="readonly=false">编辑</el-button></el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-input v-model="form.name" placeholder="请输入30个字符以内" :disabled="readonly">
          <span slot="prepend">分组标题</span>
        </el-input>
      </el-form-item>
      <el-form-item v-for="(courseDesc, index) in coursesDesc" :key="index">
        <el-input :value="courseDesc" disabled>
          <span slot="prepend" v-if="index === 0">课程列表</span>
          <span slot="prepend" v-else style="visibility: hidden;">课程列表</span>
          <div slot="append" v-if="!readonly">
            <i :class="['el-icon-arrow-down', index === coursesDesc.length - 1? 'gray' : '']" @click="down(index)"></i>
            <i :class="['el-icon-arrow-up', index === 0 ? 'gray' : '']" @click="up(index)"></i>
            <i class="el-icon-delete" @click="del(index)"></i>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!readonly" :style="coursesDesc.length === 0 ? 'margin-left: 15px;' : 'margin-left: 96px;'" :label="coursesDesc.length === 0 ? '课程列表' : ''">
        <el-select style="width: 885px;"
        v-model="courseKey"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          @change="change"
          :loading="loading">
          <el-option
            v-for="item in courses"
            :key="item.title"
            :label="item.title"
            :value="item.cid">
          </el-option>
        </el-select>
        <el-button type="primary" style="width: 184px;" @click="addCourse">添加课程</el-button>
      </el-form-item>
      <el-form-item label="显示状态" style="margin-left: 20px;" v-if="!readonly">
        <el-radio v-model="form.isValid" label="Y">显示</el-radio>
        <el-radio v-model="form.isValid" label="N">不显示</el-radio>
      </el-form-item>
      <el-form-item v-if="readonly">
        <el-input :value="form.isValid === 'Y' ? '显示中' : '不显示'" disabled >
          <span slot="prepend">显示状态</span>
        </el-input>
      </el-form-item>

      <el-form-item style="margin: 100px 0 0 100px;" v-if="!readonly">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'

const { findGroupDetail, findCourseByName, saveOrUpdateCourseGroups } = AdminInt

export default {
  name: 'courseGroupsDetail',
  data() {
    return {
      readonly: true,
      courseKey: '',
      loading: false,
      courses: [], // 根据课程名称关键字搜索的课程列表
      course: null, // 选中要添加的课程
      coursesDesc: [],
      form: {
        shopid: undefined,
        id: undefined,
        name: '',
        courseIds: [],
        isValid: 'Y'
      }
    }
  },
  created() {
    const query = this.$route.query
    if (!query.groupId && !query.shopid) {
      return this.$message.warning('地址栏参数缺少shopid')
    } else this.form.shopid = query.shopid

    if (query.groupId){
      this.form.id = this.$route.query.groupId
      findGroupDetail({id: this.form.id}, data => {
        if (data.status === 200) {
          const r = JSON.parse(data.data)
          this.form.isValid = r.isValid
          this.form.name = r.name
          r.courses.forEach(course => {
            this.coursesDesc.push(course.course.cid + '        ' + course.course.title)
            this.form.courseIds.push(course.course.cid)
          })
        } else {
          this.$message.error('查询失败')
        }
      })
    } else this.readonly = false
  },
  methods: {
    down(index) {
      if (index === this.coursesDesc.length -1) return;
      const course = this.coursesDesc.splice(index, 1)
      this.coursesDesc.splice(index + 1, 0, ...course)

      const courseId = this.form.courseIds.splice(index, 1)
      this.form.courseIds.splice(index + 1, 0, ...courseId)

    },
    up(index) {
      if (index === 0) return;
      const course = this.coursesDesc.splice(index, 1)
      this.coursesDesc.splice(index - 1, 0, ...course)

      const courseId = this.form.courseIds.splice(index, 1)
      this.form.courseIds.splice(index - 1, 0, ...courseId)
    },
    del(index) {
      this.coursesDesc.splice(index, 1)
      this.form.courseIds.splice(index, 1)
    },
    remoteMethod(name) {
      if (name){
        this.loading = true;
        findCourseByName({name}, data => {
          if (data.status === 200) {
            let courses = JSON.parse(data.data)
            const result = courses.filter(course => !this.form.courseIds.includes(course.cid))

            this.loading = false;
            this.courses = result
          } else {
            this.$message.error('查询失败')
          }
        })
      } else this.courses = []
    },
    addCourse() {
      if (!this.course) {
        this.$message.error('请输入关键词')
        return;
      }
      this.coursesDesc.push(this.course.cid + '        ' + this.course.title)
      this.form.courseIds.push(this.course.cid)
      this.courses = []
      this.course = null
      this.courseKey = ''
    },
    save() {
      if (!this.form.name) {
        this.$message.error('必须输入分组标题')
      } else if (this.form.name.length > 30) {
        this.$message.error('分组标题不能超过30个字符')
      } else {
        saveOrUpdateCourseGroups(this.form, data => {
          if (data.status === 200) {
            this.readonly = true
            if (!this.form.id) this.form.id = data.data
          } else this.$message.error('操作失败')
        })
      }
    },
    change(value) {
      this.course = this.courses.find(course => course.cid === value)
    }
  }
}
</script>
<style lang="scss">
.course-groups-detail {
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
