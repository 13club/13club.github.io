<template lang="jade">
div(:class="['card-turn-wrap',isBack ? null : 'no-back-image',isTurn ? turnClass : null]" v-bind:style="{ 'background-image':'url(' + defaultFaceUrl + ')' }")
    img(width="100%" v-if="!isBack" v-bind:src="overFaceUrl")
</template>

<style>
.card-turn-wrap{
    width: 10em;
    height: 1.6em;
    -webkit-transition:transform 1s;
    transition:transform 1s;
}
.card-turn-wrap>img{
    -webkit-transition:all .5s;
    transition:all .5s;
}
.no-back-image{
    background-image: none!important;
}
.turn-animation-tb{
    -webkit-transform:rotateX(180deg);
    transform:rotateX(180deg);
}
.turn-animation-tb>img{
    -webkit-transform:rotateX(-180deg);
    transform:rotateX(-180deg);
}
.turn-animation-lr{
    -webkit-transform:rotateY(180deg);
    transform:rotateY(180deg);
}
.turn-animation-lr>img{
    -webkit-transform:rotateY(-180deg);
    transform:rotateY(-180deg);
}
</style>

<script type="text/javascript">
export default {
    data () {
        return{
            isBack : true,
            isTurn : false,
            turnClass : "turn-animation-tb",
            defaultFaceUrl : "../a.png",
            overFaceUrl : "../b.png",
            isLeftRight:true,//是不是左右翻转，true为左右翻转，false为上下翻转
            callBackFunc:null
        }
    },
    mounted () {
    },
    methods: {
        initialize:function(cardTurn){
            this.defaultFaceUrl = cardTurn.defaultFaceUrl?cardTurn.defaultFaceUrl:this.defaultFaceUrl;
            this.overFaceUrl = cardTurn.overFaceUrl?cardTurn.overFaceUrl:this.overFaceUrl;
            this.isLeftRight = typeof cardTurn.isLeftRight == "boolean" ?cardTurn.isLeftRight:this.isLeftRight;
            this.callBackFunc = cardTurn.callBackFunc?cardTurn.callBackFunc:this.callBackFunc;
        },
        turnCard: function(overFaceUrl){
            var that = this;
            this.overFaceUrl = overFaceUrl ? overFaceUrl : this.overFaceUrl;
            this.turnClass = this.isLeftRight ? "turn-animation-lr" : "turn-animation-tb";
            this.isTurn = true;
            setTimeout(function(){
                that.isBack = false;
            }, 300);
            setTimeout(function(){
                that.callBackFunc ? this.callBackFunc() : null;
            }, 1000);
        }
    }
}
</script>