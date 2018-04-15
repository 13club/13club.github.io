<template>
    <div class="popTab" v-if="popTab">
        <div class="pop">
            <img v-for="(value,index) in result" :src=" href ? href+crapsimg[value] : '' " width="100%">
            <p v-text="Text"></p>
        </div>
        <div class="shadow" @click="removeShadow"></div>
    </div>
</template>
<script type="text/babel">
    export default{
        props : ['popTab','href','crapsimg','result','Text'],
        data(){
            return {

            }
        },
        methods:{
            removeShadow:function(){
                this.$parent.popTab=false;
            }
        }
    }
</script>
<style>
    /*遮罩*/
    .pop{ background-clip:padding-box;position: absolute; top:25%;left:27%;width: 40%;background-color: rgba(0,0,0,.8);text-align: center;padding: 3%;border-radius: .5em;border:2px solid #000;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        box-shadow:inset 1px 2px 2px #3b2f27,inset -1px -2px 2px #3b2f27;z-index: 7}
    .pop img{margin:0 2%;width: 25%}
    .pop p{color: #f6cb13;margin-top: 5%;margin-bottom: 5%;}
    .shadow{background: rgba(0,0,0,.6);width: 100%;height: 120%;position: absolute;top: 0;z-index: 6;left:0;top:0;}
</style>




