"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storge_1 = require("./storge");
const api = require("./api");
/**
 * @description 将小于十的数转为 0n
 * @param {Number} n
 * @return {String}
 */
function formatNumber(n) {
    let str = n.toString();
    return str[1] ? str : '0' + str;
}
/**
 * @description 将日期转为xxxx/xx/xx xx:xx:xx 格式
 * @param {Date} date
 * @return {String}
 */
function formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
exports.formatTime = formatTime;
/**
 * @description 将日期转为xxxx-xx-xx 格式
 * @param {Date} date
 * @return {String}
 */
function formatDayTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [year, month, day].map(formatNumber).join('-');
}
exports.formatDayTime = formatDayTime;
/**
 * @description 将秒数转为00:00格式
 * @param {Number} second
 * @return {String}
 */
function formatSecond(second) {
    let h = parseInt(second / 60 / 60 + '');
    let m = parseInt((second - h * 60 * 60) / 60 + '');
    let s = formatNumber(parseInt(second - m * 60 + ''));
    return h ? `${formatNumber(h)}:${formatNumber(m)}:${s}` : `${formatNumber(m)}:${s}`;
}
exports.formatSecond = formatSecond;
/**
 * @description 获取options中的参数
 * @param {Object} options
 * @return {Object}
 */
function getParams(options = {}) {
    let query = options.query, scene = decodeURIComponent(options.scene), arr = [], key, value;
    if (query) {
        for (let a in query) {
            options[a] = query[a];
        }
    }
    if (scene) {
        arr = scene.split(",");
        arr.forEach(item => {
            key = item.split(":")[0];
            value = item.split(":")[1];
            options[key] = value;
        });
    }
    return options;
}
exports.getParams = getParams;
/**
 * @description 调用微信接口
 * @param {Object} params
 * @return {Promise}
 */
function request(params) {
    let TOKEN = wx.getStorageSync(storge_1.TOKEN)
    if (!TOKEN && params.notToken !== true) {
        router([], '/package/pages/auth/auth')
        return
    }
    params.data = params.data || {}
    // params.data.shopid = 1003 //生产
    params.data.shopid = 1011  //测试
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        wx.request({
            url: params.url,
            data: params.data,
            header: {
                TOKEN,
                channel: wx.getStorageSync(storge_1.CHANNEL),
                ostype: storge_1.ostype,
                littleOsType: storge_1.littleOsType
            },
            method: params.method || 'GET',
            dataType: params.dataType || 'json',
            responseType: params.responseType || 'text',
            success: res => {
                resolve(res.data);
                wx.hideLoading();
            },
            fail: res => {
                reject(res);
                wx.hideLoading();
            }
        });
    });
}
exports.request = request;
/**
 * @description 设置微信API(showModal)中success方法的的执行回调
 * @param {Object} con
 * @return {Object} con
 */
function setModalCall(me, con = {}) {
    con.success = function (res) {
        if (res.confirm) {
            console.log('用户点击确定');
            if (con.confirm && typeof me[con.confirm] == 'function') {
                me[con.confirm]();
            }
            else {
                console.warn(`${con.confirm} is no a function`);
            }
        }
        else if (res.cancel) {
            console.log('用户点击取消');
            if (con.confirm && typeof me[con.cancel] == 'function') {
                me[con.cancel]();
            }
            else {
                console.warn(`${con.cancel} is no a function`);
            }
        }
    };
    return con;
}
exports.setModalCall = setModalCall;
let pathConfig = {
    index: '/pages/index/index',
    info: '/package/pages/info/info'
};
/**
 * @description 获取需要分享的链接
 * @param {String} page 需要分享的页面
 * @return {String}
 */
function getSharePath(page = 'index', params = {}) {
    let path, str = '', channel = wx.getStorageSync(storge_1.CHANNEL);
    if (params) {
        for (const key in params) {
            str += `&${key}=${params[key]}`;
        }
    }
    if (page && pathConfig[page]) {
        path = `${pathConfig[page]}?channel=${channel}${str}`;
    }
    else {
        path = `${pathConfig['index']}?channel=${channel}${str}`;
    }
    return path;
}
exports.getSharePath = getSharePath

/**
 * 
 * @param {*} app 小程序实例
 * @param {*} success 已经允许授权登录的回调
 * @param {*} fail 没有允许授权登录的回调
 */
export function loginValidataion(app, success, fail) {
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.login({
                success: data => {
                  let code = data.code;
                  wx.getUserInfo({
                    success: res => {
                        app.globalData.userInfo = res.userInfo
                        res.code = code;
                        api.miniLogin(res).then(res => {
                            wx.setStorageSync(storge_1.TOKEN, res.data.token)
                            success && success()
                        })
                    }
                  })
                }
            })
          } else {
            fail()
          }
        }
      })
}

export function router(pageStack, url) {
    let index // url 在 页面栈中的位置
    const len = pageStack.length // 当前页面栈长度
    const MAX_PAGESTACK_LEN = 10 // 最大页面栈长度
    for (let i = 0; i < len; i++) {
        if ('/' + pageStack[i].route === url) {
            index = i
            break
        }
    }

    // url不在栈中
    if (!index) {
        if (len < MAX_PAGESTACK_LEN) {
            wx.navigateTo({
                url
            })
        } else {
            wx.redirectTo({
                url
            })
        }
    } else {
        wx.navigateBack({
            delta: len - 1 - index
        });
    }
}
