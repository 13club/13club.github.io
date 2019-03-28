"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
/// <reference path="../../../wxAPI.d.ts"/>
const util_1 = require("./../../../utils/util")
const api_1 = require("./../../../utils/api")
const storge_1 = require("./../../../utils/storge")
const wxparse = require("./../../../utils/wxParse/wxParse.js");

const start = {}
const end = {}
const app = getApp()
let coupons = undefined // 我的优惠券

const infoConfig = {
    playModal: [{
        showModal: true,
        title: '提醒',
        content: '当前内容还未上线，敬请期待!',
        showCancel: false,
        confirm: '',
        cancel: ''
    }, {
        showModal: false,
        title: '',
        content: '',
    }, {
        showModal: true,
        title: '提醒',
        content: '请先购买，当前项目为付费内容!',
        confirmText: '购买',
        cancelText: '取消',
        confirm: 'pay',
        cancel: ''
    }]
};
let infoData = {
    tutor: {},
    showBenefit: false,
    // curPlayChapterIndex: 0, //当前播放章节索引
    curPlayChapterIndex: -1, //当前播放章节索引
    showPacket: false, // 是否显示红包弹窗
    showCommonSendCoupon: false, // 是否显示通用发券弹窗
    vlogplaying: false,
    vlogplayingPause: false,
    id: 0,
    playStatus: 1,
    playId: 0,
    pauseId: 0,
    canScroll: false,
    showControls: false,
    sliderVal: 0,
    isGrag: false,
    changing: false,
    mediaName: '',
    audioTime: {
        currentTime: '00:00',
        duration: '00:00',
        second: 0
    },
    tab: 'decs',
    isOrdered: 0,
    tinfo: {
        headImgUrl: '',
        intro: '',
        introImg: '',
        tags: '',
        tid: 0,
        tname: ''
    },
    infoImg: [],
    chapters: [],
    currentCoupon: {}, // 当前使用的优惠券
    couponData: {
        totalMoney: '0',
        couponMoney: '0',
        desc: '0',
        endtime: '0',
        hasGotCoupon: false,
        granting: false
    },
    jumpCouse: {
        '1128': 1000,
        '1129': 1075,
        '1175': 1157,
        '1169': 1100,
        '1170': 1076
    },
    jumpCouse1: {
        '1145': {
            '9': 1000,
            '18': 1075,
            '26': 1108,
            '36': 1043,
            '40': 1100,
            '46': 1122
        }
    },
    blacklist: [1157, 1128, 1130, 1129, 1132, 1136, 1158, 1154, 1159, 1169, 1160, 1170, 1172, 1175, 1187, 1106, 1119],
    systemInfo: {},
    isShowPayBtn: true, //ios购买按钮置灰
    newDetails:''
};
Page({
    data: infoData,
    infoConfig,
    onLoad(options) {
        if (!app.globalData.userInfo || !wx.getStorageSync(storge_1.TOKEN)) {
            util_1.loginValidataion(app, () => {
                this.init(options)
            }, () => util_1.router(getCurrentPages(), '/package/pages/auth/auth'))
        } else {
            this.init(options)
        }
    },
    init(options) {
        const params = util_1.getParams(options);
        this.setData({
            id: params.cid
        });

        if (params.actId)
            this.checkValidAct(3, params.actId) // 直接发券

        this.findCourse()

        let logData = {
            event: 200,
            cid: params.cid
        }
        api_1.vLog(logData);

        this.getSystemInfo();

    },
    //判断客户端类型
    getSystemInfo() {
        wx.getSystemInfo({
            success: (res) => {

                if (res.platform == "ios") {
                    this.setData({
                        systemInfo: res,
                        isShowPayBtn: false,
                    })
                } else {
                    this.setData({
                        systemInfo: res,
                        isShowPayBtn: true,
                    })
                }
            }
        })
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
            title: this.data.course.title,
            path: util_1.getSharePath('info', {
                cid: this.data.id
            })
        }
    },
    /**
     * @description 获取所有可用优惠券
     * @return {void}
     */
    findCoupon: function () {
        return api_1.mycoupons().then(res => {
            coupons = res.data.record || []
        });
    },
    /**
     * 进来时检查是否有直接发券活动
     * grantType 发券类型   1：每天发券  2：购买后发券  3：直接发券
     */
    checkValidAct: function (grantType, actId = null) {
        actId = actId ? Number(actId) : ''
        api_1.checkValidAct({
            activity_type: grantType,
            activity_id: actId
        }).then(res => {
            if (res.data) {
                if (grantType === 2)
                    this.getCoupon(res.data.actId, grantType);
                else {
                    // 显示红包弹窗
                    this.setData({
                        couponData: {
                            actId,
                            grantType
                        },
                        showPacket: true
                    })
                }
            }
        })

    },
    openPacket: function (e) {
        const p = e.currentTarget.dataset
        this.getCoupon(Number(p.actId), Number(p.grantType))
    },
    /**
     * 领取优惠券
     */
    getCoupon: function (actId, grantType) {
        api_1.grantCoupon({
            activity_id: Number(actId)
        }).then(res => {
            let obj = res.data || {};
            if (!obj.couponCode) {
                return;
            }
            this.setData({
                couponData: {
                    desc: obj.title,
                    endtime: util_1.formatDayTime(new Date(obj.endTime)),
                    granting: false,
                    actId,
                    couponMoney: obj.fee / 100
                }
            })

            if (grantType === 2) {
                // 显示通用发券弹窗
                this.setData({
                    showCommonSendCoupon: true
                })
            } else {
                // 关闭红包弹窗 显示通用发券弹窗
                this.setData({
                    showPacket: false,
                    showCommonSendCoupon: true
                })
            }

            coupons = undefined // 重置优惠券
        }).catch(() => {
            this.setData({
                showPacket: false
            })
            wx.showToast({
                icon: 'none',
                title: '优惠券已发完，请下次赶早哦'
            })
        });
    },
    /**
     * @description 获取所有课程
     * @return {void}
     */
    findCourse: function () {
        api_1.findCourseById(Number(this.data.id)).then(res => {
            let course = res.data.course;
            let tutor = res.data.tutor;
            let chapters = res.data.chapters;
            let isOrdered = res.data.isOrdered;
            let infoImg = JSON.parse(course.introImg);
            /** 转化需要的字段 start */
            course.price = (course.price / 100).toFixed(2);
            /** 转化需要的字段 end */

            let newDetails = res.data.course.intro;
            this.setData({
                course,
                tutor,
                chapters,
                infoImg,
                isOrdered,
                newDetails,
            });

            if (!course.isOrdered) {
                this.findCoupon()
            }
            this.initialControl()

            var that = this;
            wxparse.wxParse('newDetailsNodes', 'html', newDetails, that, 5)

        });
    },
    initialControl() {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        
        if (backgroundAudioManager.src && !backgroundAudioManager.paused) {
            const course = this.data.course
            const courseTitle = backgroundAudioManager.epname
            if (courseTitle === course.title) {
                const chapters = this.data.chapters
                const playingChapterTitle = backgroundAudioManager.title

                // const curPlayChapterIndex = chapters.findIndex(chapter => chapter.title === playingChapterTitle)
                const curPlayChapterIndex = 0

                const curPlayChapterId = chapters[curPlayChapterIndex].chId
                this.initialGlobalBackgroundAudio(curPlayChapterId)
                this.setData({
                    mediaName: courseTitle,
                    showControls: true,
                    curPlayChapterIndex,
                    playId: curPlayChapterId,
                    pauseId: curPlayChapterId,
                    playStatus: 3, //音频
                    tab: 'catalog',
                    mediaSrc: backgroundAudioManager.src
                })
            }
        }
    },
    /**
     * @description 重新获取课程列表
     * @return {void}
     */
    getChapters: function () {
        let me = this;
        api_1.queryChapters({
            pageno: 1,
            pagesize: 100,
            cid: this.data.id
        }).then(res => {
            let chapters = res.data.record;
            me.setData({
                chapters
            });
        });
    },
    /**
     * @description 详情页切换导航
     * @param {Event} e
     * @return {void}
     */
    changeNav: function (e) {
        let canScroll = false,
            showControls = this.data.showControls
        let tab = e.currentTarget.dataset.tab;
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        if (tab == 'catalog') {
            canScroll = true
            // 如果存在背景音频 并且 播放的是当前课程的章节 并且 是播放或暂停状态
            if (typeof backgroundAudioManager.paused === 'boolean' && this.data.pauseId) {
                showControls = true
            }
        } else {
            showControls = false
        }
        this.setData({
            tab,
            canScroll,
            showControls
        })
    },
    //左右滑动
    touchstart (e) {
        start.x = e.changedTouches[0].pageX
        start.y = e.changedTouches[0].pageY
    },
    touchend (e) {
        end.x = e.changedTouches[0].pageX
        end.y = e.changedTouches[0].pageY
        
        const X = end.x - start.x
        const Y = end.y - start.y

        const r = Math.atan2(Y, X) * 180 / Math.PI
        if ((r >= 155 && r <= 180) || (r >= -180 && r < -160)) {
            this.setData({
                tab: 'decs'
            })
        } else if (r >= -35 && r <= 35 && r !== 0) {
            this.setData({
                tab: 'catalog'
            })
        }
    },
    //左右滑动 end
    /**
     * @description 播放音视频
     * @param {Event} e
     * @return {void}
     */
    targetMedia: function (e, index) {
        let mediaSrc, showControls = false,
            sliderVal, mediaName, st, //是否可以播放
            playStatus = 2,
            me = this,
            cid = 0,
            cidMap = {},
            id = index != undefined ? this.data.chapters[index].chId : this.data.chapters[e.currentTarget.dataset.index].chId,
            chapters = me.data.chapters,
            reg = new RegExp(/\.CD|\.OGG|\.MP3|\.ASF|\.WMA|\.WAV|\.MP3PRO|\.RM|\.REAL|\.APE|\.MODULE|\.MIDI|\.VQF/i);

        this.setData({
            curPlayChapterIndex: index != undefined ? index : e.currentTarget.dataset.index
        })

        if (id == me.data.playId) {
            this.mediaPause(id)
            if (reg.test(this.data.mediaSrc)) {
                wx.getBackgroundAudioManager().pause()
            } else {
                this.MediaContext.pause()
            }
        } else if (id == me.data.pauseId) {
            this.mediaPlay(id)
            if (reg.test(this.data.mediaSrc)) wx.getBackgroundAudioManager().play()
            else this.MediaContext.play()
        } else {
            //根据id筛选出对应的媒体音视频
            chapters.forEach((ele, index) => {
                if (ele.chId == id) {
                    st = me.canPlay(ele);

                    if (st == 0) {
                        /**todo begin */
                        if (cidMap = me.data.jumpCouse1[me.data.id]) {
                            if (cid = cidMap[index]) {
                                util_1.router(getCurrentPages(), `/package/pages/info/info?cid=${cid}`)
                                return;
                            }
                        }
                        if (cid = me.data.jumpCouse[id]) {
                            util_1.router(getCurrentPages(), `/package/pages/info/info?cid=${cid}`)
                            return;
                        }
                        /**todo end */
                    }
                    if (me.showModal(st)) {
                        return;
                    }
                    sliderVal = 0
                    mediaName = ele.title
                    mediaSrc = ele.content

                    if (reg.test(mediaSrc)) {
                        playStatus = 3
                        this.setData({
                            playStatus: 0,
                            audioTime: {
                                currentTime: '00:00',
                                duration: '00:00',
                                second: 0
                            },
                            changing: true
                        }); //切换音频时需要重新加载下才能完成播放
                        showControls = true
                    }
                    me.setData({
                        mediaSrc,
                        playStatus,
                        showControls,
                        mediaName,
                        sliderVal,
                        vlogplaying: false
                    })

                    let lastPlayTime = undefined
                    lastPlayTime = wx.getStorageSync(this.data.id + '_' + id)

                    if (playStatus == 3) {
                        const data = this.data

                        const backgroundAudioManager = wx.getBackgroundAudioManager()
                        backgroundAudioManager.title = data.chapters[data.curPlayChapterIndex].title;
                        backgroundAudioManager.epname = data.course.title;
                        backgroundAudioManager.singer = data.tutor.tname;
                        backgroundAudioManager.coverImgUrl = data.course.titleImg;
                        backgroundAudioManager.src = mediaSrc;
                        lastPlayTime && (backgroundAudioManager.startTime = lastPlayTime)
                        this.initialGlobalBackgroundAudio(id)

                    } else {

                        this.MediaContext = wx.createVideoContext('myVideo');
                        this.mediaPlay(id)
                        lastPlayTime && me.MediaContext.seek(lastPlayTime)

                    }
                    let logData = {
                        event: 500,
                        cid: this.data.id,
                        ch_id: id
                    }
                    api_1.vLog(logData);
                    return;
                }
            });
        }
    },
    initialGlobalBackgroundAudio(id) {
        const data = this.data
        const backgroundAudioManager = wx.getBackgroundAudioManager()

        backgroundAudioManager.onPlay(() => {
            const cur = backgroundAudioManager.currentTime
            const dur = backgroundAudioManager.duration
            this.setData({
                audioTime: {
                    sliderVal: Math.ceil(cur / dur * 100),
                    currentTime: util_1.formatSecond(Math.floor(cur)),
                    duration: util_1.formatSecond(Math.floor(dur)),
                    second: dur
                }
            })
            this.mediaPlay(id)
        })
        backgroundAudioManager.onPause(() => this.mediaPause(id))
        backgroundAudioManager.onTimeUpdate(() => this.audioTimeupdate(wx.getBackgroundAudioManager))
        backgroundAudioManager.onPrev(() => {
            if (data.curPlayChapterIndex === 0) {
                wx.showModal({
                    title: '提示',
                    content: '当前是第一节',
                    showCancel: false
                })
            } else this.targetMedia(null, data.curPlayChapterIndex - 1)
        })
        backgroundAudioManager.onNext(() => {
            if (data.curPlayChapterIndex === data.chapters.length - 1) {
                wx.showModal({
                    title: '提示',
                    content: '已经是最后一节',
                    showCancel: false
                })
            }
            this.targetMedia(null, data.curPlayChapterIndex + 1)
        })
        backgroundAudioManager.onEnded(() => {
            if (data.curPlayChapterIndex === data.chapters.length - 1) {
                wx.showModal({
                    title: '提示',
                    content: '已经是最后一节',
                    showCancel: false
                })
            }
            this.targetMedia(null, data.curPlayChapterIndex + 1)
        })
    },
    /**
     * @description 音视频主动播放事件
     * @return {void}
     */
    mediaPlay: function (id) {
        this.setData({
            pauseId: id,
            playId: id,
        });

        // if (!this.data.vlogplayingPause) {
        //     this.setData({
        //         vlogplaying: true
        //     })
        // }

        this.setData({
            vlogplayingPause: false,
            vlogplaying: true
        })
    },
    //video标签触发事件
    mediaPlay2: function () {
        //因为暂停的时候已经清除掉了playid = 0;但是暂停pauseid有保留当前playid ，所以进行复制；
        let id = this.data.pauseId;
        this.setData({
            playId: id,

            vlogplayingPause: false,
            vlogplaying: true
        });
    },
    /**
     * @description 音视频主动暂停事件
     * @return {void}
     */
    mediaPause: function (id) {
        this.setData({
            playId: 0,
            pauseId: id,
            vlogplayingPause: true,
            vlogplaying: false,
        });
    },
    //video标签触发事件
    mediaPause2: function () {
        this.setData({
            playId: 0,

            vlogplayingPause: true,
            vlogplaying: false,
        });
    },
    // 控制条音频播放
    playAudio() {
        // console.log(this.data.pauseId)
        wx.getBackgroundAudioManager().play()
        
        this.mediaPlay(this.data.pauseId)
    },
    // 控制条音频暂停
    pauseAudio() {
        // console.log(this.data.playId)
        wx.getBackgroundAudioManager().pause()
    
        this.mediaPause(this.data.playId)
    },
    /**
     * @description 手动播放媒体
     * @return {void}
     */
    play: function () {
        this.MediaContext.play();
    },
    /**
     * @description 手动暂停媒体
     * @return {void}
     */
    pause: function () {
        this.MediaContext.pause();
    },
    /**
     * @description 校验当前媒体是否可以播放
     * @param {Object} course
     * @return {Number} st  //0:还未上线，不可播放  1：试听或者已经付款，可以播放  2：未付款切不是视听内容，不可播放
     */
    canPlay: function (course) {
        let me = this,
            st, chapters = me.data.chapters,
            isOrdered = me.data.isOrdered;
        let price = me.data.course.price;
        if (course.status == 0) {
            st = 0;
        } else if (course.isFree) {
            st = 1;
        } else if (+price == 0) {
            st = 1;
        } else if (isOrdered) {
            st = 1;
        } else if (!isOrdered) {
            st = 2;
        }
        /** todo */
        return st;
        // return 1
    },
    /**
     * @description 检查播放时是否弹窗提示
     * @param {Number} st 当前是否可以播放状态 0,1,2
     * @return {Boolean}
     */
    showModal: function (st) {
        let me = this,
            con = me.infoConfig.playModal[st];
        if (con.showModal) {
            con = util_1.setModalCall(me, con);
            wx.showModal(con);
        }
        return con.showModal;
    },
    /**
     * @description 视频播放进度
     * @param {Event} e
     */
    videoTimeupdate: function (e) {
        let cur = e.detail.currentTime
        let dur = e.detail.duration

        wx.setStorageSync(this.data.id + '_' + this.data.chapters[this.data.curPlayChapterIndex].chId, cur)

        if (!this.data.vlogplaying && cur >= (dur * 0.8)) {
            this.setData({
                vlogplaying: true
            })
            let logData = {
                event: 502,
                cid: this.data.course.cid,
                ch_id: this.data.pauseId
            };
            api_1.vLog(logData);
            api_1.courseFinish({
                cid: this.data.course.cid,
                ch_id: this.data.pauseId,
                duration: Math.floor(dur)
            })
        }
    },
    /**
     * @description 音频播放进度
     * @param {Event} e
     * @return {void}
     */
    audioTimeupdate: function (backgroundAudioManager) {
        const audio = backgroundAudioManager()

        let cur = audio.currentTime;
        let dur = audio.duration;
        let currentTime = util_1.formatSecond(Math.floor(cur))
        let duration = util_1.formatSecond(Math.floor(dur))
        wx.setStorageSync(this.data.id + '_' + this.data.chapters[this.data.curPlayChapterIndex].chId, cur)

        if (!this.data.vlogplaying && cur >= (dur * 0.8)) {
            this.setData({
                vlogplaying: true
            })
            let logData = {
                event: 502,
                cid: this.data.course.cid,
                ch_id: this.data.pauseId
            }
            api_1.vLog(logData);
            api_1.courseFinish({
                cid: this.data.course.cid,
                ch_id: this.data.pauseId,
                duration: Math.floor(dur)
            })
        }

        if (this.data.changing) {
            this.setData({
                changing: false
            });
            return;
        }
        if (this.data.isGrag) {
            this.setData({
                audioTime: {
                    currentTime,
                    duration,
                    second: dur
                }
            });
        } else {
            let sliderVal = Math.ceil(cur / dur * 100);
            this.setData({
                audioTime: {
                    currentTime,
                    duration,
                    second: dur
                },
                sliderVal
            });
        }
    },
    /**
     * // 设置一张可用的优惠券 如果有的话
     * @return {void}
     */
    checkCoupon: function () {
        let coup = {
            fee: "",
            id: 0,
            endTime: 0,
            lastFee: ""
        }
        if (!coupons || coupons.length == 0) {
            return
        }

        const cid = Number(this.data.id)

        if (cid === 1197) {
            const cps = coupons.find(coupon => coupon.couponId === 1032)
            if (cps) {
                coup.fee = (cps.fee / 100).toFixed(2)
                coup.endTime = cps.endTime
                coup.id = cps.couponId
                let lastPri = this.course.price / 100 - cps.fee / 100
                coup.lastFee = (lastPri <= 0 ? 0 : lastPri).toFixed(2)
                this.coup = coup;
                return
            }
        } else {
            coupons = coupons.filter(coupon => coupon.couponId !== 1032)
        }

        if (!coupons || coupons.length == 0) {
            return
        }

        coupons.sort((a, b) => {
            return b.fee - a.fee
        })
        coup.fee = coupons[0].fee;
        coup.endTime = coupons[0].endTime
        coupons = coupons.filter(
            ele => ele.fee >= coup.fee && ele.endTime <= coup.endTime
        )
        coupons.sort((a, b) => {
            return a.endTime - b.endTime
        })

        coup.fee = (coupons[0].fee / 100).toFixed(2)
        coup.endTime = coupons[0].endTime
        coup.id = coupons[0].couponId
        let lastPri = this.data.course.price - coupons[0].fee / 100
        coup.lastFee = (lastPri <= 0 ? 0 : lastPri).toFixed(2)

        this.setData({
            currentCoupon: coup
        })
    },
    // 关闭通用弹窗
    closeCommonCoupon: function (e) {
        this.setData({
            showCommonSendCoupon: false
        })
    },
    // 关闭红包领取界面
    closePacket: function () {
        this.setData({
            showPacket: false
        })
    },

    /**
     * @description 下单
     * @return {void}
     */
    pay: function () {

        if (this.data.systemInfo.platform == "ios") {
            wx.showToast({
                icon: 'none',
                title: '苹果手机暂不支持小程序购买'
            })
            return
        }

        const me = this
        let showBenefit = this.data.showBenefit;
        let flag = this.data.blacklist.indexOf(this.data.id) == -1;
        if (coupons.length > 0 && !showBenefit && flag && Number(this.data.course.price) >= 40) {
            this.checkCoupon();
            if (this.data.currentCoupon && this.data.currentCoupon.fee) {
                this.setData({
                    showBenefit: true
                });
                return;
            }
        }
        api_1.createOrder({
            cid: Number(me.data.id),
            coupon_id: this.data.currentCoupon.id
        }).then(res => {
            if (res.errorCode !== 1) {
                wx.showToast({
                    icon: 'none',
                    title: '创建订单失败'
                })
                return
            }
            let obj = res.data;
            let timeStamp = obj.timeStamp;
            let nonceStr = obj.nonceStr;
            let packageStr = obj.packageStr;
            let signType = obj.signType;
            let paySign = obj.paySign;
            // if (me.data.currentCoupon.lastFee == 0 && coupons.length > 0) {
            //     me.getChapters();
            //     me.setData({ isOrdered: true, showBenefit: false });
            //     return;
            // }
            wx.requestPayment({
                timeStamp,
                nonceStr,
                package: packageStr,
                signType,
                paySign,
                success: function (res) {
                    me.checkValidAct(2); // 购买后发券
                    me.getChapters();
                    me.setData({
                        isOrdered: true,
                        showBenefit: false
                    });
                    let logData = {
                        event: 700,
                        cid: me.data.id
                    }
                    api_1.vLog(logData);
                },
                fail: function (res) {
                    me.getChapters();
                    me.setData({
                        showBenefit: false
                    });
                }
            });
        });
    },
    toggleAudio() {
        let playId = this.data.playId
        let pauseId = this.data.pauseId
        if (!playId && pauseId) {
            this.playAudio()
        } else {
            this.setData({
                tab: 'catalog',
                canScroll: true
            });
            this.targetMedia(null, 0);
        }

    },
    /**
     * @description 开始学习
     * @return {void}
     */
    gotoStudy: function () {
        let playId = this.data.playId
        let pauseId = this.data.pauseId
        if (playId || pauseId) {
            return;
        } else {
            this.setData({
                tab: 'catalog',
                canScroll: true
            });
            this.targetMedia(null, 0);
        }
    },
    /**
     * @description 关闭音频控制组控件
     * @return {void}
     */
    close: function () {
        this.setData({
            showControls: false
        });
    },
    /**
     * @description 控制组滑块滑动完成事件
     * @param {Event} e
     * @return {void}
     */
    sliderChange: function (e) {
        let val = e.detail.value;
        let dur = this.data.audioTime.second;
        wx.getBackgroundAudioManager().seek(val / 100 * dur);
        
        this.setData({
            isGrag: false
        });
    },
    /**
     * @description 控制组滑块正在滑动事件
     * @param {Event} e
     * @return {void}
     */
    sliderChanging: function () {
        let me = this;
        me.setData({
            isGrag: true
        });
    },
    /**
     * @description 回到小程序首页
     * @returns {void}
     */
    goIndex: function () {
        util_1.router(getCurrentPages(), '/pages/index/index')
    },
    /**
     * @description 播放完成
     * @return {void}
     */
    ended: function () {
        {}
        let logData = {
            event: 501,
            cid: this.data.id,
            ch_id: this.data.id
        }
        api_1.vLog(logData);
        if (this.data.curPlayChapterIndex === this.data.chapters.length - 1)
            wx.showToast({
                icon: 'none',
                title: '播放结束'
            })
        else
            this.targetMedia(null, this.data.curPlayChapterIndex + 1)
    },
    /**
     * @description 关闭优惠券选取界面
     * @return {void}
     */
    closeBenefit: function (e) {
        this.setData({
            showBenefit: false
        });
    },
    onHide: function () {
        // wx.showModal({'title': 'aaa'})
        this.MediaContext && this.MediaContext.pause()
    },
    onUnload: function () {
        this.MediaContext && this.MediaContext.pause()
    }
});