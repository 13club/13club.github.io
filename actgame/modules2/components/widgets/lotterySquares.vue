<template>
     <div class="lottery-wrap">
        <ul :class="'lottery-gifts gifts-'+length">
            <li v-for="(value,index) in giftList" :class="{select:index == giftindex}" :key="index">
                <div class="giftsrc" v-bind:style="styleObject"></div>
                <p>{{value}}</p>
            </li>
        </ul>
        <div :class="btnClass + ' lottery-btn btn-'+length" @click="clickFunc" v-html="btnText" data-click="false" id="lotterybtn"></div>
        <div :class="'middleHtml middleHtml-'+length" v-if="!!middleHtml" v-html="middleHtml"></div>
    </div>  
</template>

<script type="text/babel">
var cycle = 15,current = 0,/*speed = 180,*/prize,index = 0;
var timer;

export default{
        data () {
            return{
                cdn:'',
                giftList : {},
                giftindex:0,//初始化第一个高亮的index
                btnText : '',
                length : 0, //奖品的数量
                giftImg : '',
                time:2000,
                middleHtml:'',
                clickFlag:false,
                speed:0,
                styleObject:{
                    
                },
                btnClass:''
            }
        },
        methods:{
            showLotterySquares:function(lotteryObj){
                this.initialize(lotteryObj);
            },
            initialize:function(lotteryObj){
                this.cdn = lotteryObj.cdn || '';
                this.giftList = lotteryObj.giftList || {};
                this.btnText = lotteryObj.btnText || this.btnText;
                this.length = lotteryObj.length || 0;
                this.giftindex = lotteryObj.giftindex || this.giftindex;
                this.giftImg = lotteryObj.giftImg;
                this.styleObject.backgroundImage = 'url('+this.cdn+this.giftImg+')';
                this.btnClass = lotteryObj.btnClass || '';
                this.time = lotteryObj.time || this.time;
                
                this.clickFunc = lotteryObj.clickFunc;
                this.rotateEndFunc = lotteryObj.rotateEndFunc;

                this.showFlag = true;
                this.middleHtml = lotteryObj.middleHtml || '';
                this.speed = parseInt(this.time/this.length);
            },
            clickFunc:function(){
                if( $("#lotterybtn").attr( "data-click" ) == "false" ){
                    if(this.clickFunc !== null){
                        this.rotation(this.clickFunc(),this.length);
                    }
                }
            },
            rotation:function(data,target,length){
                var that = this;

                this.$nextTick(function(){

                    that.giftindex = 0; // 初始化

                    current++; // 当前总的步数
                    index++; // 当前的位置索引

                    if(index>(length-1)){//循环
                        index=0;
                    }
                    this.giftindex = index;

                    if(current>cycle+10 && prize==index){ // 到达目标位置-重置
                        clearTimeout(timer);
                        current = 0;
                        this.speed = parseInt(this.time/this.length);
                        index = 0;
                        setTimeout(function(){
                            that.rotateEnd(data);
                        },600);
                    }else{
                        if(current<cycle){ // 加速
                            this.speed -= 10;
                        }else if(current==cycle){ // 当前位置
                            prize = target;
                        }else{ // current>cycle 开始减速
                            if (current>cycle+10 && ((prize==0&&index==3)||prize==index+1)){
                                this.speed += 50;
                            }else{
                                this.speed += 10;
                            }
                        }
                        if(this.speed<50){
                            this.speed=50;
                        }
                        timer = setTimeout(function(){
                            that.rotation(data,target,that.length);
                        },this.speed);
                    }
                    return false;
                })
            },
            rotateEnd:function(data){
                if(this.rotateEndFunc !== null){
                    this.rotateEndFunc(data);
                }
            },
            backToZero:function(){
                this.clickOpen();
                this.giftindex = 0;
            },
            ifClickOpen:function(){//判断是否在轮转中
                if($("#lotterybtn").attr("data-click") == "false"){
                    return true;
                }else{
                    return false;
                }
            },
            clickClose:function(){
                 $("#lotterybtn").attr("data-click", "true");
            },
            clickOpen:function(){
                 $("#lotterybtn").attr("data-click", "false");
            }
        }
    }
