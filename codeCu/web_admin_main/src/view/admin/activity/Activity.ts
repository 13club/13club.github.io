import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { BASEURL } from "./../../../api/storge"
import { extend, beforeImgUpload, beforeMediaUpload, formatTime } from "./../../../api/common"
import url from './../../../store/modules/dataUrl'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { courseM, chpterM, fileListM } from './../../../store/modules/interface'

const all = url.state

interface pageDataM {
    act_id?:number                              
    title:string                                  //标题
    act_link?:string                              //活动链接
    begin_time:number|string                             //开始时间
    end_time:number  |string                             //结束时间
    grant_type:number                             //发放规则：1 每天每人发放1张   2 购买后立即发放一张   3 直接发一张券
    status:number                                 //活动状态：0 未发布  1 上线  2 下线
    coupon_ids:number[]                           //使用的优惠券集合
    startTime:string
    endTime:string,
    shopid: number,
    appName: string
}

@Component
export default class Activity extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private pageData : pageDataM ={
        act_id:0,                              
        title:'',
        act_link:'',
        begin_time:'',
        end_time:'',
        grant_type:1,
        status:1,
        coupon_ids:[],
        startTime:'',
        endTime:'',
        shopid: 0,
        appName: ''
    }

    private init = () => {
        let me = this
        me.getInfo()
    }

    private getInfo = ()=>{
        let me =this
        AdminInt.getActivityInfo({
            act_id:me.id
        },res=>{
           me.pageData = extend(me.pageData,res.data)
           me.pageData.startTime = formatTime(new Date(res.data.begin_time))
           me.pageData.endTime = formatTime(new Date(res.data.end_time))
        })
    }
}