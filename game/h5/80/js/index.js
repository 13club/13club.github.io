!function(){window.onload=function(){$("#loading").hide()};var o={row:1,col:1},e={row:0,col:0};const a={up:1,right:2,down:3,left:4};var t=!1;function n(s){var n=".page-"+e.row+"-"+e.col,r=".page-"+o.row+"-"+o.col;switch(s){case a.up:outClass="pt-page-moveToTop",inClass="pt-page-moveFromBottom";break;case a.right:outClass="pt-page-moveToRight",inClass="pt-page-moveFromLeft";break;case a.down:outClass="pt-page-moveToBottom",inClass="pt-page-moveFromTop";break;case a.left:outClass="pt-page-moveToLeft",inClass="pt-page-moveFromRight"}t=!0,$(r).removeClass("hide"),$(n).addClass(outClass),$(r).addClass(inClass),setTimeout(function(){$(n).removeClass("page-current"),$(n).removeClass(outClass),$(n).addClass("hide"),$(n).find("img").addClass("hide"),$(r).addClass("page-current"),$(r).removeClass(inClass),$(r).find("img").removeClass("hide"),t=!1},600)}s=window.innerHeight/500,ss=250*(1-s),$(".wrap").css("-webkit-transform","scale("+s+","+s+") translate(0px,-"+ss+"px)"),document.addEventListener("touchmove",function(o){o.preventDefault()},!1),$(document).swipeUp(function(){t||(e.row=o.row,e.col=o.col,8!=e.row&&(o.row=e.row+1,o.col=1,n(a.up)))}),$(document).swipeDown(function(){t||(e.row=o.row,e.col=o.col,1!=e.row&&(o.row=e.row-1,o.col=1,n(a.down)))})}();