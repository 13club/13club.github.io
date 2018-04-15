'use strict'
var ActTools = require('./../../modules2/scripts/actPublicTools.js').tools || {}

ActTools.deviceVersion = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    },
    callbackIndex:function(){
        $("body>.index_box").show();
        $("body>.act_box").hide();
        $("body>.act_box").find('.content').hide()
    }
};


//统一引用公共库里面的字号函数--解决活动在不同工作室下字号不统一
ActTools.textFit();

exports.tools = ActTools;