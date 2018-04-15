<template>
<div id="shake-wrap">
    <ul class="num-box">
        <li v-for="n in length" v-bind:class="['li-num','num' + n]" v-bind:style="{ backgroundPositionY:(100 / (length-1))*(numArr[n-1]-1) + '%',width:(100 / length) + '%',backgroundSize:'100% ' + (100*length) + '% ' }"></li>
    </ul>
    <div v-bind:class="['draw-btn pa',isBtnActive?'animation':null]" @click="drawAward"></div>
</div>
</template>
<script type="text/babel">
require('./../../plugins/easing.js');
    export default{
        props : ['length','initNum',"callback","succFunc"],
        data () {
            return {
                isBegin:false,
                isBtnActive:false,
                flag:false,
                numArr:[],
            }
        },
        methods:{
            //初始化，对初始数值进行处理
            initialize:function(){
                this.numArr = this.strToArr(this.initNum);
            },
            //默认的字符串类型数值转换成数组
            strToArr:function(targetNum){
                var num_arr = (targetNum+'').split('');
                var poor = this.length-num_arr.length;//this.length是数字的最大长度
                for(var i=0;i<poor;i++){
                    num_arr.splice(0,0,"0")
                }
                return num_arr;
            },
            //点击摇杆
            drawAward : function(e){
                this.callback();
                
            }
            //数字转动前的准备工作
            ,shakeNum : function(result,succ){
                var that = this;
                if(this.isBegin) return false;
                this.isBtnActive = true;
                setTimeout(function(){
                    this.isBtnActive = false;
                },1000);
                if(this.flag) return; this.flag = true;
                var result = result
                var numlen = this.length;
                var time = 100*((1+numlen)*(numlen/2))+3000+(numlen-1)*2000;
                this.slotFun(result,numlen);
                setTimeout(function(){
                    that.succFunc(succ);
                    that.reSet();
                },time);
                this.flag = false;
            }
            //数字开始转动
            ,slotFun : function(num,len){
                var u = 100/(len-1);
                if(this.isBegin) return false;
                this.isBegin = true;
                //$(".li-num").css('backgroundPositionY',0);
                var num_arr = this.strToArr(num);                
                $(".li-num").each(function(index){
                    var _num = $(this);
                    setTimeout(function(){
                        _num.animate({ 
                            backgroundPositionY: -(u*60) + (u*num_arr[index])+"%"
                        },{
                            duration: 3000+index*2000,
                            easing: "easeInOutCirc",
                            complete: function(){
                                if(index==num_arr.length-1) this.isBegin = false;
                            }
                        });
                    }, index * 100);
                });
            },
            //重置
            reSet:function(){
                this.isBegin = false;
                this.isBtnActive = false;
                this.flag = false;
                this.numArr = this.strToArr(this.initNum);
                var that = this;
                $(".li-num").each(function(index){
                    var _num = $(this);
                    var y = (100 / (that.length-1))*(that.numArr[index]-1) + '%';
                    _num.css("background-position-y",y)
                });
            }
        }
    }
</script>
<style>
#shake-wrap{width: 80%;height: 40%;position: relative;}
.num-box{width: 100%;height: 100%;}
.num-box:after{content: "";display: block;width: 100%;height: 100%;clear: both;}
.li-num{float: left;height: 100%;background: none top center repeat-y;}
.draw-btn{position: absolute;width: 2em;height: 2em;background-color: #fff;-webkit-transform-origin: 50% 100%;transform-origin: 50% 100%;}
.animation{-webkit-animation: slot 1.2s 1;animation: slot 1.2s 1;}
/* 摇杆动画 */
@-webkit-keyframes slot{0%{-webkit-transform: rotateX(0deg);}
    50%{-webkit-transform: rotateX(60deg);}
    100%{-webkit-transform: rotateX(0deg);}}
@keyframes slot{0%{transform: rotateX(0deg);}
    50%{transform: rotateX(60deg);}
    100%{transform: rotateX(0deg);}}

</style>



