<template>
  <div>
     <el-form :model="formData" ref="formRule" label-width="150px" class="demo-formData" :rules="formRule">
      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20" style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px;">
          <!-- <span>新建店铺</span> -->
          <el-button type="primary" @click="readonly = false" v-if="readonly">编辑</el-button>
        </el-col>
      </el-row>
      <br />
      <el-form-item label="店铺名称" prop="appName" required>
        <el-input v-model="formData.appName"  placeholder="请输入公众号/小程序名称" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="APPID" prop="appid" required>
        <el-input v-model="formData.appid"  placeholder="请输入appid，这是唯一值" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="appsecret" prop="appSecret" required>
        <el-input v-model="formData.appSecret"  placeholder="请输入appsecret" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="原始ID" prop="developid" required>
        <el-input v-model="formData.developid"  placeholder="请输入公众号的原始ID(developid)" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="类型" required>
        <el-radio-group v-model="formData.appType">
          <el-radio :label="1" v-if="formData.appType===1 || !readonly">公众号</el-radio>
          <el-radio :label="2" v-if="formData.appType===2 || !readonly">小程序</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Token(令牌)" prop="appToken" required>
        <el-input v-model="formData.appToken"  placeholder="必须为英文或数字，长度为3-32字符" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="EncodingAESKey(消息加密密钥)" prop="appAeskey" required>
        <el-input type="textarea" v-model="formData.appAeskey"  placeholder="消息加密密钥由43位字符组成，字符范围为A-Z,a-z,0-9" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!readonly" type="primary" @click.native="submitForm">保存</el-button>
        <el-button v-if="!readonly" @click.native="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AdminInt } from '@/api/admin'

const { saveShop, findShop } = AdminInt

export default {
  name: 'shopDetail',
  created() {
    const shopid = this.$route.query.shopid
    if (shopid) {
      this.readonly = true
      findShop({shopid}, data => {
        this.formData = Object.assign({}, this.formData, data.data)
      })
    }
  },
  data() {
    return {
      formRule: {
        appName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        appid: [{ required: true, message: '请输入APPID', trigger: 'change' }],
        appSecret: [{ required: true, message: '请输入appsecret', trigger: 'change' }],
        developid: [{ required: true, message: '请输入原始ID' }],
        appType: [{ required: true, message: '请选择类型' }],
        appToken: [
          { required: true, message: '请输入Token' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        appAeskey: [
          { required: true, message: '请输入消息加密密钥' },
          { pattern: /^[0-9a-zA-Z]+$/, message: '字符范围为A-Z,a-z,0-9' },
          { max: 43, message: '最大 43 个字符', trigger: 'blur' }],
      },
      readonly: false,
      formData: {
        appName: '',
        appid: '',
        appSecret: '',
        developid: '',
        appType: 1,
        appToken: '',
        appAeskey: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRule.validate((valid) => {
        if (valid) {
          saveShop(this.formData, data => {
            if (data.status === 200) {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.go(-1)
                }
              })
            } else this.$message.error('保存失败')
          })
        }
      })
    },
  }
}
</script>
