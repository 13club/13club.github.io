<template>
    <!--共设置了200个金币-->
    <div id="gold-bouncing" v-show="showCoinAim">
        <span v-for="n in num" :class="['coin'+ (Math.ceil(n%7)+1)]"></span>
        
    </div>
</template>

<script>
    export default {
        props:['num'],
        data () {
            return{
                showCoinAim: false
            }
        },
        beforeMount () {

        },
        methods: {
            showAim: function(aimType){
                var that = this;

                //显示动画
                that.showCoinAim = true;

                //2秒后隐藏，方便下次调用
                var hideTimer = setTimeout(function(){
                    that.showCoinAim = false;
                    clearTimeout(hideTimer);
                }, 2000);

                that.$nextTick(function(){
                    if( aimType == 0 ){
                        //避免失帧
                        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                        requestAnimationFrame(coinAim);

                        function coinAim(){
                            //获取所有金币
                            var goldBouncing = $('#gold-bouncing').children('span');

                            //遍历并随机定位，y轴最大距离为20%，x轴最大距离为100%
                            $.each(goldBouncing, function(index, thisCoin){
                                var addSpeed = Math.random() * 5 + 50;     //下落速率，要尽量减小相互之间的速率差
                                var coinX = Math.round(Math.random() * 100);
                                var coinY = Math.round(Math.random() * 20);
                                var curTimer = null;

                                $(thisCoin).css({'left': coinX + '%', 'top': coinY + '%'}).addClass('slide');     //随机排列

                                var thisCoinH = ($(thisCoin).height() / $('body').height()) * 100;      //金币所占界面高度的百分比
                                var needTranslateY = ((100 - thisCoinH - coinY) / thisCoinH) * 100;     //需要translateY到达底部的距离

                                //当前金币，当前金币掉落速率，当前金币定时器，当前金币需要translateY到达底部的距离
                                coinAnimation(thisCoin, addSpeed, curTimer, needTranslateY);
                            });

                            //金币掉落动画
                            function coinAnimation( curCoin, addSpeed, curTimer, needTranslateY ){
                                var speedY = 5;    //Y方向掉落速度
                                var stopTime = 0;   //停止时间

                                //两秒后消失
                                var endTimer = setTimeout(function(){
                                    clearInterval(curTimer);
                                    curCoin.style.transform = 'translateY(' + (needTranslateY + 200) + '%)';
                                    $(curCoin).removeClass('slide')
                                    //顺手清除setTimeout
                                    clearTimeout(endTimer);
                                }, 2000);

                                curTimer = setInterval(function(){
                                    if( stopTime > 0 && speedY < 900 ){
                                        addSpeed = 20;
                                    }

                                    speedY += addSpeed;
                                    curCoin.style.transform = 'translateY(' + speedY + '%)';

                                    if( speedY >= needTranslateY ){
                                        //每次触底后反弹高度不一样
                                        if( stopTime == 0 ){
                                            addSpeed = -30;
                                        }else if( stopTime == 1 ){
                                            addSpeed = -15;
                                        }else if( stopTime == 2 ) {
                                            addSpeed = -5;
                                        }

                                        //触底两次后消失
                                        stopTime += 1;
                                        if( stopTime == 2 ){
                                            clearInterval(curTimer);
                                            curCoin.style.transform = 'translateY(' + (needTranslateY + 200) + '%)';
                                        }
                                    }
                                }, 20);
                            }
                        }
                    }else if( aimType == 1 ){
                        //避免失帧
                        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                        requestAnimationFrame(coinAim);

                        function coinAim(){
                            //获取所有金币
                            var goldBouncing = $('#gold-bouncing').children('span');

                            //遍历并随机定位，y轴最大距离为20%，x轴最大距离为100%
                            $.each(goldBouncing, function(index, thisCoin){
                                var addSpeed = Math.random() * 1;     //下落速率
                                var coinX = Math.round(Math.random() * 100);
                                var coinY = Math.round(Math.random() * -30);
                                var curTimer = null;

                                $(thisCoin).css({'left': coinX + '%', 'top': coinY + '%'});     //随机排列

                                //当前金币，当前金币掉落速率，当前金币定时器，当前金币需要translateY到达底部的距离
                                var startTimer = setTimeout(function(){
                                    coinAnimation(thisCoin, addSpeed, curTimer);

                                    //顺手清除setTimeout
                                    clearTimeout(startTimer);
                                }, 200);
                            });

                            //金币掉落动画
                            function coinAnimation( curCoin, addSpeed, curTimer ){
                                var speedY = 3;     //Y方向掉落速度
                                var stopTime = 0;   //停止时间

                                //两秒后消失
                                var endTimer = setTimeout(function(){
                                    clearInterval(curTimer);
                                    curCoin.style.top = 110 + '%';

                                    //顺手清除setTimeout
                                    clearTimeout(endTimer);
                                }, 2000);


                                curTimer = setInterval(function(){
                                    speedY += addSpeed;
                                    var y = parseInt( curCoin.style.top ) + speedY;

                                    curCoin.style.top = y + '%';

                                    //弹跳top小于50%时清除
                                    if( stopTime > 0 && y < 60 ){
                                        speedY = 1.5;
                                    }

                                    if( y > 100 ){
                                        speedY = -4;
                                        stopTime += 1;

                                        if( stopTime == 2 ){
                                            clearInterval(curTimer);
                                            curCoin.style.top = 110 + '%';
                                        }
                                    }
                                }, 20);
                            }
                        }
                    }
                });
            }
        }
    }
</script>

<!--css样式-->
<style>
    #gold-bouncing{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 999;}
    #gold-bouncing span{ position: absolute; display: block; width: 2em; height: 2em; background-size: 700% 100%; transition-property: transform; transition-timing-function: linear;}
    #gold-bouncing .slide { will-change: transform;}    /*GPU加速*/
    #gold-bouncing .coin1{ background-position: 0 0;}
    #gold-bouncing .coin2{ background-position: 100% 0;}
    #gold-bouncing .coin3{ background-position: 200% 0;}
    #gold-bouncing .coin4{ background-position: 300% 0;}
    #gold-bouncing .coin5{ background-position: 400% 0;}
    #gold-bouncing .coin6{ background-position: 500% 0;}
    #gold-bouncing .coin7{ background-position: 600% 0;}

</style>