<template>
  <div>
    <el-button v-if="!formData.isEditor" @click="formData.isEditor = true" size="small"  type="primary">编辑</el-button>

    <el-row class="box" v-for="(item,i) in formData.list" :key="i">
      <el-col :span="6">
        <div class="act-img-box">
          <el-upload
            list-type="picture-card"
            :action="uploadAction"
            :data="imgParams"
            :show-file-list="false"
            :on-success="(response, file, fileList)=>{upSuccess(response, file, fileList, i)}"
            :disabled="!formData.isEditor"
            :before-upload="beforeUpload">
            <img v-if="item.img" :src="item.img" class="act-banner">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="5" :offset="1" class="title">
        <div>{{ i + 1 }}号Banner</div>
        <div v-if="formData.isEditor || item.type === 2">
          <el-radio @change="changeType2(item)" v-model="item.type" :label="2">跳转外部链接</el-radio>
        </div>
        <div v-if="formData.isEditor || item.type === 1">
          <el-radio @change="changeType1(item)" v-model="item.type" :label="1">跳转课程</el-radio>
        </div>
        <div v-if="formData.isEditor || item.type === 4">
          <el-radio @change="changeType4(item)" v-model="item.type" :label="4">跳转拼团详情</el-radio>
        </div>
        <div>图片格式</div>
      </el-col>
      <br/>
      <el-col class="area">
        <div>
          <el-button @click.native="delBanner(i)" size="small" type="primary" v-if="formData.isEditor">删除</el-button>
        </div>
        <div v-if="formData.isEditor || item.type === 2">
          <el-input v-model="item.url" placeholder="请输入跳转链接" size="middle" clearable :disabled="item.type!=2"></el-input>
        </div>
        <div v-if="formData.isEditor || item.type === 1">
          <el-autocomplete
            style="width: 300px"
            placeholder="请输入课程名称"
            v-model="item.title"
            :fetch-suggestions="queryCourseAsync"
            :trigger-on-focus="false"
            value-key="title"
            :disabled="item.type!=1"
            @select="val => item.cid = val.cid">
          </el-autocomplete>
        </div>
        <div v-if="formData.isEditor || item.type === 4">
          <el-autocomplete
            style="width: 300px"
            placeholder="请输入拼团活动名称"
            v-model="item.activity_name"
            :fetch-suggestions="queryCollageAsync"
            :trigger-on-focus="false"
            value-key="activity_name"
            :disabled="item.type!=4"
            @select="val => item.cid = val.id">
          </el-autocomplete>
        </div>
        <div>
          750像素*400像素，png、jpg、jpeg格式
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-button @click="add" size="small" type="primary" v-if="formData.isEditor">添加Banner</el-button>  
        <el-button @click="save" size="small" type="primary" v-if="formData.isEditor">保存</el-button> 
        <el-button @click="formData.isEditor = false" size="small" type="primary" v-if="formData.isEditor">取消</el-button>               
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { BASEURL } from "@/api/storge"
import { beforeImgUpload } from "@/api/common"
import { state } from '@/store/modules/dataUrl'
import { AdminInt } from "@/api/admin"

export default {
  data() {
    return {
      uploadAction: BASEURL + state.upload,
      imgParams: {
        type: 'image'
      },
      maxLength: 5,
      formData: {
        isEditor: false,
        list: []
      }
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => vm.$store.dispatch('setBreadCrumb', [{
      title: '拼团banner管理'
    }]))
  },
  created() {
    this.list()
  },
  methods: {
    list() {
       AdminInt.getBannerList({banner_type: 2}, res => {
            res.data.list.map(item => {
              if (item.type === 4){
                item.activity_name = item.title
                item.title = ''
              }
            })
            this.formData.list = res.data.list
        })
    },
    queryCourseAsync (name, cb) {
      if (name){
        AdminInt.findCourseByName({name}, data => {
          if (data.status === 200) {
            cb(JSON.parse(data.data))
          } else {
            cb([])
            this.$message.error('查询失败')
          }
        })
      }
    },
    queryCollageAsync (name, cb) {
      if (name){
        AdminInt.grouplist({
          page: 1,
          q: name,
          state: 1
        }, res => {
          if (res.status === 200) {
            cb(res.data.list)
          } else {
            cb([])
            this.$message.error('查询失败')
          }
        })
      }
    },
    changeType1(item) {
      item.activity_name = ''
      item.url = ''
    },
    changeType2(item) {
      item.cid = ''
      item.title = ''
      item.activity_name = ''
    },
    changeType4(item) {
      item.title = ''
      item.url = ''
    },
    beforeUpload: file => {
      return beforeImgUpload(file)
    },
    upSuccess (response, file, fileList, index) {
      this.formData.list[index].img = response.data
      this.$message.success("上传成功")
    },
    delBanner(i) {
      this.formData.list.splice(i,1)
    },
    add() {
      if(this.formData.list.length >= this.maxLength){
        this.$message.error(`不能超过${this.maxLength}条`)
        return 
      }
      this.formData.list.push({
        b_no:0,       
        type: 4,  
        cid:'',    
        url:'',   
        img:'',    
        location:0,
      })
    },
    save() {
      let r = this.formData.list
      // 1课程 2外链  4活动
      if (r.length == 0){
        this.$message.error("最少保存一条banner")
        return
      }

      let flag = false
      for(let i = 0, l = r.length; i < l; i++) {
        
        if (!r[i].img || ((r[i].type === 1 || r[i].type === 4) && !r[i].cid) || (r[i].type === 2 && !r[i].url)) {
          this.$message.warning(`${i+1}号banner信息不完整`)
          flag = true
          break;
        }
        r[i].b_no = i+1
        r[i].cid = +r[i].cid
        r[i].banner_type = 2
      }
      
      if (flag) return

      AdminInt.bannerGroupEdit({bannerInfoList: r},res => {
        this.$message.success("保存成功")
        this.formData.isEditor = false
        this.list()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  // height: 200px;
  overflow: hidden;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 130px;
  display: block;
}

.avatar {
  width: 178px;
  height: 130px;
  display: block;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}

.el-input {
  width: 40%;
}

.el-col-10 {
  line-height: 40px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #ccc;
  box-sizing: border-box;

  &:last-child {
      border: none;
  }
  .title {
    // text-align: right;
    padding-right: 40px;
    & > * {
      height: 50px;
      line-height: 50px;
    }
  }
  .area > * {
    height: 50px;
    line-height: 50px;
  }
  .act-banner{
    width: 100%;
    height: 100%;
  }
}

.title, .area {
  display: flex;
  flex-direction: column;
}
</style>
