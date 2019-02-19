<template>
  <div>
    <el-form :model="formData" ref="form" label-width="120px" :rules="rules">
      <el-row>
        <el-col :span="4" :offset="2"><h3>基本信息</h3></el-col>
        <el-col :span="4" :offset="14" v-if="readonly && formData.is_living === 0"><el-button type="primary" @click="readonly=false">编辑</el-button></el-col>
      </el-row>
      <el-form-item label="选择课程" prop="cid">
        <el-autocomplete
          style="width: 300px"
          placeholder="请输入上架中的商品名称"
          v-model="formData.title"
          :fetch-suggestions="queryCourseAsync"
          value-key="title"
          :trigger-on-focus="false"
          :disabled="readonly"
          @select="val => {formData.cid = val.cid;formData.activity_image=val.titleImg}">
        </el-autocomplete>
      </el-form-item>

      <el-form-item label="活动名称" prop="activity_name">
        <el-input v-model="formData.activity_name"  placeholder="请输入当前兑换活动名称，便于运营区分" :disabled="readonly"></el-input>
      </el-form-item>

      <el-form-item label="是否推荐" prop="is_recommend">
        <el-radio-group v-model="formData.is_recommend" :disabled="readonly">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动详情图" prop="activity_image">
        <span style="color: #C0C4CC">600x400最佳 ， 支持 png 、jpg 格式；默认拉取课程图片，点击图片更换</span>
        <el-upload
          class="exchange-upload"
          list-type="picture-card"
          :action="uploadUrl"
          :data="imgParams"
          :show-file-list="false"
          :on-success="(response, file, fileList)=>{upSuccess(response, file, fileList, 'activity_image')}"
          :disabled="readonly"
          :before-upload="beforeUpload">
          <img v-if="formData.activity_image" :src="formData.activity_image" class="collage-image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="兑换总量" prop="exchange_total_num">
        <el-input v-model.number="formData.exchange_total_num" placeholder="请输入兑换数量，默认值为1" :disabled="readonly" ></el-input>
        <el-button size="small" type="text" @click.native="addNumer" v-if="readonly && formData.is_living !== 2">增加数量</el-button>
      </el-form-item>

      <el-form-item label="兑换价格" prop="exchange_fee">
        <el-input v-model="formData.exchange_fee"  placeholder="输入兑换价格，支持2位小数" :disabled="readonly"></el-input>
      </el-form-item>

      <el-form-item label="兑换期限" prop="start_time">
        <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :disabled="readonly"
          @change="selectDate"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button size="small" type="text" @click.native="extendDateDialogVisible=true" v-if="readonly && formData.is_living !== 2">延长日期</el-button>
      </el-form-item>
      <div v-if="readonly">
        <el-row class="border-b">
          <el-col :span="16" class="large padd20">辅助信息</el-col>
        </el-row>
        <el-form-item label="活动ID">
          <el-input :value="formData.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input :value="formData.exchange_total_num-formData.exchange_num" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="兑换人数">
          <el-input :value="formData.exchange_num" :disabled="true"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="btns" style="margin: 50px;" v-if="!readonly">
      <el-button type="success" @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click.native="save">保存</el-button>
    </div>
    <el-dialog :visible.sync="extendDateDialogVisible" width="30%" center>
      过期时间：<el-date-picker v-model="extendDate" type="date" placeholder="选择日期"></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="extendDateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addExtendDate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { BASEURL } from "@/api/storge"
import url from '@/store/modules/dataUrl'
import { beforeImgUpload } from "@/api/common"
import { AdminInt } from '@/api/admin'

