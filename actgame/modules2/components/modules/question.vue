<template>
        <div class="question-list">
                <ul>
                    <li class="question-item" v-bind:data-must="value.must" v-if=" allShow ? allShow : key == showNum" v-for="(value, key) in questions" v-bind:key="key" v-bind:data-index="key">
                        <div v-if="value.title.indexOf('___') > 0">
                            <span class="question-title" v-html="( key + '. ' ) + value.title.split('___')[0] ">
                            </span>
                            <input v-on:change="change($event)"　v-bind:data-title="value.title" v-bind:id=" name + key + value.type[0].split('_')[0] " v-bind:placeholder="value[value.type[0]]['placeholder']"  v-bind:value=" value.type[0].split('_')[0] != 'text' ? name : '' " v-bind:name=" 'subject' + key  " v-bind:type="value.type[0].split('_')[0]" v-bind:data-type="value.type[0]" v-if="value.type != 'textarea'">
                            <span class="question-title" v-html=" value.title.split('___')[1] ">
                            </span>
                        </div>
                        <div v-if="value.title.indexOf('___') < 0">
                            <p class="question-title" v-html="( key + '. ' ) + value.title"></p>
                            <section v-for="( val, name, inode) in value[value.type[0]]" >
                                <input v-on:change="change($event)" v-bind:id=" name + inode + value.type[0].split('_')[0] " v-bind:placeholder="value[value.type[0]]['placeholder']"  v-bind:value=" value.type[0].split('_')[0] != 'text' ? name : '' " v-bind:name=" 'subject' + key  " v-bind:type="value.type[0].split('_')[0]" v-bind:data-type="value.type[0]" v-if="value.type != 'textarea'">
                                <span @click="textProcess" v-if="value.type[0].split('_')[0] != 'textarea' && value.type[0].split('_')[0] != 'text' " v-html="typeof val == 'string' ? val : val.text"></span>
                                <textarea v-on:blur="textareaBlur" v-bind:id=" value.type + key " v-if=" value.type == 'textarea' "></textarea>
                                <span class="placeholder" v-if=" value.type == 'textarea' " v-html="value[value.type].placeholder"></span>
                            </section>
                        </div>
                        <div class="question-additional" v-bind:style="{ display: value.title.indexOf('___') > 0 || value.type[0].indexOf('_') > 0 ? 'block' : '' }" v-for="( val2, name2, inode2) in value[value.type[1]]" v-bind:data-value="value[value.type[1]].aim" v-if="inode2 == 0" >
                            <span class="placeholder" v-if=" value.type[1].match(/[^_]*/g)[0] == 'textarea' " v-html="value[value.type[1]].placeholder"></span>
                            <textarea v-on:blur="inputAdditionBlur($event)" v-bind:id=" name + inode + value.type[0].match(/[^\d]*/g)[0] " v-if=" value.type[1].match(/[^_]*/g)[0] == 'textarea' "></textarea>
                            <input v-on:blur="inputAdditionBlur($event)" v-bind:type="value.type[1].match(/[^_]*/g)[0]" v-if=" value.type[1].match(/[^_]*/g)[0] != 'textarea' " v-bind:placeholder="value[value.type[1]].placeholder" v-bind:data-type="value.type[1]">
                            <span class="t___span" v-if=" value.title.split('___')[2] " v-html="value.title.split('___')[2]"></span>
                        </div>
                    </li>
                </ul>
                <input type="button"  value="上一页" v-if="allShow == false &&　showNum != 1" @click="preview" />
                <input type="button"  value="下一页" v-if="allShow == false &&　showNum != allNum " @click="next" />
                <input type="button" v-on:click="submit" :value="submitBtnText" v-if=" allShow == false &&　showNum == allNum" />
                <input type="button" v-on:click="submit" :value="submitBtnText" v-if="allShow" />
        </div>
</template>

