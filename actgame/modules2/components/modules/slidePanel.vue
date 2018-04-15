<!--Date: 16-06-27
	Author: RaysoLi
	Desc: 滑动面板/用于滑动展示奖励等
 -->
 <template lang="jade">
	#slidepanel-root
		#slidepanel-box
			ul( v-bind:style="{ width:ulWidth + 'px'}" class="slidepanel-ul")
				li( v-bind:style="{ width:elementWidth + 'px'}" v-for="(value,index) in slidePanelConfig.kindsConfig" v-bind:class="['slidepanel-li' + index,!(isClickFunc&&detailShowIndex!=index)?'active':null]" @click="detailClick(index)")
					img( v-if="value.img" v-bind:src="baseUrl + value.img")
					span(v-if="slidePanelConfig.isShowDetail && slidePanelConfig.isShowDetail != 'false'" v-bind:class="['slidepanel-award',isClickFunc&&detailShowIndex!=index?'hide':null]" v-html="value.desc")
		ul#slidepanel-dotnav(v-if="slidePanelConfig.isShowDotnav && slidePanelConfig.isShowDotnav != 'false'")
			li(v-for="index in dotnavLength" v-bind:class="['dotnav-li' + index, index - 1 == dotnavIndex?'dotnav-active':null]")
		a(v-if="isShowLeftBtn" class="slidepanel-left-btn" @click="onLeftClick" v-html="slidePanelConfig.leftBtnText")
		a(v-if="isShowRightBtn" class="slidepanel-right-btn" @click="onRightClick" v-html="slidePanelConfig.rightBtnText")
		div.slidepanel-radio(v-if="isShowRadio") {{ dotnavIndex + 1 }} / {{ dotnavLength }}
</template>


