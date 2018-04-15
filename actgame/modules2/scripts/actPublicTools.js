'use strict'

//数据全局统计字段
window.ifdata = 0;
window.ifsource = 0;
window.onlyInit = true;

var actPublicTools = {
	ajax: function(data, fn, async, loadPng) {
        try{
            if (typeof(async) == 'undefined') {
                async = true;
            }

			if (typeof(loadPng) == 'undefined') {
                loadPng = true;
            }else{
				loadPng = false;
			}

            fn = actPublicTools.isFunction(fn) ? fn : function(data) { console.log("data arrived,with no callback:", data); }

            //Append act_id To AjaxRequest Form Url锚[By:jeffjade]
            data.act_id = this.getActId();

            // Update Request PersonInfo Interface [By:jeffjade 16-05-04]
            var requestUrl = window.location;
            data.appid = vars.appid
            data.dataType = "json"
            if( (data.p === 'getUserInfo' || data.p === 'setUserInfo') && (vars.lang === 'zh') ){
                requestUrl = vars.app_url;
                data.m = 'user';
                data.access_token = vars.access_token;
                data.extra = data.extra || {};
                if (!JSON) {
                    JSON = {};
                }
                if (!JSON.parse) {
                    JSON.parse = function(json) {
                        return eval('(' + json + ')');
                    };
                }
                //兼容麻将合集活动地址原api修改为newapi
                var apiName = window.location.search.indexOf('newapi=') > 0 ? 'newapi' : 'api';
                var apiInfo = JSON.parse( this.getQueryString(apiName) );
                if( vars.apptype != 'dif' && apiInfo != null){
                    data.extra.mid = apiInfo.mid; //兼容活动地址mid不带""
                }else{
                    var tempMid = /(\"mid\":\")(\d+)/.exec( window.decodeURIComponent( window.location.href ) );

                    if( tempMid ){
                        data.extra.mid = tempMid[2]; //apiInfo.mid
                    }else{
                        // 兼容 上面正则匹配后，返回为 null 的异常情况
                        var tempString = window.decodeURIComponent( window.location.href ).replace( /\s+/g, "");
                        tempString = tempString.replace( /[\r\n]/g, "");
                        data.extra.mid = /(["|']?mid["|']?:["|']?)(\d+)(["|']?)/g.exec( tempString )[2] //apiInfo.mid
                    }
                }

            }

            $.ajax({
                    type: "get",
                    url: requestUrl,
                    async: async,
                    dataType: data.dataType,
                    data: data,
                    cache: false,
                    beforeSend: loadPng ? actPublicTools.loadShow : function(){}
            })
            .always( this.loadHide)
            .done(fn)
            .done(function(){
                if( data.extra.keys && data.extra.keys.indexOf('data_interface') >= 0 ){

                    actPublicTools.sendIfdata();
                }
            })
            .fail(function( jqXHR, textStatus, errorThrown ){});

        }catch(e){

            // alert( e );
        }
    },
    newAjax:function(api,fn){
        //var requestUrl = window.location.host.indexOf('192.168.204.68') > -1?'http://activity.oa.com':'http://ativy001.ifere.com';
        //获取appid
        //var appid = vars.appid;

        //获取actID
        var url = window.decodeURIComponent( window.location.href );
        var act_id = url.substring(url.lastIndexOf('/')+1);
        var actid = parseInt(act_id) > -1 ? act_id : 'err_act_id';
        //获取extra参数
        var searchData =  window.decodeURIComponent(window.location.search).split('&');
        var extra = {}
        for (var i = 0; i<searchData.length; i++) {
            var temp = searchData[i].split('=')
            extra[temp[0]] = temp[1];
        };
        //var mid = extra.api ? JSON.parse(extra.api).mid:JSON.parse(extra.newapi).mid;
        var param = {}
        param.api = api;
        param.extra = extra.api ? JSON.parse(extra.api):JSON.parse(extra.newapi);
        //var targetUrl = requestUrl+'/api/'+appid+'/'+actid+'/'+mid+'/'+JSON.stringify(param);
        var targetUrl = vars.api_url[actid]+JSON.stringify(param);
        $.ajax({
                type: "GET",
                url: targetUrl,
                async: true,
                cache: false,
                beforeSend:actPublicTools.loadShow
        })
        .always( actPublicTools.loadHide)
        .done(fn)
        .done(function(){
            actPublicTools.sendIfdata();
        })
    },
    loadShow: function() {
				if(vars.apptype == 'dif'){//dif，不需要加载loding，客户端有
						$("#loading").hide();
						return;
				}else{
					var cusAppid = [9302], // 需要自定义loading图的appid应用
							loadingName = '';
					if( cusAppid.some(function(item){ return item == vars.appid }) ){
							loadingName =  vars.cdn + 'images/' + "loading" + vars.appid + ".gif";
					}else{
							loadingName = vars.cdn + 'images/loading.gif';
					}
					if ($("#loading").size()) {
							$("#loading").show();
					} else {
							var $loading = $('<img/>').attr({ 'id': 'loading', 'src': loadingName });
							$('body').prepend($loading);
					}
				}
    },
    loadHide: function() {
        var _COUNT = 0;
        var _SID = setInterval(function() {
            _COUNT++;
            if (_COUNT >= 3) {
                $("#loading").hide();
                clearInterval(_SID)
            }
        }, 300)
    },
    // 判断是否是烈火新版--zhaoheng:2017-8-4
    isNewEdition: function (){
        var res = /actnew/g.test( window.location.hash );
        return res;
    },
    //以外链CSS来解决-内联CSS所带来的图片路径偏差问题;[-16-03-28 By:jeffjade]==Start
    addOutsideLink: function(hrefPath, linkStyleId, callBack){
        var $linkElements = $("link"), $style = $("style");

        // 旧版的走原来的流程--zhaoheng:2017-8-4
        if( !actPublicTools.isNewEdition ){
            for( var i=0; i<$linkElements.length; i++){
                var linkHref = $( $linkElements.eq(i) ).attr("href");
                if(linkHref.indexOf("main.css") > -1){
                    $( $linkElements.eq(i) ).remove();
                }
            }

            for( var i=0; i<$style.length; i++){
                var linkHref1 = $( $style.eq(i) ).attr("id");
                if( linkHref1 == "" || linkHref1 ){
                    $( $style.eq(i) ).remove();
                }
            }

            if( linkStyleId ){
                setTimeout(function(){
                    var img = new Image();
                    img.onload = img.onerror = function(){
                        if( typeof callBack === "function" && linkStyleId ){
                            callBack();
                        }
                    };
                    img.src = hrefPath;
                }, 10);
            }

            var link = $("<link>");

            link.attr({
                rel:"stylesheet",
                type:"text/css",
                // media:"screen",
                id: linkStyleId,
                href: hrefPath
            }).appendTo("head");

        }else{  // 新版加载样式方法，不在重复加载已经加载过的 样式
            var isLinkHas = false;
            for( var i=0; i<$linkElements.length; i++){
                var linkHref = $( $linkElements.eq(i) ).attr("href");
                var linkId = $( $linkElements.eq(i) ).attr("id");
                if(  linkHref == hrefPath  ){
                    isLinkHas = true;
                    break;
                }
                if( linkStyleId ){
                    if(  linkId == linkStyleId  ){
                        isLinkHas = true;
                        break;
                    }
                }
            }

            if( isLinkHas ){
                if( linkStyleId ){
                    if( typeof callBack === "function" && linkStyleId ){
                        callBack();
                    }
                }
            }else{
                if( linkStyleId ){
                    setTimeout(function(){
                        var img = new Image();
                        img.onload = img.onerror = function(){
                            if( typeof callBack === "function" && linkStyleId ){
                                callBack();
                            }
                        };
                        img.src = hrefPath;
                    }, 10);
                }

                var link = $("<link>");

                link.attr({
                    rel:"stylesheet",
                    type:"text/css",
                    // media:"screen",
                    id: linkStyleId,
                    href: hrefPath
                }).appendTo("head");
            }

        }

        var self = this;
        var act = self.getCurAct();
        var tplName = ""; //default tplName

        var actid = parseInt(self.getActId());

        tplName = act.tpl.replace('_vuetpl', '');


        if( linkStyleId ){

            window.ifsource = 1;

            var imgTemp = new Image();

            imgTemp.onload = imgTemp.onerror = function(){
                ifsource = 1;
                if(ifdata == 1 && onlyInit){
                    onlyInit = false;
                    actPublicTools.ajax({
                        "p":"data",
                        "extra" :  {"keys":"addFromLog","ifdata":ifdata,"ifsource":ifsource}
                    },function(data){
                        onlyInit = false;
                    });
                }
            };

            actPublicTools.isSupportWebp(function(){
                if( act.reuse_id != 0 ){
                    imgTemp.src = vars.cdn + "ns/reusefile/" + act.reuse_id  + '/dist/bg.webp';
                }else{
                    imgTemp.src = vars.cdn + 'ns/' + vars.apptype + 'mod/' + tplName + '/dist/bg.webp';
                }
            }, function(){
                if( act.reuse_id != 0 ){
                    imgTemp.src = vars.cdn + "ns/reusefile/" + act.reuse_id  + '/dist/bg.jpg';
                }else{
                    imgTemp.src = vars.cdn + 'ns/' + vars.apptype + 'mod/' + tplName + '/dist/bg.jpg';
                }
            })

        }

    },
    isSupportWebp: function( succ, error ){
        var img = new Image();
        var isSupportWebp = "";
        img.onload = img.onerror = function(){

            isSupportWebp = (img.width === 2 && img.height === 2);

            if( isSupportWebp ){

                if( typeof succ == "function" ){
                    succ();
                }

            }else{

                if( typeof error == "function" ){
                    error();
                }
            }

        };

        img.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

    },
    sendIfdata:function(){//数据加载完成数据统计
        window.ifdata = 1;
        if( ifsource == 1 && onlyInit){
            onlyInit = false;
            actPublicTools.ajax({'p':'data',extra:{"keys":"addFromLog","ifdata":ifdata,"ifsource":ifsource}}, function(succData){
                onlyInit = false;
            });
        }
    },
    getActId: function(){

        var url = window.decodeURIComponent( window.location.href );
        var act_id = url.substring(url.lastIndexOf('/')+1);
        return (parseInt(act_id) >= 0) ? act_id : 'err_act_id';

    },

    getCurAct: function(){
        var self = this;
        var act = null;
        var actid = parseInt(self.getActId());
        for(var k in vars.actList){

            if(vars.actList[k].id == actid){
                act = vars.actList[k];
                break;
            }
        }

        if( !act ){
            self.ajax({
                "m":"activities", "p":"showAct",
                "extra" : {"act_id":actid}
            },function(data){
                act = data;
            }, false);
        }
        return act;
    },

    importMainCss: function(actname,callBack, isRealtimeRefresh){

  console.log(actname)
try{

        this.addOutsideLink( './' + actname + '/main.css' );
    
}catch(e){

}





return
        var self = this;
        var act = this.getCurAct();
        var tplName = "jeffjadedefault"; //default tplName

        setTimeout(function(e){

			try{

				var actid = parseInt(self.getActId());

				if(act == null){
					actPublicTools.ajax({
							"m":"activities", "p":"showAct",
							"extra" : {"act_id":actid}
						},function(data){
							act = data;
							tplName = act.tpl.replace('_vuetpl', '');

							self.addMainCss(tplName, callBack);
						}
					);
				}else{
					tplName = act.tpl.replace('_vuetpl', '');

					try{
						self.addMainCss(tplName, callBack, isRealtimeRefresh, act);
					}catch(e){
					}

				}
			}catch(e){
				//alert(e);
			}

        }, 50 );

    },
    addMainCss: function(tpl, callBack, isRealtimeRefresh, curAct){
        try{

            var mainCssHref = '';
            if(vars.apptype != 'ddz'){//ddz改版之后，不需要加载common.css
                var commonStyle = vars.cdn+'ns/'+ vars.apptype +'mod/actvuestyle/common.'+vars.frame+"."+vars.theme+'.css?' + (vars.cache || "v.1.0.0");
                this.addOutsideLink( commonStyle, '');
            }
            //判断是否是模板库活动--seven:2017-5-11
            if( curAct.reuse_id != 0 ){
                mainCssHref = vars.cdn + "ns/reusefile/" + curAct.reuse_id + "/main.css?@";
            }else{
                mainCssHref = vars.cdn + 'ns/' + vars.apptype + 'mod/#/main.css?@';
            }

            var linkStyleId = "styleActIdOf" + this.getActId();

            mainCssHref = mainCssHref.replace('#', tpl);

            if( isRealtimeRefresh ){
                mainCssHref = mainCssHref.replace( '@', new Date().getTime() );
            }else{
                mainCssHref = mainCssHref.replace( '@', vars.cache || "v1.1.1" );
            }

            this.addOutsideLink(mainCssHref, linkStyleId, callBack);

        }catch(errMsg){
            this.addOutsideLink( './main.css' );
        }
    },
    //以外链CSS来解决-内联CSS所带来的图片路径偏差问题;[-16-03-28 By:jeffjade]==End

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
    textFit: function() {
        (function($) {
            $.fn.flowtype = function(options) {
                var settings = $.extend({
                        maximum: 9999,
                        minimum: 1,
                        maxFont: 9999,
                        minFont: 1,
                        fontRatio: 35,
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
            //fontRatio: 60,
        });
    }
};

exports.tools = actPublicTools;
