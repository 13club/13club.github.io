import { Loading, Message } from 'element-ui'
import url from '../store/modules/dataUrl'
import axios from "axios"
import { Upload } from './upload'
import { callback } from './common'

const all = url.state

/**
 * @description 上传文件
 * @param {Object} params
 * @param {Function} cb
 * @return {void}
 */
const upload = (file, cb) => {
    Upload.upload(all.upload, file, cb)
}

/**
 * @description 获取课程列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getCourseList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findall, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取所有课程分类
 * @param {function} cb
 * @return {Promise}
 */
const getCategory = (cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.category).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取课程来源列表
 * @param {function} cb
 * @return {Promise}
 */
const getProvider = (cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.provider).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 新建课程
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const addCourse = (data: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addCourse, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 修改课程
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const editorCourse = (data: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.updateCourse, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取课程详情
 * @param {Object} params 
 * @param {Function} cb 
 * @return {Promise}
 */
const courseDetail = (params: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取推广管理列表
 * @param {Object} params 
 * @param {Function} cb 
 * @return {Promise}
 */
const getSpreadList = (params: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getChannel, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加推广
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const addSpread = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addchannel, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 编辑推广
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const editSpread = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.editchannel, data).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 删除课程章节
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const deleteChapter = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.deleteChapter, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取banner列表
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getBannerList = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.bannerFindall, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取banner列表
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const updateBanner = (data: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.bannerUpdate, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取渠道统计
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getChannelStat = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getChannelStat, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取统计信息
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getTotalStat = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getTotalStat, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取统计信息
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getOrderList = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getOrderList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 导出订单excel
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const exportExcel = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.exportExcel, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取模板列表
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getMsgList = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getMsgList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取模板详情
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getMsgInfo = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getMsgInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取模板详情
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getKfMsgInfo = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getKfMsgInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * 删除客服消息
 * @param param 
 * @param cb 
 */
const delKfMsg = (params: any, cb?: Function) : any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.delKfMsgInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加模板
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const addTemplate = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addTemplate, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        loadingInstance.close()
    })
}

/**
 * 删除模板
 * @param params 
 * @param cb 
 */
const delTemplate = (params: any, cb? : Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.delTemplate, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 修改模板
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const editTemplate = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.editTemplate, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 测试openid
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const sendmsg = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.sendmsg, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 全员推送测试
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const sendallmsg = (params: any, cb?: Function) : any=> {
    // let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.sendallmsg, { params: params, timeout: 20000 }).then(response => {
        cb(response.data)
        // loadingInstance.close()
    }, response => {
        cb({status:-1})
        console.log('errorCallback: ', response)
        // loadingInstance.close()
    })
}

/**
 * @description 全员推送测试
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const totalmsgnum = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.totalmsgnum, { params: params }).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取优惠活动列表
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const getactList = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getactList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取优惠券列表
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const getCouponList = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getCouponList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description  修改优惠活动
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const editoract = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.editoract, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 修改优惠活动
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const editorcoupon = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.editorcoupon, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取活动可用优惠券
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getCouponTitle = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getCouponTitle, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const addActList = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addActList, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取活动可用优惠券
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getActivityInfo = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getActivityInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const addCoupon = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addCoupon, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取活动可用优惠券
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getCouponInfo = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getCouponInfo, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const appendGrantNum = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.appendGrantNum, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const appendUseTime = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.appendUseTime, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取模板消息用途列表
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getSocpe = (cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getSocpe).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取客服模板列表
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const getKfMsgList = (params: any, cb?: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.getKfMsgList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加客服模板
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const addKfTemplate = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addKfTemplate, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 编辑客服模板
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const editKfTemplate = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.editKfTemplate, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const addBreadCouse = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.addBreadCouse, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}



/**
 * @description 测试openid
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const sendkfmsg = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.sendkfmsg, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const sendkfmsgAll = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.sendkfmsgAll, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}


/**
 * @description 添加优惠活动
 * @param {Object} data 
 * @param {Function} cb 
 * @return {Promise}
 */
const sendmsgList = (data: any, cb: Function): any => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.sendmsgList, data).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}


