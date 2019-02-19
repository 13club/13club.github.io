<template>
  <div>
    <el-form :model="formData" ref="courseforme" label-width="100px" class="demo-formData">
        
      <!-- 基本信息 start -->
      <el-row class="border-b">
        <el-col :span="12" class="large padd20">基本信息</el-col>
        <el-col :span="12" class="large padd20" style="text-align: right;padding-bottom: 10px;"><el-button v-if="!pageData.isEditor" @click="editor" size="small"  type="primary">编辑</el-button></el-col>
      </el-row>

      <el-form-item label="课程ID" prop="title" v-if="!pageData.isEditor">
        <el-input :value="formData.cid" disabled></el-input>
        <br />
        默认查看链接：https://lesson.fsstudy.com/#/course/info/{{formData.cid}}
      </el-form-item>
      <el-form-item label="课程标题" prop="title" required :rules="{ required: true, message: '请输入课程标题', trigger: 'blur' }">
        <el-input v-model="formData.title" :maxlength="30"  placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>

      <el-form-item label="课程简介" prop="slogo">
        <el-input v-model="formData.slogo" type="textarea" :maxlength="500" :rows="3" placeholder="请输入500个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>


      <!-- <el-form-item label="课程目录" required :rules="{ required: true, message: '请添加课程目录', trigger: 'change' }">
        <el-row v-for="(cata,i) in formData.chapterlist" :key="i" class="catalog-list">
          <div class="chapterlist">
            <el-input v-model="cata.title" :maxlength="30" :prop="'chapterlist.' + i + '.title'" placeholder="请输入30字以内标题名称" :disabled="!pageData.isEditor">
            <template slot="prepend">序号{{i+1}}</template>
            </el-input>
            <el-input v-model="cata.content" type="text" :prop="'chapterlist.' + i + '.content'" placeholder="请输入播放链接，支持MP3、MP4、FLV、AVI格式转码" :disabled="!pageData.isEditor" ></el-input>
          </div>
          <div class="operation">
            <div class="del-chapter" @click="e=>{delchapter(cata,i) }" v-if="pageData.isEditor">删除</div>
            <el-checkbox :checked="cata.is_free_temp" @change="val => cata.is_free = val + 0" :disabled="!pageData.isEditor">免费试听</el-checkbox>
          </div>
        </el-row>
        <el-row v-if="pageData.isEditor">
          <el-button @click="addCatalog">新增课程目录</el-button>
        </el-row>
        <el-row v-if="pageData.isEditor">
          <el-col :span="24" class="extra-small">( 上传即代表你同意《 <span class="blue">内容上传协议</span> 》)</el-col>
        </el-row>
      </el-form-item> -->
      <div v-for="(chapter, index) in formData.chapterlist" :key="index">
      <el-form-item
        :label="index === 0 ? '课程章节' : ''"
        :prop="'chapterlist.' + index + '.title'"
        style="margin-bottom: 0px"
        :rules="{
          required: true, message: '章节名称不能为空', trigger: 'change'
        }">
        <el-input v-model="chapter.title" placeholder="请输入30字以内标题名称" :disabled="!pageData.isEditor"> <template slot="prepend">序号{{index+1}}</template></el-input>
        <el-button @click="e=>{delchapter(chapter,index) }" v-if="pageData.isEditor">删除</el-button>
      </el-form-item>
      
      <el-form-item :prop="'chapterlist.' + index + '.content'">
        <el-input v-model="chapter.content" placeholder="请输入播放链接，支持MP3、MP4、FLV、AVI格式转码" :disabled="!pageData.isEditor"></el-input>
        <el-checkbox :checked="chapter.is_free_temp" @change="val => chapter.is_free = val + 0" :disabled="!pageData.isEditor">免费试听</el-checkbox>
      </el-form-item>
      </div>
      <el-form-item :label="formData.chapterlist.length === 0 ? '课程章节' : ''" v-if="pageData.isEditor">
        <el-button @click="addCatalog">新增课程章节</el-button>
        <div>( 上传即代表你同意《 <span class="blue">内容上传协议</span> 》)</div>
      </el-form-item>

      <el-form-item label="课程分类" prop="category" required :rules="{ required: true, message: '请选择课程分类', trigger: 'change' }">
        <el-input v-model="pageData.categoryName" v-if="!pageData.isEditor" disabled></el-input>
        <div v-else>
          <el-input v-model="formData.category" type="h`idden" class="input-hidden"></el-input>
          <el-dropdown trigger="click" @command="categoryCommand">
            <el-button >
              {{pageData.categoryName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item  v-for="(item,i) in pageData.categoryList" :key="i" :command="item.cid">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>

      <el-form-item label="课程来源" prop="provider_id" required :rules="{ required: true, message: '请选择课程来源', trigger: 'blur', min: 1, type: 'number' }">
        <el-input v-model="pageData.providerName" v-if="!pageData.isEditor" disabled></el-input>
        <div v-else>
          <el-input v-model="formData.provider_id" type="hidden" class="input-hidden"></el-input>
          <el-dropdown trigger="click" @command="providerCommand">
            <el-button >
              {{pageData.providerName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="(item,i) in pageData.providerList" :key="i" :command="item.provider_id">{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>
      <!-- 基本信息 end-->
      <!-- 上架信息 start -->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20">上架信息</el-col>
      </el-row>

      <el-form-item label="收费标准" prop="price" required :rules="{ required: this.pageData.priceRadio, message: '请输入收费价格', trigger: 'blur' }">
         <div v-if="!pageData.isEditor">
           <span v-if="pageData.priceRadio == 0">免费</span>
           <span v-else>收费 {{pageData.price}}元</span>
         </div>
        <el-radio-group v-model="pageData.priceRadio" v-else>
          <el-radio label="0" @change="priceChange">免费</el-radio>
          <el-radio label="1" @change="priceChange">收费</el-radio>
          <el-input v-model="pageData.price" :maxlength="30" type="number" placeholder="收费价格不小于 1 元" v-if="pageData.showPriceInput" ref="price" @blur="changePrice" :disabled="!pageData.isEditor"></el-input>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="分成比例" prop="scale" required :rules="{ required: true, message: '请输入分成比例', trigger: 'blur' }">
        <el-input v-model="formData.scale" placeholder="0 则为不分成" type="number" :disabled="!pageData.isEditor"></el-input>%
      </el-form-item>    
      <!-- 上架信息 end -->
      <!-- 课程信息 start -->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20">课程信息</el-col>
      </el-row>
      <el-form-item label="封面图" prop="title_img" required :rules="{ required: true, message: '请选择封面图', trigger: 'change' }">
        <el-input v-model="formData.title_img" type="hidden" class="input-hidden"></el-input>
        <el-upload
          :disabled="!pageData.isEditor"
          class="upload-demo title-img"
          :data="imgParams"
          :limit="1"
          :accept="imgType.join(',')"
          :action="uploadAction"
          :on-preview="slogoPreview"
          :on-error="uploadErr"
          :on-remove="slogoRemove"
          :before-upload="beforeSlogoUpload"
          :on-success="slogoSuccess"
          :file-list="pageData.slogoList"
          list-type="picture">
          <el-button size="small" type="primary" v-if="pageData.isEditor">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" v-if="pageData.isEditor">只能上传jpg/png文件，且不超过2MB</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程详情" prop="intro">
        <quill-editor v-model="formData.intro"
          :editorOption="editorOption"
          :disabled="!pageData.isEditor"
          ref="myQuillEditor">
        </quill-editor>
        <el-upload
          :disabled="!pageData.isEditor"
          class="upload-demo course-detail-upload"
          :data="imgParams"
          :accept="imgType.join(',')"
          :action="uploadAction"
          :on-preview="introPreview"
          :on-error="uploadErr"
          :before-upload="introUpload"
          :on-success="introSuccess"
          list-type="picture">
          <el-button size="small" type="primary" v-if="pageData.isEditor">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" v-if="pageData.isEditor">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程详情（旧）" prop="intro_img" required>
        <el-input v-if="formData.intro_img[0]" v-model="formData.intro_img[0]['img']" type="hidden" class="input-hidden"></el-input>
        <el-upload
          :disabled="!pageData.isEditor"
          class="upload-demo title-img course-img"
          :data="imgParams"
          :accept="imgType.join(',')"
          :action="uploadAction"
          :on-preview="introPreview"
          :on-error="uploadErr"
          :on-remove="introRemove"
          :before-upload="introUpload"
          :on-success="introImgSuccess1"
          :file-list="pageData.introList"
          list-type="picture">
          <el-button size="small" type="primary" v-if="pageData.isEditor">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" v-if="pageData.isEditor">只能上传jpg/png文件</div>
        </el-upload> 

      </el-form-item>
      <!-- 课程信息 end -->
      <!-- 讲师信息 start -->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20">讲师信息</el-col>
      </el-row>

      <el-form-item label="讲师名称" prop="tname" required :rules="{ required: true, message: '请输入讲师名称', trigger: 'blur' }">
        <el-input v-model="formData.tname" :maxlength=30  placeholder="请输入30个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>

      <el-form-item label="讲师介绍" prop="tintro">
        <el-input v-model="formData.tintro" type="textarea" :maxlength="500" :rows="3" placeholder="请输入500个字符以内" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>

      <el-form-item label="讲师头像" prop="head_img_url" required :rules="{ required: true, message: '请添加讲师头像', trigger: 'change' }">
        <el-input v-model="formData.head_img_url" type="hidden" class="input-hidden"></el-input>
        <el-upload
          :disabled="!pageData.isEditor"
          class="upload-demo title-img teacher-img"
          :data="imgParams"
          :limit="1"
          :accept="imgType.join(',')"
          :action="uploadAction"
          :on-preview="tintroImgPreview"
          :on-error="uploadErr"
          :on-remove="tintroImgRemove"
          :before-upload="beforetintroImgUpload"
          :on-success="tintroImgSuccess"
          :file-list="pageData.tintroImgList"
          list-type="picture">
          <el-button size="small" type="primary" v-if="pageData.isEditor">选择图片</el-button>
          <div slot="tip" class="el-upload__tip" v-if="pageData.isEditor">400X400最佳，支持png、jpg格式，且不超过2MB</div>
        </el-upload>
      </el-form-item>
      <!-- 讲师信息 end -->
      <!-- 附加信息 start-->
      <el-row class="border-b">
        <el-col :span="24" class="large padd20">附加信息</el-col>
      </el-row>

      <el-form-item label="课程标签" prop="tags" required :rules="{ required: true, message: '请添加课程标签', trigger: 'change' }">
        <el-tag :key="tag" v-for="tag in formData.tags" :disable-transitions="false" @close="tagHandleClose(tag)" :closable="pageData.isEditor">          
          <el-input v-model="formData.tags[0]" type="hidden" class="input-hidden"></el-input>
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="pageData.tagInputVisible" v-model="pageData.tagInputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="tagHandleInputConfirm"  @blur="tagHandleInputConfirm">
        </el-input>
        <el-button class="button-new-tag" size="small" @click="showTagInput" v-if="!pageData.tagInputVisible && pageData.isEditor">+ 添加标签</el-button>
      </el-form-item>

      <el-form-item label="地区" prop="is_one_line_city" required>
        <div v-if="!pageData.isEditor">
          <span v-if="formData.is_one_line_city == 0">非一二线城市</span>
          <span v-if="formData.is_one_line_city == 1">一二线城市</span>
          <span v-if="formData.is_one_line_city == 2">全部地区</span>
        </div>
       <el-radio-group v-model="formData.is_one_line_city" v-else>
          <el-radio :label="2">全部地区</el-radio>
          <el-radio :label="1">一二线城市</el-radio>
          <el-radio :label="0">非一二线城市</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="性别" prop="sex" required>
        <div v-if="!pageData.isEditor">
          <span v-if="formData.sex == 0">未知</span>
          <span v-if="formData.sex == 1">男</span>
          <span v-if="formData.sex == 2">女</span>
          <span v-if="formData.sex == 3">全部</span>
        </div>
        <el-radio-group v-model="formData.sex" v-else>
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="0">未知</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="课程权重" prop="weights" :rules="[{ required: true, message: '请输入课程权重' },
        { pattern: /[1-10000]/, message: '限值1-10000', trigger: 'blur' }]">
        <el-input v-model="formData.weights" type="number" placeholder="课程权重值，数字整数，最大10000" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <el-form-item label="基础订阅数" prop="base_subscriber">
        <el-input v-model="formData.base_subscriber" type="number" placeholder="请输入课程基础订阅数" :disabled="!pageData.isEditor"></el-input>
      </el-form-item>
      <el-form-item label="是否支持用券" prop="is_can_use_coupon">
        <span v-if="!pageData.isEditor">{{formData.is_can_use_coupon === 0 ? '否' : '是'}}</span>
        <el-radio-group v-model="formData.is_can_use_coupon" v-else>
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status" required>
        <span v-if="!pageData.isEditor">{{formData.status === 0 ? '草稿' : '发布'}}</span>
        <el-radio-group v-model="formData.status" v-else>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="pageData.isEditor">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
      <!-- 附加信息 end-->
    </el-form>
  </div>
</template>

<script lang="ts" src="./NewCourse.ts"></script>

<style lang="scss" scoped type="text/css" src="./NewCourse.scss"></style>
<style lang="scss">
.title-img {
  img {
    width: 375px !important;
    height: 210px !important;
  }
  .el-upload-list--picture .el-upload-list__item {
    height: auto !important;
  }
  .el-upload-list__item-name {
    display: none !important;
  }
}
.course-img {
  img {
    height: auto !important;
  }
}
.teacher-img {
  width: 230px !important;
  img {
    width: 200px !important;
    height: 200px !important;
  }
}
</style>



