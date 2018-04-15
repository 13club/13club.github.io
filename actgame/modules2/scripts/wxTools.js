'use strict'

const wx = require('weixin-js-sdk');

var wxTools = {
	ajax: function(data, fn, async) {
        try{
            if (typeof(async) == undefined) {
                async = true;
            }
            
            fn = wxTools.isFunction(fn) ? fn : function(data) { console.log("data arrived,with no callback:", data); }
            var requestUrl = vars.uri;

	        data.act_id = this.getActId();
            data.appid = data.appid?data.appid:vars.appid;
            data.dataType = "json";
            data.m = data.m?data.m:"wechat";
            $.ajax({
                    type: "get",
                    url: requestUrl,
                    async: async,
                    dataType: data.dataType,
                    data: data,
                    cache: false,
                    beforeSend: wxTools.loadShow
            })
            .always( this.loadHide )
            .done(fn)
            .fail(function( jqXHR, textStatus, errorThrown ){});

        }catch(e){

        }
    },
    loadShow: function() {
        if ($("#loadingToast").size()) {
            $("#loadingToast").show();
        }else {
            var leaf = '';
            for(var i=0;i<=11;i++){
                leaf +='<div class="weui_loading_leaf weui_loading_leaf_'+i+'"></div>';
            }
            var $loading = '<div id="loadingToast" class="weui_loading_toast" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading">'+leaf+'</div><p class="weui_toast_content">数据加载中</p></div></div>';

            $('body').append($loading);
            $("#loadingToast").show();
        }
    },
    loadHide: function() {
        var _COUNT = 0;
        var _SID = setInterval(function() {
            _COUNT++;
            if (_COUNT >= 1) {
                $("#loadingToast").hide();
                clearInterval(_SID)
            }
        }, 300)
    },
    getActId: function(){
        var act_id = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        return (parseInt(act_id) >= 0) ? parseInt(act_id) : 'err_act_id';
    },
    wxShare : function(actid,link,shareInfo){//请求分享信息，若接口名不一样，可在活动内文件重写
        var that = this;
        this.ajax({"m":"wechat","p":"getWeiXinInfo","act_id":actid},function(wxdata){
            if(wxdata){
                that.weixin({
                    "appid" : wxdata.appId,
                    "timestamp" : wxdata.timestamp,
                    "nonceStr": wxdata.nonceStr,
                    "signature": wxdata.signature,
                },{
                    title: shareInfo.title,
                    desc: shareInfo.desc,
                    link: link,
                    imgUrl: shareInfo.imgUrl
                });
            }
        });
    },
    weixin : function(config, shareInfo, succFn, cancelFn){//调用微信JSSDK
        var apiList = ['onMenuShareTimeline','onMenuShareAppMessage'];
        wx.config({
              debug: false,
              appId: config.appid,
              timestamp: config.timestamp,
              nonceStr: config.nonceStr,
              signature: config.signature,
              jsApiList: apiList
        });

        wx.ready(function () {
            var shareData64 = {
                title: shareInfo.title,
                desc: shareInfo.desc,
                link: shareInfo.link,
                imgUrl: shareInfo.imgUrl,
                success: function(){
                    if(succFn) succFn();
                },
                cancel: function(){
                    if(cancelFn) cancelFn();
                }
            };
              
            wx['onMenuShareAppMessage'](shareData64);
            wx['onMenuShareTimeline'](shareData64);
        });
    },
    importMainCss: function(callBack){
    	var tplName = act.tpl.replace('_vuetpl', '');
        this.addMainCss(tplName,callBack);
    },
    addMainCss: function(tpl,callBack){
        try{
            /*var commonStyle = vars.cdn+'ns/'+ vars.apptype +'mod/actvuestyle/common.'+vars.frame+"."+vars.theme+'.css?' + (vars.cache || "v.1.0.0");
            this.addOutsideLink( commonStyle );*/
            var cdn = vars.cdn?vars.cdn:sysConf.cdn;
            var mainCssHref = cdn + 'ns/' + vars.apptype + 'mod/#/main.css?@';
            var linkStyleId = "styleActIdOf" + this.getActId();

            mainCssHref = mainCssHref.replace('#', tpl);
            mainCssHref = mainCssHref.replace('@', vars.cache || "?v="+Math.random() );
            this.addOutsideLink(mainCssHref, linkStyleId,callBack);
        }catch(errMsg){
            console.log(errMsg,vars);
            this.addOutsideLink( './main.css' );
        }
    },
    //以外链CSS来解决-内联CSS所带来的图片路径偏差问题;[-16-03-28 By:jeffjade]==Start
    addOutsideLink: function(hrefPath, linkStyleId,callBack){
        var $linkElements = $("link");
        for( var i=0; i<$linkElements.length; i++){
            var linkHref = $( $linkElements.eq(i) ).attr("href");
            if(linkHref.indexOf("main.css") > -1){
                $( $linkElements.eq(i) ).remove();
            }           
        }
        $("<link>").attr({
            rel:"stylesheet",
            type:"text/css",
            media:"screen",
            id: linkStyleId,
            href: hrefPath
        }).appendTo("head");
        if( typeof callBack === "function" && linkStyleId ){
            callBack();
        }
    },
    getQueryString: function(str) {
        var reg = new RegExp("(^|&)" + str + "=([^|&]*)(&|$)", "i");
        var search = window.decodeURIComponent( window.location.search ); //url  进行转义
        var r = search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    isFunction: function( obj ){
        return typeof obj == 'function' || false;
    },
    jumpById:function(sid,id){//活动源id和目标id
       var url = location.href;
       var search = location.search,temSearch = location.search,hash = location.hash;
        url = url.replace(sid,id);
        if(search.indexOf('act_id=')>-1){
            url = url.replace(sid,id);
            search = temSearch = search.replace(sid,id)
        }
        if(search.indexOf("&actfrom=")>-1){
            temSearch = search.substring(0,search.indexOf("&actfrom=") + 1);
        }
        url = url.replace(search, temSearch+"&actfrom="+sid);
        location.href = url;
    },
    versions: function(){
       var u = navigator.userAgent, app = navigator.appVersion;
       return {
            trident: u.indexOf('Trident') > -1, //IE内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            isWeixin: u.indexOf('MicroMessenger')>-1
        };
    },
    islandscape:function(){
        var flag = false;
        if( (typeof window.orientation != "undefined" &&( window.orientation == 180 || window.orientation==0))||(typeof window.screen.orientation != "undefined" &&( window.screen.orientation.angle == 180 || window.screen.orientation.angle==0)) ){//竖屏
            flag = false;
        }
        if( (typeof window.orientation != "undefined" &&( window.orientation == 90 || window.orientation==-90))||(typeof window.screen.orientation != "undefined" &&( window.screen.orientation.angle == 90 || window.screen.orientation.angle==-90)) ){//横屏
            flag = true;
        }
        return flag;
    },
    landscapeMask:function(){
        var that = this;
        if(window.orientation==undefined){
            that.landscapeMaskPC();
        }else if(window.orientation==90||window.orientation==-90){
            $('body').addClass('darkmask');
        }
        window.addEventListener("orientationchange", function() {
            // alert(window.orientation);
            if(window.orientation==undefined){
                that.landscapeMask();
            }else if(window.orientation==90||window.orientation==-90){
            　　$('body').addClass('darkmask');
            }else{
                $('body').removeClass('darkmask');
            }
        }, false);
    },
    landscapeMaskPC:function(){
        $(window).on("orientationchange",function(){
            location.reload();
        });
        if(this.islandscape()){
            $('body').addClass('darkmask');
        }else{
            $('body').removeClass('darkmask');
        }
    },
    padChange: function($obj){
        var sw = window.innerWidth, sh = window.innerHeight;
        $obj.css({
            "width" : 640*sh/1008,
            "height" : sh,
        });
    },
    textFit: function() {
        (function($) {
            $.fn.flowtype = function(options) {
                var settings = $.extend({
                        maximum: 9999,
                        minimum: 1,
                        maxFont: 9999,
                        minFont: 1,
                        fontRatio: 25,
                        lineRatio: 1.45
                    }, options),
                    changes = function(el) {
                        var $el = $(el),
                            elw = $el.width(),
                            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
                            fontBase = width / settings.fontRatio,
                            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
                        $el.css({
                            'font-size': fontSize + 'px',
                            'line-height': fontSize * settings.lineRatio + 'px'
                        });
                    };
                return this.each(function() {
                    var that = this;
                    $(window).resize(function() { changes(that); });
                    changes(this);
                });
            };
        }(jQuery));
        $('body').flowtype({
            minFont: 4,
            maxFont: 28,
            fontRatio: 40,
        });
    },
	getCookie : function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},
	clearCookie : function(name) {  
	    setCookie(name, "", -1);  
	} 
};

exports.tools = wxTools;
