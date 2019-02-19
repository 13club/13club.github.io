import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { BASEURL } from "./../../../api/storge"
import { extend, beforeImgUpload, beforeMediaUpload } from "./../../../api/common"
import url from './../../../store/modules/dataUrl'
import { AdminInt } from "./../../../api/admin"
import { router } from './../../../router'
import { courseM, chpterM, fileListM } from './../../../store/modules/interface'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { Quill, quillEditor } from 'vue-quill-editor'
const Font = Quill.import('formats/font')
Font.whitelist = ['Arial', 'serif', 'sans-serif', '宋体', '黑体', '微软雅黑']
Quill.register(Font, true)

const all = url.state
let isSave:boolean = false

interface pageDataM {
    priceRadio: string                   //是否收费
    showPriceInput: boolean              //是否显示收费输入框
    popover?: boolean
    categoryName: string                 //分类名称
    price: string                        //价格
    slogoList: fileListM[]               //封面图文件列表
    introImgList: fileListM[]            //介绍附件文件列表
    introList: fileListM[]               //课程详情文件列表
    tintroImgList: fileListM[]           //讲师头像文件列表
    chapterlist: chpterM[]               //课程目录视频文件列表
    categoryList: {
        cid: string
        name: string
    }[]                                  //分类列表
    catalog: {
        title: string
        file: string
    }[]
    tagInputValue: string                //标签内容
    tagInputVisible: boolean             //是否显示添加标签输入框
    providerList: {
        provider_id: string
        title: string
    }[]                                  //课程来源列表
    providerName: string                 //课程来源名称
    isEditor: boolean
}

Component.registerHooks([
    'beforeRouteLeave',
])

@Component({
    components: {
        quillEditor
    }
})
export default class NewCourse extends mixins(Mixin) {
    constructor() {
        super()
        isSave = false
        this.init()
    }

    

