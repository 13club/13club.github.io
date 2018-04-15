<template>
<div class="special-dialog-wrap pa" v-if="isShowDialog">
    <div class="shadow pa"></div>
    <div class="dialog-body pa center">
        <button class="close-btn pa" @click="closeDialog"></button>
        <h3 class="dialog-title" v-html="titleText"></h3>
        <slot class=""></slot>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    props:["titleText"],
    data () {
        return{
            isShowDialog:false
        }
    },
    created () {
        
    },
    methods: {
        showDialog () {
            this.isShowDialog = true;
        },
        closeDialog () {
            this.isShowDialog = false;
        }
    }
}
</script>

<style scoped>
.pa{position: absolute;}
.special-dialog-wrap,.shadow{width: 100%;height: 100%;top: 0;left: 0;z-index: 11;}
.special-dialog-wrap .shadow{background-color: rgba(0,0,0,0.6);}
.dialog-body{z-index: 15;}
.centerX{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);}
.centerY{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);}
.center{left: 50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}
.close-btn{left: 100%;top: 0;}
.dialog-title{text-align: center;}
.dialog-content{margin: 0 auto;overflow: auto;}
</style>