<template>
    <section style="display:none;">
        <table id="rank" class="rank tc">
            <caption v-if="isShowInfoBtn">
                <span>{{tipText}}</span><button class="state-on" @click="onCloseClickGetInfo">{{langtextBtnText}}</button>
            </caption>
            <thead>
                <tr>
                    <td v-for="item in rewardhead">{{item}}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="rankList==''">
                    <td  colspan="2">{{emptyTip}}</td>
                </tr>
                <tr v-for="item in rankList" v-else>                        
                    <td v-for="val in item">
                       {{val}}
                    </td>
                </tr>
            </tbody>
        </table> 
    </section>
</template>

<script type="text/javascript">
export default {
    data () {
        return{
               isShowInfoBtn:true, //是否需要填写信息按钮
               rankList:'',
               tipText:"",
               emptyTip:"",
               langtextBtnText:{},
               rewardhead:{},
               callBackFunc: null
        }
    },
    mounted(){
        
    },
    updated(){
    },
    methods: {
        showRankSection: function(dlgMsgObj){
            dlgMsgObj = dlgMsgObj || {};
            this.isShowInfoBtn = dlgMsgObj.isShowInfoBtn || this.isShowInfoBtn;
            this.rankList = dlgMsgObj.rankList || this.rankList;
            this.tipText = dlgMsgObj.tipText || this.tipText;
            this.emptyTip = dlgMsgObj.emptyTip || this.emptyTip;
            this.langtextBtnText = dlgMsgObj.langtextBtnText || this.langtextBtnText;
            this.rewardhead = dlgMsgObj.rewardhead || this.rewardhead;
            this.callBackFunc = dlgMsgObj.callBackFunc || null;
        },
        onCloseClickGetInfo:function(){
            this.$parent.onGetFormDialog();
        }
    }
}
</script>

<style>
.rank {width: 100%; margin: 1% auto;}
.rank td {padding: 1% ; height: 20%;width: 50%; color: #fff;}
.rank thead td { background: rgba(0, 0, 0, .4) }
/*.rank tbody td { border-bottom: 1px solid #444c58; border-top: 1px solid #28303b }*/
.rank tbody>tr:nth-child(1)>td {border-top: none }
.rank tbody tr:nth-child(even){background:rgba(55,58,79,.4)}
.rank caption {text-align: center; color: #fff; margin: 0 auto; padding: .8% 0; vertical-align: middle; }
.rank caption button.state-on {float: none; display: inline; padding: 1.2% 3%; width: auto }
.state-on {
    font: 1em/1 "Microsoft YaHei", sans-serif; width: 80%; padding: 6% 0; color: #fff; cursor: pointer;
    box-shadow: inset 0 1px 0 #56a4d7, inset 0 1px 0 #004b96;
    border: 1px solid #000;
    border-radius: .4em;
    background: #0058af;
    background: -moz-linear-gradient(top, #0075c3 0, #0058af 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #0075c3), color-stop(100%, #0058af));
    background: -webkit-linear-gradient(top, #0075c3 0, #0058af 100%);
    background: -o-linear-gradient(top, #0075c3 0, #0058af 100%);
    background: linear-gradient(to bottom, #0075c3 0, #0058af 100%)
}


</style>