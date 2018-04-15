//传入obj返回obj的长度
/**
** Author：RaysoLi
** 功能：获取对象的长度
** @param {obj} 	一个对象
** 返回值说明：
	num类型，即obj的长度
**/
function getObjLength(obj){
	var count = 0;
	for(var i in obj){
		count++;
	}
	return count;
}

/**
** Author：RaysoLi
** 功能：获取活动起止时间
** @param {starttime} 	一个开始的时间戳，单位为秒
** @param {endtime}   一个结束的时间戳，单位为秒
** 返回值说明
	返回一个对象：
	{
		//开始时间
		start:{
			year:"2016",	//年
			month:"12",		//月
			date:"13"		//日
		},
		//结束时间
		start:{
			year:"2016",
			month:"12",
			date:"13"
		}
	}
**/
function getActTime(starttime,endtime){
	var startDate = new Date(starttime * 1000);
	var endDate = new Date((endtime - 5) * 1000);
	var start = {},end = {};
	start.year = startDate.getFullYear();
	start.month = startDate.getMonth() + 1;
	start.date = startDate.getDate();
	end.year = endDate.getFullYear();
	end.month = endDate.getMonth() + 1;
	end.date = endDate.getDate();
	return {start:start,end:end};
}

//传入ruleObj返回ruleObj拼接后的字符串
/**
** Author：RaysoLi
** 功能：获取规则拼接后的字符串
** @param {obj} 	一个对象
** 返回值说明：
	num类型，即obj的长度
**/

function creatRuleString(ruleObj){
	var str = "<ul class='rule'>";
	for(var i in ruleObj){
		str += "<li>"+ruleObj[i]+"</li>";
	}
	return str + "</ul";
}
//传入rankObj返回rankObj拼接后的字符串
/**
** Author：RaysoLi
** 功能：获取类似获奖记录拼接后的字符串
** @param {obj} 	一个对象
** 返回值说明：
	num类型，即obj的长度
**/

function creatRankString(rankhead,rankbody,nomsg,keys){
	var thstr = "<thead><tr>",tbstr="<tbody>";
	var hlength = rankhead.length;
	for(var i = 0;i<rankhead.length;i++){
		thstr += "<td>" + rankhead[i] + "</td>";
	}
	thstr += "</tr></thead>";
	if(rankbody.length == 0 || getObjLength(rankbody) == 0){
		tbstr += "<tr><td colspan="+hlength+">" + nomsg +"</td></tr></tbody>";
		return "<table class='rank'>" + thstr + tbstr + "</table>";
	}
	// for(var k = 0;k<rankbody.length;k++){
	for(var k in rankbody){
		tbstr += "<tr>"
		if(!rankbody[k][0]){
			for(var m in rankbody[k]){
				var isKey = true;
				if(keys){
					isKey = false;
					for(var n=0;n<keys.length;n++){
						if(m == keys[n]) isKey= true;
					}
				}
				if(!isKey) continue;
				tbstr += "<td>" + rankbody[k][m] + "</td>";
			}
		}else{
			for(var m=0;m<rankbody[k].length;m++){
				tbstr += "<td>" + rankbody[k][m] + "</td>";
			}
		}
		tbstr += "</tr>"
	}
	tbstr += "</tbody>";
	return "<table class='rank'>" + thstr + tbstr + "</table>";
}

/**
** Author：RaysoLi
** 功能：获取制定范围内的随机整数,包含起点和终点，[start,end]
** @param {start} 	随机数的起点，默认是0
** @param {end} 	随机数的终点，默认是9
** 返回值说明：
	num类型，返回一个在制定范围内生成的随机数
**/
function getRandom(start,end){
	var start = start || 0;
	var end = end || 9;
	var gap = end - start;
	return Math.ceil(Math.random()*gap + start);
}
export {
  getObjLength,
  getActTime,
  creatRuleString,
  creatRankString,
  getRandom
}