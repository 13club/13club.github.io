<template>
    <div class="weui_dialog_alert" v-if='isShowDlgFlag'>
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title" v-if='isShowTitleFlag' v-html="titleText"></strong></div>
            <div class="weui_dialog_bd" v-html="bodyText"></div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog primary" v-for='(btnItem,index) in btnsObj' @click='onBtnClick(index)'>{{ btnItem.btnText }}</a>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    data () {
        return{
            titleText: null,
            bodyText: null,
            bodyClass:null,
            btnsObj: {},
            isShowDlgFlag: false,
            isShowTitleFlag: false
        }
    },
    methods: {
        showWxDialog: function(dlgMsgObj){
            dlgMsgObj = dlgMsgObj || {};

            this.titleText = dlgMsgObj.titleText || null;
            this.bodyText = dlgMsgObj.bodyText || null;
            this.bodyClass = dlgMsgObj.bodyClass || null;
            this.btnsObj = dlgMsgObj.btnsObj || {};

            this.isShowTitleFlag = (this.titleText !== null) ? true : false;
            this.isShowDlgFlag = true;
        },
        hideWxDialog: function(){
            this.isShowDlgFlag = false;
        },
        onShowDialog: function(dlgMsgObj){
            this.showStrongDialog(dlgMsgObj);
        },
        onBtnClick: function( index ){
            this.hideWxDialog();
            this.onCallbackFunc( index );
        },
        onCallbackFunc: function( index ){
            if(this.btnsObj[index].callBackFunc !== null){
               this.btnsObj[index].callBackFunc();
            }
        }
    }
}
</script>