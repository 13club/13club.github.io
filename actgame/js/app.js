var actDataList = [{
	"id":"0",
	"name":"转盘抽奖",
	"title":"转盘抽大奖",
	"icon":"icon.jpg",
	"describe":"转盘抽大奖，转到啥就抱啥",
	"actName":"turntableconfig"
},{
	"id":"1",
	"name":"九宫格",
	"title":"九宫格抽大奖",
	"icon":"icon.jpg?1",
	"describe":"九宫格抽大奖，抽到啥就是啥",
	"actName":"jiugongge"
},{
	"id":"2",
	"name":"翻牌扑克",
	"title":"翻牌扑克游戏",
	"icon":"icon.jpg?1",
	"describe":"德州扑克玩法，看谁大咯",
	"actName":"turncard"
},{
	"id":"3",
	"name":"飞机赛跑",
	"title":"看谁飞的更加远",
	"icon":"icon.jpg?v1",
	"describe":"比比飞机，看谁飞的更加远",
	"actName":"feijigame"
}]
console.log(actDataList)


if(actDataList.length==0){
	var solidScriptStr = "<div>暂无数据</div>";
}else{
	var $ul='',
		$li='';
	actDataList.forEach((data, index)=>{
		$li = $li + '<li><div class="li-icon"><img src="./actmod/'+data.actName+'/'+data.icon+'"></div><div class="li-cont"><p><b>'+data.name+'</b></p><p>'+data.describe+'</p></div></li>';
	})
	$ul = '<ul id="indexUl">'+$li+'</ul>';
	document.title = '游戏中心'; 
	var solidScriptStr = '<div class="index_box"><div class="index_title">游戏中心</div>'+$ul+'</div>';
	$("body").append(solidScriptStr);
}


// $("body").empty();
$("body>.loading_contence").hide();


var returnBtn = '<button class="return_Btn" onclick="returnIndexUl()"></button>';
setTimeout(()=>{
	var $div='';
	actDataList.forEach((data, index)=>{
		$div = $div + "<div id='contentWrapId'><app></app></div><script src='./actmod/"+data.actName+"/dist/main.js'></script>";
	})

	var solidScriptStr = returnBtn+'<div class="act_box hide">'+$div+'</div>';

	$("body").append(solidScriptStr);
},100);



var oUl = document.getElementById('indexUl');
oUl.addEventListener('click',function(ev){
    var target = ev.target;
    while(target !== oUl ){
        if(target.tagName.toLowerCase() == 'li'){
            console.log('li click~');
            var index = $(target).index();
            $("body>.index_box").hide();
            $("body>.act_box").show();
            $("body>.return_Btn").show();
            if($('.act_box').find('.content').eq(index)){
            	$('.act_box').find('.content').eq(index).show();
            }else{
            	alert('拼命加载中！请稍等……')
            }
			document.title = actDataList[index].title; 
            break;
        }
        target = target.parentNode;
    }
})

function returnIndexUl(){
    $("body>.index_box").show();
    $("body>.act_box").hide();
    $("body>.return_Btn").hide();
    $("body>.act_box").find('.content').hide();
    document.title = '游戏中心'; 
}


