import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from '../../../api/admin'
import {getZeroTime,formatTime} from './../../../api/common'

interface pageDataM {
    name: String                             //课程名称搜索
    appName: String
    scope: Number
    totalNum: Number                         //数据条数 
    pageSize: Number                         //分页条数
    page: Number                             //当前页数
    currentPage: Number                      //当前激活页
    time:any
    scopeList:{
        name:string
        type:number
    }[]
}
interface tableDataM{
    cid:number
    appName:string
    coupon_code:string
    coupon_fee:number
    coupon_id:number
    ctime:any                           //下单时间
    fee:any                             //课程价格
    little_id:number
    mtime:number
    order_no:string                     //订单号
    pay_status:number                   //支付状态
    title:string                        //课程名称
    uid:number 
    uname:string                        //用户名
    scale:any                           //分成比例
    channel_id:number                   //渠道id
    channel_name:string                 //渠道名称
    actual_income:any                   //实际收入
}

interface formDataM{
    list:tableDataM[]
}
@Component
export default class TemmsgList extends mixins(Mixin) {
    constructor(){
        super()
        this.init()
    }

    private pageData :pageDataM= {
        appName: '',
        name:'',
        time:[],
        scope: null,
        totalNum:0,
        pageSize:20,
        page:1,
        currentPage:1,
        scopeList: []
    }

    private formData :formDataM= {
        list:[]
    }
    private init = ()=>{
        this.getSocpe()
        this.getList()
    }

    /**
     * @description 获取表格数据
     * @return {void}
     */
    private getList = ()=>{
        let me = this
        AdminInt.getMsgList({
            appName: me.pageData.appName,
            page: me.pageData.currentPage,
            scope: me.pageData.scope,
            q: me.pageData.name
        },res=>{
            me.formData.list = res.data.list
            me.pageData.totalNum = res.data.totalNum
        })
    }
     /**
     * @description 获取用途列表
     * @return {void}
     */
    private getSocpe : Function = () => {
        return AdminInt.getSocpe(res => {
            this.pageData.scopeList = res.data
        })
    }
   /**
   * @description 选择分页
   * @param {String} val
   * @return {void}
   */
    private handleCurrentChange = (val): void => {
        let me = this
        me.pageData.currentPage = Number(val)
        this.getList()
    }

    /**
     * @description 搜索
     * @return {void}
     */
    private search(){
        this.getList()
    }
    /**
     * @description 进入课程详情
     * @param {Object} row
     * @return {void}
     */
    private goDetail (row: any) {
        this.$router.push({
            name: 'temmsg',
            query: {
                id: row.id
            }
        })
    }

    /**
     * 
     * @param row 删除模板消息
     */
    private del (row: any) {
        AdminInt.delTemplate({
            id: row.id
        },res => {
            if (res.status === 200)
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        this.getList()
                    }
                });
            else
                this.$message.error('删除失败')
        })
    }
    
    /**
     * @description 搜索
     * @return {void}
     */
    private add(){
        this.$router.push({name:'temmsg'})
    }
}