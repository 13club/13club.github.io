import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { courseM } from './../../../store/modules/interface'

interface pageDataM {
    courseName: String                       //课程名称搜索
    courseList: courseM[]                    //表格数据
    totalNum: Number                         //数据条数 
    pageSize: Number                         //分页条数
    page: Number                            //当前页数
    status: Number                        
    currentPage: Number                      //当前激活页
    showAddBreadCouse:boolean                //是否弹出新建面包小课弹窗,
    tags: Number[]
    tagInputVisible:boolean
    tagInputValue:Number
}
@Component
export default class CourseList extends mixins(Mixin) {
    constructor() {
        super()
        this.getList()
    }
    private pageData: pageDataM = {
        courseName: '',
        courseList: [],
        totalNum: 0,
        pageSize: 20,
        page: 1,
        status: null,
        currentPage: 1,
        showAddBreadCouse:false,
        tags: [],
        tagInputVisible:false,
        tagInputValue: null
    }

    /**
     * @description 进入课程详情
     * @param {Object} row
     * @return {void}
     */
    private goDetail = (row: any): void => {
        router.push({
            name: 'newCourse',
            query: {
                cid: row.cid
            },
            params: {
                editor: 'yes'
            }
        })
    }
    /**
     * @description 搜索课程列表
     * @return {void}
     */
    private handlesearch = () => {
        this.pageData.currentPage = 1
        this.getList()
    }

    /**
     * @description 选择分页
     * @param {String} val
     * @return {void}
     */
    private handleCurrentChange = val => {
        this.pageData.currentPage = Number(val)
        this.getList()
    }

    /**
     * @description 获取课程列表
     * @return {void}
     */
    private getList = () => {
        AdminInt.getCourseList({
            q: this.pageData.courseName,
            status: this.pageData.status,
            page: this.pageData.currentPage
        },
        res => {
            this.pageData.courseList = res.data.list
            this.pageData.totalNum = res.data.totalNum
            this.pageData.page = res.data.page
            this.pageData.pageSize = res.data.pageSize
        })
    }
    /**
     * @description 上下架
     * @param {Number} index
     * @return {void}
     */
    private updateStatus(index) {
        let me = this, course = this.pageData.courseList[index]
        let status = course.status == 0 ? 1 : 0
        me.$confirm(`确认${status ? '上架' : '下架'}该课程吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            course.status = status
            AdminInt.editorCourse(course, res => {
                this.$message.success('修改成功')
            }).then(res => {
                this.getList()
            })
        })
    }

    /**
     * @description 删除具体标签
     * @param  {string} tag 标签
     * @return {void}
     */
    private tagHandleClose(tag): void {
        this.pageData.tags.splice(this.pageData.tags.indexOf(tag), 1)
    }

    /**
     * @description 添加具体标签
     * @return {void}
     */
    private tagHandleInputConfirm(): void {
        let inputValue = this.pageData.tagInputValue
        let tags = this.pageData.tags
        if (inputValue && tags.filter(ele => ele == inputValue).length == 0) {
            tags.push(inputValue)
        }
        this.pageData.tagInputVisible = false
        this.pageData.tagInputValue = null
    }

    /**
     * @description 显示标签添加输入框
     * @return {void}
     */
    private showTagInput(): void {
        this.pageData.tagInputVisible = true
        this.$nextTick(() => {
            let saveTagInput: any = this.$refs.saveTagInput
            saveTagInput.$refs.input.focus()
        })
    }

    /**
     * @description 添加面包小课
     * @return {void}
     */
    private AddBreadCouse():void{
        const ids = []
        this.pageData.tags.forEach((id, index) => {
            ids[index] = id
        });
        AdminInt.addBreadCouse({ids}, res => {
            this.$message.success('修改成功')
            this.pageData.showAddBreadCouse = false
        }).then(res => {
            this.getList()
        })
    }
}