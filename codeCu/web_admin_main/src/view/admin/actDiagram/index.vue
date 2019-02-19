<template>
  <div class="block">
        <div style="margin: 15px 0;">店铺名称： {{formData.shop.appName}}</div>
        <el-button  v-if="!formData.isEditor" @click="formData.isEditor = true" size="small"  type="primary" class="editor" data-py="bj">编辑</el-button>

          <el-row class="box" v-for="(item,i) in formData.list" :key="i">
            <el-col :span="6">
                <div class="act-img-box">
                    <el-upload
                        list-type="picture-card"
                        :action="uploadUrl"
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
            <el-col :span="10" :offset="1" class="title">
                <div>{{i==0?'首页活动图':'个人中心活动图'}}</div>
                <div v-if="formData.isEditor || item.type === 2">
                    <!-- type = 1:课程 2:外链 3:拼团列表 4:拼团详情  -->
                    <el-radio @change="changeType2(item)" v-model="item.type" :label="2">跳转外部链接</el-radio>
                </div>
                <div v-if="formData.isEditor || item.type === 1">
                    <el-radio @change="changeType1(item)" v-model="item.type" :label="1">跳转课程</el-radio>
                </div>
                <div v-if="formData.isEditor || item.type === 4">
                    <el-radio @change="changeType4(item)" v-model="item.type" :label="4">跳转拼团详情</el-radio>
                </div>
                <div v-if="formData.isEditor || item.type === 3">
                    <el-radio @change="changeType3(item)" v-model="item.type" :label="3">跳转拼团列表</el-radio>
                </div>
                <div>活动图显示状态</div>
                <div>图片格式</div>
            </el-col>
            <br/>
            <el-col class="area">
                <div></div>
                <div v-if="formData.isEditor || item.type === 2">
                    <el-input v-model="item.url" placeholder="请输入跳转链接" size="middle" clearable :disabled="item.type!=2 || !formData.isEditor"/>
                </div>
                <div v-if="formData.isEditor || item.type === 1">
                    <el-autocomplete
                        style="width: 300px"
                        placeholder="请输入课程名称"
                        v-model="item.title"
                        :fetch-suggestions="queryCourseAsync"
                        :trigger-on-focus="false"
                        value-key="title"
                        :disabled="item.type!=1 || !formData.isEditor"
                        @select="val => item.type_id = val.cid">
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
                        :disabled="item.type!=4 || !formData.isEditor"
                        @select="val => item.type_id = val.id">
                    </el-autocomplete>
                </div>
                <div v-if="formData.isEditor || item.type === 3"></div>
                <div>
                  <el-radio-group v-model="item.is_show" :disabled="!formData.isEditor">
                      <el-radio :label="1">显示</el-radio>
                      <el-radio :label="0">不显示</el-radio>
                  </el-radio-group>
                </div>
                <div>
                    750像素*400像素，png、jpg、jpeg格式
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-button @click="save" size="small" type="primary" v-if="formData.isEditor">保存</el-button> 
                <el-button @click="formData.isEditor = false" size="small" type="primary" v-if="formData.isEditor">取消</el-button>               
            </el-col>
        </el-row>

  </div>        
</template>
<script>
import { BASEURL } from "@/api/storge";
import url from "@/store/modules/dataUrl";
import { beforeImgUpload } from "@/api/common";
import { AdminInt } from "@/api/admin";

const {
  findActImage,
  saveActImage,
  findCourseByName,
  findShop,
  grouplist
} = AdminInt;

let shopid = undefined;

