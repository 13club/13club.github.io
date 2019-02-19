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


interface templatesM {
    color: string
    id: number
    name: string
    value: string
}

interface pageDataM {
    isEditor: boolean                        //是否为编辑状态
    fontColor: string[],                     //尾部字体颜色
    headColor: string                        //首部字体颜色   
    footTem: templatesM                      //尾部内容
    headTem: templatesM                      //首部内容
    contemList: templatesM[]                 //内容区列表
    msgTotalPage: number                     //测试发送总页数 
    msgPage: number                          //测试发送当前页数
    timeout: number                          //测试发送间隔时间
    count: number                             //当前失败次数
    maxCount: number                          //失败不得超过的次数
    pageStatusList: {                         //每页发送状态记录
        page: number
        status: number
        num: number
        percentage:number
        sending:boolean
    }[]
    showprogress: boolean                     //是否显示发送进度条
    dialogTableVisible: boolean               //是否显示推送状态表格
    sendFinish: boolean
    sex:number,                              //推送测试性别
    ctype:number                                //推送测试城市
    scopeList:{
        name:string
        type:number
    }[]
    shops: {
        id: number,
        appid: number
    }[]
}

interface formDataM {
    id: string
    name: string
    mini_appid: string
    mini_path: string
    msg_url: string
    templates: templatesM[]
    type: number
    openid: string
    scopedesc:string
    scope:number
    cid:number
    uidList:string
    shopid:number
    appid: number
    template_id: number
}

