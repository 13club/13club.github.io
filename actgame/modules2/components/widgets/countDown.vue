<template>
<div id="count-down">
    <span class="count-down-fore" v-if='isShowForeTextFlag' v-html="foreTimeText"></span>
    <span class="count-down-time" v-if='isShowCountDownFlag' v-html="contDownText"></span>
    <span class="count-down-last" v-if='isShowLastTextFlag' v-html="contDownText"></span>
</div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            intervalId: null,
            countNum: 0,
            contDownText: "",
            isShowForeTextFlag: false,
            isShowLastTextFlag: false,
            isShowCountDownFlag: false
        }
    },

    props: {
        foreTimeText:{
            type: String,
            default: ""
        },
         lastTimeText:{
            type: String,
            default: ""
        },
        time: {
            type: Number,
            default: 0
        },
        start: {
            type: Boolean,
            default: false
        },
        isCompleteShowHms: {
            type: Boolean,
            default: false
        },
        timeUnitObj:{
            type: Object,
            default: function(){
                return{
                    hour: "<span>时</span>",
                    minute: "<span>分</span>",
                    second: "<span>秒</span>"
                }
            }
        },
        isOverShow:{
            type: Boolean,
            default: false
        }
    },

    mounted () {

        if (this.start) {
            this.tick()
        }
    },

    methods: {
        tick: function(){


            var count = 0,
            startTime = new Date().getTime();
            if(this.time > 0 || this.isOverShow){
                this.intervalId = setTimeout(countDownStart, 1000)
                this.convertToHms( this.time )
                this.setTextIsShowFlag( true )
            }
            var _That = this;
            function countDownStart(){
                count++
                var offset = new Date().getTime() - (startTime+ count*1000)
                var nextTime = 1000 - offset;
                nextTime = (nextTime < 0) ? 0 : nextTime
                _That.$parent.listenTime(_That.time);
                _That.time--
                if(_That.time < 0){
                    _That.stop()
                    _That.start = false
                    _That.countNum++
                }else{
                    _That.convertToHms( _That.time )
                    _That.intervalId = setTimeout(countDownStart, nextTime)
                }
            }
        },

        convertToHms: function( secondTime ){

            let hour, minute
            let HOUR=3600, MINUTE=60, ZERO='00', singleZERO='0';
            let hourUnit = this.timeUnitObj['hour'],
                minuteUnit = this.timeUnitObj['minute'],
                secondUnit = this.timeUnitObj['second'];
            if(secondTime >= HOUR){//倒计时大于1小时
                hour = Math.floor( secondTime/HOUR )
                hour = ((hour).toString().length < 2) ? (singleZERO+hour) : hour;
                secondTime -= hour*HOUR
                minute = Math.floor( secondTime/MINUTE )
                minute = ((minute).toString().length < 2) ? (singleZERO+minute) : minute;
                secondTime -= minute*MINUTE
                this.contDownText = ("<b>" + hour + hourUnit + "</b><b>" + minute + minuteUnit + "</b><b>" + secondTime + secondUnit + "</b>")
                secondTime = ((secondTime).toString().length < 2) ? (singleZERO+secondTime) : secondTime;
                this.contDownText = (hour + hourUnit + minute + minuteUnit + secondTime + secondUnit)
            }else if(secondTime < 60){//倒计时小于1分钟
                secondTime = ((secondTime).toString().length < 2) ? (singleZERO+secondTime) : secondTime;
                this.contDownText = (secondTime + secondUnit )
                if( this.isCompleteShowHms == true){
                    this.contDownText = ("<b>" + ZERO + hourUnit + "</b><b>" + ZERO + minuteUnit + "</b><b>" + this.contDownText + "</b>")
                }
            }else{//大于1分钟小于1小时
                minute = Math.floor( secondTime/MINUTE )
                minute = ((minute).toString().length < 2) ? (singleZERO+minute) : minute;
                secondTime -= minute*MINUTE
                this.contDownText = ("<b>" + minute + minuteUnit + "</b><b>" + secondTime + secondUnit + "</b>")
                this.contDownText = (this.isCompleteShowHms == true) ? ("<b>"+ZERO+hourUnit+"</b>"+this.contDownText) : this.contDownText
                secondTime = ((secondTime).toString().length < 2) ? (singleZERO+secondTime) : secondTime;
                this.contDownText = (minute + minuteUnit + secondTime + secondUnit)
                this.contDownText = (this.isCompleteShowHms == true) ? (ZERO+hourUnit+this.contDownText) : this.contDownText
            }
        },

        stop: function () {
            clearInterval(this.intervalId)
        },

        setTextIsShowFlag: function( cFlag ){
            this.isShowForeTextFlag = (this.foreTimeText !== "" && cFlag) ? true : false;
            this.isShowLastTextFlag = (this.lastTimeText !== "" && cFlag) ? true : false;
            this.isShowCountDownFlag = ( (this.time > 0 && cFlag) || this.isOverShow) ? true : false;
        }
    },

    watch: {
        start: function (newVal, oldVal) {

            if (newVal === true && oldVal === false && (this.time > 0 || this.isOverShow)) {
                this.tick()
            }
            if (newVal === false && oldVal === true) {
                this.stop()
            }
        },
        time: function(newVal, oldVal){
            if( this.time > 0 || this.isOverShow){
                this.setTextIsShowFlag(true)
            }else{
                 this.setTextIsShowFlag( this.isOverShow )
            }
        }
    }
}
</script>