export default {
  name: "actDiagram",
  data() {
    return {
      shop: {},
      uploadUrl: BASEURL + url.state.upload,
      imgParams: {
        type: "image"
      },
      loading: false,
      courseid: [],
      courseKeyCenter: "",
      courseKeyIndex: "",

      formData: {
        isEditor: false,
        shopid: undefined,
        list: [
          {
            banner_type: "",
            c_time: "",
            id: "",
            img: "",
            is_show: 0, //默认不显示
            shopid: "",
            title: "",
            type: "",
            type_id: 0,
            url: "",
            activity_name: ""
          },
          {
            banner_type: "",
            c_time: "",
            id: "",
            img: "",
            is_show: 0,
            shopid: "",
            title: "",
            type: "",
            type_id: 0,
            url: "",
            activity_name: ""
          }
        ],
        shop: {}
      }
    };
  },
  created() {
    shopid = this.$route.query.shopid;
    if (shopid) {
      findShop({ shopid }, data => {
        if (data.status === 200)
          this.shop = Object.assign({}, this.shop, data.data);
      });

      findActImage(
        {
          shopid
        },
        res => {
          res.data.map(item => {
            if (item.type === 4) {
              item.activity_name = item.title;
              item.title = "";
            }
          });
          if (res.data.length > 0) {
            this.formData.list = res.data;
          }
          console.log(this.formData.list);
        }
      );
    } else {
      this.$message.warning("地址栏参数缺少shopid");
    }
  },
  methods: {
    queryCourseAsync(name, cb) {
      if (name) {
        findCourseByName({ name }, data => {
          if (data.status === 200) {
            cb(JSON.parse(data.data));
          } else {
            cb([]);
            this.$message.error("查询失败");
          }
        });
      }
    },
    queryCollageAsync(name, cb) {
      if (name) {
        grouplist(
          {
            page: 1,
            q: name,
            state: 1
          },
          res => {
            if (res.status === 200) {
              cb(res.data.list);
            } else {
              cb([]);
              this.$message.error("查询失败");
            }
          }
        );
      }
    },
    changeType1(item) {
      item.activity_name = "";
      item.url = "";
    },
    changeType2(item) {
      // item.id = "";
      item.title = "";
      item.activity_name = "";
    },
    changeType3(item) {
      // item.id = "";
      item.title = "";
      item.activity_name = "";
      item.url = "";
    },
    changeType4(item) {
      item.title = "";
      item.url = "";
    },
    /**
     * 上传banner前校验
     */
    beforeUpload(file) {
      return beforeImgUpload(file);
    },
    /**
     * 上传banner
     */
    upSuccess(response, file, fileList, index) {
      this.formData.list[index].img = response.data;
      this.$message.success("上传成功");
    },
    save() {
      let r = this.formData.list;
      // 1课程 2外链  3拼团列表 4拼团活动
      if (r.length == 0) {
        this.$message.error("请编辑信息");
        return;
      }

      let flag = false;
      for (let i = 0, l = r.length; i < l; i++) {
        if (
          !r[i].img ||
          ((r[i].type === 1 || r[i].type === 4) && !r[i].type_id) ||
          (r[i].type === 2 && !r[i].url)
        ) {
          let text = i == 0 ? "首页活动图" : "个人中心活动图";
          this.$message.warning(`${text}信息不完整`);
          flag = true;
          break;
        }
 
        if (r[i].type_id == 0 && r[i].url == "" && (!r[i].type === 3 || r[i].type === '')  ) {
          let text = i == 0 ? "首页活动图" : "个人中心活动图";
          this.$message.warning(
            `${text}中 跳转外部链接 或 跳转课程 或 跳转拼团详情或列表 人选一个`
          );
          flag = true;
          break;
        }
        if (r[i].type === 4) r[i].title = r[i].title;
        // if (r[i].type === 4){
        //     r[i].title = r[i].activity_name
        // }
      }

      this.formData.list = r;
      if (flag) {
        return;
      }

      let c = new Date();

      saveActImage(
        {
          shopid,
          list: [
            {
              banner_type: !this.formData.list[0].banner_type
                ? 1
                : this.formData.list[0].banner_type,
              c_time: !this.formData.list[0].c_time
                ? c.getTime()
                : this.formData.list[0].c_time,
              id: !this.formData.list[0].id ? "" : this.formData.list[0].id,
              img: this.formData.list[0].img,
              is_show: this.formData.list[0].is_show,
              shopid: !this.formData.list[0].shopid
                ? shopid
                : this.formData.list[0].shopid,
              title: this.formData.list[0].title,
              type: this.formData.list[0].type,
              type_id: this.formData.list[0].type_id,
              url: this.formData.list[0].url
            },
            {
              banner_type: !this.formData.list[1].banner_type
                ? 2
                : this.formData.list[1].banner_type,
              c_time: !this.formData.list[1].c_time
                ? c.getTime()
                : this.formData.list[1].c_time,
              id: !this.formData.list[1].id ? "" : this.formData.list[1].id,
              img: this.formData.list[1].img,
              is_show: this.formData.list[1].is_show,
              shopid: !this.formData.list[1].shopid
                ? shopid
                : this.formData.list[1].shopid,
              title: this.formData.list[1].title,
              type: this.formData.list[1].type,
              type_id: this.formData.list[1].type_id,
              url: this.formData.list[1].url
            }
          ]
        },
        data => {
          if (data.status === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000,
              onClose() {
                location.reload();
              }
            });
          } else {
            this.$message.error("保存失败");
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped type="text/css" src="./../banner/Banner.scss"></style>
 <style lang="scss" scoped>
.el-row {
  height: 350px;
  overflow: hidden;
}
</style>

