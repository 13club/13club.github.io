import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from '../../../api/admin'
import {getZeroTime,formatTime,getFullTime} from './../../../api/common'

interface pageDataM {
    shopName: string
    name: string                             //课程名称搜索
    totalNum: number                         //数据条数 
    pageSize: number                         //分页条数
    downloadUrl:string
    searchType:string
    searchPlat:string
    typeList:{
        title:string
        key:string
    }[]
    platList:{
        title:string
        key:string
    }[]
    page: number                             //当前页数
    currentPage: number                      //当前激活页
    time:any
    qtype:string
    platform:string
}
interface tableDataM{
    cid:number
    coupon_code:string
    coupon_fee:any
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
    price:any                           //课程售价
    wx_cash_fee:any                     //支付金额
    wx_coupon_fee:any                   //微信代金券详情 --金额
}

interface formDataM{
    list:tableDataM[]
}
@Component
export default class Order extends mixins(Mixin) {
    constructor(){
        super()
        this.init()
    }

    private pageData :pageDataM= {
        shopName: '',
        name:'',
        qtype:'',
        platform:'',
        searchType:'',
        downloadUrl:'',
        searchPlat:'',
        typeList:[{
            key:'title',
            title:'课程名称'
        },{
            key:'order_no',
            title:'订单编号'
        },{
            key:'uname',
            title:'用户昵称'
        },{
            key:'channel_name',
            title:'渠道名称'
        },{
            key:'wechat_no',
            title:'微信订单号'
        }],
        platList:[{
            key:'',
            title:'全部'
        },{
            key:'publicNo',
            title:'公众号'
        },{
            key:'miniApp',
            title:'小程序'
        }],
        time:[],
        totalNum:0,
        pageSize:20,
        page:1,
        currentPage:1
    }

    private formData :formDataM= {
        list:[]
    }
    private pickerOptions = {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
    }

    private init = ()=>{
        this.getList()
    }

    /**
     * @description 获取表格数据
     * @return {void}
     */
    private getList = ()=>{
        if (this.pageData.qtype && !this.pageData.name) return this.$message.info(`请输入${this.pageData.searchType}`)
        else if (!this.pageData.qtype && this.pageData.name) return this.$message.info(`请选择搜索类型`)
        let me = this,start = null,end = null
        if(me.pageData.time && me.pageData.time.length != 0){
            start = new Date(me.pageData.time[0]).getTime()
            end = new Date(me.pageData.time[1]).getTime()
        }
        AdminInt.getOrderList({
            q:me.pageData.name,
            shopName: this.pageData.shopName,
            page:me.pageData.currentPage,
            qtype:me.pageData.qtype,
            platform:me.pageData.platform,
            start,
            end
        },res=>{
            me.formData.list = res.data.list
            me.formData.list.forEach(ele=>{
                ele.ctime = formatTime(new Date(ele.ctime))
                ele.fee = (ele.fee / 100).toFixed(2)+'元'
                ele.scale += '%'
                // ele.actual_income = ((ele.actual_income -ele.coupon_fee) / 100).toFixed(2)+'元'
                ele.actual_income = (ele.actual_income  / 100).toFixed(2)+'元'
                ele.coupon_fee = (ele.coupon_fee / 100).toFixed(2)+'元'

                ele.price = (ele.price / 100).toFixed(2)+'元'
                ele.wx_cash_fee = (ele.wx_cash_fee / 100).toFixed(2)+'元'
                ele.wx_coupon_fee = (ele.wx_coupon_fee / 100).toFixed(2)+'元'
            })
            me.pageData.totalNum = res.data.totalNum
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
     * @description 将订单导出为excel
     * @return {void}
     */
    private download(){
        let me = this,start = null,end = null
        if(me.pageData.time && me.pageData.time.length != 0){
            start = getZeroTime(new Date(me.pageData.time[0]))
            end = getFullTime(new Date(me.pageData.time[1]))
        }
        AdminInt.exportExcel({
            q:me.pageData.name,
            qtype:me.pageData.qtype,
            platform:me.pageData.platform,
            start,
            end
        },res=>{
           me.pageData.downloadUrl = res.data
           this.$nextTick(()=>{
            let download:any = me.$refs.download
            download.click()
           })
        })
    }

    private typeCommand(val:string):void{
        let me = this
        me.pageData.typeList.forEach(ele=>{
            if(ele.key == val){
                me.pageData.searchType = ele.title
                return
            }
        })
    }

    private platCommand(val:string):void{
        let me = this
        me.pageData.platform = val
        me.pageData.platList.forEach(ele=>{
            if(ele.key == val){
                me.pageData.searchPlat = ele.title
                return
            }
        })
    }
}