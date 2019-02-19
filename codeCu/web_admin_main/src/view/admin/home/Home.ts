import Vue from 'vue'
import { adminRoutes, router } from '../../../router'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
import {getZeroTime,getFullTime,formatDayTime} from './../../../api/common'



interface statM {
    income: string                           //总收入
    order_num: number                        //订单数
    order_uv: number                         //下单UV
    pv: number                               //PV
    real_income: string                      //实际收入
    uv: number                               //UV
    stat_time?:string
}

interface pageDataM {
    time: any
    channelName: string
    totalNum: number                         //数据条数 
    pageSize: number                         //分页条数
    page: number                             //当前页数
    currentPage: number                      //当前激活页
    courseList:statM[]
}

interface formDataM {
    isEditor: boolean
    channelStat: statM
    totalStat: statM
}

@Component
export default class Home extends mixins(Mixin) {
    constructor() {
        super()
        this.init()
    }

    newCourse() {
        this.$router.push('newCourse')
    }

    private formData: formDataM = {
        isEditor: false,
        channelStat: {
            income: '0',
            order_num: 0,
            order_uv: 0,
            pv: 0,
            real_income: '0',
            uv: 0,
        },
        totalStat: {
            income: '0',
            order_num: 0,
            order_uv: 0,
            pv: 0,
            real_income: '0',
            uv: 0,
        }
    }
    private pageData: pageDataM = {
        channelName: '',
        totalNum: 0,
        pageSize: 20,
        page: 1,
        currentPage: 1,
        time: [],
        courseList:[]
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
    private init = () => {
        this.getChannelStat()
        this.getTotalStat()
    }
    /**
     * @description 获取渠道统计
     * @return {void}
     */
    private getChannelStat = () => {
        let me = this,start = null,end = null
        if(me.pageData.time && me.pageData.time.length != 0){
            start = getZeroTime(new Date(me.pageData.time[0]))
            end = getFullTime(new Date(me.pageData.time[1]))
        }
        AdminInt.getChannelStat({
            channel_name: me.pageData.channelName,
            start,
            end,
            page:me.pageData.currentPage
        }, res => {
            let totalData = res.data.totalData
            let listData = res.data.listData.list
            totalData.income = (totalData.income / 100 ).toFixed(2)
            totalData.real_income = (totalData.real_income / 100).toFixed(2)
            me.formData.channelStat = totalData

            listData.forEach(ele => {
                ele.income = (ele.income / 100 ).toFixed(2)
                ele.real_income = (ele.real_income / 100).toFixed(2)
                ele.stat_time = formatDayTime(new Date(ele.stat_time))
            });
            me.pageData.courseList = listData
            me.pageData.totalNum = res.data.listData.totalNum
        })
    }
    /**
     * @description 获取统计信息
     * @return {void}
     */
    private getTotalStat = () => {
        AdminInt.getTotalStat({}, res => {
            res.data.income = (res.data.income / 100 ).toFixed(2)
            this.formData.totalStat = res.data
        })
    }

    /**
     * 选择分页
     * @return {void}
     */
    private handleCurrentChange = val => {
        this.pageData.currentPage = Number(val)
        this.getChannelStat()
    }
    
    /**
     * @description 搜索
     * @return {void}
     */
    private search(){
        this.getChannelStat()
    }

    refreshCache () {
        AdminInt.refreshCache(res => {
            if (res.status === 200)
                this.$message.success('刷新成功')
            else this.$message.warning('刷新太频繁了，请1分钟后再试')
        })
    }
}