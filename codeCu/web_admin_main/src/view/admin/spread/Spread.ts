import Vue from 'Vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from "./../../../api/admin"
import { extend,formatTime } from '../../../api/common'



interface tableDataM {
  id: number                                 //数据ID
  channel_id: string                         //推广id
  channel_name: string                       //推广名称
  link: string                               //推广链接
  income: any                             //总收入
  real_income: any                        //实际收入
  order_num: number                          //订单总数
  ctime: string                              //创建时间
}

interface pageDataM {
  tableData: tableDataM[]
  channel: string                            //推广搜索
  channelId: number
  channelName: string                        //新建推广名称
  totalNum: number                           //数据条数 
  pageSize: number                           //分页条数
  page: number                               //当前页数
  currentPage: number                        //当前激活页
  centerDialogVisible: boolean                //是否显示新建推广窗口
  dialogEditShow: boolean                //是否显示编辑推广窗口
}

@Component
export default class Spread extends mixins(Mixin) {
  constructor() {
    super()
    this.init()
  }

  private pageData: pageDataM = {
    tableData: [],
    channel: '',
    channelId: undefined,
    channelName: '',
    totalNum: 0,
    pageSize: 20,
    page: 1,
    currentPage: 1,
    centerDialogVisible: false,
    dialogEditShow: false
  }

  /**
   * init
   * @return {void}
   */
  private init = (): void => {
    this.getSpreadList()
  }

  /**
   * 获取推广列表
   * @return {void}
   */
  private getSpreadList = (): void => {
    AdminInt.getSpreadList({
      q: this.pageData.channel,
      page: this.pageData.currentPage
    }, res => {
      this.pageData.tableData = extend([], res.data.list)
      this.pageData.tableData.forEach(ele=>{
        ele.income = ((ele.income||0)/100).toFixed(2)
        ele.real_income = ((ele.real_income||0)/100).toFixed(2)
        ele.ctime = formatTime(new Date(ele.ctime))
      })
      this.pageData.totalNum = res.data.totalNum
      this.pageData.page = res.data.page
      this.pageData.pageSize = res.data.pageSize
    })
  }

  /**
   * 添加推广
   * @return {void}
   */
  private addSpread = (): void => {
    AdminInt.addSpread({
      channel_name: this.pageData.channelName
    }, this.addCall)
  }

  editSpread(): void{
    AdminInt.editSpread({
      channel_id: this.pageData.channelId,
      channel_name: this.pageData.channelName
    }, this.editCall)
  }

  /**
   * 添加推广成功回调
   * @param {Object} res
   * @return {void}
   */
  private addCall(res): void {
    this.$message.success('添加成功')
    this.pageData.channelName = ''
    this.pageData.centerDialogVisible = false
    this.getSpreadList()
  }
  /**
   * 编辑推广成功回调
   * @param {Object} res
   * @return {void}
   */
  private editCall(res): void {
    if (res.status === -10009) {
      this.$message.warning('推广名称重复')
    } else {
      this.$message.success('修改成功')
      this.pageData.channelName = ''
      this.pageData.channelId = undefined
      this.pageData.dialogEditShow = false
      this.getSpreadList()
    }
  }

  /**
   * 搜索推广列表
   * @return {void}
   */
  private handlesearch = (): void => {
    this.pageData.currentPage = 1
    this.getSpreadList()
  }

  /**
   * 选择分页
   * @param {String} val
   * @return {void}
   */
  private handleCurrentChange = (val): void => {
    this.pageData.currentPage = Number(val)
    this.getSpreadList()
  }

  /**
   * 聚焦推广id输入框
   * @return {void}
   */
  private focusChannelId(): void {
    this.$nextTick(() => {
      let channelIdInput: any = this.$refs.channelIdInput
      channelIdInput.$refs.input.focus()
    })
  }

}