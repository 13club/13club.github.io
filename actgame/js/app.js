var actDataList = [{
	"id":"0",
	"name":"飞机赛跑",
	"title":"看谁飞的更加远",
	"icon":"icon.jpg?v2",
	"describe":"比比飞机，看谁飞的更加远",
	"actName":"feijigame"
},{
	"id":"1",
	"name":"逗你玩",
	"title":"逗你玩，看看你有多厉害",
	"icon":"icon.jpg",
	"describe":"逗你玩，来玩玩智商",
	"actName":"douniwan"
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
	$ul = '<ul id="indexUl">'+$li
	+ '<li><p class="li-erweiTit">喜欢就打赏一块钱呗^_^</p><div class="li-erwei"><img src="./images/1yuan.jpg"></div></li>'+'</ul>';
	document.title = '13Culb游戏中心'; 
	var solidScriptStr = '<div class="index_box"><div class="index_title">13Culb游戏中心</div>'+$ul+'</div>';
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


