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
    coupon_id?:number                              
    title:string                          //优惠券名
    fee:any                           //优惠券面额
    fee1:any                          //优惠券面额(显示用)
    use_fee: any
    use_fee1: any
    grant_num:number  |string                    //发行数量
    grant_limit_num:number |string               //个人持有有效优惠券数量
    type:number                            //1 表示固定日期区间    2 表示固定时长 （自领取后按天算）
    begin_time:number|string                     //type为1时专用，表示起用时间
    end_time:number|string                       //type为1时用，表示截止时间；type为2时用，表示卡券统一过期时间
    fixed_term:number                     //type为2时专用，表示自领取后多少天内有效，不支持填写0
    fixed_begin_term:number               //type为2时专用，表示自领取后多少天开始生效，领取后当天生效填写0
    scope1:any                           //适用范围
    scope:any                           //适用范围
    description:string                    //使用说明
    status:number                           //状态： 1 有效  0 失效
    ctime?:number                          //创建时间
    courseTitle: string
    courses: Array<any>
}

interface pageDataM{
    state:string[]
    name:string,
    couponTitle:string
    currentPage:number
}

@Component
export default class NewCoupon extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private formData: formDataM = {
        courses: [],
        courseTitle: '',
        coupon_id:null,                              
        title:'',
        fee:'',
        fee1:'',
        use_fee: 0,
        use_fee1: 0,
        grant_num:'',
        grant_limit_num:'',
        type:1,
        begin_time:'',
        end_time:'',
        fixed_term:0,
        fixed_begin_term:0,
        scope1:'',
        scope:'',
        description:'',
        status:0,
        ctime:0
    }

    private pageData : pageDataM ={
        state:[],
        couponTitle:'',
        name:'',
        currentPage:1
    }
     //表单验证规则
     private formRule = {
        title: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
        fee1: [{ required: true, message: '请输入优惠券金额', trigger: 'blur' }],
        use_fee: [{ required: true, message: '请输入满多少元可用', trigger: 'blur' }],
        grant_num: [{ required: true, message: '请输入发放的总数量', trigger: 'blur' }],
        grant_limit_num: [{ required: true, message: '请输入每人限领数量' },
                        {pattern: /^([1-9]|10)$/, message: '限领数量1-10张', trigger: 'blur'}]
    }

    private init = () => {
        let me = this
    }

    private onSubmit(){
        let me = this
        let forme: any = this.$refs.forme
        forme.validate((valid) => {
            if (valid) {          
                me.formData.fee = me.formData.fee1 * 100
                me.formData.use_fee = me.formData.use_fee1 * 100
                if (me.formData.scope1 == '1') {
                    if (me.formData.courses.length === 0) {
                        me.$message.warning('请指定使用范围')
                        return
                    }
                    me.formData.scope = []
                    me.formData.courses.forEach(course => me.formData.scope.push(course.cid))
                    me.formData.scope = JSON.stringify(me.formData.scope)
                }
                console.log(me.formData)
                AdminInt.addCoupon(me.formData, res => {
                    me.$message.success('添加成功')
                    router.push({
                        name: 'couponList'
                    })
                })
            } else {
                me.$message.error('请填写正确参数')
                return false
            }
        })
    }

    queryCourseAsync (name, cb) {
        if (name){
             AdminInt.findCourseByName({name}, data => {
                if (data.status === 200) {
                    cb(JSON.parse(data.data))
                } else {
                    cb([])
                    this.$message.error('查询失败')
                }
            })
        }
    }

    del(index) {
        this.formData.courses.splice(index, 1)
    }

}