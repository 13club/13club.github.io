<template>
  <div class="block">
    <div class="block control-box">
      <el-input v-model="pageData.courseName" placeholder="请输入课程名称" size="middle" clearable @keyup.enter.native="handlesearch"></el-input>
      <el-select v-model="pageData.status" placeholder="发布状态" clearable>
        <el-option :key="1" label="已发布" :value="1"></el-option>
        <el-option :key="0" label="草稿" :value="0"></el-option>
      </el-select>
      <el-button type="primary" @click="handlesearch" class="search-btn permission" data-py="ss">搜索</el-button>
      <router-link class="el-button el-button--primary permission" data-py="xjkc" :to="{name: 'newCourse'}">新建课程</router-link>
      <el-button type="primary" @click="pageData.showAddBreadCouse = true" class="permission" data-py="xjmbxk">新建面包小课</el-button>
    </div>
    <div class="block bg-lightBlue table-info small">
       <i class="el-icon-info blue"></i>
       <span>已搜索到</span>
       <span class="blue">{{pageData.totalNum}}</span>
       <span>项数据</span>
    </div>
    <div class="block">
      <el-table :data="pageData.courseList" style="width: 100%">
        <el-table-column  prop="cid" label="课程ID" width="100"></el-table-column>
        <el-table-column prop="title" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="provider_title" label="课程来源" width="100"></el-table-column>
        <el-table-column prop="categoryName" label="所属分类"  width="100">
          <template slot-scope="scope">
              <el-tag type="primary" close-transition>{{scope.row.categoryName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="scale" label="分成比例"  width="100">
          <template slot-scope="scope">
              <span>{{scope.row.scale}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="售价"  width="80">
          <template slot-scope="scope">
              <span>{{scope.row.price/100}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否发布"  width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已发布</span>
            <span v-if="scope.row.status == 0">草稿</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="更新时间"  width="180"></el-table-column>
        <el-table-column prop="h" label="操作"  width="100">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small" class="permission" data-py="xq">详情</el-button>
            <el-button type="text" size="small" class="permission" data-py="sj" v-if="scope.row.status == 1" @click="updateStatus(scope.$index)">下架</el-button>
            <el-button type="text" size="small" class="danger permission" data-py="xj" v-if="scope.row.status == 0" @click="updateStatus(scope.$index)">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>    
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageData.totalNum">
      </el-pagination>
    </div>
    <el-dialog
      title="添加面包小课"
      :visible.sync="pageData.showAddBreadCouse"
      width="30%"
      center>
      <div>
        <span>课程ID:</span>
        <el-tag  :key="tag" v-for="tag in pageData.tags" closable :disable-transitions="false"  @close="tagHandleClose(tag)">          
          <el-input v-model="pageData.tags[0]" type="hidden" class="input-hidden"></el-input>
          {{tag}}
        </el-tag>
        <el-input type="number" class="input-new-tag" v-if="pageData.tagInputVisible" v-model="pageData.tagInputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="tagHandleInputConfirm"  @blur="tagHandleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 添加课程ID</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pageData.showAddBreadCouse = false">取 消</el-button>
        <el-button type="primary" @click="AddBreadCouse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./CourseList.ts"></script>

<style lang="scss" scoped type="text/css" src="./CourseList.scss"></style>

