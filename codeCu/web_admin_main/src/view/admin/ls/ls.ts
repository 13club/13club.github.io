import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from '../../../api/admin'

interface pageDataM{
  total: Number                         //数据条数 
  pageSize: Number                         //分页条数
  currentPage: Number                      //当前激活页
  time: Array<any>
  tableData: Array<any>
  shops: Array<object>
  shopId: number
}

@Component
export default class Ls extends mixins(Mixin) {
  constructor() {
      super()
      this.getList()
      this.shopGet()
  }
  
  private pageData :pageDataM= {
    shopId: -1,
    time: [],
    tableData: [],
    currentPage: 1,
    pageSize: 0,
    total: 0,
    shops: []
  }

  shopGet() {
    AdminInt.shopGet(res => {
        this.pageData.shops = res.data
    })
  }

  private getList = () => {
    
      this.pageData.tableData = []
      let start = null,end = null, time = this.pageData.time, self = this
      if(time && time.length != 0){
          start = +new Date(time[0])
          end = +new Date(time[1])
      }
      AdminInt.getLsList({
          shopid: this.pageData.shopId < 0 ? '' : this.pageData.shopId,
          start,
          end,
          page:self.pageData.currentPage,
      }, res => {
          if(res && res.data && res.status === 200) {
            self.pageData.total = res.data.totalNum
            self.pageData.pageSize = res.data.pageSize
            self.pageData.currentPage = res.data.page
            res.data.list.forEach(item => {
                self.pageData.tableData.push({
                    date: item.date,
                    usersTotalNum: item.usersTotalNum,
                    newUsersNum: item.newUsersNum,
                    activeUsersNum: item.activeUsersNum,
                    newFansNum: item.newFansNum,
                    fansCVR: item.fansCVR,
                    fansToUserNum: item.fansToUserNum,
                    retain_2: this.formatter(item.ratainInfoList, 'RETAIN_2'),
                    retain_3: this.formatter(item.ratainInfoList, 'RETAIN_3'),
                    retain_4: this.formatter(item.ratainInfoList, 'RETAIN_4'),
                    retain_5: this.formatter(item.ratainInfoList, 'RETAIN_5'),
                    retain_6: this.formatter(item.ratainInfoList, 'RETAIN_6'),
                    retain_7: this.formatter(item.ratainInfoList, 'RETAIN_7'),
                    retain_14: this.formatter(item.ratainInfoList, 'RETAIN_14'),
                    retain_30: this.formatter(item.ratainInfoList, 'RETAIN_30')
                })
            });
          }
      })
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

  private formatter = (retains, key) => {
    const retain = retains.filter(item => item.name === key)
    return retain[0] && retain[0].ratio || '0%'
  }

  private search = () => {
    this.pageData.currentPage = 1
    this.getList()
  }

  /**
   * @description 选择分页
   * @param {String} val
   * @return {void}
   */
  private handleCurrentChange = (val): void => {
    this.pageData.currentPage = Number(val)
    this.getList()
  }

}