/**
 ** Author： Hengzhao
 ** 功能： 获取图片的地址，区分是否是从商城模板中生成的
 ** @param {normalUrl}    正常活动的图片地址路径：包含域名、path
 ** @param {mallUrl}      模板商城生成活动的地址：包含域名、path
 ** @param {reuse_id}     模板标识符
 ** @reutrn：  图片地址
 **/
var suffixUrl = function( normalUrl, mallUrl, reuse_id ){
    if( reuse_id == 0 ){
        return normalUrl;
    }else{
        return mallUrl;
    }
};

/**
 ** Author： Hengzhao
 ** 功能： 设置元素的背景图片地址
 ** @param {option}       格式：[{
                                    selector: '.templatemall .people',  // 元素的唯一选择器---类型：字符串
                                    distUrl: distUrl,                   // 图片地址的前缀
                                    name: 'dalian-figure.png',          // 图片名字
                                },{
                                    selector: ['.templatemall .redpack', '.templatemall .redpackshare'],  // 元素的唯一选择器---类型：数组
                                    distUrl: distUrl,                                                     // 图片地址的前缀
                                    name: 'redpack.png',                                                  // 图片名字
                                }]
 ** @param {config}      配置信息：{
 *                                  hash： true,  //图片后面是否加时间戳
 *                                }
 ** @reutrn：  无
 **/
var setBkgdImg = function( option, config ){

    config = config || {};
    config = $.extend(true, { hash: false }, config );

    for( var i=0; i<option.length; i++ ){

        if( Object.prototype.toString.call( option[i].selector ) == "[object Array]"){

            for(var j=0; j < option[i].selector.length; j++ ){

                $( option[i].selector[j] ).css({
                    'background-image': "url(" + option[i].distUrl + "/dist/" + option[i].name + ( config.hash ? "?" + new Date().getTime() : '' ) + ")"
                });

            }

        }else if( Object.prototype.toString.call( option[i].selector ) == "[object String]" ){

            $( option[i].selector ).css({
                'background-image': "url(" + option[i].distUrl + "/dist/" + option[i].name + ( config.hash ? "?" + new Date().getTime() : '' ) + ")"
            });

        }

    }
};

/**
 ** Author： Hengzhao
 ** 功能： 设置活动的背景图片
 ** @param {option}       格式：{
                                    selector: ".templatemall .main",  // 背景的唯一选择器
                                    url: distUrl,                     // 背景图片的路径
                                    styleId: 'templatemall-bg',       // 背景图片的图片名
                                    reuse_id: reuseId                 // 活动的reuse_id
                                }
 ** @reutrn：  无
 **/
var setBgImg = function(option){

    option = $.extend(true, {
        hash: false,
    }, option );

    var str = option.selector + ', ' + option.selector + ':before, ' + option.selector + ':after {' +
        'background-image: url(' + option.url + ( ( option.reuse_id == 0 ) ? '/dist/bg.jpg' : '/dist/bg.webp' ) + ( option.hash ? "?" + new Date().getTime() : '' ) + ')}';
    var selector = option.selector + ', ' + option.selector + ':before, ' + option.selector + ':after';
    var rulesStr = 'background-image: url(' + option.url + ( ( option.reuse_id == 0 ) ? '/dist/bg.jpg' : '/dist/bg.webp' ) + ( option.hash ? "?" + new Date().getTime() : '' ) + ')';

    setTimeout(function(){

        var style = document.createElement( "style" );
        style.id = option.styleId;
        document.head.appendChild( style );
        var s = document.styleSheets[document.styleSheets.length - 1];
        if (s.insertRule) {
            s.insertRule( str, s.cssRules.length);
        } else { /* IE */
            s.addRule(selector, rulesStr, -1);
        }

        //$('<style id="' + option.styleId + '">' + str + '</style>').appendTo('head');

    }, 10);

};

var getActId = function(){

    var url = window.decodeURIComponent( window.location.href );
    var act_id = url.substring(url.lastIndexOf('/')+1);
    return (parseInt(act_id) >= 0) ? act_id : 'err_act_id';

};

/**
 ** Author： Hengzhao
 ** 功能： 通过 vars参数  获取 当前活动的详细信息
 ** @param {id}          活动id
 ** @reutrn： 当前活动的详细信息
 **/
var getCurActList = function(id){
    var actList = vars.actList || [], result = {};
    for(var i=0; i<actList.length; i++){
        if( actList[i].id == id ){
            result = actList[i];
        }
    }

    if( !( result.appid && result.tpl ) ){
        $.ajax({
            type: "get",
            url:  window.location,
            async: false,
            dataType: "json",
            data: {
                "m":"activities", "p":"showAct",
                "extra" : {"act_id": getActId()}
            },
            cache: false
        }).done(function(data){
            result = data;
        });
    }

    return result;
};

/**
 ** Author： Hengzhao
 ** 功能： 通过 活动id  获取 reuse_Id
 ** @param {id}          活动id
 ** @reutrn：  获取的 reuse_Id
 **/
var getReuseId = function(id){
    return getCurActList(id).reuse_id;
};

export { suffixUrl, setBkgdImg, setBgImg, getCurActList, getReuseId };