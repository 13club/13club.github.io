import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { formatDayTime } from './../../../api/common'

interface pageDataM {
    actName: String                       //课程名称搜索
    appName: string                         // 店铺搜索名称
    actList: {
        appName: string
        act_id: number
        act_link: string
        begin_time: any
        coupon_ids: any
        coupons: any
        end_time: any
        grant_type: number
        status: number
        title: string
        beginTime?:string
        endTime?:string,
    }[]                    //表格数据
    totalNum: number                         //数据条数 
    pageSize: number                         //分页条数
    page: number                             //当前页数
    currentPage: number                      //当前激活页
    centerDialogVisible: boolean
    act_link: string
}
@Component
export default class ActList extends mixins(Mixin) {
    constructor() {
        super()
        this.getList()
    }
    private pageData: pageDataM = {
        appName: '',
        actName: '',
        actList: [],
        totalNum: 0,
        pageSize: 20,
        page: 1,
        currentPage: 1,
        centerDialogVisible: false,
        act_link: ''
    }

    /**
     * @description 进入活动详情
     * @param {Object} row
     * @return {void}
     */
    private goDetail = (row: any): void => {
        router.push({
            name: 'activity',
            query: {
                id: row.act_id
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
        AdminInt.getactList({
            appName: this.pageData.appName,
            q: this.pageData.actName,
            page: this.pageData.currentPage
        },
            res => {
                this.pageData.actList = res.data.list
                this.pageData.actList.forEach(ele => {
                    ele.beginTime = formatDayTime(new Date(ele.begin_time))
                    ele.endTime = formatDayTime(new Date(ele.end_time))
                    ele.coupon_ids = []
                    ele.act_link = `pages/index/index?actId=${ele.act_id}`
                })
                this.pageData.totalNum = res.data.totalNum
                this.pageData.page = res.data.page
                this.pageData.pageSize = res.data.pageSize
            })
    }
    /**
     * @description 上下架
     * @param {number} index
     * @return {void}
     */
    private updateStatus(index) {
        let act = this.pageData.actList[index]
        act.status = act.status == 0 ? 1 : 0
        AdminInt.editoract(act, res => {
            this.$message.success('修改成功')
        }).then(res=>{
            this.getList()
        })
    }
    /**
     * @description 查看推广链接
     * @return {void}
     */
    private showDialog(index) {
        let me = this
        let info = me.pageData.actList[index]
        me.pageData.centerDialogVisible = true
        me.pageData.act_link = info.act_link
    }
}