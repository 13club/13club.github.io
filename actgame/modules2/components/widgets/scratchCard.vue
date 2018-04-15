<template>
    <div class="canvas-wrap">
        <p class="back-text" ref="textArea" v-html="awardText"></p>
        <canvas ref="canvas" id="canvas" :width="width" :height="height" v-on:touchstart="touchStart" v-on:touchend="touchEnd" v-on:touchmove="touchMove" v-on:mousedown="touchStart" v-on:mouseup="touchEnd" v-on:mousemove="touchMove">
            您的浏览器不支持 HTML5 canvas 标签
        </canvas>
    </div>
</template>

<style>
.canvas-wrap{
    width: 50%;
    height: 40%;
    position: relative;
}
#canvas{position: absolute;z-index: 1;top: 0;left: 0;}
.back-text{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
}
</style>

<script type="text/javascript">
export default {
    props:["awardText","imgUrl","percentage"],
    data () {
        return{
            width:0,
            height:0,
            targetCanvas:"",
            img:"",
            Ctx:"",
            CtxR:10,
            isScratch:false,//能否刮动
            renderTimer:"",
            scratchTimer:"",
            textX:0,//文字区域起点x值
            textY:0,//文字区域起点y值
            textW:0,//文字区域宽度值
            textH:0,//文字区域高度值
        }
    },
    mounted () {
        this.renderTimer = setInterval(()=>{
            if(this.$el.offsetWidth){
                this.width = this.$el.offsetWidth;
                this.height = this.$el.offsetHeight;
                this.initialize();
                clearInterval(this.renderTimer);
            }
        },100)
    },
    methods: {
        //初始化canvas
        initialize:function(){
            this.targetCanvas = this.$refs.canvas ;
            this.img = new Image();
            this.img.src = this.imgUrl;
            this.Ctx=this.targetCanvas.getContext("2d");
            this.img.onload = ()=>{
              // 执行drawImage语句
                this.Ctx.drawImage(this.img,0,0,this.width,this.height);
            }
            this.setTextAttr();
        },
        //设置文字区域的起点值及宽高值
        setTextAttr:function(){
            var textArea = this.$refs.textArea;
            this.textX = (this.$el.offsetWidth - textArea.offsetWidth) / 2;
            this.textY = (this.$el.offsetHeight - textArea.offsetHeight) / 2;
            this.textW = textArea.offsetWidth;
            this.textH = textArea.offsetHeight;
        },
        //开始
        touchStart:function(){
            this.$emit("touchStart");
            this.timeInterval();
            console.log("start")
        },
        //结束
        touchEnd:function(){
            clearInterval(this.scratchTimer);
            console.log("end")
        },
        //正在滑动
        touchMove:function(e){
            if(!this.isScratch) return;
            var mousePos = this.getMousePos(this.targetCanvas, e);
            if(e.changedTouches){
                e = e.changedTouches[e.changedTouches.length-1];
            }
            this.Ctx.globalCompositeOperation = "destination-out"; 
            this.Ctx.beginPath(); 
            this.Ctx.arc(mousePos.x, mousePos.y, this.CtxR, 0, Math.PI * 2); 
            this.Ctx.fill(); 
            this.Ctx.globalCompositeOperation = "source-over";
            console.log("move")
        },
        //获取当前位置
        getMousePos:function(canvas, e){
            var rect = canvas.getBoundingClientRect();
            if(e.changedTouches){
                e = e.changedTouches[e.changedTouches.length-1];
            }
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        },
        //检查刮开范围计时器
        timeInterval:function(){
            this.scratchTimer = setInterval(()=>{
                var isOver = this.conditionCheck();
                console.log(isOver)
                if(isOver){
                    this.scratchFinish();
                }
            },200)
        },
        //是否结束刮奖的条件检查
        conditionCheck:function(){
            var CtxW = this.textW
            ,   CtxH = this.textH
            ,   data = this.Ctx.getImageData(this.textX,this.textY,this.textW,this.textH).data 
            ,   j = 0;
            //j是没有被刮开的面积
            for(var i=0,j=0;i< data.length;i+=4){
                if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                    j++;
                }
            }
            return j<=CtxW*CtxH*( 1 - this.percentage);
        },
        //刮奖结束，发出事件通知
        scratchFinish:function(){
            this.$emit("finished")
            clearInterval(this.scratchTimer);
        }
    }
}
</script>