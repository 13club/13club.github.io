var Assist = {
    support: {}
};

var getFileExtension = function (filename) {
    return filename.split('.').pop();
};

var isSupportWebp = function( callback ){

    if( Assist.support.webp2 === undefined ){

        var img = new Image();

        var tid = setTimeout(function(){

            Assist.support.webp2 = false;
            callback && callback(Assist.support.webp2, true);
            img.onload = img.onerror = null;
            img = null;

        }, 500);

        img.onload = img.onerror = function(){
            clearTimeout(tid);
            Assist.support.webp2 = img.width === 2 && img.height === 2;
            callback && callback(Assist.support.webp2, false);
        };

        img.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';


    }else{

        callback && callback( Assist.support.webp2 );

    }

};

var check_webp_feature = function(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
};

var imgLoad = function (option, callback, url) {
    var options = option || [];
    var loadedImgLen = 0;
    for (let i = 0; i < options.length; i++) {
        (function(i){
            var image = new Image();
            var finalSrc = '';
            if (url) {
                finalSrc = url + options[i].src;
            } else {
                finalSrc = options[i].src;
            }

            if( getFileExtension( options[i].src ) == "webp" ){
                isSupportWebp(function( isRight ){

                    if( isRight ){
                        image.src = finalSrc;
                    }else{
                        if (url) {
                            image.src = url + options[i].srcOther ;
                        } else {
                            image.src = options[i].srcOther ;
                        }
                    }

                });
            }else{
                image.src = finalSrc;
            }

            image.onload = function (e) {
                if (typeof options[i].callback === "function") {
                    options[i].callback(e.target.src);
                }

                ++loadedImgLen;

                if (loadedImgLen == options.length) {
                    if (typeof callback === "function") {
                        callback();
                    }
                }

            }
        })(i);
    }
};

export { imgLoad , isSupportWebp, check_webp_feature };