<script type="text/babel">

    export default {
        props: {
            allShow: {
                default(){
                    return false;
                },
            },
            submitBtnText:'',
        },
        data() {
            return {
                isShow: false,
                questions: {},
                answer: {},
                error: [], // 错误题目的id
                showNum: 1,
                allNum: 0,  // 总共题目
                subjectJudge: true, // 没点下一题进行判断
            }
        },
        computed: {},
        mounted(){

        },
        methods: {
            textProcess(e){
                var target = $(e.target);
                var siblings = target.siblings("input")[0];

                if( siblings.type == "radio" ){
                    siblings.checked = true;
                    this.change( null , siblings );
                }

                if( siblings.type == "checkbox" ){
                    siblings.checked = !siblings.checked;
                    
                    this.change( null , siblings );
                }


            },
            inputAdditionBlur(e){

                var _this = this;
                var target = e.target;
                var $el = $(e.target);
                var value = target.value;
                var index = $el.closest("li").attr("data-index");
                var dataName = $el.attr("data-type");

                if( dataName && dataName.indexOf("_") > 0 ){   // 处理  type 为 text_1  text_2 的情况

                    _this.answer[index][dataName] = value;

                }else {

                    _this.answer[index]['text'] = $.trim(value);

                }

//                console.dir( _this.answer );

            },
            textareaBlur(e){
                var _this = this;
                var target = e.target;
                var $el = $(e.target);
                var value = target.value;
                var type = e.target.type;
                var index = $el.closest("li").attr("data-index");

                _this.answer[index][type] = $.trim( value );

//                console.dir( _this.answer );
            },
            change(e, ele){

                if( e ){
                    var _this = this;
                    var target = e.target;
                    var value = target.value;
                    var type = target.type;
                    var id = target.id;
                    var $el = $(target);
                    var li = $el.closest("li");
                }

                if( ele ){
                    var _this = this;
                    var target = ele;
                    var value = ele.value;
                    var type = ele.type;
                    var id = ele.id;
                    var $el = $(ele);
                    var li = $el.closest("li");
                }

                var $siblingDiv = $el.closest("div");
                var $additional = $siblingDiv.siblings(".question-additional");
                var index = li.attr("data-index");

                if( type != "checkbox" ){

                    var dataName = $el.attr("data-type");
                    if( dataName &&　dataName.indexOf("_") > 0 ){   // 处理  type 为 text_1  text_2 的情况


                        _this.answer[index][dataName] = value;

//                        console.log( _this.answer[index][dataName] );

                        return;

                    }

                    var dataTitle = $el.attr("data-title") ;
                    if(  dataTitle  &&　dataTitle.indexOf("_") > 0 ){   // 处理 title 中有___的问题
                        _this.answer[index][type] = value;
                        return;
                    }

                    _this.answer[index][type] = value;

                    if( _this.questions[index].text ){   // 处理 type 中 radio

                        var temDiv = $siblingDiv.siblings("[data-value=" + value + "]");

                        if(  _this.questions[index].text.aim == value ){

                            _this.answer[index]['text'] = '';
                            temDiv.show();

                        }else{
                            delete  _this.answer[index]['text'];
                            $additional.find( "input[type=text]").val('');
                            $additional.hide();

                        }

                    }

                }else{

                    var temIndex = id.match( /[\d]+/g )[0];

                    //console.log(target.value+","+$additional.attr("data-value"))

                    if( target.checked  ){

                        if( _this.questions[index].checkboxlimit != undefined && _this.questions[index].checkboxlimit.toString().replace(/\s*/g, "") != ""  ){

                            if( Object.keys( _this.answer[index][type] ).length >= _this.questions[index].checkboxlimit ){
                                target.checked = false;
                                return;
                            }else{
                                _this.answer[index][type][temIndex] = value;   //  多选框的内容
                            }

                        }else{
                            _this.answer[index][type][temIndex] = value;   //  多选框的内容
                        }

                        if( target.value == $additional.attr("data-value") ){
                            $additional.show();
                        }

                    }else{
                        delete _this.answer[index][type][temIndex];
                        if( target.value == $additional.attr("data-value") ){
                            $additional.hide();
                        }
                    }

                }

                //console.dir( _this.answer );


            },
            history(){

                var _this = this;
                this.$nextTick(function(){

                    var keys = Object.keys( _this.answer[this.showNum] );

                    if( keys[0] == "checkbox" ){

                        for( var i in _this.answer[this.showNum][keys[0]] ){
//                                console.log( _this.answer[this.showNum][keys[0]] );
                            $( 'input[value=' + _this.answer[this.showNum][keys[0]][i] + ']' ).eq(0).attr("checked","checked");
                        }

                    }

                    if( keys[0] == "radio" ){

//                            console.log( _this.answer[this.showNum][keys[0]] + ' [vaule=' + _this.answer[this.showNum][keys[0]] + ']' );
//                            console.dir( $( '[vaule=' + _this.answer[this.showNum][keys[0]] + ']' ) );

                        // $( "#" + _this.answer[this.showNum][keys[0]] + $(".question-item").attr("data-index")  +  keys[0]).eq(0).attr("checked","checked")
                        $( 'input[value=' + _this.answer[this.showNum][keys[0]] + ']' ).eq(0).attr("checked","checked")

                    }

//                    console.log( 'keys[0]： ' + keys[0] );
//                    console.log( 'input[data-type=' + keys[0]  + ']' );
//                    console.log( keys[0].indexOf('text') > 0 );
//                    console.dir( $( 'input[data-type=' + keys[0]  + ']' ) );

                    if( keys[0].indexOf('text') >= 0 ){

                        $( 'input[data-type=' + keys[0]  + ']' ).eq(0).attr( 'value', _this.answer[this.showNum][keys[0]] )

                    }

                    if( keys[0] == "textarea" ){

                        $( "#" + keys[0] +  $(".question-item").attr("data-index")   ).eq(0).text( _this.answer[this.showNum][keys[0]] )

                    }


                    if( keys.length > 1 ){

                        if( keys[1].indexOf('text') >= 0 ){

                            $( 'input[data-type=' + keys[1]  + ']' ).eq(0).attr( 'value', _this.answer[this.showNum][keys[1]] )

                        }else{

                            $(".question-additional").show().find( 'input[type=' + keys[1] + ']').attr( 'value', _this.answer[this.showNum][keys[1]] );

                        }

                    }

                });

            },
            preview(){
                var _this = this;
                if (this.showNum == 1) {

                } else if (this.showNum > 1) {
                    --this.showNum;
                    _this.history();
                }
            },
            next(){
                var _this = this;
                if (this.showNum == this.allNum) {

                } else if (this.showNum < this.allNum) {

                    if( this.subjectJudge ){

                        var isRight = this.filterOneData( this.answer, this.questions , this.showNum );

                        if( isRight ){
                            ++this.showNum;
                            _this.history();
                        }

                    }else{
                        ++this.showNum;
                        _this.history();
                    }


                }
            },
            initData( data ){

                var _this = this;

                _this.questions = data;
                _this.allNum = Object.keys(_this.questions).length;

                var key = Object.keys( data );

                for(let i=0; i<key.length; i++) {

                    _this.answer[ key[i] ] = {};

                    if (typeof data[ key[i] ].type == "string") {  // 只有一种类型

                        if (data[ key[i] ].type == "checkbox") {
                            _this.answer[ key[i] ][data[ key[i] ].type] = {};
                        } else {
                            _this.answer[ key[i] ][data[ key[i] ].type] = '';
                        }

                    }

                    if( Object.prototype.toString.call(data[ key[i] ].type) == "[object Array]" ){  // 目前考虑有两种类型

                        for (let j = 0; j < data[ key[i] ].type.length; j++) {

                            if (data[ key[i] ]['type'][j] == "checkbox") {
                                _this.answer[ key[i] ][data[ key[i] ]['type'][j]] = {};
                            } else {
                                _this.answer[ key[i] ][data[ key[i] ]['type'][j]] = '';

                            }

                        }

                    }

                }

//                console.dir( _this.answer );


            },
            filterOneData( currentData, originData , tempIndex ){

                var keys = Object.keys( currentData );
                var _this = this;
                var error = false;   // 初始化数据

                if( originData[tempIndex]['must'] == '1' ){

                    if( originData[tempIndex]['text'] ){   // 判断有 其他， 输入内容的情况

                        for( let tempKey in currentData[tempIndex] ){

                            if( currentData[tempIndex][tempKey] == originData[tempIndex]['text']['aim'] ){
                                if( currentData[tempIndex]['text'].length == 0 ){
                                    error = true;
                                }
                            }

                        }
                    }

                    for( let tIndex in currentData[tempIndex] ){

//                        console.log( 'currentData[' + tempIndex + '][' + tIndex + ']: ' +  currentData[tempIndex][tIndex] )

                        if( tIndex == "checkbox" ){

                            if( $.isEmptyObject( currentData[tempIndex][tIndex] ) ){
                                error = true;
                            }

                        }else{

                            if( currentData[tempIndex][tIndex] == "" ){
                                error = true;
                            }
                        }

                    }

                }

                return !error;

            },
            delSpace(str){
                var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
                return  result.replace(/\s/g,"");//去除文章中间空格
            },
            filterAllData( currentData, originData ){

                var keys = Object.keys( currentData );
                var _this = this;
                _this.error = [];   // 初始化数据

                for( let i = 0; i<keys.length; i++){

                    let tempIndex = keys[i];

                    if( originData[tempIndex]['must'] == '1' ){

                        if( originData[tempIndex]['text'] ){   // 判断有 其他， 输入内容的情况

                            for( let tempKey in currentData[tempIndex] ){

                                if( currentData[tempIndex][tempKey] == originData[tempIndex]['text']['aim'] ){
                                    if( currentData[tempIndex]['text'].length == 0 ){

                                        if( _this.error.indexOf( tempIndex ) < 0 ){
                                            _this.error.push( tempIndex );
                                        }

                                    }
                                }

                            }
                        }

//                        console.log( _this.error );
//                        console.log( "-------------1234567891111111111111111111" );

                        for( let tIndex in currentData[tempIndex] ){

//                            console.log( 'currentData[' + tempIndex + '][' + tIndex + ']: ' );
//                            console.dir( currentData[tempIndex][tIndex] );
//                            console.log( "-------------" );

                            if( tIndex == "checkbox" ){

//                                console.dir( tIndex );
//                                console.dir( tempIndex );
//                                console.dir( currentData );

                                if( $.isEmptyObject( currentData[tempIndex][tIndex] ) ){

                                    if( _this.error.indexOf( tempIndex ) < 0 ){
                                        _this.error.push( tempIndex );
                                    }

                                }

                            }else{

//                                console.log( 'currentData[' + tempIndex + '][' + tIndex + ']: ' );
//                                console.dir( currentData[tempIndex][tIndex] );
//                                console.log( "-------------" );

                                var aim = _this.questions[tempIndex][tIndex]['aim'];
                                var checkbox = _this.questions[tempIndex][tIndex]['type'];

                                if( _this.delSpace( currentData[tempIndex][tIndex] ) == "" ){

//                                    console.log( "checkbox: " +  checkbox );

                                    if( checkbox == "checkbox" ){

                                        var values = Object.keys( _this.questions[tempIndex][checkbox] );
                                        var error = false;

//                                        console.dir( values );
//                                        console.dir( _this.answer[tempIndex][checkbox] );

                                        for( let i in _this.answer[tempIndex][checkbox] ){

//                                            console.log( 'aim: ', aim );
//                                            console.log( 'i', i );
//                                            console.log( _this.answer[tempIndex][checkbox][i] );

                                            if( aim == _this.answer[tempIndex][checkbox][i]  ){
                                                error = true;
                                            }

                                        }

//                                        console.log( 'error: ', error );

                                        if( error ){  // checkbox 里的 aim 值有在 answer里面

                                            if( _this.error.indexOf( tempIndex ) < 0 ){
                                                _this.error.push( tempIndex );
                                            }

                                        }

                                    }else{

                                        if( _this.error.indexOf( tempIndex ) < 0 ){
                                            _this.error.push( tempIndex );
                                        }

                                    }

                                }

//                                console.log( _this.error );
//                                console.log( "-------------2111111111111111111111111111111111" );


                            }



                        }

//                        console.log( _this.error );
//                        console.log( "-------------2" );

                    }

                }

            },
            submit(){

                this.filterAllData( this.answer, this.questions );

                if( this.error.length > 0 ){
                    this.$emit( "callback", this.error );
                }else{
                    this.$emit( "callback", this.answer );
                }


            },
        },
        filters: {},
        components: {
        }
    }
</script>
