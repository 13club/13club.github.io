<template>
    <!--奖励动画-->
    <div id="radAmt" v-if="amtStatus" @click="hideAmt">
        <div class="amt-main zoomin">
            <div></div>
            <div class="amt-bg bg-rotate"></div>
            <div class="amt-text">
                <h2 v-html="radData.title"></h2>
                <span><img :src="radData.imgSrc"></span>
                <p v-html="radData.text"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                amtStatus: false,
                radData: {
                    title: '',
                    imgSrc: '',
                    text: ''
                }
            }
        },
        beforeMount () {

        },
        methods: {
            showAmt: function(amtStatus, radData){
                this.amtStatus = amtStatus;
                this.radData = radData;
            },
            hideAmt: function(){
                this.amtStatus = false;
            }
        }
    }
</script>

<style>
    /*缩放变大*/
    @-webkit-keyframes zoomin{
        from{ opacity: 0; -webkit-transform: scale(0); }
        to{ opacity: 1; -webkit-transform: scale(1); }
    }
    @keyframes zoomin{
        from{ opacity: 0; transform: scale(0); }
        to{ opacity: 1; transform: scale(1); }
    }
    .zoomin{
        -webkit-animation: zoomin 1s ease;
        animation: zoomin 1s ease;
        -webkit-animation-fill-mode: backwards;
        animation-fill-mode: backwards;
    }

    /*背景光效旋转*/
    @-webkit-keyframes bg-rotate{
        0%   { -webkit-transform: rotate(0); }
        25%   { -webkit-transform: rotate(90deg); }
        50%   { -webkit-transform: rotate(180deg); }
        75%   { -webkit-transform: rotate(270deg); }
        100%   { -webkit-transform: rotate(360deg); }
    }
    @keyframes bg-rotate{
        0%   { transform: rotate(0); }
        25%   { transform: rotate(90deg); }
        50%   { transform: rotate(180deg); }
        75%   { transform: rotate(270deg); }
        100%   { transform: rotate(360deg); }
    }
    .bg-rotate{
        -webkit-animation: bg-rotate 6s infinite linear;
        animation: bg-rotate 6s infinite linear;
        -webkit-animation-fill-mode: backwards;
        animation-fill-mode: backwards
    }

    #radAmt{ width: 100%; height: 100%; position: absolute; background-color: rgba(0,0,0,.6); left: 0; top: 0; z-index: 999;}
    #radAmt .amt-main{ width: 50%; height: 50%; position: absolute; left: 50%; top: 50%; margin: -13% 0 0 -25%;}
    #radAmt .amt-bg{ width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 21;}
    #radAmt .amt-text{ width: 100%; height: 100%; position: absolute; z-index: 22; left: 0; top: 0;}
    #radAmt .amt-main h2{ text-align: center; color: #ffff00; font-size: 2em; padding-top: 6%; text-shadow: 0 0 3px #530c1c;}
    #radAmt .amt-main span{ display: block; width: 40%; height: 50%; margin: 0 auto; text-align: center;}
    #radAmt .amt-main span img{ width: auto; height: 100%;}
    #radAmt .amt-main p{ text-align: center; font-size: 1.6em; color: #ffff00; text-shadow: 0 0 3px #530c1c;}
</style>