<!--Date: 16-07-20
    Author: RaysoLi
    Desc: 问卷调查组件
 -->
 <template lang="jade">
    div#questionnaire-root(v-if="!isFinish")
        div( v-if="questionnaireConfig.isShowItemNum" class="question-fraction") {{{ questionIndex + "/" + questionLength }}}
        form(id="question-form" class='overflow-auto')
            ul(class="question-list" v-bind:style="{top:positonTop + 'px'}")
                li(class="question-item" v-bind:style="{height:parentHeight}" v-for="(index,value) in questionnaireConfig.questions" data-index="{{ index }}")
                    p {{{ index + '.' + value.title }}}
                    lable(v-if="value.options" v-for="(key,val) in value.options")
                        input( name="{{ 'subject' + index }}" type="{{ value.type }}" value="{{ key }}" )
                        span{{{ val }}}
                    p(v-if="value.additional")
                        span {{{ value.additional.text }}}
                        textarea( row=1 name="{{ 'subject' + index }}")
                        span.placeholder {{{ value.additional.placeholder }}}
        button(class="question-btn question-submit" @click="submitClick") {{{ questionnaireConfig.submitBtnText }}}
        button( v-if="isShowLastBtn" class="question-btn question-last" @click="lastClick") {{{ questionnaireConfig.lastBtnText }}}
        button( v-if="isShowNextBtn" class="question-btn question-next" @click="nextClick") {{{ questionnaireConfig.nextBtnText }}}
    div.question-over(v-if="isFinish") {{{ text.over }}}
    popup-toast
</template>

