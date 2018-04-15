<!--Date: 16-04-18
	Author: jeffjade
	Desc: 大转盘/抽奖等功能模块组件
 -->
 <template lang="jade">
	#turntable-root
		#turntable-drawbox
			ul(class="award-wrap" v-if="isShowAward")
				li(v-for="(value,index) in turnTableConfig.awardList")
					img(v-bind:src="turnTableConfig.baseUrl + value.img")
					span(v-html="value.desc")
		div(id="turntable-drawpoint" v-on:click="onDrawboxCallback")
</template>


<script>
export default {
	data(){
		return{
			$turnTarget:null,
			requestSuccData:{},
			flag:false,
			isShowAward:false,
		}
	},

	mounted(){
		
	},

	props:{
		Tools:{
            type: null,
            default: {}
        },
        turnTableConfig:{
        	type: Object,
        	default: function(){
        		return {
        			rewardKinds: 8,
        			resumeDelay: 1000,
        			rotateNums: 3,
        			imgOffset: 22.5,
        			isTableRotate:false,
        			baseUrl:null,
        			callBackFunc: null
        		}
        	}
        }
	},

	methods: {
		onDrawboxCallback: function(event){
			this.startupDrawbox()
		},
		startupDrawbox: function(){
			if(this.flag) return;
			this.flag = true;
			this.Tools.ajax({"p":"complete","extra":{"keys":"turntable"}}, (succData)=>{
				this.requestSuccData = succData || {};
				let rewardKinds = this.turnTableConfig.rewardKinds
				let rotateNums = this.turnTableConfig.rotateNums
				let isTableRotate = this.turnTableConfig.isTableRotate
				if( succData.status >= 0 ){
					let offset = (360/rewardKinds)*(succData.num-1)
					let angel = 0;
					if( isTableRotate ){
						angel = -(360*rotateNums)-offset - this.turnTableConfig.imgOffset
					}else{
						angel = (360*rotateNums)+offset + this.turnTableConfig.imgOffset
					}
					let cssObj = {'-webkit-transform':'rotate('+angel+'deg)','transform':'rotate('+angel+'deg)'}
					this.$turnTarget.addClass('turntable-transition').css( cssObj );
				}else{
					this.excuteCallBackFunc()
				}
			})
		},
		excuteCallBackFunc: function(){
			if(null !== this.turnTableConfig.callBackFunc){
            	this.turnTableConfig.callBackFunc( this.requestSuccData );
            }
		},
		goBackZero:function(){
			this.flag = false;
        	this.$turnTarget.removeClass('turntable-transition').css({'-webkit-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
		},
		getObjLength:function(obj){
			var count = 0;
			for(var i in obj){
				count++;
			}
			return count;
		},
		creatAwardStyle:function(){
			var sdkStyle = "";
			var singleAngle = 360 / parseInt(this.turnTableConfig.rewardKinds);
			for(var i=0;i<this.turnTableConfig.rewardKinds;i++){
				sdkStyle += "#turntable-root .award-wrap li:nth-child(" + (i+1) + "){"
				            + "-webkit-transform:translateX(-50%) rotate(" + (singleAngle * i + this.turnTableConfig.imgOffset) + "deg);"
				            + "transform:translateX(-50%) rotate(" + (singleAngle * i + this.turnTableConfig.imgOffset) + "deg);}" 
			}
	        var styleElement = document.createElement("style");
	        styleElement.innerHTML = sdkStyle;
	        document.getElementsByTagName("head")[0].appendChild(styleElement)
		}
	},
	watch:{
		turnTableConfig:function(newD,oldD){
			let isTableRotateFlag = this.turnTableConfig.isTableRotate
			this.isShowAward = this.turnTableConfig.awardList ? true : false
			this.turnTableConfig.rewardKinds = this.turnTableConfig.awardList ? this.getObjLength(this.turnTableConfig.awardList) : this.turnTableConfig.rewardKinds
			if(this.isShowAward){
				this.creatAwardStyle();
			}
			this.$turnTarget = (isTableRotateFlag === true) ? $('#turntable-drawbox') : $('#turntable-drawpoint')

			this.$turnTarget[0].addEventListener('webkitTransitionEnd', ()=>{
	            setTimeout( ()=>{
	            	this.excuteCallBackFunc()
	            }, this.turnTableConfig.resumeDelay );
			}, false);
		}
	}
}
</script>


<style>
#turntable-root {
	position: absolute;
	width: 43%;
	padding-top: 43%;
	top: 9%;
	right: 2.5%;
	-webkit-transform:translateZ(0);
	transform:translateZ(0);
}
#turntable-drawbox {
    width: 100%;
    height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 13.5%;
	background-size: 100% 100%;
}
#turntable-drawpoint {
    width: 16.7%;
    top: 33.66%;
    left: 42.4%;
    height: 23.9%;
	background-size: 100% 100%;
	position: absolute;
	z-index: 2;
	-webkit-transform-origin: 50% 65.1%;
	-ms-transform-origin: 50% 65.1%;
	-o-transform-origin: 50% 65.1%;
	-moz-transform-origin: 50% 65.1%;
	transform-origin: 50% 65.1%;
	will-change: transform;
}
.turntable-transition{
    -webkit-transition: -webkit-transform 2s ease-in-out;
    transition: transform 2s ease-in-out;
}
#turntable-drawbox {
  -webkit-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  transform-origin: 50% 50%; }
 #turntable-drawpoint {
  -webkit-transform-origin: 50% 60%;
  -ms-transform-origin: 50% 60%;
  -o-transform-origin: 50% 60%;
  -moz-transform-origin: 50% 60%;
  transform-origin: 50% 60%; }
.award-wrap{
	width: 100%;
	height: 100%;
	position: relative;
}
.award-wrap li{
	height: 50%;
	position: absolute;
	width: 4.5em;
	top: 0;
	left: 50%;
	text-align: center;
	-webkit-transform-origin: 50% 100%;
	-ms-transform-origin: 50% 100%;
	-o-transform-origin: 50% 100%;
	-moz-transform-origin: 50% 100%;
	transform-origin: 50% 100%;	
}
.award-wrap li img,.award-wrap li span{
	position: absolute;
}
.award-wrap li img{
	bottom:40%;
	left: 50%;
	-webkit-transform:translate(-50%);
	transform:translate(-50%);
	max-width: 100%;
	max-height: 100%;
}
.award-wrap li span{
	width: 100%;
	left: 0;
	text-align: center;
}
</style>