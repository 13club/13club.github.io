'use strict'
var wxTools = require('./../../modules2/scripts/wxTools.js').tools || {};

wxTools.deviceVersion = {
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
    }
};

wxTools.client = {
    showJudge : function(s,str){
        var arr1 = [],arr2 = [];
        arr1 = s.split(".");
        arr2 = str.split(".");
        for(var i = 0;i<arr1.length;i++){
            if(arr1[i] > arr2[i] || s == str){
                return true;
            }else if(arr1[i] < arr2[i]){
                return false;
            }else{
                continue;
            }
        }
    }
}

wxTools.textFit();

exports.tools = wxTools;