<script>
export default {
	data(){
		return{
			isShowLeftBtn: false,
			isShowRightBtn: false,
			dotnavLength:0,
			flag:false,
			dotnavIndex:0,
			viewAreaWidth:0,
			elementWidth:0,
			ulWidth:0,
			isShowRadio:false,
			isClickFunc:false,
			detailShowIndex:0,
		}
	},

	mounted(){

	},

	props:{
		Tools:{
            type: null,
            default: {}
        },
        slidePanelConfig:{
        	type: Object,
        	default: function(){
        		return {
        			kindsConfig: {
        				 "1":{
			                "img":"coin.png",
			                "desc":"2000-10000金币随机赠送"
			            },
			            "2":{
			                "img":"hfq.png",
			                "desc":"1-5话费券随机赠送"
			            },
			            "3":{
			                "img":"mjgz.png",
			                "desc":"麻将公仔"
			            },
			            "4":{
			                "img":"mjbz.png",
			                "desc":"麻将抱枕"
			            },
			            "5":{
			                "img":"djj.png",
			                "desc":"70000金币"
			            },
			            "6":{
			                "img":"poker.png",
			                "desc":"麻将扑克"
			            },
			            "7":{
			                "img":"iphone.png",
			                "desc":"iPhone手机"
			            }
        			},
        			isShowDotnav: true,
        			isShowDetail:true,
                	isShowRadio:true,
        			leftBtnText:"左键",
        			rightBtnText:"右键",
        			singleSlideNum:1,
        			defaultView:0,
        			marginSpace:8,
        			isClickFunc:false,
        			detailShowIndex:0,
        			baseUrl:"",
        			callBackFunc: null
        		}
        	}
        }
	},

	watch: {
		slidePanelConfig: function (newVal, oldVal) {
        	if( this.getObjLength(newVal) <= 0 ){
        		return;
        	}
        	this.isShowLeftBtn = typeof this.slidePanelConfig.leftBtnText =="undefined"?false:true;
			this.isShowRightBtn = typeof this.slidePanelConfig.rightBtnText =="undefined"?false:true;
			if(typeof this.slidePanelConfig.isShowRadio == "undefined" || this.slidePanelConfig.isShowRadio == "true" || this.slidePanelConfig.isShowRadio){
				this.isShowRadio = true;
			}
			if(!this.slidePanelConfig.isShowRadio || this.slidePanelConfig.isShowRadio == "false"){
				this.isShowRadio = false;
			}
			this.isClickFunc = (this.slidePanelConfig.isClickFunc && this.slidePanelConfig.isClickFunc != "false") || this.slidePanelConfig.isClickFunc == "true" ? true : this.isClickFunc;
			this.baseUrl = this.slidePanelConfig.baseUrl || this.baseUrl;
			this.detailShowIndex = this.slidePanelConfig.detailShowIndex || this.detailShowIndex;
        	this.setElementWidth()
        	this.renderDefaultView()
        	this.dispatchEvent()
        }
	},

	methods: {
		renderDefaultView(){
			this.dotnavIndex = parseInt(this.slidePanelConfig.defaultView) - 1;
			let index = parseInt(this.slidePanelConfig.singleSlideNum) * this.dotnavIndex;
			$("#slidepanel-box li:lt("+ index +")").appendTo($("#slidepanel-box ul"));
		},
		onLeftClick(){
			if(this.flag) return;
			this.flag = true;
			this.dotnavIndex = (--this.dotnavIndex + this.dotnavLength) % this.dotnavLength;
			this.detailShowIndex = this.dotnavIndex * parseInt(this.slidePanelConfig.singleSlideNum) + 1;
			let index = $("#slidepanel-box li").length - (parseInt(this.slidePanelConfig.singleSlideNum) + 1);
			$("#slidepanel-box ul").addClass("slidepanel-to-left");
			$("#slidepanel-box li:gt("+index+")").prependTo($("#slidepanel-box ul"));
			setTimeout( ()=>{
				$("#slidepanel-box ul").removeClass("slidepanel-to-left");
				this.flag = false;
			},800)
			this.dispatchEvent()
		},

		onRightClick(){
			if(this.flag) return;
			this.flag = true;
			this.dotnavIndex = (++this.dotnavIndex) % this.dotnavLength;
			this.detailShowIndex = this.dotnavIndex * parseInt(this.slidePanelConfig.singleSlideNum) + 1;
			$("#slidepanel-box ul").addClass("slidepanel-to-right");
			setTimeout(()=>{
				$("#slidepanel-box ul").removeClass("slidepanel-to-right");
				$("#slidepanel-box li:lt("+ parseInt(this.slidePanelConfig.singleSlideNum) +")").appendTo($("#slidepanel-box ul"));
				this.flag = false;
			},800)
			this.dispatchEvent()
		},

		setElementWidth(){
			setTimeout(()=>{
				let length = this.getObjLength( this.slidePanelConfig.kindsConfig )
				this.dotnavLength = Math.ceil( length / parseInt(this.slidePanelConfig.singleSlideNum) )
				this.viewAreaWidth = $("#slidepanel-box").width();
				let num = parseInt(this.slidePanelConfig.singleSlideNum);
				let marginSpace = parseInt(this.slidePanelConfig.marginSpace);
				this.elementWidth = Math.floor((this.viewAreaWidth-marginSpace*num)/num);
				this.ulWidth = (this.elementWidth + marginSpace*2) * length;
				var viewAreaWidth = this.elementWidth*num + marginSpace*(num*2);
				$("#slidepanel-box").width(viewAreaWidth);
				this.insertAnimation(viewAreaWidth);
				this.dispatchEvent();
			},300)			
		},

		dispatchEvent(){
			let msg = this.dotnavIndex
			if(this.$parent.listenSlidePanelStatus){
				this.$parent.listenSlidePanelStatus(msg)
			}
		},

		getObjLength(obj){
    		if(null === obj || undefined === obj){
    			return 0;
    		}

    		if(undefined === obj.length){
	    		let count = 0
			    for(let key in obj){
			    	count++
			    }
			    return count
			}else{
				return obj['length']
			}
    	},
    	detailClick:function(index){
    		if(!this.isClickFunc) return
    		this.detailShowIndex = index;
    	},
    	insertAnimation(viewAreaWidth){
			var slideSpace = -viewAreaWidth;
    		var rule = "#slidepanel-box >ul >li {\n"+
    			"margin:0 " + parseInt(this.slidePanelConfig.marginSpace) + "px;}n" +
    			"@-webkit-keyframes slidepanel-toleft{\n"+
			    "0%{transform:translateX("+ slideSpace + "px);-webkit-transform:translateX("+ slideSpace +"px);}}" +
				"100% {transform:translateX(0%);-webkit-transform:translateX(0%);}\n"+
			    "@keyframes slidepanel-toleft{\n"+
			    "0%{transform:translateX("+ slideSpace + "px);-webkit-transform:translateX("+ slideSpace +"px);}}"+
				"100% {transform:translateX(0%);-webkit-transform:translateX(0%);}\n"+
			    "@-webkit-keyframes slidepanel-toright{\n"+
				"0% {transform:translateX(0%);-webkit-transform:translateX(0%);}\n"+
			    "100%{transform:translateX("+ slideSpace + "px);-webkit-transform:translateX("+ slideSpace +"px);}}" +
			    "@keyframes slidepanel-toright{\n"+
				"0% {transform:translateX(0%);-webkit-transform:translateX(0%);}\n"+
			    "100%{transform:translateX("+ slideSpace + "px);-webkit-transform:translateX("+ slideSpace +"px);}}";

			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = rule;
			document.getElementsByTagName('head')[0].appendChild(style);
			this.stylesheet = document.styleSheets[document.styleSheets.length-1];
			try {
				this.stylesheet.insertRule( rule , this.stylesheet.rules.length);
			} catch (e) {};
    	}
	},
}
</script>