</script>
<style>
.lottery-wrap{width:100%;height:100%;position: relative;}
/*三套（奖品数为：8,10,12）排版样式，以长度为后缀命名区分*/
.lottery-gifts{width:100%;height:100%;position: absolute;top:0;left:0;}
.lottery-gifts>li.select{background-color:#ff9a5e;}
.lottery-btn{font-size: 1em; border-radius: 0.5em; position: absolute; color: #fff; background: #e6aa88; text-align: center; padding-top: 7%;}
.middleHtml{position: absolute;}

/*奖品数:8*/
.gifts-8>li{position:absolute;border-radius:.4em;width: 30%;height: 32%;background-color: #ff6000;}
.gifts-8>li:nth-child(1){top:0;left: 2.5%;}
.gifts-8>li:nth-child(2){top:0;left: 35%;}
.gifts-8>li:nth-child(3){top:0;left: 67.5%;}
.gifts-8>li:nth-child(4){top: 34%;left: 67.5%;}
.gifts-8>li:nth-child(5){top: 68%;left: 67.5%;}
.gifts-8>li:nth-child(6){bottom:0;left: 35%;}
.gifts-8>li:nth-child(7){bottom:0;left: 2.5%;}
.gifts-8>li:nth-child(8){bottom: 34%;left: 2.5%;}
.gifts-8 .giftsrc{width: 60%;padding-top:40%;-webkit-background-size: 800% 100%;-moz-background-size:800% 100%;background-size:800% 100%; top: 8%; left: 20%; position: absolute;} 
.gifts-8>li>p {color:#fff;text-align: center; font-size: .75em; position: absolute; width: 100%; bottom: 1%; left: 0; } 
.gifts-8>li:nth-child(2)>.giftsrc{background-position: 14.1111% 0;}
.gifts-8>li:nth-child(3)>.giftsrc{background-position: 28.2222% 0;}
.gifts-8>li:nth-child(4)>.giftsrc{background-position: 42.3333% 0;}
.gifts-8>li:nth-child(5)>.giftsrc{background-position: 56.2444% 0;}
.gifts-8>li:nth-child(6)>.giftsrc{background-position: 71.2566% 0;}
.gifts-8>li:nth-child(7)>.giftsrc{background-position: 85.6666% 0;}
.gifts-8>li:nth-child(8)>.giftsrc{background-position: 99.8777% 0;}
.btn-8,.middleHtml-8{width: 30%;height: 32%;top: 34%;left: 35%;}
/*奖品数:10*/
.gifts-10>li{position:absolute;border-radius:.4em;width: 24%;height: 32%;background-color: #ff6000;}
.gifts-10>li:nth-child(1){top:0;left:0;}
.gifts-10>li:nth-child(2){top:0;left: 25.2%;}
.gifts-10>li:nth-child(3){top:0;left: 50.6%;}
.gifts-10>li:nth-child(4){top:0;right:0;}
.gifts-10>li:nth-child(5){top: 33.9%;right: 0;}
.gifts-10>li:nth-child(6){bottom:0;right:0;}
.gifts-10>li:nth-child(7){bottom:0;left: 50.6%;}
.gifts-10>li:nth-child(8){bottom:0;left: 25.2%;}
.gifts-10>li:nth-child(9){bottom:0;left:0;}
.gifts-10>li:nth-child(10){top: 33.9%;left:0;}
.gifts-10 .giftsrc{width: 60%;padding-top:40%;-webkit-background-size: 1000% 100%;-moz-background-size:1000% 100%;background-size:1000% 100%; top: 8%; left: 20%; position: absolute;} 
.gifts-10>li>p {color:#fff;text-align: center; font-size: .75em; position: absolute; width: 100%; bottom: 1%; left: 0; } 
.gifts-10>li:nth-child(2)>.giftsrc{background-position:11.1111% 0;}
.gifts-10>li:nth-child(3)>.giftsrc{background-position:22.2222% 0;}
.gifts-10>li:nth-child(4)>.giftsrc{background-position:33.3333% 0;}
.gifts-10>li:nth-child(5)>.giftsrc{background-position: 44.2444% 0;}
.gifts-10>li:nth-child(6)>.giftsrc{background-position:55.556% 0;}
.gifts-10>li:nth-child(7)>.giftsrc{background-position:66.6666% 0;}
.gifts-10>li:nth-child(8)>.giftsrc{background-position: 77.8777% 0;}
.gifts-10>li:nth-child(9)>.giftsrc{background-position:88.8888% 0;}
.gifts-10>li:nth-child(10)>.giftsrc{background-position:99.9999% 0;}
.btn-10,.middleHtml-10{width: 50%; height: 32%;top: 34%; left: 25%;}

/*奖品数:12*/
.gifts-12>li{position:absolute;border-radius:.4em;width: 18%;height: 32%;background-color: #ff6000;}
.gifts-12>li:nth-child(1){top:0;left:0;}
.gifts-12>li:nth-child(2){top:0;left: 20.5%;}
.gifts-12>li:nth-child(3){top:0;left: 41%;}
.gifts-12>li:nth-child(4){top:0;left: 61.5%;}
.gifts-12>li:nth-child(5){top: 0%;left: 82%;}
.gifts-12>li:nth-child(6){bottom: 34%;left: 82%;}
.gifts-12>li:nth-child(7){bottom:0;left: 82%;}
.gifts-12>li:nth-child(8){bottom:0;left: 61.5%;}
.gifts-12>li:nth-child(9){bottom:0;left: 41%;}
.gifts-12>li:nth-child(10){bottom: 0%;left: 20.5%;}
.gifts-12>li:nth-child(11){bottom:0;left:0;}
.gifts-12>li:nth-child(12){top: 34%;left:0;}
.gifts-12 .giftsrc{width: 60%;padding-top:40%;background-size:1200% 100%; top: 8%; left: 20%; position: absolute;} 
.gifts-12>li>p {color:#fff;text-align: center; font-size: .75em; position: absolute; width: 100%; bottom: 1%; left: 0; } 
.gifts-12>li:nth-child(2)>.giftsrc{background-position: 9.1111% 0;}
.gifts-12>li:nth-child(3)>.giftsrc{background-position: 18.2222% 0;}
.gifts-12>li:nth-child(4)>.giftsrc{background-position: 27.3333% 0;}
.gifts-12>li:nth-child(5)>.giftsrc{background-position: 36.2444% 0;}
.gifts-12>li:nth-child(6)>.giftsrc{background-position: 45.556% 0;}
.gifts-12>li:nth-child(7)>.giftsrc{background-position: 54.6666% 0;}
.gifts-12>li:nth-child(8)>.giftsrc{background-position: 63.2777% 0;}
.gifts-12>li:nth-child(9)>.giftsrc{background-position: 72.3888% 0;}
.gifts-12>li:nth-child(10)>.giftsrc{background-position: 81.6999% 0;}
.gifts-12>li:nth-child(11)>.giftsrc{background-position: 90.5888% 0;}
.gifts-12>li:nth-child(12)>.giftsrc{background-position: 99.8999% 0;}
.btn-12,,.middleHtml-12{width: 59%;height: 32%;top: 34%;left: 20.5%;}

</style>