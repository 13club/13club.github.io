/*
*Description:	Theme Javascript
*Author:		TOYEAN
*Website:		http://www.toyean.com/
*Mail:		toyean@qq.com
*Weibo:		http://weibo.com/toyean
*Version:		V1.0(2018-09-05)
*/
var CountUp=function(target,startVal,endVal,decimals,duration,options){var lastTime=0;var vendors=['webkit','moz','ms','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame']};if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}};if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id)}};var self=this;self.version=function(){return'1.8.5'};function formatNumber(num){num=num.toFixed(self.decimals);num+='';var x,x1,x2,rgx;x=num.split('.');x1=x[0];x2=x.length>1?self.options.decimal+x[1]:'';rgx=/(\d+)(\d{3})/;if(self.options.useGrouping){while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+self.options.separator+'$2')}};return self.options.prefix+x1+x2+self.options.suffix};function easeOutExpo(t,b,c,d){return c*(-Math.pow(2,-10*t/d)+1)*1024/1023+b};function ensureNumber(n){return(typeof n==='number'&&!isNaN(n))};self.options={useEasing:true,useGrouping:true,separator:',',decimal:'.',easingFn:easeOutExpo,formattingFn:formatNumber,prefix:'',suffix:''};if(options&&typeof options==='object'){for(var key in self.options){if(options.hasOwnProperty(key)&&options[key]!==null){self.options[key]=options[key]}}};if(self.options.separator==='')self.options.useGrouping=false;self.initialize=function(){if(self.initialized)return true;self.d=(typeof target==='string')?document.getElementById(target):target;if(!self.d){return false};self.startVal=Number(startVal);self.endVal=Number(endVal);if(ensureNumber(self.startVal)&&ensureNumber(self.endVal)){self.decimals=Math.max(0,decimals||0);self.dec=Math.pow(10,self.decimals);self.duration=Number(duration)*1000||2000;self.countDown=(self.startVal>self.endVal);self.frameVal=self.startVal;self.initialized=true;return true}else{console.error('[CountUp] startVal or endVal is not a number',self.startVal,self.endVal);return false}};self.printValue=function(value){var result=self.options.formattingFn(value);if(self.d.tagName==='INPUT'){this.d.value=result}else if(self.d.tagName==='text'||self.d.tagName==='tspan'){this.d.textContent=result}else{this.d.innerHTML=result}};self.count=function(timestamp){if(!self.startTime){self.startTime=timestamp};self.timestamp=timestamp;var progress=timestamp-self.startTime;self.remaining=self.duration-progress;if(self.options.useEasing){if(self.countDown){self.frameVal=self.startVal-self.options.easingFn(progress,0,self.startVal-self.endVal,self.duration)}else{self.frameVal=self.options.easingFn(progress,self.startVal,self.endVal-self.startVal,self.duration)}}else{if(self.countDown){self.frameVal=self.startVal-((self.startVal-self.endVal)*(progress/self.duration))}else{self.frameVal=self.startVal+(self.endVal-self.startVal)*(progress/self.duration)}};if(self.countDown){self.frameVal=(self.frameVal<self.endVal)?self.endVal:self.frameVal}else{self.frameVal=(self.frameVal>self.endVal)?self.endVal:self.frameVal};self.frameVal=Math.round(self.frameVal*self.dec)/self.dec;self.printValue(self.frameVal);if(progress<self.duration){self.rAF=requestAnimationFrame(self.count)}else{if(self.callback)self.callback()}};self.start=function(callback){if(!self.initialize())return;self.callback=callback;self.rAF=requestAnimationFrame(self.count)};self.pauseResume=function(){if(!self.paused){self.paused=true;cancelAnimationFrame(self.rAF)}else{self.paused=false;delete self.startTime;self.duration=self.remaining;self.startVal=self.frameVal;requestAnimationFrame(self.count)}};self.reset=function(){self.paused=false;delete self.startTime;self.initialized=false;if(self.initialize()){cancelAnimationFrame(self.rAF);self.printValue(self.startVal)}};self.update=function(newEndVal){if(!self.initialize())return;newEndVal=Number(newEndVal);if(!ensureNumber(newEndVal)){return};if(newEndVal===self.frameVal)return;cancelAnimationFrame(self.rAF);self.paused=false;delete self.startTime;self.startVal=self.frameVal;self.endVal=newEndVal;self.countDown=(self.startVal>self.endVal);self.rAF=requestAnimationFrame(self.count)};if(self.initialize())self.printValue(self.startVal)}

