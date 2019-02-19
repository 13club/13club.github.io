// import { adminRoutes } from './../router'
import { Message } from 'element-ui'
import { router } from './../router'

/**
 * @description 拷贝
 * @param {Array|Object} source 
 * @param {Array|Object} options 
 * @param {Boolean}deep 
 * @return {Array|Object} target
 */
export function extend(source, options, deep = false):any {
    for (let name in options) {
        let copy = options[name]
        if (deep && copy instanceof Array) {
            source[name] = extend([], copy, deep)
        } else if (deep && copy instanceof Object) {
            source[name] = extend({}, copy, deep)
        } else {
            source[name] = options[name]
        }
    }
    return source
}

/**
 * @description 接口调用成功回调
 * @param {Object} response 
 * @param {Function} cb
 * @return {void}
 */
export function callback(response,cb):void{
    if (response.status == 200 && response.data.status == 200) {
        if(cb){
            cb(response.data)
        }
    }else if(response.status == 200 && response.data.status == -10000){
        Message.error("登录过时，请重新登录")
        // router.push({name:'login'})
    }else if(response.status == 200 && response.data.status == -10002){
        Message.error("操作失败")
    }
}

/**
 * @description 上传视频校验
 * @param  {File} file
 * @return {boolean}
 */
export function beforeMediaUpload (file, maxSize?): boolean  {
    let size = maxSize ? maxSize : 2048  //视频大小  单位M
    const legalSize = file.size / 1024 / 1024 <= size
    if (!legalSize) {
        Message.error('附件大小不能超过 2GB!')
    }
    return legalSize
}


/**
 * @description 上传图片校验
 * @param  {File} file
 * @return {boolean}
 */
export function beforeImgUpload  (file, maxSize?): boolean {
    let size = maxSize ? maxSize : 2  //图片大小  单位M
    const legalSize = file.size / 1024 / 1024 <= size
    if (!legalSize) {
        Message.error('头像图片大小不能超过 2MB!')
    }
    return legalSize
}

/**
 * @description 获取面包屑导航
 * @param {Array} fullPath 
 * @return {void}
 */
// export function getBreadCrumb(fullPath: Array<string>) {
//     let path,
//         title,
//         breadcrumb = [],
//         menu,
//         len = fullPath.length
//     if (fullPath[0] == '') {
//         fullPath.shift()//剔除 ''
//     }
//     path = `/${fullPath.shift()}` //剔除'admin'
//     fullPath.forEach((ele, i) => {
//         menu = adminRoutes[ele]
//         path += `/${menu.path.replace(/\//g, '')}`  //拼接路径
//         title = `${menu.meta.title}`  //标题
//         breadcrumb.push({
//             path,
//             title
//         })
//     });
//     return breadcrumb
// }

/**
 * @description 将小于十的数转为 0n
 * @param {Number} n 
 * @return {String}
 */
function formatNumber(n: number): string {
	let str = n.toString()
	return str[1] ? str : '0' + str
}

/**
 * @description 将日期转为xxxx/xx/xx  格式
 * @param {Date} date
 * @return {String}
 */
export function formatDayTime(date: Date): string {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}
/**
 * @description 将日期转为xxxx/xx/xx xx:xx:xx 格式
 * @param {Date} date
 * @return {String}
 */
export function formatTime(date: Date): string {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()

	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * @description 将日期转为xxxx/xx/xx 00:00:00 格式 的long类型
 * @param {Date} date
 * @return {String}
 */
export function getZeroTime(date: Date): number {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
    let str = [year, month, day].map(formatNumber).join('/') + ' 00:00:00'
    return new Date(str).getTime()
}

/**
 * @description 将日期转为xxxx/xx/xx 23:59:59 格式 的long类型
 * @param {Date} date
 * @return {String}
 */
export function getFullTime(date: Date): number {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
    let str = [year, month, day].map(formatNumber).join('/') + ' 23:59:59'
    return new Date(str).getTime()
}

/**
 * todo
 */