@Component
export default class Temmsg extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private formData: formDataM = {
        id: '',
        name: '',
        template_id: null,
        mini_appid: '',
        mini_path: '',
        msg_url: "",
        templates: [],
        type: 1,
        openid: '',
        scopedesc:'',
        scope:0,
        cid:0,
        uidList:'',
        shopid: undefined,
        appid: undefined
    }

    

    private pageData: pageDataM = {
        isEditor: !this.id,
        fontColor: ['#FF0000', '#000000', '#0000FF'],
        headColor: '',
        contemList: [],
        headTem: {
            color: '',
            id: 0,
            name: 'first',
            value: ''
        },
        footTem: {
            color: '',
            id: 0,
            name: 'remark',
            value: ''
        },
        msgTotalPage: 0,
        msgPage: 1,
        timeout: 1000 * 60,
        count: 1,
        maxCount: 2,
        pageStatusList: [],
        showprogress: false,
        dialogTableVisible: false,
        sendFinish: true,
        sex:null,
        ctype:null,
        scopeList:[],
        shops: []
    }

    //表单验证规则
    private formRule = {
        template_id: [{ required: true, message: '请输入模板ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        shopid: [{ required: true, message: '请选择店铺'}],
    }

    private init = () => {
        let me = this
        me.getMsgInfo()
        me.getscope()
        AdminInt.findAllShop(null, data => {
            if (data.status === 200) {
                this.pageData.shops = JSON.parse(data.data)
            } else {
                this.$message.warning('查询店铺失败')
            }
        })
    }

    /**
     * @description 获取模板详情
     * @return {void}
     */
    private getMsgInfo = () => {
        let me = this
        if (me.id) { //模板详情
            AdminInt.getMsgInfo({ modelid: me.id }, res => {
                let info = res.data 
                if(!info)return
                let formData = me.formData
                let pageData = me.pageData
                let tem = info.templates
                pageData.headTem = tem.shift()
                pageData.footTem = tem.pop()
                pageData.contemList = tem
                me.formData = extend(formData, info)
            })
        }
    }

    /**
     * @description 获取用途列表
     * @return {void}
     */
    private getscope = (): void => {
        AdminInt.getSocpe(res => {
            this.pageData.scopeList = res.data
        })
    }


    /**
     * 选择用途
     * @param {string} command 
     * return void
     */
    private  
    /**
     * @description 尾部内容选择颜色
     * @param {String}val
     * @return {vpid} 
     */
    private footCommand(val) {
        let me = this
        me.pageData.footTem.color = val
        // let headTextarea:any = me.$refs.headTextarea
        // setTimeout(()=>{
        //     headTextarea.$el.style.color = val
        // })
    }
    /**
     * @description 中间内容选择颜色
     * @param {String}val
     * @return {vpid} 
     */
    private contentCommand(val, i) {
        let me = this
        me.pageData.contemList[i].color = val
    }

    /**
     * @description 添加内容条目
     * @return {void}
     */
    private addContentList() {
        let me = this
        me.pageData.contemList.push({
            color: '',
            id: 0,
            name: '',
            value: ''
        })
    }

    /**
     * @description 测试openid
     * @return {void}
     */
    private testOpenid() {
        let me = this
        let openid = me.formData.openid
        AdminInt.sendmsg({ modelid: me.id, openid }, res => {
            this.$message.success('发送成功')
            // router.push({
            //     name: 'temmsgList'
            // })
        })
    }

    /**
     * @description 全员推送测试
     * @return {void}
     */
    private testAll() {
        let me = this
        let sex = me.pageData.sex
        let ctype = me.pageData.ctype
        AdminInt.totalmsgnum({sex,ctype}, res => {
            let num = me.pageData.msgTotalPage = res.totalPage
            let newList = []
            for(let i = 1;i<= num;i++){
                newList.push({
                    page: i,
                    status: 0,
                    num: 10000,
                    percentage:0,
                    sending:false
                })
            }
            me.pageData.pageStatusList = newList
            me.pageData.dialogTableVisible = true
        })
    }

    /**
     * @description 全员推送测试
     * @return {void}
     */
    private testOnepage(page?) {
        let me = this
        if (!me.pageData.sendFinish) {
            me.$message.error('正在推送，请稍等')
            return
        }   
        me.pageData.sendFinish = false  
        let msg = me.pageData.pageStatusList[page - 1]
        msg.sending = true  
        let sex = me.pageData.sex
        let ctype = me.pageData.ctype
        AdminInt.sendallmsg({ modelid: me.id, page,sex,ctype }, res => {  //正常发送测试
            if (res.status == 200) { //正常发送
                let intv = setInterval(()=>{
                    msg.percentage += 10
                    if(msg.percentage >= 100){
                        clearInterval(intv)
                        intv = null
                        
                        me.pageData.sendFinish = true
                        msg.status = 1
                        msg.sending = false
                    }
                },me.pageData.timeout / 10)
            } else { //失败
                me.$message.error('发送失败')
                msg.status = 0
                me.pageData.sendFinish = true
                msg.sending = false
            }            
        })
    }
    /**
     * 选择用途
     * @param {string} command 
     * return void
     */
    private scopeCommand(command: string): void {
        this.pageData.scopeList.forEach(ele => {
            if (ele.type == Number(command)) {
                this.formData.scopedesc = ele.name
                this.formData.scope = ele.type
                return
            }
        })
    }
    /**
     * @description 头部内容选择颜色
     * @param {String}val
     * @return {vpid} 
     */
    private headCommand(val) {
        let me = this
        me.pageData.headTem.color = val
        // let headTextarea:any = me.$refs.headTextarea
        // setTimeout(()=>{
        //     headTextarea.$el.style.color = val
        // })
    }

    /**
     * @description 取消
     * @return {void}
     */
    private cancel() {
        let me = this
        me.getMsgInfo()
        me.pageData.isEditor = false
    }
    /**
     * @description dialog关闭前的回调
     * @return {void}
     */
    private beforeTialogClose(done){
        let me = this,len
        let sendFinish = me.pageData.sendFinish
        if(!sendFinish){
            me.$message.error("正在推送，请稍等")
            return false
        }else if((len = me.checkStatus()) > 0){
            me.$message.error(`当前${len}条推送失败，请点击全员推送按钮查看`)
            me.pageData.dialogTableVisible = false
        }else{
            me.pageData.dialogTableVisible = false
        }
    }
    /**
     * @description 检查是否都推送成功
     * @return {void}
     */
    private checkStatus(){
        let me = this
        let list = me.pageData.pageStatusList.filter(ele=>ele.status == 0)
        return list.length
    }

    /**
     * @description 批量推送openid
     * @return {void}
     */
    private sendAll(){
        let me = this
        let uidList = me.formData.uidList.replace(/\n/g,'').replace(/\n\r/g,'')
        AdminInt.sendmsgList({ modelid: Number(me.id), list:uidList }, res => {
            this.$message.success('发送成功')
        })
    }


    private changeShop (shopid) {
        this.formData.appid = this.pageData.shops.filter(shop => shop.id === shopid)[0].appid
    }

    /**
     *表单提交
     *return void 
     */
    private onSubmit = (): void => {
        console.log(this.formData)
        let forme: any = this.$refs.temmsgforme
        let me = this
        forme.validate((valid) => {
            if (valid) {
                let formData = me.formData
                let pageData = me.pageData
                pageData.contemList = pageData.contemList.filter(ele => ele.color && ele.value)
                pageData.contemList.forEach((ele, index) => {
                    ele.name = 'keyword' + (index + 1)
                })
                formData.templates = extend([], pageData.contemList)
                formData.templates.unshift(pageData.headTem)
                formData.templates.push(pageData.footTem)
                if (this.id) { //修改操作
                    AdminInt.editTemplate(this.formData, res => {
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000,
                            onClose() {
                                window.location.reload()
                            }
                        })
                    })
                } else { //新建操作
                    AdminInt.addTemplate(this.formData, res => {
                        this.$message.success('添加成功')
                        router.push({
                            name: 'temmsgList'
                        })
                    })
                }
            } else {
                this.$message.error('请填写正确参数')
                return false
            }
        })
    }

}