export default {
  data() {
    return {
      id: null,
      extendDate: '',
      extendDateDialogVisible: false,
      rules: {
        cid: [{ required: true, message: '选择课程' }],
        activity_name:  [{ required: true, message: '活动名称' }],
        activity_image:  [{ required: true, message: '活动详情图' }],
        exchange_fee:  [{ required: true, message: '兑换价格' }],
        start_time:  [{ required: true, message: '请输入兑换期限' }],
        exchange_total_num: [
          { required: true, message: '请输入兑换总量', trigger: 'blur' },
          { type: 'number', min: 1, message: '兑换总量应大于1', trigger: 'blur' }
        ]
      },
      readonly: true,
      uploadUrl: BASEURL + url.state.upload,
      imgParams: {
        type: 'image'
      },
      formData: {
        title: '',
        is_recommend: 0,
        exchange_total_num: 1,
        activity_name: '',
        start_time: '',
        end_time: '',
        cid: undefined,
        activity_image: ''
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
      },
      time: []
    }
  },
  computed: {
    start: {
      get() {
        return this.time && +new Date(this.time[0]) || ''
      },
      set(val) {
        this.time[0] = new Date(val)
      }
    },
    end: {
        get() {
        return this.time && +new Date(this.time[1]) || ''
      },
      set(val) {
        this.time[1] = new Date(val)
      }
    }
  },
  created() {
    const edit = this.$route.query.edit
    const id = this.$route.query.id
    this.readonly = !!!edit
    if (!id) return
    this.id = id
    AdminInt.exchangeGetInfo({actId: id}, res => {
      this.formData = res.data
      this.formData.exchange_fee = (res.data.exchange_fee/100).toFixed(2)
      this.time = [new Date(res.data.start_time), new Date(res.data.end_time)]
    })
  },
  methods: {
    selectDate(val) {
      this.formData.start_time = val[0]
      this.formData.end_time = val[1]
    },
    addNumer() {
      this.$prompt('增加的数量', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputValidator: val => {
          return val > 0
        },
        inputErrorMessage: '数量必须大于0'
      }).then(({ value }) => {
         AdminInt.exchangeAppendNum({
           id: this.formData.id,
           append_num: value
         }, res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '增加成功',
              duration: 1000,
              onClose() {
                location.reload()
              }
            })
          } else {
            this.$message.warning('增加失败')
          }
        })
      });
    },
    addExtendDate() {
      if (!this.extendDate) this.$message.warning('请输入过期时间')
      else {
        AdminInt.exchangeAppendTime({
          id: this.formData.id,
          end_time: +new Date(this.extendDate)
        }, res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '增加成功',
              duration: 1000,
              onClose() {
                location.reload()
              }
            })
          } else {
            this.$message.warning('增加失败')
          }
        })
      }
    },
    beforeUpload: beforeImgUpload,
    upSuccess (response, file, fileList, key) {
      this.formData[key] = response.data
      this.$message.success("上传成功")
    },
    // queryCourseAsync(name, cb) {
    //   if (name){
    //     AdminInt.findCourseByName({name}, data => {
    //       if (data.status === 200) {
    //         cb(JSON.parse(data.data))
    //       } else {
    //         cb([])
    //         this.$message.error('查询失败')
    //       }
    //     })
    //   }
    // },
    //liao-2018.11.1  更改不分组查询
    queryCourseAsync(q, cb) {
      if (q){
        AdminInt.findAllCourseByName({q}, data => {
          if (data.status === 200) {
            cb(data.data.list)
          } else {
            cb([])
            this.$message.error('查询失败')
          }
        })
      }
    },
    save() {
      this.formData.start_time = this.start
      this.formData.end_time = this.end
      let r = Object.assign({}, this.formData, {exchange_fee: this.formData.exchange_fee*100})
      this.$refs.form.validate((valid) => {
        if (!valid) return

        if (r.id) {
          AdminInt.exchangeEditInfo(r, res => {
            if (res.status === 200) {
              this.$message({
                message: '修改成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  this.$router.replace(`/exchangeNew?id=${this.id}`)
                  location.reload()
                }
              })
            } else {
              this.$message.warning(`修改失败，${res.msg}`)
            }
          })
        } else {
          AdminInt.exchangeAdd(r, res => {
            if (res.status === 200) {
              this.$message({
                message: '添加成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  this.$router.go(-1)
                }
              })
            } else {
              this.$message.warning(`添加失败，${res.msg}`)
            }
          })
        } 


      })
    }
  }
}
</script>
<style lang="scss" scoped>
.border-b {
  margin-bottom: 20px;
}

.el-form-item__content .el-input {
  width: 40%;
}

.time_choose .el-radio {
  display: block;
  & .el-input {
    width: 200px;
  }
}

.el-radio+.el-radio {
  margin-left: 0px;
}

.marL30 {
  margin-left: 30px;
}
.collage-image {
  width: 100%;
  height: 100%;
}
</style>
<style>
.exchange-upload .el-upload--picture-card {
  height: 210px !important;
  width: 375px !important;
  line-height: 210px !important;
  /* min-width: 148px;
  min-height: 148px; */
}
</style>