    beforeRouteLeave(to, from , next) {
        if(!isSave)
         this.$confirm('您还未保存，确定离开吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 选择确定
            next()
          })
        else
            next()
    }
    private cid: string = router.currentRoute.query.cid

    private formData: courseM = {
        title: '',
        slogo: '',
        category: '',
        price: '',
        // islisten: 0,
        chapterlist: [],
        scale: '',
        title_img: '',
        listenannex: '',
        intro: '',
        intro_img: [],
        tname: '',
        tintro: '',
        head_img_url: '',
        tags: [],
        status: 0,
        provider_id: '',
        is_one_line_city: 0,
        sex: 0,
        weights: '',
        content: '',
        is_can_use_coupon: 1
    }

    private pageData: pageDataM = {
        isEditor: true,
        priceRadio: '1',
        showPriceInput: true,
        popover: false,
        categoryName: '选择分类',
        price: '',
        categoryList: [],
        chapterlist: [],
        catalog: [],
        tagInputValue: '',
        tagInputVisible: false,
        slogoList: [],
        introImgList: [],
        introList: [],
        tintroImgList: [],
        providerList: [],
        providerName: '选择课程来源'
    }

    fromDetail:boolean = false // 是否是点击详情进来的

    private uploadAction = BASEURL + all.upload     //上传路径

    mounted() {
        (<any>this.$refs.myQuillEditor).quill.getModule('toolbar').addHandler('image', this.imgHandler)
        if (router.currentRoute.params.editor) {
            this.fromDetail = true
            isSave = true
            this.pageData.isEditor = false
        }
    }

    imgHandler() {
        const dom:any = document.querySelector('.course-detail-upload input')
        dom.click()
    }
    
    editorOption = {}

    //上传图片需要传的参数
    private imgParams = {
        type: 'image'
    }
    //上传视频需要传的参数
    private mediaParams = {
        type: 'media'
    }

    //可以上传的音频类型
    private imgType = ['image/jpeg', 'image/png']
    //可以上传的视频类型
    private mediaType = ['audio/mpeg', 'audio/mp4', 'video/mp4', 'video/avi', 'video/x-msvideo', '.flv']

    //表单验证规则
    private formRule = {
        provider_id: [{ required: true, message: '请选择课程来源', trigger: 'blur', min: 1, type: 'number' }],
        title: [{ required: true, message: '请输入课程标题', trigger: 'blur' }],
        chapterlist: [{ required: true, message: '请添加课程目录', trigger: 'change' }],
        category: [{ required: true, message: '请选择课程分类', trigger: 'change' }],
        price: [{ required: this.pageData.priceRadio, message: '请输入收费价格', trigger: 'blur' }],
        scale: [{ required: true, message: '请输入分成比例', trigger: 'blur' }],
        title_img: [{ required: true, message: '请选择封面图', trigger: 'change' }],
        intro_img: [{ required: true, message: '请添加课程详情图', trigger: 'change' }],
        tname: [{ required: true, message: '请输入讲师名称', trigger: 'blur' }],
        head_img_url: [{ required: true, message: '请添加讲师头像', trigger: 'change' }],
        tags: [{ required: true, message: '请添加课程标签', trigger: 'change' }],
        weights: [{ required: true, message: '请输入课程权重' },
        { pattern: /[1-10000]/, message: '限值1-10000', trigger: 'blur' }]
    }

    private init = () => {
        if (this.cid) { //课程详情
            this.getCourseDetail()
        }
        this.getCategory()
        this.getProvider()

    }

    /**
     * 从连接中截取文件名称
     * @param {string} content
     * @return {string}
     */
    private getFileName = (content: string): string => {
        let reg = new RegExp(/com\/(\S*)/)
        let result = content.match(reg)
        return result ? result[1] : ''
    }

    /**
     * 获取课程详情
     * return void
     */
    private getCourseDetail = (): void => {
        AdminInt.courseDetail({ cid: this.cid }, res => {
            this.formData = extend(this.formData, res.data, true)
            this.pageData.priceRadio = res.data.price > 0 ? '1' : '0'
            this.pageData.categoryName = res.data.categoryName  //分类名称
            this.pageData.providerName = res.data.provider_title //课程来源
            this.pageData.price = (res.data.price / 100).toFixed(2)  //价格
            //添加课程详情名称
            this.formData.intro_img.forEach(ele => {
                ele.name = this.getFileName(ele.img)
            })
            
            this.formData.chapterlist.forEach(chapter => {
                chapter.is_free_temp = !!chapter.is_free
            })

            this.pageData.chapterlist = this.formData.chapterlist
            //封面图
            if (res.data.title_img) {
                this.pageData.slogoList.push({
                    name: this.getFileName(res.data.title_img),
                    url: res.data.title_img
                })
            }
            //介绍附件
            if (res.data.listenannex) {
                this.pageData.introImgList.push({
                    name: this.getFileName(res.data.listenannex),
                    url: res.data.listenannex
                })
            }
            //课程详情
            this.formData.intro_img.forEach(ele => {
                if (ele.img) {
                    this.pageData.introList.push({
                        name: this.getFileName(ele.img),
                        url: ele.img
                    })
                }
            })
            //介绍附件
            if (res.data.head_img_url) {
                this.pageData.tintroImgList.push({
                    name: this.getFileName(res.data.head_img_url),
                    url: res.data.head_img_url
                })
            }
        }).then(res => {
            console.log("课程详情加载完毕")
        })
    }

    /**
     * 获取分类列表
     * return void
     */
    private getCategory = (): void => {
        AdminInt.getCategory(res => {
            this.pageData.categoryList = res.data
        })
    }

    /**
     * @description 获取课程来源列表
     * @return {void}
     */
    private getProvider = (): void => {
        AdminInt.getProvider(res => {
            this.pageData.providerList = res.data
        })
    }


    /**
     * 上传失败提示
     * @param {string} err
     * @param {File} file
     * @param {Array} fileList
     * return void
     */
    private uploadErr = (err, file, fileList): void => {
        this.$message.error('上传失败')
    }

    /**
     * 选取分类
     * @param {string} command 
     * return void
     */
    private categoryCommand(command: string): void {
        this.pageData.categoryList.forEach(ele => {
            if (ele.cid == command) {
                this.formData.category = command
                this.pageData.categoryName = ele.name
                return
            }
        })
    }

    /**
     * @description 选取课程来源
     * @param {string} command 
     * return void
     */
    private providerCommand(command: string,instance): void {
        console.log(command)
        console.log(instance)
        this.pageData.providerList.forEach(ele => {
            if (ele.provider_id == command) {
                this.formData.provider_id = command
                this.pageData.providerName = ele.title
                return
            }
        })
    }

    /**
     * 是否收费状态改变
     * @param {string} val
     * return void 
     */
    private priceChange(val: string): void {
        if (val == '1') {  //收费
            this.pageData.showPriceInput = true
            this.formData.price = ''
            this.pageData.price = ''
            this.$nextTick(() => {
                let price: any = this.$refs.price
                price.$refs.input.focus()
            })
        } else {
            this.pageData.showPriceInput = false
            this.formData.price = '0'
            this.pageData.price = '0'
        }
    }

    /**
     * 上传封面图前校验
     */
    private beforeSlogoUpload = (file: File): boolean => {
        return beforeImgUpload(file)
    }

    /**
     * 上传封面图
     */
    private slogoSuccess = (response: any, file: File, fileList: any): void => {
        this.formData.title_img = response.data
        this.$message.success("上传成功")
    }

    /**
     * 删除封面图
     */
    private slogoRemove = (response: any, file: File, fileList: any): void => {
        this.formData.title_img = ''
    }

    /**
     * 点击封面图
     */
    private slogoPreview = (response: any, file: File, fileList: any): void => {
        console.log(response)
    }

    /**
     * 上传封面图前校验
     */
    private beforeintroImgUpload = (file: File): boolean => {
        return beforeMediaUpload(file)
    }

    /**
     * 上传介绍附件
     */
    private introImgSuccess = (response: any, file: File, fileList: any): void => {
        this.formData.listenannex = response.data
        this.$message.success("上传成功")
    }

    /**
     * 删除介绍附件
     */
    private introImgRemove = (file: File, fileList: any): void => {
        this.formData.listenannex = ''
    }

    /**
     * 点击介绍附件
     */
    private introImgPreview = (response: any, file: File, fileList: any): void => {
        console.log(response)
    }

    /**
     * 上传讲师图前校验
     */
    private beforetintroImgUpload = (file: File): boolean => {
        return beforeImgUpload(file)
    }

    /**
     * 上传讲师图
     */
    private tintroImgSuccess = (response: any, file: File, fileList: any): void => {
        this.formData.head_img_url = response.data
        this.$message.success("上传成功")
    }

    /**
     * 删除讲师图
     */
    private tintroImgRemove = (response: any, file: File, fileList: any): void => {
        this.formData.head_img_url = ''
    }

    /**
     * 点击讲师图
     */
    private tintroImgPreview = (response: any, file: File, fileList: any): void => {
        console.log(response)
    }

    /**
     * 当pageData中的价格修改时同步修改表单数据(因为表单中需要提交的价格单位为分，需要现实的价格单位为元)
     * @param {Event} event
     * return void
     */
    private changePrice = (event) => {
        this.formData.price = (event.currentTarget.value * 100).toFixed(0)
    }

    /**
     * 添加目录
     * return void
     */
    private addCatalog(): void {
        let obj = {
            ch_no: 1,
            title: null,
            content: null,
            title_img: '',
            is_free: 0,
            is_free_temp: false,
            is_member_free: 0
        }
        this.formData.chapterlist.push(obj)
    }

    /**
     * 删除目录
     * @param {Number} i
     * @return {void}
     */
    private delchapter(cata, i): void {
        // if(cata.cid){
        //     AdminInt.deleteChapter({
        //         cid:cata.cid,
        //         ch_id:cata.ch_id
        //     },res=>{
        //         this.pageData.chapterlist.splice(i,1)
        //         this.pageData.chapterlist.splice(i,1)
        //     })
        // }else{
        // this.pageData.chapterlist.splice(i, 1)
        this.formData.chapterlist.splice(i, 1)
        // }
    }

    /**
     * 上传课程目录音视频前校验
     */
    private beforeChapterUpload = (file: File): boolean => {
        return beforeMediaUpload(file)
    }

    /**
     * 上传课程目录音视频
     */
    private chapterSuccess = (response: any, file: File, fileList: any, index?: number): void => {
        this.formData.chapterlist[index].content = response.data
        this.$message.success("上传成功")
    }

    /**
     * 删除课程目录音视频
     */
    private chapterRemove = (file: File, fileList: any, index?: number): void => {
        this.formData.chapterlist[index].content = ''
    }

    /**
     * 点击课程目录音视频
     */
    private chapterPreview = (response: any, file: File, fileList: any): void => {
        console.log(response)
    }

    /**
     * 上传课程详情图前校验
     */
    private introUpload = (file: File): boolean => {
        let flag = beforeImgUpload(file, 5)
        if (flag) {
            let num = 0
            if (this.formData.intro_img.length) {
                num = this.formData.intro_img[this.formData.intro_img.length - 1].no
            }

            this.formData.intro_img.push({
                no: num + 1,
                img: '',
                name: file.name
            })
        }
        return flag
    }

    private introImgSuccess1 = (response: any, file: File, fileList: any): void => {
        this.formData.intro_img.forEach(ele => {
            if (ele.name == file.name) {
                ele.img = response.data
                return
            }
        })
        this.$message.success("上传成功")
    }

    /**
     * 上传课程详情图
     */
    private introSuccess = (res: any, file: File, fileList: any): void => {
        // this.formData.intro_img.forEach(ele => {
        //     if (ele.name == file.name) {
        //         ele.img = response.data
        //         return
        //     }
        // })
        // this.$message.success("上传成功")
         // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = (<any>this.$refs.myQuillEditor).quill
        // 如果上传成功
        if (res.status === 200 && res.data !== null) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.info为服务器返回的图片地址
            // quill.insertEmbed(length, 'image', res.info)
            quill.insertEmbed(length !== null ? length : 0, 'image', res.data, Quill.sources.USER)
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        // this.quillUpdateImg = false
    }

    /**
     * 删除课程详情图
     */
    private introRemove = (file: File, fileList: any): void => {
        let newList
        newList = this.formData.intro_img.filter(ele => ele.name != file.name)
        this.formData.intro_img = newList
    }


    /**
     * 点击课程详情图
     */
    private introPreview = (response: any, file: File, fileList: any): void => {
        console.log(response)
    }

    /**
     * 显示标签添加输入框
     * return void
     */
    private showTagInput(): void {
        this.pageData.tagInputVisible = true
        this.$nextTick(() => {
            let saveTagInput: any = this.$refs.saveTagInput
            saveTagInput.$refs.input.focus()
        })
    }

    /**
     * 删除具体标签
     * @param tag {string} 标签
     * return void
     */
    private tagHandleClose(tag): void {
        this.formData.tags.splice(this.formData.tags.indexOf(tag), 1)
    }

    /**
     * 添加具体标签
     * return void
     */
    private tagHandleInputConfirm(): void {
        let inputValue = this.pageData.tagInputValue
        let tags = this.formData.tags || []
        if (inputValue && tags.filter(ele => ele == inputValue).length == 0) {
            tags.push(inputValue)
            this.formData.tags = tags
        }
        this.pageData.tagInputVisible = false
        this.pageData.tagInputValue = ''
    }

    editor() {
        this.pageData.isEditor = true
        isSave = false
    }

    cancel() {
        if (!this.fromDetail) {
            isSave = true
            this.$router.go(-1)
        } else if (this.pageData.isEditor) {
            isSave = true
            this.pageData.isEditor = false
        }
    }

    /**
     *表单提交
     *return void 
     */
    private onSubmit = (): void => {
        let forme: any = this.$refs.courseforme
        let chapterlist = this.pageData.chapterlist.filter(ele => ele.title)
        //需要保证课程目录里面的标题有值
        console.log('表单数据 start --------------->')
        console.log(this.formData)
        console.log('表单数据 end ----------------->')
        console.log('页面数据 start --------------->')
        console.log(this.pageData)
        console.log('页面数据 end ----------------->')
        forme.validate((valid, invalidFields) => {
            if (valid) {
                chapterlist.forEach((ele, index) => {
                    ele.ch_no = index + 1
                    // ele.is_free = ele.is_free_temp ? 1 : 0
                })
                // this.formData.chapterlist = chapterlist
                if (this.cid) { //修改操作
                    AdminInt.editorCourse(this.formData, res => {
                        this.$message.success('修改成功')
                        isSave = true
                        router.push({
                            name: 'courseList'
                        })
                    })
                } else { //新建操作
                    AdminInt.addCourse(this.formData, res => {
                        isSave = true
                        this.$message.success('添加成功')
                        router.push({
                            name: 'courseList'
                        })
                    })
                }
            } else {
                let flag = true
                const chapterlist = this.formData.chapterlist
                if (chapterlist.length === 0) {
                   return this.$message.error("请添加课程章节")
                } else {
                    for(let i = 0; i < chapterlist.length; i++) {
                        if (!chapterlist[i].title){
                            this.$message.error(`请输入课程章节${i+1}的名称`)
                            flag = false
                            break;
                        }
                    }
                }
                if (!false) return
                const key = Object.keys(invalidFields)[0]
                if (invalidFields[key][0].message) {
                    this.$message.error(invalidFields[key][0].message)
                } else {
                    this.$message.error("请输入正确的参数")
                }
                
                return false
            }
        })
        // if
        // this.$message.error('请输入课程站阿胶')
    }

}   