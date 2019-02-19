import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
// import { router } from './../../../router'
import { BASEURL } from "./../../../api/storge"
import url from './../../../store/modules/dataUrl'
import { beforeImgUpload } from "./../../../api/common"
import { router } from '@/router' 

const all = url.state

interface bannerInfoListM{
    b_no:number       //编号
    type:any       //banner类型：默认1--指定课程banner,2--外链banner
    cid:any        //课程id
    url:string;       //目标外链
    img:string         //banner图片
    location:number   //位置
    shopid: number  // 店铺id
    title: string
    activity_name: string
}

interface formDataM{
    isEditor:boolean
    shopid: number
    list:bannerInfoListM[]
    shop: Object
}

interface pageDataM{
    maxLength:number
    bannerName:string
    totalNum: number                         //数据条数 
    pageSize: number                         //分页条数
    page: number                             //当前页数
    currentPage: number                      //当前激活页
}

@Component
export default class Banner extends mixins(Mixin) {
    constructor(){
        super()
    }

    created () {
        const shopid = router.currentRoute.query.shopid
        if (!shopid) {
            this.$message.warning('地址栏参数缺少shopid')
        } else {
            this.formData.shopid = Number(shopid)
            this.getList(shopid)
            AdminInt.findShop({shopid}, data => {
                if (data.status === 200)
                    this.formData.shop = data.data
            })
        }
    }

    private pageData: pageDataM = {
        bannerName:'',
        totalNum: 0,
        pageSize: 20,
        page: 1,
        currentPage: 1,
        maxLength:5
    }
    
    jumpLink = false

    private formData:formDataM = {
        isEditor:false,
        shopid: undefined,
        list:[],
        shop: {}
    }

    private uploadAction = BASEURL + all.upload     //上传路径

    //可以上传的音频类型
    private imgType = ['image/jpeg', 'image/png']

    //上传图片需要传的参数
    private imgParams = {
        type: 'image'
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
    queryCollageAsync (name, cb) {
        if (name){
          AdminInt.grouplist({
            page: 1,
            q: name,
            state: 1
          }, res => {
            if (res.status === 200) {
              cb(res.data.list)
            } else {
              cb([])
              this.$message.error('查询失败')
            }
          })
        }
      }
    // 1:课程 2:外链 3:拼团列表 4:拼团详情
    changeType1(item) {
        item.activity_name = ''
        item.url = ''
    }
    changeType2(item) {
        item.cid = ''
        item.title = ''
        item.activity_name = ''
    }
    changeType3(item) {
        item.cid = ''
        item.title = ''
        item.activity_name = ''
        item.url = ''
    }
    changeType4(item) {
        item.title = ''
        item.url = ''
    }

    /**
     * @description 获取banner列表
     * @return {void}
     */
    private getList = shopid=> {
        AdminInt.getBannerList({
            shopid,
            q: this.pageData.bannerName,
            page: this.pageData.currentPage
        },res => {
            res.data.list.map(item => {
                if (item.type === 4){
                    item.activity_name = item.title
                    item.title = ''
                }
            })
            this.formData.list = res.data.list
        })
    }

    /**
     * @description 添加banner
     * @return {void}
     */
    private add(){
        let me = this
        if(me.formData.list.length >= me.pageData.maxLength){
            this.$message.error(`不能超过${me.pageData.maxLength}条`)
            return 
        }
        me.formData.list.push({
            b_no:0,       
            type:1,  
            cid:'',    
            url:'',   
            img:'',    
            location:0,
            shopid: this.formData.shopid,
            activity_name: '',
            title: ''
        })
    }
    /**
     * 上传banner前校验
     */
    private beforeUpload = (file: File): boolean => {
        return beforeImgUpload(file)
    }

    /**
     * @description 上传banner
     * @param {Number} index
     * @return {void}
     */
    private upSuccess (response: any, file: File, fileList: any, index?: number): void  {
        this.formData.list[index].img = response.data
        this.$message.success("上传成功")
    }
    /**
     * @description 删除banner图
     * @param {Number} i 
     * @return {void}
     */
    private delBanner(i){
        this.formData.list.splice(i,1)
    }

    /**
     * @description 保存banner
     * @return {void}
     */
    private save(){
        let r = this.formData.list
        // 1课程 2外链  3拼团列表 4拼团活动
        if (r.length == 0){
            this.$message.error("最少保存一条banner")
            return
        }

        let flag = false
        for(let i = 0, l = r.length; i < l; i++) {
            if (!r[i].img || ((r[i].type === 1 || r[i].type === 4) && !r[i].cid) || (r[i].type === 2 && !r[i].url)) {
                this.$message.warning(`${i+1}号banner信息不完整`)
                flag = true
                break;
            }
            if (r[i].type === 4) r[i].title = r[i].activity_name
            r[i].b_no = i+1
            r[i].cid = +r[i].cid
        }

        AdminInt.updateBanner({bannerInfoList: r},res => {
            this.$message.success("保存成功")
            this.formData.isEditor = false
            this.getList(this.formData.shopid)
        })
    }
}