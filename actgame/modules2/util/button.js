/**
 * Created by HengZhao on 2016/12/7.
 */

var buttonClick = function(){
    var arg = Array.prototype.slice.call( arguments );

    var e = arg[0];

    var data_click = e.target.getAttribute( "data-click" );

    if( !data_click ){
        e.target.setAttribute( "data-click", "false" );
        data_click = "false";
    }

    if( data_click == "true" ){

    }else if( data_click == "false" ){
        e.target.setAttribute( "data-click", "true" );

        arg[1](function(){
            e.target.setAttribute( "data-click", "false" );
        });
    }

};

export default buttonClick;