<style>
#slidepanel-root {
    position: absolute;
    right: 17%;
    top: 10%;
    height: 32.6%;
    border-width: .25em;
    border-radius: .3em;
    background: rgba(0, 29, 74, .9);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

.slidepanel-left-btn,
.slidepanel-right-btn {
    line-height: 1.3;
    position: absolute;
    top: 36%;
    width: 1.3em;
    height: 1.3em;
    cursor: pointer;
    text-decoration: none;
    color: #005adf;
    border-radius: 50%;
    background: #052f72;
}

.slidepanel-left-btn {
    left: 1%;
}

.slidepanel-right-btn {
    right: 1%;
}

#slidepanel-box {
    overflow: hidden;
    height: 84%;
    margin: 0 auto;
}

#slidepanel-box >ul {
    height: 100%;
}

#slidepanel-box >ul >li {
    float: left;
    height: 100%;
    text-align: center;
}

#slidepanel-box >ul >li {
    float: left;
    position: relative;
    height: 100%;
    border-radius: .2em;
    background: #164699;
    box-shadow: inset 0 0 1em #47caf4;
}

#slidepanel-box >ul >li:before {
    display: inline-block;
    width: 84%;
    content: '';
}

.slidepanel-award {
    position: absolute;
    bottom: 0;
    color: #fff;
    left: 0;
    width: 100%;
    text-align: center;
}

#slidepanel-dotnav:after,
#slidepanel-box >ul:after {
    display: block;
    clear: both;
    content: '';
}

#slidepanel-dotnav {
    text-align: center;
    line-height: 1;
}

#slidepanel-dotnav >li {
    display: inline-block;
    width: .5em;
    height: .5em;
    margin: 0 .2em;
    border-radius: 50%;
    background: #3b7fff;
    list-style: none;
}

#slidepanel-dotnav .dotnav-active {
    background: #01fff6;
}

.slidepanel-to-left {
    -webkit-animation: slidepanel-toleft 0.8s 1;
    animation: slidepanel-toleft 0.8s 1;
}

.slidepanel-to-right {
    -webkit-animation: slidepanel-toright 0.8s 1;
    animation: slidepanel-toright 0.8s 1;
}
.slidepanel-radio{
	position: absolute;
	right: 0;
	text-align: center;
	letter-spacing: -0.1em;
}
.hide{
	display: none;
}
</style>