<script>
import popupToast from 'popupToast';
import strongDialog from 'strongDialog';
export default {
    data(){
        return{
            fillTipText:"第#题必填",
            questionLength:0,
            isShowLastBtn:true,
            isShowNextBtn:true,
            questionIndex:1,
            unfilledIndex:0,
            parentHeight:"auto",
            childHeight:0,
            positonTop:0,
            scrollTop:0,
            flag:false,
            isFinish:false,
            words:{},
            text:{}
        }
    },
    compiled(){
        this.initialize();         //初始化页面请求数据
    },
    ready(){
    },

    props:{
        Tools:{
            type: null,
            default: {}
        },
        questionnaireConfig:{
            type: Object,
            default: function(){
                return {
                    questions: {
                         "1":{
                            "title":"请输入您的mid",
                            "type":"text",
                            "additional":{
                                "text":"",
                                "placeholder":"输入您的mid"
                            }
                        },
                        "2":{
                            "title":"您的性别",
                            "type":"radio",
                            "options":{
                                "text":"男",
                                "placeholder":"女"
                            }
                        },
                        "3":{
                            "title":"您没有在游戏内购买过游戏币的原因是",
                            "type":"radio",
                            "options":{
                                "0":"不知道怎么购买",
                                "1":"对游戏内购买不放心",
                                "2":"太贵了",
                                "3":"不缺金币"
                            },
                            "isUnrequired":false,
                            "additional":{
                                "text":"其他原因",
                                "placeholder":"填写后将有可能获得抽话费、手机的机会"
                            }
                        },
                        "4":{
                            "title":"以下哪些是您生活中用过的付费工具（可多选）",
                            "type":"checkbox",
                            "option":{
                                "0":"网上银行",
                                "1":"短信支付",
                                "2":"支付宝支付",
                                "3":"微信支付",
                                "4":"都没有用过"
                            }
                        }
                    },
                    isShowItemNum: true,
                    isShowAll:false,
                    lastBtnText:"上一题",
                    nextBtnText:"下一题",
                    submitBtnText:"提交",
                    dutation:2000,
                    callBackFunc: null
                }
            }
        }
    },

    watch: {
        questionnaireConfig: function (newVal, oldVal) {
            this.setHeight();
            this.renderDefaultView()
            this.dispatchEvent()
        }
    },
    components: {
        strongDialog,
        popupToast
    },
    methods: {
        initialize(){
            this.Tools.ajax({'p':'data',extra:{"keys":"conf|data_interface"}}, (succData)=>{
                this.words = succData.conf.spec_show.words;
                this.isFinish = succData.data_interface.isFinish != 0;
            });
        },
        renderDefaultView(){
            let questionnaireConfig = this.questionnaireConfig
            this.isShowLastBtn = !questionnaireConfig.isShowAll && questionnaireConfig.lastBtnText
            this.isShowNextBtn = !questionnaireConfig.isShowAll && questionnaireConfig.nextBtnText
            this.questionLength = this.getObjLength(questionnaireConfig.questions);
            this.text = questionnaireConfig.tipText;
        },
        lastClick(){
            if(this.flag) return;
            if(this.questionIndex == 1) return;
            this.questionIndex--;
            this.positonTop += this.childHeight;
            this.dispatchEvent()
        },

        nextClick(){
            if(this.flag) return;
            if(this.questionIndex == this.getObjLength(this.questionnaireConfig.questions)) return;
            let isPass = this.isRequiredPass(this.questionnaireConfig.questions[this.questionIndex],this.questionIndex);
            $("#question-form").scrollTop(0);
            if(isPass.isNotPass){
                this.requiredTip(this.questionIndex);
                return;
            }
            if(!isPass.isRightNumber){
                return;
            }
            this.questionIndex++;
            this.positonTop -= this.childHeight;
            this.dispatchEvent();
        },
        submitClick(e){
            e.preventDefault();
            if(this.flag) return;
            this.flag = true;
            var formDataObj = $("#question-form").serializeArray();
            var formData = {}
            var tempQuestion = this.questionnaireConfig.questions;
            for(var i in tempQuestion){
                formData[i] = [];
                for(let k = 0;k < formDataObj.length;k++){
                    if( "subject"+i == formDataObj[k].name){
                        formData[i].push(formDataObj[k].value);
                    }
                }
            }
            if(this.checkIsFilled(formData)){
                this.Tools.ajax({'p':'complete',extra:{"keys":"questionnaire","result":formData}}, (succData)=>{
                    if(typeof this.questionnaireConfig.callBackFunc == "function"){
                        this.questionnaireConfig.callBackFunc(succData)
                    }else{
                        this.callBackFunction(succData);
                    }
                    this.flag = false;
                });
            }
            return false;
        },
        checkIsFilled(checkData){
            var _that = this;
            var unfilledArr = [];
            var questions = this.questionnaireConfig.questions;
            for (let k in questions){
                var isRequiredPass = this.isRequiredPass(questions[k],k);
                if(isRequiredPass.isNotPass || !isRequiredPass.isRightNumber){
                    isRequiredPass.key = k;
                    unfilledArr.push(isRequiredPass);
                };
                if(unfilledArr == 0){
                    this.scrollTop += $(".question-item").eq(k-1).height();
                }
            }
            if(unfilledArr.length != 0){
                this.backToUnfilled(unfilledArr[0].key);
                var indexText = "";
                for(let i=0;i<unfilledArr.length;i++){
                    indexText += "," + unfilledArr[i].key;
                }
                indexText = indexText.substring(1);
                if(unfilledArr[0].isNotPass){
                    this.requiredTip(indexText);
                    return false;
                }
                if(!unfilledArr[0].isRightNumber){
                    return false;
                }
            }
            return true;
        },
        backToUnfilled(index){
            if(this.questionnaireConfig.isShowAll){
                $("#question-form").scrollTop(this.scrollTop);
            }else{
                this.positonTop = -this.childHeight * (index - 1);
            }
            this.unfilledIndex = index;
            this.questionIndex = index;
            this.dispatchEvent();
        },
        isRequiredPass(thisQuestion,index){
            var name = "subject" + index;
            var options = $("input:checked[name='"+name+"']");
            var isOnlySelectNull = thisQuestion.type != "text" && !!!thisQuestion.additional && options.length == 0 ;
            var isOnlyInputNull = thisQuestion.type == "text" && $("textarea[name='"+ name +"']").val() == "";
            var isNull = thisQuestion.type != "text" && !!thisQuestion.additional && options.length == 0 && $("textarea[name='"+name+"']").val() == "";
            var isNotPass = (typeof thisQuestion.isUnrequired == "undefined" || thisQuestion.isUnrequired=="false" ) && ( isOnlySelectNull || isOnlyInputNull || isNull);
            var isRightNumber = true;
            if(thisQuestion.type == "checkbox"){
                var optionsNum = options.length;
                isRightNumber = this.isRightNumber(thisQuestion,optionsNum,index);
            }
            return {"isNotPass":isNotPass,"isRightNumber":isRightNumber};
        },
        requiredTip(index){
            let toastText = this.text.require || this.fillTipText;
            if(toastText.indexOf("#") > -1){
                toastText = toastText.replace("#",index);
            }
            this.popupToast(toastText);
            return false;
        },
        numberLimitTip(text){
            this.popupToast(text);
        },
        popupToast(toastText){
            var _that = this;
            var toastMsg = {
                bodyText: toastText,
                timer: this.questionnaireConfig.duration,           //可不传；默认2000ms
                callBackFunc: function(){_that.flag = false;}  // 可不传，默认null；
            }
            this.$broadcast('show-popup-toast', toastMsg);
        },
        isRightNumber(question,number,index){
            var tipName = "";
            if(question.most && parseInt(question.most) > number){
                tipName = "most";
            }
            if(question.least && parseInt(question.least) < number){
                tipName = "least";
            }
            if(question.number && parseInt(question.number) != number){
                tipName = "number";
            }
            if(tipName != ""){
                if(typeof this.text[tipName] != "undefined"){
                    var tipText = this.text[tipName];
                    if(tipText.indexOf("@") > -1){
                        tipText = tipText.replace("@",index);
                    }
                    if(tipText.indexOf("#") > -1){
                        tipText = tipText.replace("#",question[tipName]);
                    }
                }else{
                    var tipText = text.limit;
                }
                this.numberLimitTip(tipText);
                return false;
            }
            return true;
        },
        dispatchEvent(){
            let msg = {};
            msg.questionIndex = this.questionIndex;
            msg.unfilledIndex = this.unfilledIndex;
            this.$dispatch('questionnaire-page-status', msg)
        },

        getObjLength(obj){
            if(null === obj || undefined === obj){
                return 0;
            }

            if(undefined === obj.length){
                let count = 0
                for(let key in obj){
                    count++
                }
                return count
            }else{
                return obj['length']
            }
        },
        setHeight(){
            if(this.questionnaireConfig.isShowAll) return;
            this.parentHeight = $("#question-form").height() + "px";
            this.childHeight = $("#question-form").height();
        },
        callBackFunction(succData){
            var status = succData.status, msg = succData.msg, name = succData.name;
            var oText = this.words[msg] || name;
            if(oText.indexOf("#")!=-1){
                oText = oText.replace("#", name);
            }
            var dlgMsgObj = {
                titleText:"温馨提示",
                bodyText: "<div>"+oText+"</div>",
                btnsObj: {
                    0: {
                        btnText: "确定",
                        callBackFunc: this.reRenderPage
                    }
                },
                isShowTitleFlag:true
            }
            // var dlgMsgObj = text;  //Just Single Param, U Can Deliver Like This 
            this.$broadcast('show-strong-dlg', dlgMsgObj);
        },
        reRenderPage(){
            this.initialize();
        }
    },

    events: {
   }
}
</script>


