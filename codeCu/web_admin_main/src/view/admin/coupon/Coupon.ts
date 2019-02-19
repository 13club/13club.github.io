import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { BASEURL } from "./../../../api/storge"
import { extend, beforeImgUpload, beforeMediaUpload, formatTime, formatDayTime } from "./../../../api/common"
import url from './../../../store/modules/dataUrl'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { courseM, chpterM, fileListM } from './../../../store/modules/interface'

const all = url.state

interface pageDataM {
    coupon_id?:number                              
    title:string                          //优惠券名
    fee:any                               //优惠券面额
    fee1:any                              //优惠券面额(显示用)
    use_fee: any
    use_fee1: any
    grant_num:number  |string             //发行数量
    grant_limit_num:number |string        //个人持有有效优惠券数量
    type:number                           //1 表示固定日期区间    2 表示固定时长 （自领取后按天算）
    begin_time:number|string              //type为1时专用，表示起用时间
    end_time:number|string                //type为1时用，表示截止时间；type为2时用，表示卡券统一过期时间
    fixed_term:number                     //type为2时专用，表示自领取后多少天内有效，不支持填写0
    fixed_begin_term:number               //type为2时专用，表示自领取后多少天开始生效，领取后当天生效填写0
    scope:string                          //适用范围
    description:string                    //使用说明
    status:number                         //状态： 1 有效  0 失效
    ctime?:number                         //创建时间
    startTime:string,                     //生效时间（用作显示）
    endTime:string,                       //过期时间（用作显示）
    showCountAdd:boolean                  //是否显示添加数量的对话框
    showTimeDelay:boolean                 //是否显示延长时间对话框
    add_count:number                      //添加的数量
    delay_time:number|string              //重新选择的过期时间
}

@Component
export default class Coupon extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private pageData : pageDataM ={
        coupon_id:null,                              
        title:'',
        fee:'',
        fee1:'',
        use_fee: '',
        use_fee1: '',
        grant_num:'',
        grant_limit_num:'',
        type:1,
        begin_time:'',
        startTime:'',
        endTime:'',
        end_time:'',
        fixed_term:0,
        fixed_begin_term:0,
        scope:'',
        description:'',
        status:0,
        ctime:0,
        showCountAdd:false,
        showTimeDelay:false,
        add_count:0,
        delay_time:''
    }

    private init = () => {
        let me = this
        me.getInfo()
    }

    private getInfo = ()=>{
        let me =this
        AdminInt.getCouponInfo({
            coupon_id:me.id
        },res=>{
           me.pageData = extend(me.pageData,res.data)
           me.pageData.fee1 = me.pageData.fee / 100
           me.pageData.use_fee1 = me.pageData.use_fee / 100
           me.pageData.startTime = formatTime(new Date(res.data.begin_time))
           me.pageData.endTime = formatTime(new Date(res.data.end_time))
        })
    }

    /** 
     * @description 添加优惠券张数
     * @return {void}
    */
    private addCount(){
        let me = this
        let coupon_id = me.id
        let grant_num = me.pageData.add_count
        if(grant_num <= 0){
            me.$message.error('添加张数不得小于0')
            return
        }
        AdminInt.appendGrantNum({
            coupon_id:me.id,
            grant_num
        },res=>{
            me.$message.success('修改成功')
            me.getInfo()
           me.pageData.showCountAdd = false 
        })
    }

    /** 
     * @description 延长优惠券过期时间
     * @return {void}
    */
    private delayTime(){
        let me = this
        let coupon_id = me.id
        let end_time = me.pageData.delay_time
        if(end_time < me.pageData.end_time){
            me.$message.error('延长日期不得小于当前已选日期')
            return
        }
        AdminInt.appendUseTime({
            coupon_id,
            end_time
        },res=>{
            me.$message.success('修改成功')
            me.getInfo()
           me.pageData.showTimeDelay = false 
        })
    }
}