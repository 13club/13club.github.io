import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Mixin from '../../../mixin'
import { AdminInt } from '../../../api/admin'

interface pageDataM{
    total: Number                         //数据条数 
    pageSize: Number                         //分页条数
    currentPage: Number                      //当前激活页
    time: Array<any>
    shopId: number
    tableData: Array<any>
    shops: Array<object>
}

@Component
export default class Ltv extends mixins(Mixin) {

    constructor() {
        super()
        this.getList()
        this.shopGet()
    }
    private pageData :pageDataM= {
        shopId: -1,
        shops: [],
        time: [],
        tableData: [],
        currentPage: 1,
        pageSize: 0,
        total: 0
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

    private formatter = (row, column, cellValue, index) => {
        const ltv = row.lvtInfoList.find(ltv => ltv.name === column.label)
        return ltv && `${ltv.ltvValue}(${ltv.fee})` || '--'
    }

    shopGet() {
        AdminInt.shopGet(res => {
            this.pageData.shops = res.data
        })
    }

    private getList = () =>{
        this.pageData.tableData = []
        let start = null,end = null, time = this.pageData.time, self = this
        if(time && time.length != 0){
            start = new Date(time[0]).getTime()
            end = new Date(time[1]).getTime()
        }

        AdminInt.getLTVList({
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
                        fansNum: item.fansNum,
                        usersNum: item.usersNum,
                        lvtInfoList: item.lvtInfoList
                    })
                });
            }
        })
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