<style>
#questionnaire-root{height: 100%;width:60%;position: absolute; color: #333;}
.question-fraction{position: absolute;bottom: 100%;}
#question-form{position: absolute; height: 95%; width: 95%; overflow-y: hidden;}
#question-form.overflow-auto{overflow-y:auto;}
.question-list{position: absolute;}
.question-item{width: 100%;overflow-x:hidden;}
.question-btn{position: absolute;bottom: -2em;color: #333;}
.question-last{left: 4em;}
.question-next{left: 8em;}
 #question-form lable{display: block;position: relative;}
#question-form input[type="radio"],#question-form input[type="checkbox"]{display: inline-block;
    width: .5em;
    height: .5em;
    border-radius: 50%;
    background-color: #26633A;
    outline: 0!important;
    vertical-align: middle;
    box-shadow: 0 0 0 0.1em #82FFBD,inset 0 0 0 0.5em #26633A;
    -webkit-appearance: none;
    appearance: none;cursor: pointer;
background-color:#FFF000;margin: 0 .5em;}
#question-form input[type="radio"]:checked,#question-form input[type="checkbox"]:checked{box-shadow: 0 0 0 0.1em #82FFBD,inset 0 0 0 0.1em #26633A;}
#question-form input:after{content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;}
#question-form textarea{background-color: transparent;border: none;border-bottom: 1px solid #ddd;outline: none;display: block;width: 98%;resize: none;height: 1.5em;line-height: 1.5;white-space: nowrap; overflow-x: auto;}
.placeholder{visibility: visible;color: #ddd;font-size: .8em;}
#question-form textarea:focus~.placeholder{visibility: hidden;}
</style>