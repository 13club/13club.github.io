import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { BASEURL } from "./../../../api/storge"
import { extend, beforeImgUpload, beforeMediaUpload } from "./../../../api/common"
import url from './../../../store/modules/dataUrl'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { courseM, chpterM, fileListM } from './../../../store/modules/interface'

const all = url.state

interface formDataM {
    act_id?:number                              
    title:string                                  //标题
    act_link?:string                              //活动链接
    begin_time:number|string                             //开始时间
    end_time:number  |string                             //结束时间
    grant_type:number                             //发放规则：1 每天每人发放1张   2 购买后立即发放一张   3 直接发一张券
    status:number                                 //活动状态：0 未发布  1 上线  2 下线
    coupon_ids:number[]                           //使用的优惠券集合
    shopid: number
}

interface pageDataM{
    state:string[]
    name:string,
    couponTitle:string
    currentPage:number
}

@Component
export default class NewActivity extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private formData: formDataM = {
        act_id:null,                              
        title:'',
        act_link:'',
        begin_time:'',
        end_time:'',
        grant_type:1,
        status:1,
        coupon_ids:[],
        shopid: 0   
    }

    private shops: Array<Object> = []

    private pageData : pageDataM ={
        state:[],
        couponTitle:'',
        name:'',
        currentPage:1
    }
     //表单验证规则
     private formRule = {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        begin_time: [{ required: true, message: '请选择活动日期', trigger: 'change' }],
        end_time: [{ required: true, message: '请选择活动日期', trigger: 'change' }],
        coupon_ids: [{ required: true, message: '请选择优惠券' }]
    }

    private init() {
        AdminInt.findAllShop(null, data => {
            if (data.status === 200) {
                this.shops = JSON.parse(data.data)
                this.shops.unshift({
                    id: 0,
                    appName: '所有店铺'
                })
            } else {
                this.$message.warning('查询店铺失败')
            }
        })
    }

    /**
     * @description 模糊查询优惠券列表
     * @return {void}
     */
    private querySearch(val,cb){
        let me = this
        AdminInt.getCouponTitle({
            q:val,
            page:me.pageData.currentPage
        },res=>{
            let list = res.data.list
            list.map((item)=>{item.value = item.title})
            me.pageData.state = res.data.list
            cb(me.pageData.state)
        })
    }

    /**
     * @description 选择优惠券
     * @param item 优惠券详情
     * @return {void}
     */
    private handleSelect(item){
        let me = this
        me.formData.coupon_ids = [item.coupon_id]
        me.pageData.couponTitle = item.value
    }

    private couponBlur($event) {
        let me = this
        if($event.target.value == ''){
            me.formData.coupon_ids = []
        }
    }

    private onSubmit(){
        let me = this
        let forme: any = this.$refs.forme
        forme.validate((valid) => {
            if (valid) {               
                AdminInt.addActList(this.formData, res => {
                    this.$message.success('添加成功')
                    router.push({
                        name: 'actList'
                    })
                })
            } else {
                this.$message.error('请填写正确参数')
                return false
            }
        })
    }

}