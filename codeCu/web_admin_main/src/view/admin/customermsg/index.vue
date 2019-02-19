<template>
  <div>
    <el-form :model="formData"  ref="temmsgforme" label-width="100px" class="demo-formData" :rules="formRule">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
        <el-col :span="6">
        <el-button type="primary" @click="pageData.isEditor = true" class="permission" data-py="bj">编辑</el-button></el-col>
      </el-row>

      <el-form-item label="客服名称" prop="name" required>
        <el-input v-model="formData.name"  placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
       <el-form-item label="适用店铺" prop="shopid" required>
            <el-select v-model="formData.shopid" @change="changeShop" :disabled="!pageData.isEditor">
                <el-option
                v-for="item in pageData.shops"
                :key="item.id"
               
                :label="item.appName"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      <!-- 基本信息 end -->

      <!-- 备注信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">备注信息{{formData.shopid}}</el-col>
      </el-row>
      <el-form-item label="关联课程" prop="cid" required>
        <el-input v-model="formData.cid"  placeholder="请输入30个字符以内" type="number" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <el-form-item label="关联渠道ID" prop="channel_id">
        <el-input v-model="formData.channel_id"  placeholder="请输入关联渠道ID" type="number" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>

      <el-form-item label="消息用途" prop="scope" required v-if="pageData.isEditor">
        <el-dropdown trigger="click" @command="scopeCommand">
          <el-button >
            {{formData.scopedesc}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item  v-for="(item,i) in pageData.scopeList" :key="i" :command="item.type">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item label="消息用途" prop="scopedesc" required v-if="!pageData.isEditor">
        <el-input v-model="formData.scopedesc" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <el-form-item label="测试openid" prop="openid"  v-if="!pageData.isEditor">
        <el-input placeholder="请输入测试的openid" v-model="formData.openid" ></el-input>
        <el-button type="primary" @click="testOpenid" class="permission" data-py="fscs">发送测试</el-button>
      </el-form-item>      
      <!-- 备注信息 end-->

      <!-- 推送内容 start-->

      <el-row class="border-b">
        <el-col :span="16" class="large padd20">推送内容</el-col>
      </el-row>
      <div class="msg_send_box">
        <el-form-item label="消息类型" prop="msgtype"  v-if="pageData.isEditor">
          <el-radio-group v-model="formData.msgtype" @change="msgtypeChange">
            <el-radio label="news">图文内容</el-radio>
            <el-radio label="text">文字</el-radio>
            <el-radio label="image">图片</el-radio>
            <el-radio label="voice">语音</el-radio>
            <el-radio label="video">视频</el-radio>
          </el-radio-group>
          <div>
            <el-button type="primary" size="small" class="btn-add" @click="addArticles">添加一条图文，最多八条</el-button>
            <div v-if="formData.msgtype == 'news'" v-for="(item,i) in pageData.news.articles" :key="i">
              <span>内容{{i+1}}</span>
              <el-button type="primary" size="small" @click="delArticles(i)">删除</el-button>
              <br/>
              <el-input v-model="item.title" placeholder="图文标题"  ></el-input>
              <el-input v-model="item.description" type="textarea" placeholder="图文副标题" ></el-input>
              <el-input v-model="item.url" placeholder="图文跳转地址" ></el-input>
              <el-input v-model="item.picurl" placeholder="封面图地址"></el-input>
            </div>
          </div>
          <el-input v-model="pageData.text.content" v-if="formData.msgtype == 'text'" type="textarea" :maxlength="500" :rows="3" placeholder="支持带超链接地址，同文字加链接样式"></el-input>
          <el-input v-model="pageData.image.media_id" placeholder="请输入图片在当前公众号的MEDIA_ID" v-if="formData.msgtype == 'image'" ></el-input>
          <el-input v-model="pageData.voice.media_id" placeholder="请输入音频在当前公众号的MEDIA_ID" v-if="formData.msgtype == 'voice'" ></el-input>
          <div v-if="formData.msgtype == 'video'" >
            <el-input v-model="pageData.video.media_id" placeholder="请输入视频在当前公众号的MEDIA_ID"  ></el-input>
            <el-input v-model="pageData.video.thumb_media_id" placeholder="请输入封面图在当前公众号的MEDIA_ID" ></el-input>
            <el-input v-model="pageData.video.title" placeholder="请输入标题文字，30个字符" ></el-input>
            <el-input v-model="pageData.video.description" placeholder="请输入副标题文字，30个字符"></el-input>
          </div>
        </el-form-item>
         <el-form-item label="消息类型" prop="msgtype"  v-if="!pageData.isEditor">
          <el-radio-group v-model="formData.msgtype" @change="msgtypeChange">
            <el-radio label="news" v-if="formData.msgtype == 'news'" disabled>图文内容</el-radio>
            <el-radio label="text" v-if="formData.msgtype == 'text'" disabled>文字</el-radio>
            <el-radio label="image" v-if="formData.msgtype == 'image'" disabled>图片</el-radio>
            <el-radio label="voice" v-if="formData.msgtype == 'voice'" disabled>语音</el-radio>
            <el-radio label="video" v-if="formData.msgtype == 'video'" disabled>视频</el-radio>
          </el-radio-group>
          <div v-if="formData.msgtype == 'news'" v-for="(item,i) in pageData.news.articles" :key="i">
              <span>内容{{i+1}}</span>
              <br/>
            <el-input v-model="item.title" disabled placeholder="图文标题"  ></el-input>
            <el-input v-model="item.description" disabled type="textarea" placeholder="图文副标题" ></el-input>
            <el-input v-model="item.url" disabled placeholder="图文跳转地址" ></el-input>
            <el-input v-model="item.picurl" disabled placeholder="封面图地址"></el-input>
          </div>
          <el-input v-model="pageData.text.content" disabled v-if="formData.msgtype == 'text'" type="textarea" :maxlength="500" :rows="3" placeholder="支持带超链接地址，同文字加链接样式"></el-input>
          <el-input v-model="pageData.image.media_id" disabled placeholder="请输入图片在当前公众号的MEDIA_ID" v-if="formData.msgtype == 'image'" ></el-input>
          <el-input v-model="pageData.voice.media_id" disabled placeholder="请输入音频在当前公众号的MEDIA_ID" v-if="formData.msgtype == 'voice'" ></el-input>
          <div v-if="formData.msgtype == 'video'" >
            <el-input v-model="pageData.video.media_id" disabled placeholder="请输入视频在当前公众号的MEDIA_ID"  ></el-input>
            <el-input v-model="pageData.video.thumb_media_id" disabled placeholder="请输入封面图在当前公众号的MEDIA_ID" ></el-input>
            <el-input v-model="pageData.video.title" disabled placeholder="请输入标题文字，30个字符" ></el-input>
            <el-input v-model="pageData.video.description" disabled placeholder="请输入副标题文字，30个字符"></el-input>
          </div>
        </el-form-item> 
      </div>
      <el-form-item v-if="pageData.isEditor">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button  @click="cancel">取消</el-button>
      </el-form-item> 
      <!-- <el-form-item v-if="!pageData.isEditor">
        <el-button type="primary" @click="testAll">全员推送测试</el-button>
      </el-form-item> -->
 
        <el-form-item v-if="!pageData.isEditor">
            <el-button type="primary" @click="testAll" class="permission" data-py="qytscs">全员推送测试</el-button>
        </el-form-item>
      <el-form-item v-if="!pageData.isEditor">
        <el-input v-model="formData.openidList" type="textarea" :rows="20" placeholder="请输入openid用','隔开"></el-input>
      </el-form-item> 
      <el-form-item v-if="!pageData.isEditor">
        <el-button type="primary" @click="sendAll" class="permission" data-py="plts">批量推送</el-button>
      </el-form-item>
      <!-- 推送内容 end-->
    </el-form>
    <el-dialog title="推送状态" :visible="pageData.dialogTableVisible" :before-close="beforeTialogClose">
        <el-table :data="pageData.pageStatusList" :height="600">
            <el-table-column property="page" label="编号" width="150"></el-table-column>
            <el-table-column property="num" label="数量" width="200"></el-table-column>
            <el-table-column property="percentage" label="进度" width="200">
                <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percentage" status="success"></el-progress>
                </template>
            </el-table-column>
            <el-table-column property="status" label="发送状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.sending">正在发送，请稍等...</span>
                    <span v-if="!scope.row.sending">
                        <span v-if="scope.row.status == 1" class="success">发送成功</span>
                        <span v-if="scope.row.status == 0" class="danger">等待发送</span>
                    </span>
                    <el-button type="primary" size="small" v-if="scope.row.status == 0 && !scope.row.sending" @click="testOnepage(scope.row.page)">发送</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Customermsg.ts"></script>

<style lang="scss" scoped type="text/css" src="./Customermsg.scss"></style>


