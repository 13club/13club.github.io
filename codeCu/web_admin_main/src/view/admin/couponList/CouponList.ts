import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { formatDayTime } from '../../../api/common';

interface pageDataM {
    couponName: String                       //课程名称搜索
    status: Number
    couponList: {
        begin_time: any
        coupon_id: number
        ctime: number
        description?: string
        end_time: number
        fee: any
        fixed_begin_term: number
        fixed_term: number
        grant_limit_num: number               //领取限制    
        grant_num: number                     //创建数量
        scope: string
        status: number
        title: string
        type: number
        time?: string
        price?:string
    }[]                    //表格数据
    totalNum: Number                         //数据条数 
    pageSize: Number                         //分页条数
    page: Number                             //当前页数
    currentPage: Number                      //当前激活页
}
@Component
export default class CouponList extends mixins(Mixin) {
    constructor() {
        super()
        this.getList()
    }
    private pageData: pageDataM = {
        couponName: '',
        status: null,
        couponList: [],
        totalNum: 0,
        pageSize: 20,
        page: 1,
        currentPage: 1
    }

    /**
     * @description 进入课程详情
     * @param {Object} row
     * @return {void}
     */
    private goDetail = (row: any): void => {
        router.push({
            name: 'coupon',
            query: {
                id: row.coupon_id
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
        AdminInt.getCouponList({
            q: this.pageData.couponName,
            status: this.pageData.status,
            page: this.pageData.currentPage
        },
            res => {
                this.pageData.couponList = res.data.list
                this.pageData.couponList.forEach(ele => {
                    ele.price = (ele.fee / 100).toFixed(2) + '元'
                    ele.time = formatDayTime(new Date(ele.begin_time)) + ' - ' + formatDayTime(new Date(ele.end_time))
                })
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
        let coupon = this.pageData.couponList[index]
        coupon.status = coupon.status == 0 ? 1 : 0
        AdminInt.editorcoupon(coupon, res => {
            this.$message.success('修改成功')
        }).then(res=>{
            this.getList()
        })
    }
}