/**
 * @description 全员推送测试
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const totalkfmsgnum = (params: any, cb?: Function) : any=> {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.totalkfmsgnum, { params: params }).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 全员推送测试
 * @param {Object} data
 * @param {Function} cb
 * @return {Promise}
 */
const sendallkfmsg = (params: any, cb?: Function) : any=> {
    // let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.sendallkfmsg, { params: params }).then(response => {
        cb(response.data)
        // loadingInstance.close()
    }, response => {
        cb({status:-1})
        console.log('errorCallback: ', response)
        // loadingInstance.close()
    })
}

/**
 * @description 获取LTV列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getLTVList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.ltvGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取留存列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getLsList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.retainGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取数据明细列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getAccessList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.accessGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取推广数据列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getChannelList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.channelGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取课程数据列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getCourseDataList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.courseDataGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取新老访客列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getVisitorList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.visitorGet, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 获取系统用户列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getManagerUsersList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.managerUsersList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 获取系统角色列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const getManagerRolesList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.managerRolesList, { params: params }).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 创建系统用户
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const createManageUser = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.createManageUser, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 删除系统用户
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const deleteManagerUser = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.deleteManageUser, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 修改系统用户密码
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const changeManageUserPwd = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.changeManageUserPwd, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 重置系统用户密码
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const resetManageUserPwd = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.resetManageUserPwd, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 新建/编辑课程分组
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const saveOrUpdateCourseGroups = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.saveOrUpdateCourseGroups, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * @description 查询所有课程分组
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findAllCourseGroup = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findAllCourseGroup, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 查询课程分组详情
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findGroupDetail = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findGroupDetail, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 设置课程分组顺序
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const groupSort = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.groupSort, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 设置课程顺序
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const courseSort = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.courseSort, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 设置课程分组上下架
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const setValid = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.setValid, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 删除课程分组
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const deleteGroup = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.deleteGroup, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 根据课程名称模糊查询课程
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findCourseByName = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findCourseByName, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 根据课程名称模糊查询课程-不分组
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findAllCourseByName = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findAllCourseByName, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 查询所有店铺列表
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findAllShop = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findAllShop, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 查询店铺活动图
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findActImage = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findActImage, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 保存店铺活动图
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const saveActImage = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.saveActImage, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 保存店铺
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const saveShop = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.saveShop, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * @description 查询店铺
 * @param {Object} params
 * @param {Function} cb
 * @return {Promise}
 */
const findShop = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.findShop, {params}).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
const refreshCache = (cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '缓存刷新中，大概需要15秒' })
    return axios.get(all.refreshCache).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
const shopGet = (cb: Function): Promise<any> => {
    return axios.get(all.shopGet).then(response => {
        cb(response.data)
    }, response => {
        console.log('errorCallback: ', response)
    })
}
const pushGet = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.pushGet, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * 保存或修改拼团活动
 * @param params 
 * @param cb 
 */
