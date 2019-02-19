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
    msgTotalPage: number                     //测试发送总页数 
    msgPage: number                          //测试发送当前页数
    timeout: number                          //测试发送间隔时间
    count: number                             //当前失败次数
    maxCount: number                          //失败不得超过的次数
    pageStatusList: {                         //每页发送状态记录
        page: number
        status: number
        num: number
        percentage: number
        sending: boolean
    }[]
    showprogress: boolean                     //是否显示发送进度条
    dialogTableVisible: boolean               //是否显示推送状态表格
    sendFinish: boolean
    sex: number,                              //推送测试性别
    ctype: number                                //推送测试城市
    scopeList: {
        name: string
        type: number
    }[]
    text: {
        content: string
    }
    image: {
        media_id: string
    }
    voice: {
        "media_id": string
    }
    video:{
        "media_id":string
        "thumb_media_id":string
        "title":string
        "description":string
    }
    music: {
        "title": string,
        "description": string
        "musicurl": string
        "hqmusicurl": string
        "thumb_media_id": string
    }
    news: {
        "articles": {
            "title": string
            "description": string
            "url": string
            "picurl": string
        }[]
    }
    wxcard: {
        card_id: string
    },
    shops: {
        id: number,
        appid: number
    }[]
}

interface formDataM {
    name: string
    msgtype: string  //文本：text 图片：image 语音：voice 视频：video 音乐：music 图文：news (外链方式;注意：图文消息条数限制在 8 条以内) 卡券：wxcard
    scope: number   //用途
    scopedesc: string
    cid: number  //关联课程
    openid: number
    data:any
    openidList:string
    shopid: undefined,
    appid: number
}

