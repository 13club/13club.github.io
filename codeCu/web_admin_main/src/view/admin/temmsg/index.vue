<template>
  <div>
    <el-form :model="formData" ref="temmsgforme" :rules="formRule" label-width="100px" class="demo-formData">

      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">基本信息</el-col>
        <el-col :span="6">
          <el-button type="primary" @click="pageData.isEditor = true" class="permission" data-py="bj">编辑</el-button>
        </el-col>
      </el-row>

      <el-form-item label="模板ID" prop="template_id">
        <el-input v-model="formData.template_id" placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>


      <el-form-item label="模板名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>

      <el-form-item label="推送地址" prop="type" v-if="pageData.isEditor">
        <el-radio-group v-model="formData.type" v-if="pageData.isEditor">
          <el-radio :label="1">推送链接
            <el-input v-model="formData.msg_url" placeholder="请输入链接地址"></el-input>
          </el-radio>
          <el-radio :label="2">推送小程序
            <el-input v-model="formData.mini_appid" placeholder=" 请输入小程序appid"></el-input>
            <el-input v-model="formData.mini_path" placeholder="请输入小程序页面路径"></el-input>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="推送地址" prop="type" v-if="!pageData.isEditor">
        <div v-if="formData.type == 1">
          <div>推送链接</div>
          <el-input v-model="formData.msg_url" placeholder="请输入链接地址" disabled></el-input>
        </div>
        <div v-if="formData.type == 2">
          <div>推送小程序</div>
          <el-input v-model="formData.mini_appid" placeholder=" 请输入小程序appid" disabled></el-input>
          <el-input v-model="formData.mini_path" placeholder="请输入小程序页面路径" disabled></el-input>
        </div>
      </el-form-item>

      <el-form-item label="适用店铺" prop="shopid" required>
        <el-select v-model="formData.shopid" required @change="changeShop" :disabled="!pageData.isEditor">
          <el-option v-for="item in pageData.shops" :key="item.id" :label="item.appName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试openid" prop="openid" v-if="!pageData.isEditor">
        <el-input placeholder="请输入测试的openid" v-model="formData.openid"></el-input>
        <el-button type="primary" @click="testOpenid" class="permission" data-py="fscs">发送测试</el-button>
      </el-form-item>

      <!-- 基本信息 end-->
      <!-- 备注信息 start-->
      <el-row class="border-b">
        <el-col :span="16" class="large padd20">备注信息</el-col>
      </el-row>
      <el-form-item label="关联课程" prop="cid">
        <el-input v-model="formData.cid" placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <el-form-item label="关联渠道ID" prop="channel_id">
        <el-input v-model="formData.channel_id" type="number" placeholder="请输入关联渠道ID" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>


      <el-form-item label="消息用途" prop="scope" required v-if="pageData.isEditor">
        <el-dropdown trigger="click" @command="scopeCommand">
          <el-button>
            {{formData.scopedesc}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,i) in pageData.scopeList" :key="i" :command="item.type">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item label="消息用途" prop="scopedesc" required v-if="!pageData.isEditor">
        <el-input v-model="formData.scopedesc" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <!-- 备注信息 end-->

      <!-- 推送内容 start -->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20">推送信息</el-col>
      </el-row>

      <el-form-item label="头部文字">
        <el-input v-model="pageData.headTem.value" type="textarea" :maxlength="500" :rows="3" placeholder="请输入500个字符以内"
          ref="headTextarea" :disabled="!pageData.isEditor"></el-input>
        <el-dropdown @command="headCommand" v-if="pageData.isEditor">
          <el-button type="primary">
            {{pageData.headTem.color || '文字颜色'}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(color,i) in pageData.fontColor" :key="i" :command="color">{{color}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-color-picker v-model="pageData.headTem.color" v-if="pageData.isEditor"></el-color-picker>
        <el-row class="border-b" v-if="!pageData.isEditor">
          <el-col :span="2">文字颜色:</el-col>
          <el-col :span="4">{{pageData.headTem.color}}</el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="内容">
        <el-row v-for="(content,i) in pageData.contemList" :key="i">
          <el-col :span="24">内容{{i+1}}</el-col>
          <el-input v-model="content.value" :disabled="!pageData.isEditor"></el-input>
          <el-dropdown v-if="pageData.isEditor" @command="val=>{contentCommand(val,i)}">
            <el-button type="primary">
              <span>{{content.color || '文字颜色'}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(color,i) in pageData.fontColor" :key="i" :command="color">{{color}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-color-picker v-model="content.color" v-if="pageData.isEditor"></el-color-picker>
          <el-row class="border-b" v-if="!pageData.isEditor">
            <el-col :span="2">文字颜色:</el-col>
            <el-col :span="4">{{content.color}}</el-col>
          </el-row>
        </el-row>
        <el-button type="primary" @click="addContentList" v-if="pageData.isEditor">新增</el-button>
      </el-form-item>

      <el-form-item label="结尾文字">
        <el-input v-model="pageData.footTem.value" type="textarea" :maxlength="500" :rows="3" placeholder="请输入500个字符以内"
          :disabled="!pageData.isEditor"></el-input>
        <el-dropdown v-if="pageData.isEditor" @command="footCommand">
          <el-button type="primary">
            {{pageData.footTem.color || '文字颜色'}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(color,i) in pageData.fontColor" :key="i" :command="color">{{color}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-color-picker v-model="pageData.footTem.color" v-if="pageData.isEditor"></el-color-picker>
        <el-row class="border-b" v-if="!pageData.isEditor">
          <el-col :span="2">文字颜色:</el-col>
          <el-col :span="4">{{pageData.footTem.color}}</el-col>
        </el-row>
      </el-form-item>
      <!-- 推送内容 end -->

      <!-- 附加信息 start-->
      <el-form-item v-if="pageData.isEditor">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      <div class="msg_send_box">
        <el-form-item label="性别" prop="type" v-if="!pageData.isEditor">
          <el-radio-group v-model="pageData.sex">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市" prop="val" v-if="!pageData.isEditor">
          <el-radio-group v-model="pageData.ctype">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">一二线城市</el-radio>
            <el-radio :label="0">非一二线城市</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!pageData.isEditor">
          <el-button type="primary" @click="testAll" class="permission" data-py="qytscs">全员推送测试</el-button>
        </el-form-item>
        <el-form-item v-if="!pageData.isEditor">
          <el-input v-model="formData.uidList" type="textarea" :rows="20" placeholder="请输入uid用','隔开"></el-input>
        </el-form-item>
        <el-form-item v-if="!pageData.isEditor">
          <el-button type="primary" @click="sendAll" class="permission" data-py="plts">批量推送</el-button>
        </el-form-item>
      </div>
      <!-- <el-form-item v-if="pageData.showprogress">
          <div class="danger" v-if="!pageData.sendFinish">正在发送，请稍等</div>
          <div class="success" v-if="pageData.sendFinish">发送成功</div>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="pageData.percentage" status="success"></el-progress>
      </el-form-item> -->
      <!-- 附加信息 end-->
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

<script lang="ts" src="./Temmsg.ts"></script>

<style lang="scss" scoped type="text/css" src="./Temmsg.scss"></style>
