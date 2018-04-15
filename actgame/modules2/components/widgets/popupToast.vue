<template lang="jade">
div(class="popup-toast" id="modal-template"  v-if="isShowToastFlag") 
	section
		p {{ bodyText }}
</template>

<style>
.popup-toast {
    position: absolute;
    top: 38%;
    left: 10%;
    width: 78%;
    padding: .5em 0;
    text-align: center;
    font-size: 1.24em;
    color: #fff;
    z-index: 12;
    background-color: #6f599c;
    border-radius: 1em;
    border: 2px solid #6f599c;
	z-index: 9999;
}
#modal-template.popup-toast{
        background-color: transparent;
        border-radius: 0;
        border:none;width: 80%;padding:.5em 2em;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+1,000000+18,000000+50,000000+87,000000+100&0+1,0.65+25,0.82+50,0.65+78,0+100 */
background: -moz-linear-gradient(left,  rgba(0,0,0,0) 1%, rgba(0,0,0,0.46) 18%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.65) 78%, rgba(0,0,0,0.38) 87%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 1%,rgba(0,0,0,0.46) 18%,rgba(0,0,0,0.65) 25%,rgba(0,0,0,0.82) 50%,rgba(0,0,0,0.65) 78%,rgba(0,0,0,0.38) 87%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  rgba(0,0,0,0) 1%,rgba(0,0,0,0.46) 18%,rgba(0,0,0,0.65) 25%,rgba(0,0,0,0.82) 50%,rgba(0,0,0,0.65) 78%,rgba(0,0,0,0.38) 87%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */
}
#modal-template.popup-toast:before,#modal-template.popup-toast:after{
    content: "";position: absolute;width: 100%;height: 1px;top: 100%;left: 0;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+1,fcb900+21,fcb900+50,fcb900+75,000000+100&0+1,0.65+25,0.82+50,0.65+74,0+100 */
background: -moz-linear-gradient(left,  rgba(0,0,0,0) 1%, rgba(252,185,0,0.54) 21%, rgba(252,185,0,0.65) 25%, rgba(252,185,0,0.82) 50%, rgba(252,185,0,0.65) 74%, rgba(252,185,0,0.63) 75%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 1%,rgba(252,185,0,0.54) 21%,rgba(252,185,0,0.65) 25%,rgba(252,185,0,0.82) 50%,rgba(252,185,0,0.65) 74%,rgba(252,185,0,0.63) 75%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  rgba(0,0,0,0) 1%,rgba(252,185,0,0.54) 21%,rgba(252,185,0,0.65) 25%,rgba(252,185,0,0.82) 50%,rgba(252,185,0,0.65) 74%,rgba(252,185,0,0.63) 75%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */

}
#modal-template.popup-toast:after{top: auto;bottom: 100%;}
</style>

<script type="text/babel">
export default {
    data () {
        return{
            bodyText:"",
            callBackFunc: null,
            timer: 2000,
            isShowToastFlag: false,
        }
    },
    methods: {
        showPopupToast: function(toastMsg){
            var _That = this;
            this.isShowToastFlag = true;
            this.bodyText = toastMsg.bodyText || "No Right TextMsg @popupToast Copm";
            this.timer = toastMsg.timer || this.timer;
            this.callBackFunc = toastMsg.callBackFunc;

            setTimeout(function(){
                _That.isShowToastFlag = false;
                if(_That.callBackFunc !== null){
                    _That.callBackFunc();
                }
            }, this.timer)
        }
    },
}
</script>