//延迟加载
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(5($){$.J.L=5(r){8 1={d:0,A:0,b:"h",v:"N",3:4};6(r){$.D(1,r)}8 m=9;6("h"==1.b){$(1.3).p("h",5(b){8 C=0;m.t(5(){6(!$.k(9,1)&&!$.l(9,1)){$(9).z("o")}j{6(C++>1.A){g B}}});8 w=$.M(m,5(f){g!f.e});m=$(w)})}g 9.t(5(){8 2=9;$(2).c("s",$(2).c("i"));6("h"!=1.b||$.k(2,1)||$.l(2,1)){6(1.u){$(2).c("i",1.u)}j{$(2).K("i")}2.e=B}j{2.e=x}$(2).T("o",5(){6(!9.e){$("<V />").p("X",5(){$(2).Y().c("i",$(2).c("s"))[1.v](1.Z);2.e=x}).c("i",$(2).c("s"))}});6("h"!=1.b){$(2).p(1.b,5(b){6(!2.e){$(2).z("o")}})}})};$.k=5(f,1){6(1.3===E||1.3===4){8 7=$(4).F()+$(4).O()}j{8 7=$(1.3).n().G+$(1.3).F()}g 7<=$(f).n().G-1.d};$.l=5(f,1){6(1.3===E||1.3===4){8 7=$(4).I()+$(4).U()}j{8 7=$(1.3).n().q+$(1.3).I()}g 7<=$(f).n().q-1.d};$.D($.P[\':\'],{"Q-H-7":"$.k(a, {d : 0, 3: 4})","R-H-7":"!$.k(a, {d : 0, 3: 4})","S-y-7":"$.l(a, {d : 0, 3: 4})","q-y-7":"!$.l(a, {d : 0, 3: 4})"})})(W);',62,62,'|settings|self|container|window|function|if|fold|var|this||event|attr|threshold|loaded|element|return|scroll|src|else|belowthefold|rightoffold|elements|offset|appear|bind|left|options|original|each|placeholder|effect|temp|true|of|trigger|failurelimit|false|counter|extend|undefined|height|top|the|width|fn|removeAttr|lazyload|grep|show|scrollTop|expr|below|above|right|one|scrollLeft|img|jQuery|load|hide|effectspeed'.split('|'),0,{}));

$(function(){
	function countup(){
		var countnum = $(".countup").length;
		if(countnum > 0){
			var windowHeight = $(window).height();
			var windowScrolltop = $(window).scrollTop();
			var counttop  =  $(".countup").offset().top;
			var countheight  =  $(".countup").outerHeight();
			if(is_running==false){
				if(windowScrolltop + windowHeight > counttop + countheight && counttop > windowScrolltop){
					var num01 = new CountUp("num01", 0, $("#num01").data("num"), 0, 2);
					num01.start();
					var num02 = new CountUp("num02", 0, $("#num02").data("num"), 0, 2);
					num02.start();
					var num03 = new CountUp("num03", 0, $("#num03").data("num"), 0, 2);
					num03.start();
					var num04 = new CountUp("num04", 0, $("#num04").data("num"), 0, 2);
					num04.start();
					is_running=true;
				}
			}
		}
	}
	var is_running = false;
	$(window).scroll(function(){
		countup();
	});
	countup();
});
function copyright(){document.oncontextmenu=function(){return false};document.onselectstart=function(){return false};function closepage(){window.close()};if((window.console&&(console.firebug||console.table&&/firebug/i.test(console.table())))||(typeof opera=='object'&&typeof opera.postError=='function'&&console.profile.length>0)){closepage()};if(typeof console.profiles=="object"&&console.profiles.length>0){closepage()};window.onresize=function(){if((window.outerHeight-window.innerHeight)>200){closepage()}}}
$(function(){
	var $thisSrc = $(".salethumb img").attr("src");
	var $thisImg = $(".buyimg ul li");
	$(".buyimg ul li:first").addClass("on");
	$thisImg.hover(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var $imgLink = $(this).find("img").attr("src");
		$(".salethumb img").attr("src",$imgLink);
	});
	var $firstImg = $(".buyimg ul li.on img").attr("src");
	$(".salethumb img").attr("src",$firstImg);
});
$(function(){var __encode ='sojson.com', _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(window);var __Ox1b55a=["\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x72\x65\x66","\x23","\x73\x70\x6C\x69\x74","\x61\x63\x74\x69\x76\x65","\x61\x64\x64\x43\x6C\x61\x73\x73","\x70\x72\x65\x76","\x2E\x73\x75\x62\x6E\x61\x76","\x70\x61\x72\x65\x6E\x74","\x65\x61\x63\x68","\x2E\x6D\x65\x6E\x75\x20\x61","\x6F\x6E","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x73\x69\x62\x6C\x69\x6E\x67\x73","\x2E\x62\x74\x6D\x6E\x61\x76\x20\x61","\x2E\x70\x61\x67\x65\x73\x69\x64\x65\x20\x61\x2C\x2E\x70\x6F\x73\x74\x73\x69\x64\x65\x20\x61","\x2E\x70\x6F\x73\x74\x63\x61\x74\x65\x6C\x69\x73\x74\x20\x61","\x68\x6F\x76\x65\x72","\x2E\x6D\x65\x6E\x75\x20\x6C\x69\x3E\x61\x2C\x2E\x70\x6F\x73\x74\x69\x6D\x67\x20\x61\x2C\x2E\x73\x69\x64\x65\x6C\x69\x73\x74\x69\x6D\x67\x20\x61\x2C\x2E\x69\x74\x65\x6D\x69\x6D\x67\x20\x61","\x73\x75\x62\x6D\x69\x74","\x2E\x62\x74\x6E","\x2E\x73\x65\x61\x72\x63\x68\x66\x6F\x72\x6D","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x4D\x6F\x62\x69\x6C\x65","\x6D\x61\x74\x63\x68","\x61\x74\x74\x72","\x73\x6C\x69\x64\x65\x64\x6F\x77\x6E","\x74\x6F\x67\x67\x6C\x65\x43\x6C\x61\x73\x73","\x63\x6C\x69\x63\x6B","\x2E\x73\x75\x62\x63\x61\x74\x65\x3E\x61","\x69\x6E\x64\x65\x78","\x65\x71","\x2E\x73\x65\x72\x76\x69\x63\x65\x20\x2E\x74\x61\x62\x63\x6F\x6E\x20\x6C\x69","\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72","\x2E\x73\x65\x72\x76\x69\x63\x65\x20\x2E\x74\x61\x62\x6E\x61\x76\x20\x75\x6C\x20\x6C\x69","\x2E\x74\x61\x62\x62\x6F\x78\x20\x2E\x74\x61\x62\x63\x6F\x6E\x20\x75\x6C","\x61","\x66\x69\x6E\x64","\x2E\x74\x61\x62\x62\x6F\x78\x20\x2E\x74\x61\x62\x6E\x61\x76\x20\x6C\x69","\x2E\x6E\x65\x77\x73\x74\x61\x62\x6E\x61\x76\x20\x6C\x69\x3A\x66\x69\x72\x73\x74\x2C\x2E\x6E\x65\x77\x73\x74\x61\x62\x63\x6F\x6E\x20\x75\x6C\x3A\x66\x69\x72\x73\x74","\x2E\x6E\x65\x77\x73\x74\x61\x62\x63\x6F\x6E\x20\x75\x6C","\x2E\x6E\x65\x77\x73\x74\x61\x62\x6E\x61\x76\x20\x6C\x69","\x2E\x62\x75\x79\x6D\x61\x69\x6E\x74\x61\x62\x63\x6F\x6E\x20\x64\x6C","\x2E\x62\x75\x79\x6D\x61\x69\x6E\x74\x61\x62\x6E\x61\x76\x20\x6C\x69","\x6F\x76\x65\x72","\x64\x64","\x2E\x62\x75\x79\x73\x69\x64\x65\x20\x64\x74","\x2E\x61\x6C\x6C\x20\x75\x6C","\x2E\x6D\x65\x6E\x75","\x2E\x6D\x65\x6E\x75\x69\x63\x6F","\x73\x72\x63","\x2E\x73\x61\x6C\x65\x74\x68\x75\x6D\x62\x20\x69\x6D\x67","\x2E\x73\x61\x6C\x65\x69\x6D\x67\x20\x75\x6C\x20\x6C\x69","\x2E\x73\x61\x6C\x65\x69\x6D\x67\x20\x75\x6C\x20\x6C\x69\x3A\x66\x69\x72\x73\x74","\x69\x6D\x67","\x2E\x73\x61\x6C\x65\x69\x6D\x67\x20\x75\x6C\x20\x6C\x69\x2E\x6F\x6E\x20\x69\x6D\x67","\x76\x61\x6C","\x2E\x6D\x65\x6D\x6F","\x2E\x57\x49\x44\x62\x6F\x64\x79","\x62\x6C\x75\x72","\x3C\x65\x6D\x3E\x3C\x2F\x65\x6D\x3E","\x61\x70\x70\x65\x6E\x64","\x2E\x73\x69\x74\x65\x6E\x61\x76\x20\x6C\x69\x20\x61","\x69\x6E","\x2E\x62\x75\x79\x62\x6F\x78\x20\x64\x6C","\x2E\x64\x69\x61\x6C\x6F\x67","\x2E\x74\x6F\x62\x75\x79","\x2E\x63\x6C\x6F\x73\x65","\x2E\x73\x65\x61\x72\x63\x68\x66\x6F\x72\x6D\x20\x2E\x74\x65\x78\x74","\x74\x72\x69\x6D","","\u8BF7\u60A8\u8F93\u5165\u641C\u7D22\u5185\u5BB9\x21","\x2E\x73\x65\x61\x72\x63\x68\x66\x6F\x72\x6D\x20\x2E\x62\x74\x6E","\x6C\x65\x6E\x67\x74\x68","\x2E\x63\x6D\x74\x66\x6F\x72\x6D\x20\x2E\x74\x65\x78\x74","\x73\x6C\x69\x64\x65\x44\x6F\x77\x6E","\x2E\x63\x6D\x74\x66\x6F\x72\x6D","\x66\x6F\x63\x75\x73","\x23\x74\x78\x61\x41\x72\x74\x69\x63\x6C\x65","\x73\x69\x64\x65\x66\x69\x78\x65\x64","\x2E\x73\x69\x64\x65\x62\x6F\x78","\x74\x6F\x70","\x6F\x66\x66\x73\x65\x74","\x2E\x73\x69\x64\x65\x62\x6F\x78\x3A\x6C\x61\x73\x74\x2D\x6F\x66\x2D\x74\x79\x70\x65","\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70","\x66\x69\x78\x65\x64","\x73\x63\x72\x6F\x6C\x6C","\x6C\x61\x7A\x79\x6C\x6F\x61\x64","\x64\x61\x74\x61\x3A\x69\x6D\x61\x67\x65\x2F\x67\x69\x66\x3B\x62\x61\x73\x65\x36\x34\x2C\x52\x30\x6C\x47\x4F\x44\x6C\x68\x41\x51\x41\x42\x41\x41\x41\x41\x41\x43\x48\x35\x42\x41\x45\x4B\x41\x41\x45\x41\x4C\x41\x41\x41\x41\x41\x41\x42\x41\x41\x45\x41\x41\x41\x49\x43\x54\x41\x45\x41\x4F\x77\x3D\x3D","\x66\x61\x64\x65\x49\x6E","\x73\x69\x7A\x65","\x2E\x66\x6F\x63\x75\x73\x20\x2E\x73\x77\x69\x70\x65\x72\x2D\x73\x6C\x69\x64\x65","\x73\x6C\x69\x64\x65\x65\x66\x66\x65\x63\x74","\x2E\x73\x77\x69\x70\x65\x72\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x2E\x73\x77\x69\x70\x65\x72\x2D\x70\x61\x67\x69\x6E\x61\x74\x69\x6F\x6E","\x2E\x73\x77\x69\x70\x65\x72\x2D\x62\x75\x74\x74\x6F\x6E\x2D\x70\x72\x65\x76","\x2E\x73\x77\x69\x70\x65\x72\x2D\x62\x75\x74\x74\x6F\x6E\x2D\x6E\x65\x78\x74","\x66\x61\x64\x65","\x6E\x75\x6C\x6C","\x2E\x6D\x66\x6F\x63\x75\x73\x20\x2E\x73\x77\x69\x70\x65\x72\x2D\x73\x6C\x69\x64\x65","\x2E\x6D\x66\x6F\x63\x75\x73","\x62\x61\x63\x6B\x74\x6F\x74\x6F\x70","\u8FD4\u56DE\u9876\u90E8","\x61\x6E\x69\x6D\x61\x74\x65","\x68\x74\x6D\x6C\x2C\x20\x62\x6F\x64\x79","\x74\x69\x74\x6C\x65","\x62\x6F\x64\x79","\x61\x70\x70\x65\x6E\x64\x54\x6F","\x3C\x61\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x61\x63\x6B\x74\x6F\x74\x6F\x70\x22\x3E\x3C\x69\x3E\x3C\x2F\x69\x3E\x3C\x2F\x61\x3E","\x68\x65\x69\x67\x68\x74","\x73\x68\x6F\x77","\x68\x69\x64\x65","\x58\x4D\x4C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74","\x63\x73\x73","\x62\x69\x6E\x64","\x73\x65\x6C\x65\x63\x74\x73\x74\x61\x72\x74"];var s=document[__Ox1b55a[0]];$(__Ox1b55a[10])[__Ox1b55a[9]](function(){if(this[__Ox1b55a[1]]== s.toString()[__Ox1b55a[3]](__Ox1b55a[2])[0]){$(this)[__Ox1b55a[5]](__Ox1b55a[4])[__Ox1b55a[8]](__Ox1b55a[7])[__Ox1b55a[6]]()[__Ox1b55a[5]](__Ox1b55a[4]);return false}});$(__Ox1b55a[14])[__Ox1b55a[9]](function(){if(this[__Ox1b55a[1]]== s.toString()[__Ox1b55a[3]](__Ox1b55a[2])[0]){$(this)[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);return false}});$(__Ox1b55a[15])[__Ox1b55a[9]](function(){if(this[__Ox1b55a[1]]== s.toString()[__Ox1b55a[3]](__Ox1b55a[2])[0]){$(this)[__Ox1b55a[5]](__Ox1b55a[11]);return false}});$(__Ox1b55a[16])[__Ox1b55a[9]](function(){if(this[__Ox1b55a[1]]== s.toString()[__Ox1b55a[3]](__Ox1b55a[2])[0]){$(this)[__Ox1b55a[5]](__Ox1b55a[11]);return false}});$(__Ox1b55a[18])[__Ox1b55a[17]](function(){$(this)[__Ox1b55a[5]](__Ox1b55a[11])},function(){$(this)[__Ox1b55a[12]](__Ox1b55a[11])});$(__Ox1b55a[21])[__Ox1b55a[19]](function(){$(__Ox1b55a[20])[__Ox1b55a[5]](__Ox1b55a[19])});var useragent=navigator[__Ox1b55a[22]];var ismobile=useragent[__Ox1b55a[24]](__Ox1b55a[23]);$(__Ox1b55a[29])[__Ox1b55a[28]](function(){if(ismobile== null){window[__Ox1b55a[0]][__Ox1b55a[1]]= $(this)[__Ox1b55a[25]](__Ox1b55a[1])}else {$(this)[__Ox1b55a[8]]()[__Ox1b55a[27]](__Ox1b55a[26])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[26]);return false}});$(__Ox1b55a[34])[__Ox1b55a[33]](function(){$(__Ox1b55a[32])[__Ox1b55a[31]]($(this)[__Ox1b55a[30]]())[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);$(this)[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);return false});$(__Ox1b55a[38])[__Ox1b55a[33]](function(){$(__Ox1b55a[35])[__Ox1b55a[31]]($(this)[__Ox1b55a[30]]())[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);$(this)[__Ox1b55a[37]](__Ox1b55a[36])[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[8]]()[__Ox1b55a[13]]()[__Ox1b55a[37]](__Ox1b55a[36])[__Ox1b55a[12]](__Ox1b55a[11]);return false});$(__Ox1b55a[39])[__Ox1b55a[5]](__Ox1b55a[11]);$(__Ox1b55a[41])[__Ox1b55a[33]](function(){$(__Ox1b55a[40])[__Ox1b55a[31]]($(this)[__Ox1b55a[30]]())[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);$(this)[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);return false});$(__Ox1b55a[43])[__Ox1b55a[28]](function(){$(__Ox1b55a[42])[__Ox1b55a[31]]($(this)[__Ox1b55a[30]]())[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);$(this)[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);return false});$(__Ox1b55a[46])[__Ox1b55a[6]](__Ox1b55a[45])[__Ox1b55a[5]](__Ox1b55a[44]);$(__Ox1b55a[47])[__Ox1b55a[17]](function(){$(this)[__Ox1b55a[5]](__Ox1b55a[11])},function(){$(this)[__Ox1b55a[12]](__Ox1b55a[11])});$(__Ox1b55a[49])[__Ox1b55a[28]](function(){$(this)[__Ox1b55a[27]](__Ox1b55a[11]);$(__Ox1b55a[48])[__Ox1b55a[27]](__Ox1b55a[11])});var $thisSrc=$(__Ox1b55a[51])[__Ox1b55a[25]](__Ox1b55a[50]);var $thisImg=$(__Ox1b55a[52]);$(__Ox1b55a[53])[__Ox1b55a[5]](__Ox1b55a[11]);$thisImg[__Ox1b55a[17]](function(){$(this)[__Ox1b55a[5]](__Ox1b55a[11])[__Ox1b55a[13]]()[__Ox1b55a[12]](__Ox1b55a[11]);var _0xe35ex6=$(this)[__Ox1b55a[37]](__Ox1b55a[54])[__Ox1b55a[25]](__Ox1b55a[50]);$(__Ox1b55a[51])[__Ox1b55a[25]](__Ox1b55a[50],_0xe35ex6)});var $firstImg=$(__Ox1b55a[55])[__Ox1b55a[25]](__Ox1b55a[50]);$(__Ox1b55a[51])[__Ox1b55a[25]](__Ox1b55a[50],$firstImg);$(__Ox1b55a[57])[__Ox1b55a[59]](function(){$(__Ox1b55a[57])[__Ox1b55a[56]]($(this)[__Ox1b55a[56]]());$(__Ox1b55a[58])[__Ox1b55a[56]]($(this)[__Ox1b55a[56]]())});$(__Ox1b55a[62])[__Ox1b55a[61]](__Ox1b55a[60]);$(__Ox1b55a[66])[__Ox1b55a[28]](function(){$(__Ox1b55a[64])[__Ox1b55a[5]](__Ox1b55a[63]);$(__Ox1b55a[65])[__Ox1b55a[5]](__Ox1b55a[11])});$(__Ox1b55a[67])[__Ox1b55a[28]](function(){$(__Ox1b55a[64])[__Ox1b55a[12]](__Ox1b55a[63]);$(__Ox1b55a[65])[__Ox1b55a[12]](__Ox1b55a[11])});$(__Ox1b55a[21])[__Ox1b55a[19]](function(){var _0xe35ex8=$(__Ox1b55a[68])[__Ox1b55a[56]]();_0xe35ex8= $[__Ox1b55a[69]](_0xe35ex8);if(_0xe35ex8== __Ox1b55a[70]){alert(__Ox1b55a[71]);$(__Ox1b55a[72])[__Ox1b55a[12]](__Ox1b55a[19]);return false}});$(__Ox1b55a[78])[__Ox1b55a[77]](function(){var _0xe35ex9=$(__Ox1b55a[74])[__Ox1b55a[73]];if(_0xe35ex9> 0){$(__Ox1b55a[76])[__Ox1b55a[75]]()}});if(tco[__Ox1b55a[79]]){if($(__Ox1b55a[80])[__Ox1b55a[73]]> 0){var main_top=$(__Ox1b55a[83])[__Ox1b55a[82]]()[__Ox1b55a[81]];$(window)[__Ox1b55a[86]](function(){if($(window)[__Ox1b55a[84]]()> main_top){$(__Ox1b55a[83])[__Ox1b55a[5]](__Ox1b55a[85])}else {$(__Ox1b55a[83])[__Ox1b55a[12]](__Ox1b55a[85])}})}};if(tco[__Ox1b55a[87]]){$(__Ox1b55a[54])[__Ox1b55a[87]]({placeholder:__Ox1b55a[88],effect:__Ox1b55a[89],threshold:200})};if($(__Ox1b55a[91])[__Ox1b55a[90]]()!= 1){if(tco[__Ox1b55a[92]]){var swiper= new Swiper(__Ox1b55a[93],{pagination:__Ox1b55a[94],paginationClickable:true,slidesPerView:1,spaceBetween:0,autoplay:2500,loop:true,prevButton:__Ox1b55a[95],nextButton:__Ox1b55a[96],effect:__Ox1b55a[97]})}else {var swiper= new Swiper(__Ox1b55a[93],{pagination:__Ox1b55a[94],paginationClickable:true,slidesPerView:1,spaceBetween:0,autoplay:2500,loop:true,prevButton:__Ox1b55a[95],nextButton:__Ox1b55a[96]})}}else {var swiper= new Swiper(__Ox1b55a[93],{pagination:__Ox1b55a[98],noSwiping:true,prevButton:__Ox1b55a[98],nextButton:__Ox1b55a[98],simulateTouch:false})};if($(__Ox1b55a[99])[__Ox1b55a[90]]()!= 1){if(tco[__Ox1b55a[92]]){var mswiper= new Swiper(__Ox1b55a[100],{pagination:__Ox1b55a[94],paginationClickable:true,slidesPerView:1,spaceBetween:0,autoplay:2500,loop:true,prevButton:__Ox1b55a[95],nextButton:__Ox1b55a[96],effect:__Ox1b55a[97]})}else {var mswiper= new Swiper(__Ox1b55a[100],{pagination:__Ox1b55a[94],paginationClickable:true,slidesPerView:1,spaceBetween:0,autoplay:2500,loop:true,prevButton:__Ox1b55a[95],nextButton:__Ox1b55a[96]})}}else {var mswiper= new Swiper(__Ox1b55a[100],{pagination:__Ox1b55a[98],noSwiping:true,prevButton:__Ox1b55a[98],nextButton:__Ox1b55a[98],simulateTouch:false})};if(tco[__Ox1b55a[101]]){(function(){var _0xe35exd=__Ox1b55a[102],_0xe35exe=$(__Ox1b55a[108])[__Ox1b55a[107]]($(__Ox1b55a[106]))[__Ox1b55a[25]](__Ox1b55a[105],_0xe35exd)[__Ox1b55a[28]](function(){$(__Ox1b55a[104])[__Ox1b55a[103]]({scrollTop:0},0)}),_0xe35exf=function(){var _0xe35ex10=$(document)[__Ox1b55a[84]](),_0xe35ex11=$(window)[__Ox1b55a[109]]();(_0xe35ex10> 500)?_0xe35exe[__Ox1b55a[110]]():_0xe35exe[__Ox1b55a[111]]();if(!window[__Ox1b55a[112]]){_0xe35exe[__Ox1b55a[113]](__Ox1b55a[81],_0xe35ex10+ _0xe35ex11- 166)}};$(window)[__Ox1b55a[114]](__Ox1b55a[86],_0xe35exf);_0xe35exf()})()};if(tco[__Ox1b55a[115]]){copyright()}});