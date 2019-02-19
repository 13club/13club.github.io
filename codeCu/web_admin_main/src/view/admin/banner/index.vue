<template>
    <div  class="block">
        <div style="margin: 15px 0;">店铺名称： {{formData.shop.appName}}</div>
        <el-button  v-if="!formData.isEditor" @click="formData.isEditor = true" size="small"  type="primary" class="editor permission" data-py="bj">编辑</el-button>
        
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
            <el-col :span="10" :offset="1" class="title">
                <div>{{ i + 1 }}号Banner{{item.type}}</div>
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
                <div>图片格式</div>
            </el-col>
            <br/>
            <el-col class="area">
                <div>
                    <el-button @click.native="delBanner(i)" size="small" type="primary" v-if="formData.isEditor" >删除</el-button>
                </div>
                <div v-if="formData.isEditor || item.type === 2">
                    <el-input v-model="item.url" placeholder="请输入跳转链接" size="middle" clearable :disabled="item.type!=2"/>
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
                <div v-if="formData.isEditor || item.type === 3"></div>
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
 
<script lang="ts" src="./Banner.ts"></script>

<style lang="scss" scoped type="text/css" src="./Banner.scss"></style>