function changeSize() {
    var n = $("body").width(),
        o = n / (16 / 9);
    $("#bgvideo").css({
        width: n,
        height: o
    })
}
window.onload = window.onresize = changeSize, $(function () {
    var o = $("#bgvideo"),
        i = o[0],
        n = $("#voice"),
        c = !1,
        e = function () {
            c ? n.css("backgroundPosition", "-66px -10px") : n.css("backgroundPosition", " -10px -10px")
        };
    i.addEventListener("canplay", function () {
        var n = this.play();
        n && n.then && n.then(function () {
            console.log("支持播放: ")
        }).
        catch (function () {
            c = !0, i.muted = !0, e(), o.prop("voice", !0), o.prop("autoplay", !0), i.play()
        })
    }), n.on("click", function () {
        i.muted = !i.muted, c = !c, e()
    })


    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        // 移动端
        // alert('建议横屏观看！')
    } else {
        //
    }
});