@Component
export default class Customermsg extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }
    private id: string = router.currentRoute.query.id

    private formData: formDataM = {
        name: '',
        msgtype: 'news',
        scope: 0,
        scopedesc: '请选择用途',
        cid: 0,
        openid: null,
        data:{},
        openidList:'',
        shopid: undefined,
        appid: undefined
    }

    private pageData: pageDataM = {
        isEditor: !this.id,
        msgTotalPage: 0,
        msgPage: 1,
        timeout: 1000 * 60,
        count: 1,
        maxCount: 2,
        pageStatusList: [],
        showprogress: false,
        dialogTableVisible: false,
        sendFinish: true,
        sex: null,
        ctype: null,
        scopeList: [],
        text: {
            content: ''
        },
        image: {
            media_id: ''
        },
        voice: {
            "media_id": ""
        },
        video:{
            "media_id":"",
            "thumb_media_id":"",
            "title":"",
            "description":""
        },
        music: {
            "title": "",
            "description": "",
            "musicurl": "",
            "hqmusicurl": "",
            "thumb_media_id": ""
        },
        news: {
            "articles": []
        },
        wxcard: {
            card_id: ''
        },
        shops: []

    }

    //表单验证规则
    private formRule = {
    }

    private init = () => {
        let me = this
        me.getKfMsgInfo()
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
     * @description 获取用途列表
     * @return {void}
     */
    private getscope = (): void => {
        AdminInt.getSocpe(res => {
            this.pageData.scopeList = res.data
        })
    }

    /**
     * @description 选择用途
     * @param {string} command 
     * @return {void}
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
     * @description 添加文章内容
     * @return {void}
     */
    private addArticles(){
        let me = this
        let articles =  me.pageData.news.articles
        if(articles.length >=8){
            me.$message.error('最多八条')     
            return
        }   
        articles.push({
            "title": '',
            "description": '',
            "url": '',
            "picurl": ''
        })
    }

    /**
     * @description 删除文章内容
     * @param i 
     * @return {void}
     */
    private delArticles(i){
        let me = this
        let articles =  me.pageData.news.articles
        articles = articles.splice(i,1)
    }
    private msgtypeChange(e) {
    }

    /**
     * @description 获取模板详情
     * @return {void}
     */
    private getKfMsgInfo = () => {
        let me = this
        if (me.id) { //模板详情
            AdminInt.getKfMsgInfo({ modelid: me.id }, res => {
                let info = res.data
                if (!info) return
                let formData = me.formData
                let pageData = me.pageData
                pageData[info.msgtype] = JSON.parse(info.datajson)
                me.formData = extend(formData, info)
            })
        }
    }

    /**
     * @description 测试openid
     * @return {void}
     */
    private testOpenid() {
        let me = this
        let openid = me.formData.openid
        AdminInt.sendkfmsg({ modelid: me.id, openid }, res => {
            this.$message.success('发送成功')
        })
    }

    /**
     * @description 批量推送openid
     * @return {void}
     */
    private sendAll(){
        let me = this
        let openidList = me.formData.openidList.replace(/\n/g,'').replace(/\n\r/g,'')
        AdminInt.sendkfmsgAll({ modelid: Number(me.id), list:openidList }, res => {
            this.$message.success('发送成功')
        })
    }

    /**
     * @description 全员推送测试
     * @return {void}
     */
    private testAll() {
        let me = this
        let openid = me.formData.openid
        let sex = me.pageData.sex
        let ctype = me.pageData.ctype
        AdminInt.totalkfmsgnum({ sex, ctype }, res => {
            let num = me.pageData.msgTotalPage = res.totalPage
            let newList = []
            for (let i = 1; i <= num; i++) {
                newList.push({
                    page: i,
                    status: 0,
                    num: 10000,
                    percentage: 0,
                    sending: false
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
        AdminInt.sendallkfmsg({ modelid: me.id, page, sex, ctype }, res => {  //正常发送测试
            if (res.status == 200) { //正常发送
                let intv = setInterval(() => {
                    msg.percentage += 10
                    if (msg.percentage >= 100) {
                        clearInterval(intv)
                        intv = null
                        me.pageData.sendFinish = true
                        msg.status = 1
                        msg.sending = false
                    }
                }, me.pageData.timeout / 10)
            } else { //失败
                me.$message.error('发送失败')
                msg.status = 0
                me.pageData.sendFinish = true
                msg.sending = false
            }
        })
    }

    /**
     * @description 取消
     * @return {void}
     */
    private cancel() {
        let me = this
        me.getKfMsgInfo()
        me.pageData.isEditor = false
    }
    /**
     * @description dialog关闭前的回调
     * @return {void}
     */
    private beforeTialogClose(done) {
        let me = this, len
        let sendFinish = me.pageData.sendFinish
        if (!sendFinish) {
            me.$message.error("正在推送，请稍等")
            return false
        } else if ((len = me.checkStatus()) > 0) {
            me.$message.error(`当前${len}条推送失败，请点击全员推送按钮查看`)
            me.pageData.dialogTableVisible = false
        } else {
            me.pageData.dialogTableVisible = false
        }
    }
    /**
     * @description 检查是否都推送成功
     * @return {void}
     */
    private checkStatus() {
        let me = this
        let list = me.pageData.pageStatusList.filter(ele => ele.status == 0)
        return list.length
    }

    private changeShop (shopid) {
        this.formData.appid = this.pageData.shops.filter(shop => shop.id === shopid)[0].appid
    }

    /**
     *@description 表单提交
     *@return {void} 
     */
    private onSubmit = (): void => {
        let forme: any = this.$refs.temmsgforme
        let me = this
        forme.validate((valid) => {
            if (valid) {
                let formData = me.formData
                let pageData = me.pageData
                formData.data = JSON.stringify(pageData[formData.msgtype])
                if (this.id) { //修改操作
                    AdminInt.editKfTemplate(this.formData, res => {
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
                    AdminInt.addKfTemplate(this.formData, res => {
                        this.$message.success('添加成功')
                        router.push({
                            name: 'customermsgList'
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