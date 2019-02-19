<template>
  <div>
      <h3>{{ form.id ? '编辑' : '新建'}}拼团活动</h3>
      <el-button v-if="readonly && form.is_living === 0" @click="readonly = false" size="small" type="primary" class="editor">编辑</el-button>
      <el-form :model="form" ref="collageForm" label-width="100px" :rules="formRule">
      <el-form-item label="选择课程" prop="cid">
        <el-autocomplete
          style="width: 300px"
          placeholder="请输入上架中的商品名称"
          v-model="form.course_name"
          :fetch-suggestions="queryCourseAsync"
          value-key="title"
          :trigger-on-focus="false"
          :disabled="readonly"
          @select="val => {form.cid = val.cid; form.detail_image=val.titleImg}">
        </el-autocomplete>
      </el-form-item>

      <el-form-item label="活动商品名称" prop="activity_name">
        <el-input v-model="form.activity_name" placeholder="请输入当前拼团活动的名称，建议【XX人团】" :disabled="readonly"></el-input>
      </el-form-item>

      <el-form-item label="是否推荐" prop="is_recommend">
        <el-radio-group v-model="form.is_recommend" :disabled="readonly">
          <el-radio :label="1">推荐</el-radio>
          <el-radio :label="0">不推荐</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="拼团封面图" prop="activity_image">
        <span style="color: #C0C4CC">400X400最佳 ， 支持 png 、jpg 格式；点击图片更换</span>
        <el-upload
          list-type="picture-card"
          :action="uploadUrl"
          :data="imgParams"
          :show-file-list="false"
          :on-success="(response, file, fileList)=>{upSuccess(response, file, fileList, 'activity_image')}"
          :disabled="readonly"
          :before-upload="beforeUpload">
          <img v-if="form.activity_image" :src="form.activity_image" class="collage-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="拼团详情图">
        <span style="color: #C0C4CC">600x400最佳 ， 支持 png 、jpg 格式；默认拉取课程图片，点击图片更换</span>
        <el-upload
          list-type="picture-card"
          :action="uploadUrl"
          :data="imgParams"
          :show-file-list="false"
          :on-success="(response, file, fileList)=>{upSuccess(response, file, fileList, 'detail_image')}"
          :disabled="readonly"
          :before-upload="beforeUpload">
          <img v-if="form.detail_image" :src="form.detail_image" class="collage-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="虚拟成团数" prop="virtual_num">
        <el-input type="number" v-model="form.virtual_num" placeholder="请输入当前拼团的虚拟拼团数量，默认值为0" :disabled="readonly"></el-input>
      </el-form-item>

      <el-form-item label="成团人数" prop="group_num">
        <el-input type="number" v-model="form.group_num" placeholder="成团人数要求，2人、3人、4人、5人等，最多10人" :disabled="readonly"></el-input>
      </el-form-item>

      <el-form-item label="拼团价格" prop="group_price">
        <el-input type="number" v-model="form.group_price" placeholder="请输入拼团价格，支持2位小数" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="课程价格" prop="group_price" v-if="readonly">
        <el-input v-model="form.price" placeholder="请输入拼团价格，支持2位小数" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="活动状态" prop="group_price" v-if="readonly">
        <el-input v-if="form.is_living === 0" value="草稿" :disabled="true"></el-input>
        <el-input v-if="form.is_living === 1" value="进行中" :disabled="true"></el-input>
        <el-input v-if="form.is_living === 2" value="已下架" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns" style="margin: 50px;" v-if="!readonly">
      <el-button type="success" @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click.native="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import { BASEURL } from "@/api/storge"
import url from '@/store/modules/dataUrl'
import { beforeImgUpload } from "@/api/common"
import { AdminInt } from '@/api/admin'

const { findCourseByName, groupInfo, groupSaveOrUpdate } = AdminInt
export default {
  data() {
    return {
      readonly: true,
      uploadUrl: BASEURL + url.state.upload,
      imgParams: {
        type: 'image'
      },
      form: {
        course_name: '',
        cid: null,
        activity_image: null,
        detail_image: null,
        activity_name: '',
        is_recommend: 0,
        virtual_num: null,
        group_num: null,
        group_price: null,
        id: null,
        is_living: 0
      },
      formRule: {
        cid: [{required: true, message: '请输入课程名称',}],
        activity_name: [{required: true, message: '请输入活动名称',}],
        virtual_num: [{required: true, message: '请输入虚拟拼团数量',}],
        group_num: [{required: true, message: '请输入成团人数',}],
        group_price: [{required: true, message: '请输入拼团价格，支持2位小数',}],
        detail_image: [{required: true, message: '请上传拼团封面图',}],
        activity_image: [{required: true, message: '请上传拼团详情图',}]

      }
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => vm.$store.dispatch('setBreadCrumb', [{
      title: '拼团信息管理'
    }]))
  },
  created() {
    const id = this.$route.query.id
    const edit = this.$route.query.edit
    this.readonly = !!!edit
    if (id) {
      groupInfo({gid: id}, res => {
        let data = res.data
        data.group_price = data.group_price/100
        data.price = data.price/100
        this.form = data
      })
    }
  },
  methods: {
    save() {
      this.$refs.collageForm.validate((valid) => {
        if (valid) {
          const obj = JSON.parse(JSON.stringify(this.form))
          obj.group_price = Number(obj.group_price) * 100
          groupSaveOrUpdate(obj, res => {
            if (res.status === 200) {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.go(-1)
                }
              })
            } else {
              this.$message.error('保存失败')
            }
          })
        } else {
          return false;
        }
      });
    },
    beforeUpload: beforeImgUpload,
    upSuccess (response, file, fileList, key) {
      this.form[key] = response.data
      this.$message.success("上传成功")
    },
    queryCourseAsync(name, cb) {
      if (name){
        findCourseByName({name}, data => {
          if (data.status === 200) {
            cb(JSON.parse(data.data))
          } else {
            cb([])
            this.$message.error('查询失败')
          }
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.collage-image {
  width: 100%;
  height: 100%;
}
</style>
