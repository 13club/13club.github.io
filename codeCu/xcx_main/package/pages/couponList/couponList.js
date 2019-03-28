"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
/// <reference path="../../../wxAPI.d.ts"/>
const util_1 = require("./../../../utils/util");
const api_1 = require("./../../../utils/api");
const storge_1 = require("./../../../utils/storge");

const start = {}
const end = {}
const app = getApp()

let tabCouponsCache = {}   //用于缓存 每个tab 中每列课程数据源
let tabCollapsingObj = {}  //用于缓存 每个tab 中每列 展示缩放按钮

Page({
    data: {
        couponList: [],
        selectTabId: 0,
        tabs: [{
            name: '待使用'
        }, {
            name: '已使用'
        }, {
            name: '已过期'
        }],
        active: 0,
        collapsing: true,
        collapsingObj: {},
        imageUrl: 'http://fengsheng-image.oss-cn-shenzhen.aliyuncs.com/sys/expired.png',
        imageUrl2: 'http://fengsheng-image.oss-cn-shenzhen.aliyuncs.com/sys/used.png',
    },
    onLoad() {
        tabCouponsCache = []

        if (!app.globalData.userInfo || !wx.getStorageSync(storge_1.TOKEN)) {
            util_1.loginValidataion(app, () => {
                this.getCoupons()
            }, () => util_1.router(getCurrentPages(), '/package/pages/auth/auth'))
        } else {
            this.getCoupons()
        }
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        let logData = {
            event: 600
        }
        api_1.vLog(logData);
        return {
            title: '丰盛微课',
            path: util_1.getSharePath('index'),
            imageUrl: '../../../static/img/share.png',
        };
    },
    getCoupons: function (type = 0) {
        // api_1.mycoupons().then(res => {
        //     if (res.data.record) {
        //         const newList = []
        //         res.data.record.forEach(ele => {
        //             ele.endTime = util_1.formatDayTime(new Date(ele.endTime));
        //             /** 转化需要的字段 end */
        //             newList.push(ele);
        //         });
        //         this.setData({ couponList: newList });
        //     }
        // });

        if (tabCouponsCache[type]) {
            this.setData({
                couponList: tabCouponsCache[type],
                collapsingObj: tabCollapsingObj[this.data.active],
            });
            return
        }

        api_1.mycoupons({
            type: Number(type)
        }).then(res => {
            const records = res.data.record || []
            records.forEach(r => r.collapsing = true)

            //过滤时间格式
            records.map((e) => {
                if (e.endTime) {
                    return e.endTime = util_1.formatDayTime(new Date(e.endTime));
                }
                if (e.fee) {
                    return e.fee = (e.fee / 100).toFixed(2);
                }
            })

            records.map((e) => {
                if (e.fee) {
                    return e.fee = (e.fee / 100).toFixed(2);
                }
            })

            //控制每列 展示-缩放按钮
            let arr = [];
            records.forEach((r) => {
                if (r.collapsing) {
                    arr.push(r.collapsing);
                }
            })
            //用于缓存 每个tab 中每列 展示缩放按钮
            tabCollapsingObj[this.data.active] = arr;

            this.setData({
                couponList: records,
                collapsingObj: tabCollapsingObj[this.data.active],
            });
            // list = records
            tabCouponsCache[type] = records
        })
    },
    /**
     * @description 进入课程详情页
     * @param {Event} e
     * @return {void}
     */
    goIndex: function () {
        util_1.router(getCurrentPages(), '/pages/index/index')
    },
    // 展开隐藏按钮（默认内容）
    openCouponDesc: function () {
        let flag = !this.data.collapsing;
        this.setData({
            collapsing: flag
        })
    },
    // 展开隐藏按钮
    openCouponDescList(event) {
        let index = event.currentTarget.dataset.index;
        let item = event.currentTarget.dataset.couponStatus;

        let flag = !item;
        this.data.collapsingObj[index] = flag;
        this.setData({
            collapsingObj: this.data.collapsingObj,
        })
    },
    //去使用卷 --跳到首页
    goUserCoupon(){
        util_1.router(getCurrentPages(), '/pages/index/index')
    },
    //监听左右滑动
    touchstart(e) {
        start.x = e.changedTouches[0].pageX
        start.y = e.changedTouches[0].pageY
    },
    touchend(e) {
        end.x = e.changedTouches[0].pageX
        end.y = e.changedTouches[0].pageY

        const X = end.x - start.x
        const Y = end.y - start.y

        const r = Math.atan2(Y, X) * 180 / Math.PI
        if ((r >= 155 && r <= 180) || (r >= -180 && r < -160)) {
            if (this.data.selectTabId < this.data.tabs.length - 1) {
                this.setData({
                    selectTabId: Number(this.data.selectTabId) + 1
                })
                this.preTabChangeCourse(this.data.selectTabId);
            }
        } else if (r >= -35 && r <= 35 && r !== 0) {
            if (this.data.selectTabId > 0) {
                this.setData({
                    selectTabId: Number(this.data.selectTabId) - 1
                })
                this.preTabChangeCourse(this.data.selectTabId);
            }
        }
    },
    //切换tab导航栏
    tabChange(e) {
        const selectTabId = e.detail.key
        this.data.active = selectTabId;
        this.setData({
            selectTabId: selectTabId,
            active: this.data.active
        })
        this.getCoupons(selectTabId);
    },
    preTabChangeCourse(selectTabId) {
        this.data.active = selectTabId;
        this.setData({
            active: this.data.active
        })
        this.getCoupons(selectTabId);
    }
});