const groupSaveOrUpdate = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.groupSaveOrUpdate, params).then(response => {
        callback(response, cb)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * 保存或修改拼团活动
 * @param params 
 * @param cb 
 */
const groupInfo = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.grouInfo, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 拼团列表
 * @param params 
 * @param cb 
 */
const grouplist = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.grouplist, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * 拼团展示列表
 * @param params 
 * @param cb 
 */
const groupShowlist = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.groupShowlist, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 编辑拼团展示列表
 * @param params 
 * @param cb 
 */
const groupShowlistUpdate = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.groupShowlistUpdate, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 拼团活动列表
 * @param params 
 * @param cb 
 */
const groupOpengroupList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.groupOpengroupList, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 保存拼团banner
 * @param params 
 * @param cb 
 */
const bannerGroupEdit = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.bannerGroupEdit, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 手动成团
 * @param params 
 * @param cb 
 */
const groupOpengroupManual = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.groupOpengroupManual, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 拼团订单列表
 * @param params 
 * @param cb 
 */
const orderGroupGetall = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.orderGroupGetall, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 获取兑换活动订单列表
 * @param params 
 * @param cb 
 */
const orderExchangeList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.orderExchangeList, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 添加拼团退款
 * @param params 
 * @param cb 
 */
const refundGroupAdd = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.refundGroupAdd, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

/**
 * 发起拼团退款
 * @param params 
 * @param cb 
 */
const refundGroupApply = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.refundGroupApply, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 拼团退款列表
 * @param params 
 * @param cb 
 */
const refundGroupList = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.refundGroupList, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 退款查询
 * @param params 
 * @param cb 
 */
const refundQuery = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.refundQuery, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 新增兑换活动
 * @param params 
 * @param cb 
 */
const exchangeAdd = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.exchangeAdd, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 兑换活动追加最大兑换数
 * @param params 
 * @param cb 
 */
const exchangeAppendNum = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.exchangeAppendNum, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 兑换活动延长活动时间
 * @param params 
 * @param cb 
 */
const exchangeAppendTime = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.exchangeAppendTime, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 兑换活动列表
 * @param params 
 * @param cb 
 */
const exchangeFindall = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.exchangeFindall, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 兑换活动详情
 * @param params 
 * @param cb 
 */
const exchangeGetInfo = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.get(all.exchangeGetInfo, {params}).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 修改兑换活动状态
 * @param params 
 * @param cb 
 */
const exchangeEditStatus = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.exchangeEditStatus, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}
/**
 * 修改兑换活动
 * @param params 
 * @param cb 
 */
const exchangeEditInfo = (params: any, cb: Function): Promise<any> => {
    let loadingInstance = Loading.service({ text: '正在加载' })
    return axios.post(all.exchangeEditInfo, params).then(response => {
        cb(response.data)
        loadingInstance.close()
    }, response => {
        console.log('errorCallback: ', response)
        loadingInstance.close()
    })
}

export const AdminInt = {
    upload,
    getCourseList,
    getCategory,
    getProvider,
    addCourse,
    courseDetail,
    editorCourse,
    getSpreadList,
    addSpread,
    editSpread,
    deleteChapter,
    getBannerList,
    updateBanner,
    getChannelStat,
    getTotalStat,
    getOrderList,
    exportExcel,
    getMsgList,
    getMsgInfo,
    addTemplate,
    delTemplate,
    editTemplate,
    sendmsg,
    sendallmsg,
    totalmsgnum,
    getactList,
    getCouponList,
    editoract,
    editorcoupon,
    getCouponTitle,
    addActList,
    getActivityInfo,
    addCoupon,
    getCouponInfo,
    appendGrantNum,
    appendUseTime,
    getSocpe,
    getKfMsgList,
    getKfMsgInfo,
    delKfMsg,
    addKfTemplate,
    editKfTemplate,
    addBreadCouse,
    sendkfmsg,
    sendkfmsgAll,
    sendmsgList,
    totalkfmsgnum,
    sendallkfmsg,
    getLTVList,
    getLsList,
    getAccessList,
    getChannelList,
    getCourseDataList,
    getVisitorList,
    getManagerUsersList,
    getManagerRolesList,
    createManageUser,
    deleteManagerUser,
    changeManageUserPwd,
    resetManageUserPwd,
    saveOrUpdateCourseGroups,
    findAllCourseGroup,
    findGroupDetail,
    groupSort,
    courseSort,
    setValid,
    deleteGroup,
    findCourseByName,
    findAllCourseByName,
    findAllShop,
    findActImage,
    saveActImage,
    saveShop,
    findShop,
    refreshCache,
    shopGet,
    pushGet,
    grouplist,
    groupInfo,
    groupShowlist,
    groupSaveOrUpdate,
    groupOpengroupList,
    groupShowlistUpdate,
    bannerGroupEdit,
    groupOpengroupManual,
    orderGroupGetall,
    orderExchangeList,
    refundGroupList,
    refundGroupAdd,
    refundGroupApply,
    refundQuery,
    exchangeAdd,
    exchangeFindall,
    exchangeAppendTime,
    exchangeAppendNum,
    exchangeGetInfo,
    exchangeEditStatus,
    exchangeEditInfo
}