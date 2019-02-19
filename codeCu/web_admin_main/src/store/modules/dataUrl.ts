
// initial state
const state = {
    login:          'user/login' ,                //登录
    upload:         'upload/uploadFile',          //上传文件    
    findall:        'course/findall',             //获取课程列表
    category:       'category/list',              //获取所有课程分类
    provider:       'provider/findall',           //获取课程来源列表
    addCourse:      'course/add',                 //新建课程
    getInfo:        'course/getInfo',             //获取课程详情
    updateCourse:   'course/update',              //修改课程
    getChannel:     'channel/findall',            //获取推广列表
    addchannel:     'channel/add',                //添加推广 
    editchannel:     'channel/edit',                //编辑推广 
    deleteChapter:  'course/deleteChapter',       //删除课程章节
    bannerFindall:  'banner/findall',             //获取banner列表
    bannerUpdate:   'banner/update',              //更新banner
    getTotalStat:   'stat/getTotalStat',          //获取统计信息
    getChannelStat: 'stat/getChannelStat',        //获取渠道统计
    getOrderList:   'order/getall',               //获取订单列表
    exportExcel:    'order/export',               //导出订单excel
    getMsgList:     'msg/findall',                //获取模板列表
    getMsgInfo:     'msg/getInfo',                //获取模板详情
    addTemplate:    'msg/template/add',           //添加模板消息
    delTemplate:    'msg/template/del',           //删除模板消息
    editTemplate:   'msg/template/edit',           //添加模板消息
    sendmsg:        'msg/sendmsg',                 //测试发送openid
    sendallmsg:     'msg/sendall',                 //全员推送消息
    totalmsgnum:    'msg/totalnum',                //获取推送列表
    getactList:     'activity/findall',            //获取优惠活动列表
    getCouponList:  'coupon/findall',              //获取优惠券列表
    editorcoupon:   'coupon/update',                //优惠券修改
    editoract:      'activity/update',              //优惠券活动修改
    getCouponTitle: 'coupon/getTitle',              //获取当前活动可用优惠券
    addActList:     'activity/update',              //添加优惠活动
    getActivityInfo:'activity/getInfo',             //获取优惠活动详情
    addCoupon:      'coupon/add',                   //添加优惠券
    getCouponInfo:  'coupon/getInfo',               //获取优惠券详情
    appendUseTime:  'coupon/appendUseTime',         //添加优惠券数量
    appendGrantNum: 'coupon/appendGrantNum',        //延长优惠券过期时间
    getSocpe:       'msg/getScopes',                //获取模板消息用途列表
    getKfMsgList:   'msg/kf/findall',               //获取客服模板列表
    getKfMsgInfo:   'msg/kf/getInfo',               //获取客服模板详情
    delKfMsgInfo:   'msg/kf/del',                   //删除客服模板
    addKfTemplate:  'msg/kftemplate/add',           //添加客服模板
    editKfTemplate: 'msg/kftemplate/edit',          //编辑客服模板
    addBreadCouse:  'course/mbxk/add',
    sendkfmsg:      'msg/kf/sendmsg',               //客服模板测试发送openid
    sendkfmsgAll:   'msg/kf/list',                  //批量推送客服模板的openid
    sendmsgList:    'msg/sendlist',                 //批量推送模板的uid
    totalkfmsgnum:  'msg/kf/totalnum',              //客服模板总数量
    sendallkfmsg:   'msg/kf/sendall',               //客服模板全员推送消息
    ltvGet:         'stat/ltv/get',                      //获取LTV列表
    retainGet:      'stat/retain/get',                  //获取留存列表
    accessGet:      'stat/access/get',                  //获取数据明细列表
    channelGet:      'stat/channel/get',                  //获取推广数据列表
    courseDataGet:      'stat/course/get',                  //获取课程数据列表
    visitorGet:      'stat/visitor/get',                  //获取新老访客列表
    managerUsersList:'user/getAllManageUser',         //获取系统用户列表
    managerRolesList:'user/getAllManageRoles',         //获取系统用户列表
    createManageUser:'user/createManageUser',         //创建系统用户
    changeManageUserPwd:'user/changeManageUserPwd',         //修改系统用户密码
    resetManageUserPwd:'user/resetManageUserPwd',         //重置系统用户密码
    deleteManageUser:'user/deleteManageUser',         //删除系统用户
    saveOrUpdateCourseGroups: 'courseGroup/saveOrUpdate',         //新建/编辑课程分组
    findAllCourseGroup: 'courseGroup/findAllCourseGroup',         //查询所有课程分组
    findGroupDetail: 'courseGroup/findGroupDetail',         //查询课程分组详情
    groupSort: 'courseGroup/groupSort',         //设置课程分组顺序
    courseSort: 'courseGroup/courseSort',         //设置课程顺序
    setValid: 'courseGroup/setValid',         //课程分组上架下架
    deleteGroup: 'courseGroup/deleteGroup',         //删除课程分组
    findCourseByName: 'courseGroup/findCourseByName',         //根据课程名称模糊查询课程
    findAllCourseByName: 'course/findall',         //根据课程名称模糊查询课程-不分组
    findAllShop: 'shop/findAllShop',         //查询所有店铺列表
    findActImage: 'activity/findActImage',         //查询店铺活动图
    saveActImage: 'activity/saveActImage',         //查询店铺活动图
    saveShop: 'shop/saveOrUpdate',         //保存店铺
    findShop: 'shop/findShop',         //查询店铺
    refreshCache: 'redis/cacheRefresh?name=fs',         //刷新
    shopGet: 'stat/shop/get',         //获取所有店铺
    pushGet: 'stat/push/get',           //推送效果数据
    groupSaveOrUpdate: 'group/saveOrUpdate',           //保存或修改拼团活动
    grouInfo: 'group/groupinfo',           //拼团活动详情
    grouplist: 'group/grouplist',           //拼团列表
    groupShowlist: 'group/showlist',           //拼团展示列表
    groupShowlistUpdate: 'group/showlist/update',           //修改拼团展示列表
    groupOpengroupList: 'group/opengroup/list',           //拼团活动列表
    bannerGroupEdit: 'banner/group/edit',           //修改拼团banner
    groupOpengroupManual: 'group/opengroup/manual',           //手动成团
    orderGroupGetall: 'order/group/getall',           //手动成团
    orderExchangeList: 'order/exchange/getall',           //获取兑换活动订单列表
    refundGroupList: 'refund/group/list',           //拼团退款列表
    refundGroupAdd: 'refund/group/add',           //添加拼团退款
    refundGroupApply: 'refund/group/apply',           // 发起拼团退款
    refundQuery: 'refund/query',           // 退款查询
    exchangeAdd: 'exchange/add', // 新增兑换活动
    exchangeAppendNum: 'exchange/append/num', // 兑换活动追加最大兑换数
    exchangeAppendTime: 'exchange/append/time', // 兑换活动延长活动时间
    exchangeFindall: 'exchange/findall', // 兑换活动列表
    exchangeGetInfo: 'exchange/getInfo', // 兑换活动详情
    exchangeEditStatus: 'exchange/edit/status', // 修改兑换活动状态
    exchangeEditInfo: 'exchange/edit/info' // 修改兑换活动
}

// getters
const getters = {
}

// actions
const actions = {
   
}

// mutations
const mutations = {
    
}

// for(let key in state){
//     state[key] = baseUrl + state[key]
// }
export { state }

export default {
    state,
    getters,
    actions,
    mutations
}