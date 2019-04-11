! function () {
    function e(e) {
        return (e = e || at.getInstance("activeState")) ? (zt.showErrorInfo(e, function () {
            var e = parseInt(at.getInstance("activeCode"), 10);
            if (e > 1) {
                var t = at.getInstance("myTop") || {}, i = at.getInstance("activeData");
                2 == i.resultType || 3 == i.resultType ? U(t.bestCounter, t.top) : l(at.config.content.isShowScore) ? U(
                    t.bestCounter, t.top) : Q(t.bestCounter)
            }
        }), !0) : !1
    }
    function t(e, t) {
        var i = e.guid;
        Ct = at.api.weixinStrong.getIdentifyId(), at.requestAjax("answer/checkActive", {
            wsiteGuid: at.wsiteGuid,
            guid: i,
            openId: yt.id,
            identify: Ct
        }, "POST").then(function (e) {
            t(e)
        })
    }
    function i() {
        var e = n();
        return at.requestAjax("answer/get", {
            wsiteGuid: at.wsiteGuid,
            guid: at.config.content.guid,
            from: "view",
            qv: at.config.content.questionVersion,
            questionCount: e.count,
            isRander: e.show
        }).then(function (e) {
            zt.hideLoading(), Y(), 0 == e.result ? (at.setInstance("isLoaded", !0), at.setInstance("answerData", e.data),
                s()) : zt.showErrorInfo(e.msg)
        }, function (e) {
            zt.hideLoading(), console.info(e), winAlert("服务异常-" + e.status)
        })
    }
    function n() {
        var e = at.config.content.randomAnswer || {
            show: !1,
            count: 10,
            answerCount: 1,
            showResult: !1
        };
        return e.answerCount = e.answerCount || 1, e
    }
    function o(e) {
        setTimeout(function () {
            var t = !1;
            at.api.getDanmuConfig() && (t = at.api.getDanmuConfig().showDanmu), at.api.stopDanma(), e ? t && at.api.stopDanma() :
                t && at.api.startDanma()
        }, 1e3)
    }
    function s(t) {
        o(!0), at.setInstance("currentAnswerIndex", 0), c();
        for (var i = at.getInstance("answerData"), n = at.currentPage.find(".pt-page-effect-box-" + at.config.id), s =
                i.questionList || [], r = 0, l = 0; l < s.length; l++) {
            20 == at.config.content.answerVersion || s[l].score || (l == s.length - 1 ? s[l].score = 100 - r : (s[l].score =
                (100 / s.length).toFixed(0), r += s[l].score)), s[l].question = s[l].question.replace(/\n/g, "<br>");
            for (var d = s[l].list || [], p = 0; p < d.length; p++) d[p].codeIndex = bt[p], d[p].selected = !1
        }
        i.awardModel = B(i.awardModel), i.topData = B(i.topData, "obj"), i.questionType = i.questionType || 1, at.setInstance(
            "activeData", i), at.renderElement(n, {
            isEdit: !1,
            questionType: i.questionType,
            asset: lt,
            answerList: s,
            smallImageThum: gt,
            bigImageThum: pt,
            codeIndex: ["A.", "B.", "C.", "D.", "E.", "F."]
        });
        var g = at.html.find(".answer-index-0");
        if (g.css("opacity", 1), g.css("display", "block"), Cool.util.checkIsAndroid()) {
            var f = n.find(".rrx-pg-answer-index .plugin-answer");
            f.css({
                transition: "transform  1s",
                transform: "translate3d(0,0,0)",
                "-webkit-transform": "translate3d(0,0,0)"
            })
        }
        D();
        var v = at.getInstance("activeState") || "";
        if ("" != v && "reset" != t) e(v);
        else {
            var h = at.getInstance("activeData");
            "reset" != t && 2 == at.config.content.ruleType ? u("basicPage") : (3 != i.questionType && at.api.isWeixin() ||
                appConfig.dev === !0) && a()
        }
        setTimeout(function () {
            if (h && h.questionList && h.questionList.length > 0) {
                var e = h.questionList[0];
                j(e, 0, at.html.find(".answer-index-0 .question-title").get(0))
            }
        }, 100)
    }
    function a() {
        var e = n();
        if (l(e.showLimitTime)) {
            var t = e.limitTime || 60;
            at.html.find(".header-downTime").show();
            var i = at.html.find(".header-downTime .down-time");
            2 == e.showLimitTimeType ? (Dt = !1, r(i, t, function () {
                var e = at.getInstance("currentAnswerIndex") || 0;
                console.log("单个题目", e), at.setInstance("rightCount", 0), L("Error"), dt = !1, M(e)
            })) : (Dt = !1, r(i, t, function () {
                console.log("总题目", "answerEnd"), H(), q()
            }))
        }
    }
    function r(e, t, i) {
        Dt || (kt = t, e.html(kt + " 秒"), Pt = setInterval(function () {
            console.log("timer_instance", kt), kt -= 1, 0 >= kt ? (Dt = !0, clearInterval(Pt), i()) : e.html(kt + " 秒")
        }, 1e3))
    }
    function c() {
        Pt && clearInterval(Pt)
    }
    function l(e) {
        return e === !0 || "true" === e || "1" === e || 1 === e ? !0 : !1
    }
    function d() {
        vt && (vt.find(".content-close").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), vt.find(
            ".dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function () {
            vt.hide()
        }, 600))
    }
    function u(e) {
        var t = at.getInstance("activeData");
        if (vt = $("#pt-inner").find("." + ft), null === vt || void 0 === vt || 0 === vt.length) {
            var i =
                '<div class="{{basicCss}}"><div class="content-close"><img class="content-close-img" src="{{closeIcon}}"></div><div class="dialog-content"><div class="dialog-content-head"><ul class="wrapper"><li class="basicPage" style="background-color:{{baseColor}};color:#fff">活动说明</li>{{if countryTop==1}}<li class="topsPage">排行榜</li>{{/if}} {{if friendTop==1}}<li class="friendsPage">好友排行</li>{{/if}} {{if isFocus==1}}<li class="focusPage">关于我们</li>{{/if}}</ul></div><div class="dialog-content-box"><div id="scrolle" class="scroll-list"></div></div><div class="dialog-content-foot" style="background-color:{{baseColor}};color:#fff"><a href="javascript:void(0)" target="_blank" style="text-decoration:none;color:#fff"></a></div></div></div>\n',
                n = at.compileHtml(i, {
                    closeIcon: at.api.getLibHost() + "weplus/image/close.png",
                    baseColor: ht,
                    basicCss: ft,
                    isFocus: l(at.config.content.isFocusWx) && at.config.content.wxQr ? 1 : 0,
                    countryTop: l(t.topData.countryTop) ? 1 : 0,
                    friendTop: l(t.topData.friendTop) ? 1 : 0,
                    friendPK: l(t.topData.friendPK) ? 1 : 0,
                    topPrize: l(t.topData.topPrize) ? 1 : 0
                });
            $("#pt-inner").append(n), vt = $("#pt-inner").find("." + ft);
            var o = vt.find(".dialog-content-head ul");
            o.find("li").off(at.clickType).on(at.clickType, function (e) {
                e.stopPropagation(), e.preventDefault();
                var t = e.currentTarget.className;
                g(o, t)
            });
            var s = vt.find(".content-close");
            s.off(at.clickType).on(at.clickType, function (e) {
                e.stopPropagation(), e.preventDefault(), k(vt, function () {
                    if (zt.checkIsHaveDialog() || at.api.resetFlip(), 2 == at.config.content.ruleType && !xt) {
                        var e = at.getInstance("isFirstLoad");
                        if (e) {
                            at.setInstance("isFirstLoad", !1);
                            var t = at.getInstance("activeData");
                            (3 != t.questionType && at.api.isWeixin() || appConfig.dev === !0) && a()
                        }
                    }
                })
            }), C(vt), x("scroll-list-1", vt.find(".dialog-content-box").get(0)), at.api.scaleElement(vt), T()
        } else C(vt);
        void 0 !== e ? g(vt.find(".dialog-content-head ul"), e) : g(vt.find(".dialog-content-head ul"), "basicPage");
        var r = vt.find(".dialog-content-foot"),
            c = p();
        if (c) if (c.content) r.find("a").html(c.content), r.find("a").attr({
                    href: c.url
                });
            else {
                var d = ["6px", "-45px"],
                    u = 0,
                    f = "快速制作答题-liao",
                    v = "300万用户正在使用",
                    h = $(
                        '<div class="scroll" style="position: relative;top:6px; -webkit-transition: top .8s; font-size:26px"><div>' +
                        f + " </div> <div>" + v + " </div> ");
                r.find("a").append(h);
                var m = r.find("a").find(".scroll");
                setInterval(function () {
                    m.css({
                        top: d[u]
                    }), u++, u > 1 && (u = 0)
                }, 1800)
            } else r.remove()
    }
    function p() {
        return at.api.getCustomerCopyrightInfo()
    }
    function g(e, t) {
        e.find("li").css({
            "background-color": "#ffffff",
            color: "inherit"
        }), e.find("." + t).css({
            "background-color": ht,
            color: "#ffffff"
        }), "basicPage" == t ? f() : "topsPage" == t ? m() : "friendsPage" == t ? I() : "focusPage" == t && y()
    }
    function f() {
        h(function (e) {
            var t = vt.find(".scroll-list"),
                i =
                    '<div class="rule">{{if ruleType==2}}<div class="rule-one"><div class="rule-one-head"><div style="background-color:{{baseColor}}" class="item">1</div>活动规则</div><div class="rule-one-box">{{ruleContent}}</div></div>{{/if}}<div class="rule-line"><div class="rule-line-head"><div style="background-color:{{baseColor}}" class="item">{{ruleType==2?2:1}}</div>活动时间</div><div class="rule-line-box">{{beginTime}} ~ {{endTime}}</div></div><div class="rule-line rule-rrx-copyright"><div class="rule-line-head"><div style="background-color:{{baseColor}}" class="item">{{ruleType==2?3:2}}</div>技术支持</div><div class="rule-line-box">{{copyRightName}}</div></div>{{if showLottery==1 }}<div class="rule-three"><div class="rule-three-head"><div style="background-color:{{baseColor}}" class="item">{{ruleType==2?4:3}}</div>活动奖品</div><div class="rule-three-box"><div class="head" style="color:{{baseColor}}">抽奖奖品 {{if showMyPrize==1}} <a href="javascript:void(0)" style="color:{{baseColor}}" class="rule-myPrizeBtn">我的奖品</a> {{/if}}</div><ul>{{each prizeList as row i}}<li><img src="{{row.prizeIcon}}"><div class="grab-content-text"><p>{{row.prizeName}}</p><span>{{row.prizeTypeName}}</span></div></li>{{/each}}</ul></div></div>{{/if}}</div>',
                n = at.config.content.ruleType;
            ("" == at.config.content.ruleContent || void 0 == at.config.content.ruleContent) && (n = 1);
            var o = at.getInstance("activeData"),
                s = b(),
                a = "liao";
            s ? s.content && (a = s.content) : a = "liao";
            var r = at.compileHtml(i, {
                baseColor: ht,
                ruleType: n,
                showMyPrize: at.config.content.showMyPrize ? 1 : 0,
                ruleContent: at.config.content.ruleContent.replace(/\n/g, "<br>"),
                beginTime: v(o.beginTime),
                endTime: v(o.endTime),
                prizeList: e,
                showLottery: e.length > 0 && 2 == o.resultType ? 1 : 0,
                copyRightName: a
            });
            t.html(r), at.config.content.showMyPrize && setTimeout(function () {
                t.find(".rule-myPrizeBtn").off(at.clickType).on(at.clickType, function (e) {
                    e.stopPropagation(), e.preventDefault(), at.api.getMyActivePrizeList(at.wsiteGuid, at.config.content
                        .guid, yt.id, ht)
                })
            }, 1e3), T()
        })
    }
    function v(e) {
        if (e) {
            e = e.toString();
            var t = e.split(":");
            if (t.length >= 3) return e.substr(0, e.length - 3)
        }
        return e
    }
    function h(e) {
        var t = at.getInstance("prizeList");
        null == t || void 0 == t ? (zt.showLoading(), at.requestAjax("generalPrize/getPrizeListByView", {
            activeGuid: at.config.content.guid,
            prizeAuth: 1
        }, "GET", "").then(function (i) {
            if (0 == i.result) {
                t = i.data;
                for (var n = at.getInstance("activeData"), o = n.totalProbability || 100, s = o / 100, a = 0; a < t.length; a++)
                    "" == t[a].prizeIcon && (t[a].prizeIcon = at.api.getImageHost() + "default_prize_icon.png"), t[a].rate =
                        (t[a].winProbability / s).toFixed(2);
                at.setInstance("prizeList", t), e(t)
            } else zt.showErrorInfo(i.msg);
            zt.hideLoading(), at.api.stopFlip()
        }, function (e) {
            console.info(e), winAlert("服务异常-" + e.status), zt.hideLoading(), at.api.stopFlip()
        })) : (e(t), at.api.stopFlip())
    }
    function m() {
        w("", function (e) {
            var t =
                '<div class="tops"><div class="tops-info"><img src="{{topData.headImageUrl}}" style="border:4px solid{{baseColor}}"><div class="tops-content-text"><div class="tops-name">{{topData.nickName}}</div><div class="tops-score">最好成绩<span style="color:{{baseColor}}">{{topData.bestCounter}}</span></div><div class="tops-top">全国排名<span style="color:{{baseColor}}">{{topData.top}}</span></div></div>{{if showTopPrize==1}}<div class="content-box-action" style="background-color:{{baseColor}}">录入领奖人信息</div>{{/if}}</div><div class="content-box-color"></div><div class="tops-content"><ul>{{each topList as row i}}<li><div class="tops-content-text">{{if i==0}}<div class="topsNum" style="background-image:url({{topOneIcon}});vertical-align:sub"></div>{{/if}} {{if i==1}}<div class="topsNum" style="background-image:url({{topTwoIcon}});vertical-align:sub"></div>{{/if}} {{if i==2}}<div class="topsNum" style="background-image:url({{topThreeIcon}});vertical-align:sub"></div>{{/if}} {{if i>2}}<div class="topsNum" style="vertical-align:sub">{{i+1}}</div>{{/if}} <img class="topsImage" src="{{row.headImageUrl}}"><div class="tops-content-name">{{row.nickName}}</div><div class="tops-content-sc">{{row.bestCounter}}</div></div></li>{{/each}}</ul></div></div>\n',
                i = vt.find(".scroll-list"),
                n = at.getInstance("activeData"),
                o = at.compileHtml(t, {
                    baseColor: ht,
                    topOneIcon: at.api.getLibHost() + "weplus/image/tops_1.png",
                    topTwoIcon: at.api.getLibHost() + "weplus/image/tops_2.png",
                    topThreeIcon: at.api.getLibHost() + "weplus/image/tops_3.png",
                    topData: e.topData,
                    showTopPrize: l(n.topData.topPrize) ? 1 : 0,
                    topList: e.rows
                });
            i.html(o), setTimeout(function () {
                i.find(".tops .content-box-action").off(at.clickType).on(at.clickType, function (e) {
                    e.stopPropagation(), e.preventDefault(), d(), zt.showTopFormDialog()
                })
            }, 500)
        })
    }
    function w(e, t) {
        zt.showLoading(), at.requestAjax("answerTop/getTops", {
            wsiteGuid: at.wsiteGuid,
            father: e || "",
            activeGuid: at.config.content.guid,
            secret: yt.id,
            limit: 200
        }, "GET").then(function (e) {
            0 == e.result ? ("" == e.data.topData.nickName && (e.data.topData.nickName = yt.nickname, e.data.topData.headImageUrl =
                yt.headimgurl), t(e.data)) : zt.showErrorInfo(e.msg), zt.hideLoading(), at.api.stopFlip()
        }, function (e) {
            console.info(e), winAlert("服务异常-" + e.status), zt.hideLoading(), at.api.stopFlip()
        })
    }
    function I() {
        w("father", function (e) {
            var t =
                '<div class="friends"><div class="tops-info"><img src="{{topData.headImageUrl}}" style="border:4px solid{{baseColor}}"><div class="tops-content-text"><div class="tops-name">{{topData.nickName}}</div><div class="tops-score">最好成绩<span style="color:{{baseColor}}">{{topData.bestCounter}}</span></div><div class="tops-top">好友排名<span style="color:{{baseColor}}">{{topData.top}}</span></div></div></div><div class="content-box-color"></div><div class="tops-content"><ul>{{each topList as row i}}<li><div class="tops-content-text">{{if i==0}}<div class="topsNum" style="background-image:url({{topOneIcon}});vertical-align:sub"></div>{{/if}} {{if i==1}}<div class="topsNum" style="background-image:url({{topTwoIcon}});vertical-align:sub"></div>{{/if}} {{if i==2}}<div class="topsNum" style="background-image:url({{topThreeIcon}});vertical-align:sub"></div>{{/if}} {{if i>2}}<div class="topsNum" style="vertical-align:sub">{{i+1}}</div>{{/if}} <img class="topsImage" src="{{row.headImageUrl}}"><div class="tops-content-name">{{row.nickName}}</div><div class="tops-content-sc">{{row.bestCounter}}</div></div></li>{{/each}}</ul></div></div>\n',
                i = vt.find(".scroll-list"),
                n = at.compileHtml(t, {
                    baseColor: ht,
                    topOneIcon: at.api.getLibHost() + "weplus/image/tops_1.png",
                    topTwoIcon: at.api.getLibHost() + "weplus/image/tops_2.png",
                    topThreeIcon: at.api.getLibHost() + "weplus/image/tops_3.png",
                    topData: e.topData,
                    topList: e.rows
                });
            i.html(n)
        })
    }
    function y() {
        var e = at.config.content.wxQr;
        if (at.config.content.isFocusWx && e && "" !== e && void 0 !== e) {
            e += "@!200x200";
            var t = vt.find(".scroll-list"),
                i =
                    '<div class="focus-page focus"><div class="focus-info"><img src="{{qrcode}}"><div>长按二维码</div><div>关注公众号</div></div></div>\n',
                n = at.compileHtml(i, {
                    qrcode: e
                });
            t.html(n)
        }
    }
    function b() {
        return at.api.getCustomerCopyrightInfo()
    }
    function T() {
        if (vt) {
            var e = b();
            if (e) e.content && (vt.find("div.dialog-content-foot >a").attr("href", e.url), vt.find(
                    "div.dialog-content-foot >a").html(e.content), vt.find(".rule-rrx-copyright").show());
            else {
                vt.find("div.dialog-content-foot").hide(), vt.find(".rule-rrx-copyright").hide();
                var t = vt.find(".rule-three .rule-three-head .item");
                vt.find(".rule-three .rule-three-head .item").html(t - 1)
            }
        }
    }
    function x(e, t) {
        St[e] || t && setTimeout(function () {
            St = new iScroll(t, {
                checkDOMChanges: !0,
                bounce: !1,
                bounceLock: !1,
                hScrollbar: !1,
                onBeforeScrollStart: function (e) {
                    e.stopPropagation()
                }
            })
        }, 100)
    }
    function C(e) {
        e.find(".dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), e.find(".content-close").removeClass(
            "bounceOutUpAni").addClass("bounceInUpAni"), e.show(), at.api.stopFlip()
    }
    function k(e, t) {
        e.find(".dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), e.find(".content-close").removeClass(
            "bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function () {
            e.hide(), t && t()
        }, 600)
    }
    function P() {
        at.api.createEvent("sysResetFlipCallBack", function () {
            at.api.stopFlip()
        })
    }
    function D() {
        at.api.isPc() || at.api.scaleElement(at.html.find(".plugin-answer"));
        var t = at.html.find(".plugin-answer .imgBox");
        t.off(at.clickType).on(at.clickType, function (t) {
            t.stopPropagation(), t.preventDefault(), e() || z($(this), !0)
        });
        var i = at.html.find(".plugin-answer .item-text");
        i.off(at.clickType).on(at.clickType, function (t) {
            t.stopPropagation(), t.preventDefault(), e() || z($(this))
        });
        var n = at.html.find(".audio-plugin-answer").get(0),
            o = at.html.find(".plugin-answer .question-music");
        o.find("img").off(at.clickType).on(at.clickType, function () {
            var e = $(this),
                t = e.data("src"); - 1 === t.indexOf("http") && (t = at.api.musicPreFix(t));
            var i = e.data("type"),
                o = e.data("id");
            ut = o;
            var s = at.html.find(".plugin-answer .music-index-" + o);
            "play" === i ? n.paused && (E(), at.hideEffect(s.find(".img-play")), at.showEffect(s.find(".img-pause"), !0),
                n.setAttribute("src", t), n.play()) : (q(), at.showEffect(s.find(".img-play"), !0), at.hideEffect(s.find(
                ".img-pause")), n.pause())
        }), $(n).on("ended", function () {
            var e = at.html.find(".plugin-answer .music-index-" + ut);
            at.showEffect(e.find(".img-play"), !0), at.hideEffect(e.find(".img-pause")), q()
        })
    }
    function L(e) {
        if (lt["audio" + e]) {
            var t = null;
            t = null !== at.html ? at.html.find(".audio-plugin-sound-effect").get(0) : document.createElement("audio"),
                t && (t.paused || t.pause(), t.setAttribute("src", lt["audio" + e]), t.play())
        }
    }
    function E() {
        at.api.stopBackgroundMusic()
    }
    function q() {
        at.api.resetFlip(), at.backgroundMusicState && at.api.playBackgroundMusic()
    }
    function A() {
        return Cool.util.getUrlParameterByName("anfather") || ""
    }
    function S(e, t) {
        console.log("saveScore", e);
        var i = at.config.content.guid;
        at.requestAjax("answerTop/saveScore", {
            foreignGuid: i,
            answerResult: JSON.stringify(e),
            connect: A(),
            openId: yt.id,
            wsiteGuid: at.wsiteGuid
        }, "POST").then(function (e) {
            if (0 == e.result) {
                at.setInstance("myTop", e.data.topData), at.setInstance("playCount", e.data.topData.playCount);
                var i = n();
                parseInt(e.data.topData.playCount) >= parseInt(i.answerCount) && (at.setInstance("activeCode", 500), at
                    .setInstance("activeState", ct), dt = !0)
            } else console.log(e.data);
            t(e)
        })
    }
    function z(t, i) {
        return at.api.checkWeixinAlert() ? l(at.getInstance("ispass")) ? void e(rt) : void nt(function (e) {
            if (e) {
                if (xt) {
                    var n = at.getInstance("isFirstLoad");
                    if (n) {
                        at.setInstance("isFirstLoad", !1);
                        var o = at.getInstance("activeData");
                        (3 != o.questionType && at.api.isWeixin() || appConfig.dev === !0) && a()
                    }
                }
                F(t, i)
            }
        }) : void 0
    }
    function F(t, i) {
        if (dt) {
            var n = at.getInstance("activeState") || "";
            return void("" != n && e(n))
        }
        var o = at.getInstance("activeData");
        2 == o.questionType ? N(t, i) : 3 == o.questionType ? O(t, i) : R(t, i)
    }
    function R(e, t) {
        dt = !0;
        var i = e,
            o = i.data("id").split("-");
        if (2 === o.length) {
            zt.showLoading();
            var s = at.getInstance("activeData"),
                a = s.questionList[o[0]],
                r = null;
            if (a.list && a.list.length > 0 && (r = a.list[o[1]]), null === r) return void zt.hideLoading();
            r.selected = !0, e.off(at.clickType);
            var c = !1;
            if (l(r.right) && (c = !0), G(i, c, t), c) {
                L("Right");
                var d = at.getInstance("rightCount") || 0;
                d = parseInt(d) + 1, at.setInstance("rightCount", d);
                var u = a.rightCount || 1;
                console.log("rightAllCount", u), d == u ? (a.isRight = !0, at.setInstance("rightCount", 0), setTimeout(function () {
                    M(o[0])
                }, 300)) : dt = !1
            } else {
                a.isRight = !1, at.setInstance("rightCount", 0), L("Error");
                var p = n();
                if (l(p.showResult)) {
                    for (var g = [], f = 0; f < a.list.length; f++) l(a.list[f].right) && (a.list[f].answerExplain && (
                            a.list[f].answerExplain = a.list[f].answerExplain.replace(/\n/g, "<br>")), g.push(a.list[f]));
                    var v =
                        '<div class="rrx-pg-answer-question-result"><div><div class="answer-title">正确答案 {{each rightList as row i}} <span>{{row.codeIndex}}</span> {{if i!=rightList.length-1}} <span>、</span> {{/if}} {{/each}}</div><div class="answer-content-list">{{each rightList as row i}}<div class="item-content">{{row.answerExplain}}</div>{{/each}}</div></div></div>\n',
                        h = at.compileHtml(v, {
                            rightList: g
                        });
                    zt.showErrorInfo(h, function () {
                        setTimeout(function () {
                            dt = !1, M(o[0])
                        }, 300)
                    }), setTimeout(function () {
                        var e = $(".rrx-prizeinfo-dialog .rrx-pg-answer-question-result");
                        if (e.find(".answer-content-list  .item-content").length > 0) {
                            var t = e.find(".answer-content-list .item-content").html();
                            t.length > 100 && (e.css("height", "400px"), x("scroll-list-answer-review", e.get(0)))
                        }
                    }, 100)
                } else setTimeout(function () {
                        dt = !1, M(o[0])
                    }, 300)
            }
            zt.hideLoading()
        }
    }
    function N(e, t) {
        dt = !0;
        var i = e,
            n = i.data("id").split("-");
        if (2 === n.length) {
            zt.showLoading();
            var o = at.getInstance("activeData"),
                s = o.questionList[n[0]],
                a = null;
            if (s.list && s.list.length > 0 && (a = s.list[n[1]]), null === a) return void zt.hideLoading();
            a.selected = !0, e.off(at.clickType), G(i, !0, t), L("Right");
            var r = at.getInstance("rightCount") || 0;
            r = parseInt(r) + 1, at.setInstance("rightCount", r);
            var c = s.rightCount || 1;
            r == c ? (s.isRight = !0, at.setInstance("rightCount", 0), setTimeout(function () {
                M(n[0])
            }, 300)) : dt = !1, zt.hideLoading()
        }
    }
    function O(e, t) {
        dt = !0;
        var i = e,
            n = i.data("id").split("-");
        if (2 === n.length) {
            console.log("ids", n), zt.showLoading();
            var o = at.getInstance("activeData"),
                s = o.questionList[n[0]],
                a = null;
            if (s.list && s.list.length > 0 && (a = s.list[n[1]]), null === a) return void zt.hideLoading();
            a.selected = !0, e.off(at.clickType), G(i, !0, t), L("Right"), s.isRight = !0;
            var r = parseInt(n[0], 10),
                c = r + 1;
            if (2 == a.answerAction && a.gotoAnswerId > 0) {
                var l = at.getIndexByArray(o.questionList, a.gotoAnswerId, "id");
                l > -1 ? c = l : console.info("跳转页面id设置不正确  进入下一页面")
            }
            setTimeout(function () {
                M(r, c, a.answerAction)
            }, 300), zt.hideLoading()
        }
    }
    function G(e, t, i) {
        var n = {};
        if (i) {
            n = t ? lt.imageRightStyle : lt.imageErrorStyle;
            var o = e.find(".img-question-box");
            o.css("background-image", "url(" + n.backgroundImage + ")"), o.css("background-color", n.backgroundColor)
        } else n = t ? lt.answerRight : lt.answerError, e.css("background-image", "url(" + n.backgroundImage + ")"), e.css(
                "background-color", n.backgroundColor), e.css("color", n.font.color)
    }
    function M(e, t, i) {
        e = parseInt(e, 10), t = void 0 === t ? e + 1 : t, i = i || 1;
        var o = at.getInstance("activeData"),
            s = e === o.questionList.length - 1;
        console.log("pageIndex", e), console.log("_nextPageIndex", t);
        var r = !1,
            d = n();
        if (3 != o.questionType && l(d.showLimitTime) && 2 == d.showLimitTimeType && (r = !0, c()), !s && 1 == o.questionType &&
            l(d.answerErrorEnd)) {
            var u = o.questionList[e];
            u.isRight || (s = !0)
        }
        if (s || 3 != o.questionType || 3 != i || (s = !0), s) H();
        else {
            at.setInstance("currentAnswerIndex", t);
            var p = at.html.find(".answer-index-" + e),
                g = at.html.find(".answer-index-" + t);
            at.hideOpacity(p, g);
            var f = at.html.find(".audio-plugin-answer").get(0);
            if (f.paused || f.pause(), r && a(), o && o.questionList && o.questionList.length > 0) {
                var v = o.questionList[t];
                j(v, t, g.find(".question-title").get(0))
            }
        }
        q()
    }
    function j(e, t, i) {
        ("" == e.music && "" == e.image && e.question.length > 144 || ("" != e.music || "" != e.image) && e.question.length >
            36) && x("scroll-list-question-" + t, i)
    }
    function H() {
        c(), zt.showLoading(), at.setInstance("ispass", !0);
        for (var e = at.getInstance("activeData"), t = e.questionList, i = [], n = 0, o = 0; o < t.length; o++) {
            for (var s = t[o].list, a = [], r = 0, d = 0; d < s.length; d++) if (l(s[d].selected)) if (a.push(s[d].codeIndex),
                        2 == e.questionType) r += parseInt(s[d].score || 0, 10);
                    else if (3 == e.questionType && 3 == s[d].answerAction) {
                r = parseInt(s[d].score || 0, 10);
                break
            }
            1 == e.questionType && (r = t[o].score), i.push({
                score: r,
                questionType: e.questionType,
                question: t[o].question,
                guid: t[o].guid,
                isRight: t[o].isRight,
                codeIndexs: a
            }), l(t[o].isRight) && (n += parseInt(r, 10))
        }
        S(i, function (t) {
            if (zt.hideLoading(), 0 == t.result) {
                var i = at.api.getShareInfo(),
                    o = Cool.util.getBrowserUrl("anfather", t.data.guid, i.url),
                    s = "";
                1 == at.config.content.isCustomShare && "" != at.config.content.customShareTitle && (s = at.config.content
                    .customShareTitle.replace(/#分数#/g, n)), at.api.updateShareInfo(s, "", "", o), at.setInstance(
                    "saveScore", {
                    score: n,
                    top: t.data.topData.top
                }), 2 == e.resultType || 3 == e.resultType ? U(n, t.data.topData.top) : l(at.config.content.isShowScore) ?
                    U(n, t.data.topData.top) : Q(n)
            } else zt.showErrorInfo(t.msg)
        })
    }
    function U(e, t) {
        console.log("showdanmu"), o(!1);
        var i = $("#pt-inner .pt-wrapper"),
            n = at.getInstance("activeData");
        if (wt = i.find("." + It), null === wt || void 0 === wt || 0 === wt.length) {
            var s =
                '<div class="{{endCss}}"><div class="end-content"><div class="content-result" style="box-shadow:inset 0 0 150px{{baseColorLow}};border-color:{{baseColor}};color:{{baseColor}}"><div class="ret-header" style="background-color:{{baseColor}};box-shadow:0 8px 1px{{baseColorLow}}">答题结束</div><div class="ret-score" style="margin-top:{{showTop==1?\'40px\':\'70px\'}}"><span class="s-title">您的得分：</span><span class="a-score">{{score}}</span></div>{{if showTop==1}}<div class="ret-top"><span class="s-title">全国排名：</span><span class="a-top">{{top}}</span></div>{{/if}} {{if resultType==2}}<div class="btn-lottery" style="background-color:{{baseColor}};box-shadow:2px 12px 1px{{baseColorLow}}">抽奖</div>{{/if}} {{if resultType==1&&isShowScore}}<div class="btn-goto" style="background-color:{{baseColor}};box-shadow:2px 12px 1px{{baseColorLow}}">确定</div>{{/if}}</div><div class="content-buttonList">{{if showAgain==1}}<div class="item-button btn-resetAnswer"><div class="icon-btn"><img src="{{resetIcon}}"></div><div>再玩一次</div></div>{{/if}} {{if showTop==1}}<div class="item-button btn-top"><div class="icon-btn"><img src="{{topIcon}}"></div><div>排行榜</div></div>{{/if}}{{if showShare==1}}<div class="item-button btn-share"><div class="icon-btn"><img src="{{shareIcon}}"></div><div>分享</div></div>{{/if}}</div></div></div>\n',
                a = !1;
            n.topData && l(n.topData.countryTop) && (a = !0);
            var r = at.getInstance("activeCode"),
                c = at.compileHtml(s, {
                    score: e,
                    endCss: It,
                    top: t,
                    showShare: !at.api.isOpenForbidShare(),
                    showTop: a,
                    showAgain: r > 0 ? 0 : 1,
                    resultType: n.resultType || 1,
                    isShowScore: l(at.config.content.isShowScore) ? 1 : 0,
                    topIcon: lt.imageTop || at.getFile("icon-top.png", "assets"),
                    resetIcon: lt.imageReset || at.getFile("icon-reset.png", "assets"),
                    shareIcon: lt.imageShare || at.getFile("icon-share.png", "assets"),
                    baseColor: ht,
                    baseColorLow: mt
                });
            i.append(c), wt = i.find("." + It), _()
        } else wt.find(".a-score").html(e), wt.find(".a-top").html(t);
        wt.show(), setTimeout(function () {
            wt.removeClass("answerFadeOutLeft").addClass("answerFadeInLeft")
        }, 100)
    }
    function W() {
        wt = $("#pt-inner .pt-wrapper").find("." + It), null === wt || void 0 === wt || 0 === wt.length || (wt.removeClass(
            "answerFadeInLeft").addClass("answerFadeOutLeft"), setTimeout(function () {
            wt.hide()
        }, 600))
    }
    function B(e, t) {
        return e ? e.constructor === String ? JSON.parse(e) : e : "obj" == t ? {} : []
    }
    function _() {
        var e = wt.find(".content-buttonList .btn-share");
        e.off(at.clickType).on(at.clickType, function (e) {
            e.stopPropagation(), e.preventDefault(), at.api.showShareDialog()
        });
        var t = wt.find(".content-buttonList .btn-top");
        t.off(at.clickType).on(at.clickType, function (e) {
            e.stopPropagation(), e.preventDefault(), u("topsPage")
        });
        var i = wt.find(".btn-lottery");
        i.off(at.clickType).on(at.clickType, function (e) {
            e.stopPropagation(), e.preventDefault(), at.api.checkWeixinAlert() && at.api.checkReginLimit(at.getInstance(
                "regionLimit"), function (e) {
                0 === e && (setTimeout(function () {
                    i.hide()
                }, 1e3), tt())
            }, ht)
        });
        var o = wt.find(".btn-goto");
        o.off(at.clickType).on(at.clickType, function (e) {
            e.stopPropagation(), e.preventDefault();
            var t = at.getInstance("saveScore");
            W(), Q(t ? t.score || 0 : 0)
        });
        var s = wt.find(".content-buttonList .btn-resetAnswer");
        s.off(at.clickType).on(at.clickType, function (e) {
            e.stopPropagation(), e.preventDefault();
            var t = at.getInstance("playCount"),
                o = n();
            if (parseInt(t) >= parseInt(o.answerCount)) at.setInstance("activeState", ct), dt = !0, zt.showErrorInfo(ct, function () {});
            else {
                setTimeout(function () {
                    i.show()
                }, 1e3);
                var s = at.getInstance("activeData"),
                    a = n();
                l(a.show) && 3 != s.questionType ? X(function () {
                    J()
                }) : J()
            }
        })
    }
    function X(e) {
        zt.showLoading("加载题目中..."), at.requestAjax("answerQuestionData/getQuestionList", {
            activeGuid: at.config.content.guid
        }, "POST").then(function (t) {
            if (0 === t.result) {
                var i = at.getInstance("answerData");
                i.questionList = t.data, at.setInstance("answerData", i), e()
            } else e();
            zt.hideLoading()
        }, function (t) {
            e(), console.info(t), zt.hideLoading()
        })
    }
    function J() {
        at.setInstance("ispass", !1), s("reset"), W(), setTimeout(function () {
            dt = !1
        }, 600)
    }
    function V(e) {
        if (20 == at.config.content.questionVersion || !e) return e;
        var t = [{
                id: 0,
                minscore: 0,
                score: 59,
                gotoPageId: -1
            }, {
                id: 1,
                minscore: 60,
                score: 99,
                gotoPageId: -1
            }, {
                id: 2,
                minscore: 100,
                score: 100,
                gotoPageId: -1
            }, {
                id: 3,
                minscore: 101,
                score: "",
                gotoPageId: -1
            }, {
                id: 4,
                minscore: "",
                score: "",
                gotoPageId: -1
            }, {
                id: 5,
                minscore: "",
                score: "",
                gotoPageId: -1
            }, {
                id: 6,
                minscore: "",
                score: "",
                gotoPageId: -1
            }, {
                id: 7,
                minscore: "",
                score: "",
                gotoPageId: -1
            }];
        e.length >= 5 && (e[0].score && (e[0].minscore = 0, e[0].score -= 1), e[1].score && (e[1].minscore = parseInt(e[
            0].score) + 1, e[2].score && (e[1].score = parseInt(e[2].score) - 1)), e[2].score && (e[2].minscore =
            parseInt(e[1].score) + 1, e[3].score && (e[2].score = parseInt(e[3].score) - 1)), e[3].score && (e[3].minscore =
            parseInt(e[2].score) + 1, e[4].score && (e[3].score = parseInt(e[4].score) - 1)));
        for (var i = e.length; i < t.length; i++) e.push(t[i]);
        return e
    }
    function Q(e) {
        dt = !0, L("Pass");
        var t = at.getInstance("activeData");
        if (t) {
            var i = at.getInstance("activeData").questionList.length - 1,
                n = at.html.find(".answer-index-" + i);
            n.css("transition", "none")
        }
        var s = V(at.config.content.resultSettings);
        if (s) {
            var a = -1;
            e = parseInt(e);
            for (var r = 0; r < s.length; r++) {
                var c = parseInt(s[r].minscore),
                    l = parseInt(s[r].score);
                if (!isNaN(c) && !isNaN(l) && e >= c && l >= e) {
                    a = s[r].gotoPageId;
                    break
                }
            }
            "first" != a && "next" != a && "pre" != a && (a = parseInt(a, 10)), at.setInstance("gotoPageId", a), -1 !==
                a ? (console.log("gotoPageId", a), o(!1), setTimeout(function () {
                at.api.gotoPage(a)
            }, 100)) : zt.showErrorInfo(rt + "。")
        } else zt.showErrorInfo(rt + "。")
    }
    function Y() {
        if (void 0 !== at.config.content.theme) {
            for (var e = at.config.content.theme.list, t = 0; t < e.length; t++) if ("image" === e[t].type || "audio" ===
                    e[t].type) lt[e[t].value] = e[t].src;
                else if ("text" === e[t].type) lt[e[t].value] = void 0 === e[t].content ? {
                    backgroundColor: e[t].backgroundColor,
                    backgroundImage: e[t].backgroundImage
            }: {
                backgroundColor: e[t].backgroundColor,
                backgroundImage: e[t].backgroundImage,
                font: e[t].content[0]
            };
            else if ("color" === e[t].type) {
                var i = {};
                if (e[t].hasOwnProperty("content") && e[t].content.length > 0) for (var n = 0; n < e[t].content.length; n++)
                        i[e[t].content[n].value] = {
                            color: e[t].content[n].color,
                            backgroundColor: e[t].content[n].backgroundColor
                };
                lt[e[t].value] = i
            }
            "default" == at.config.content.theme.value && (void 0 === lt.answerRight || lt.answerRight.backgroundColor ||
                (lt.answerRight.backgroundColor = at.config.content.rightColor), void 0 === lt.answerError || lt.answerError
                .backgroundColor || (lt.answerError.backgroundColor = at.config.content.errorColor)), lt.stylePage &&
                lt.stylePage.bg1 && lt.stylePage.bg1.backgroundColor ? (ht = lt.stylePage.bg1.backgroundColor ||
                "#1D93FF", mt = K(ht, .4)) : (ht = "#1D93FF", mt = K(ht, .4)), lt.downtime || (lt.downtime = {
                font: {
                    color: "#000000",
                    id: 0,
                    text: "倒计时文字样式"
                }
            })
        }
    }
    function K(e, t) {
        return e.length > 7 ? et(e, t) : Z(e, t)
    }
    function Z(e, t) {
        var i = parseInt(e.slice(1), 16),
            n = 0 > t ? 0 : 255,
            o = 0 > t ? -1 * t : t,
            s = i >> 16,
            a = i >> 8 & 255,
            r = 255 & i;
        return "#" + (16777216 + 65536 * (Math.round((n - s) * o) + s) + 256 * (Math.round((n - a) * o) + a) + (Math.round((
            n - r) * o) + r)).toString(16).slice(1)
    }
    function et(e, t) {
        var i = e.split(","),
            n = 0 > t ? 0 : 255,
            o = 0 > t ? -1 * t : t,
            s = parseInt(i[0].slice(4)),
            a = parseInt(i[1]),
            r = parseInt(i[2]);
        return "rgb(" + (Math.round((n - s) * o) + s) + "," + (Math.round((n - a) * o) + a) + "," + (Math.round((n - r) *
            o) + r) + ")"
    }
    function tt() {
        zt.showLoading("加载中"), at.requestAjax("answer/grab", {
            wsiteGuid: at.wsiteGuid,
            activeGuid: at.config.content.guid,
            wxOpenId: yt.id,
            identify: Ct
        }, "POST").then(function (e) {
            if (5500 === e.result) window.location.reload();
            else if (0 === e.result) e.data.exdata = it(e.data.exdata), zt.showPrizeInfo(e.data);
            else if (4500 === e.result) {
                var t = at.api.getInteractServiceHost();
                window.verifyLotteryAlert(t, at.wsiteGuid, yt.id, function (e) {
                    e && e.isVerify && tt()
                })
            } else {
                var i = e.msg.split("|");
                i.length > 1 ? zt.showNoWinInfo(i[0], i.length > 1 ? i[1] : "") : zt.showErrorInfo(e.msg)
            }
            zt.hideLoading()
        }, function (e) {
            console.info(e), winAlert("服务异常-" + e.status), zt.hideLoading()
        })
    }
    function it(e) {
        return null === e || void 0 === e ? e = {
            showForm: !0,
            message: "",
            link: "",
            activeStyle: 3,
            hasWxTicket: !1,
            connect: ""
        } : e.constructor === String && (e = JSON.parse(e)), Tt && (e.showForm = !1), e
    }
    function nt(e) {
        xt ? ot(e) : e && e(!0)
    }
    function ot(e) {
        function t(t) {
            zt.checkIsHaveDialog() || at.api.resetFlip();
            var i = !1,
                n = "";
            "okEvent" == t.event && (xt = !1, i = !0), e && e(i, n)
        }
        at.api.stopFlip();
        var i = zt.getAwardModel();
        showRRXPresetFormDialog(at.api, at.config.content.guid, i, ht, t)
    }
    var st = "";
    st +=
        '{{if !isEdit}}<div class="rrx-pg-answer-index">{{each answerList as answer i}}<div class="plugin-answer answer-index-{{i}}" style="opacity:{{i==0?1:0}};z-index:{{answerList.length-i}}">{{if questionType!=3}}<div class="header-progress" style="color:{{asset.progress.font.color}}">进度：<span class="current-pageIndex">{{i+1}}</span>/<span class="all-pageIndex">{{answerList.length}}</span></div><div class="header-downTime" style="color:{{asset.downtime.font.color}};font-weight:{{asset.downtime.font.font_weight}};background-color:{{asset.downtime.backgroundColor}}"><span class="down-time"></span></div>{{/if}}<div class="answer-header" style="background-image:url({{asset.question.backgroundImage}});background-color:{{asset.question.backgroundColor}}">{{if answer.image!=\'\'}}<div class="question-image"><img src="{{answer.image+bigImageThum}}"></div>{{/if}} {{if answer.music!=\'\'}}<div class="question-music music-index-{{i}}"><img class="img-play" data-src="{{answer.music}}" data-id="{{i}}" data-type="play" src="{{asset.imagePlay}}"> <img class="img-pause" style="display:none" data-id="{{i}}" data-src="{{answer.music}}" data-type="stop" src="{{asset.imagePause}}"></div>{{/if}}<div class="question-title" style="height:{{(answer.music==\'\'&&answer.image==\'\')?350:86}}px;line-height:{{(answer.music==\'\'&&answer.image==\'\')?350:86}}px;color:{{asset.question.font.color}}"><span>{{answer.question}}</span></div></div>{{if answer.type==\'image\'}}<div class="answer-image-list">{{each answer.list as q j}}<div class="imgBox img-{{answer.list.length>4?6:4}}-{{j}} answer-img-{{answer.list.length}}" data-id="{{i}}-{{j}}"><img class="img-question" src="{{q.value+smallImageThum}}"> {{if asset.imageStyle!=\'\'&&asset.imageStyle!=undefined}} <img class="img-question border-question" src="{{asset.imageStyle}}"> {{/if}}<div class="img-question-box"></div></div>{{/each}}</div>{{/if}} {{if answer.type==\'text\'}}<div class="answer-text-list">{{each answer.list as q j}}<div class="item-text" data-id="{{i}}-{{j}}" style="background-image:url({{asset.answer.backgroundImage}});background-color:{{asset.answer.backgroundColor}};color:{{asset.answer.font.color}}"><span class="span-value"><span class="span-mark">{{codeIndex[j]}}</span>{{q.value}}</span> </div>{{/each}}</div>{{/if}}</div>{{/each}}<audio class="audio-plugin-answer" style="width:1px;height:1px;opacity:0;position:absolute" preload="true"></audio><audio class="audio-plugin-sound-effect" style="width:1px;height:1px;opacity:0;position:absolute" preload="true"></audio></div>{{/if}} {{if isEdit}}<div class="rrx-pg-answer-index-edit">{{content}}</div>{{/if}}\n';
    var at = {
        backgroundMusicState: !1,
        api: null,
        isEditing: !1,
        config: {},
        html: null,
        wsiteGuid: null,
        currentPageId: null,
        currentPage: null,
        pluginDomain: null,
        clickType: "click",
        objectInstances: [],
        renderElement: function (e, t) {
            var i = this.compileHtml(st, t);
            this.html = $(i), e.html(this.html)
        },
        compileHtml: function (e, t) {
            var i = template.compile(e);
            return i(t)
        },
        getFile: function (e, t) {
            return t = t || "assets", this.pluginDomain + t + "/" + e
        },
        requestAjax: function (e, t, i, n) {
            var o = "";
            return o = this.isEditing ? appConfig.serviceHost : this.api.getInteractServiceHost(), n = void 0 === n ?
                "pluginAnswer" : n, $.ajax({
                url: o + n + "/" + e,
                type: i || "POST",
                data: t || {},
                dataType: "json",
                xhrFields: {
                    withCredentials: !0
                }
            })
        },
        getIndexByArray: function (e, t, i) {
            i = i || "id";
            for (var n = e.length - 1; n >= 0; n--) if (e[n][i] == t) return n;
            return -1
        },
        hideOpacity: function (e, t) {
            e.css("transform", "translateY(-1100px)"), e.css("-webkit-transform", "translateY(-1100px)"), e.css(
                "transition", "transform 1s"), t.css("transition", "opacity 0.5s"), t.css("opacity", 1), t.css(
                "display", "block"), setTimeout(function () {
                e.css("opacity", 0), e.css("-webkit-transform", "translateY(0px)"), e.css("transform", "translateY(0x)"),
                    e.css("display", "none"), dt = !1
            }, 500)
        },
        showEffect: function (e, t) {
            !t && e.addClass("fadeIn"), e.css("display", "inline-block")
        },
        hideEffect: function (e) {
            e.removeClass("fadeout"), e.css("display", "none")
        },
        getInstance: function (e) {
            return this.objectInstances[e + this.wsiteGuid + this.currentPageId + this.config.id]
        },
        setInstance: function (e, t) {
            this.objectInstances[e + this.wsiteGuid + this.currentPageId + this.config.id] = t
        }
    }, rt = ({
            title: "答题-liao旗下产品",
            image: appConfig.imageHost + "plugin_icon/answer.png",
            color: "red"
        }, "答题结束"),
        ct = "您的答题次数已经用完",
        lt = {}, dt = !1,
        ut = 0,
        pt = "@!2-250",
        gt = "@!200x200",
        ft = "pluginAnswer-basic-dialog",
        vt = null,
        ht = "#1D93FF",
        mt = K(ht, .4),
        wt = null,
        It = "pluginAnswer-end-dialog",
        yt = {
            id: appConfig.dev === !0 ? "d40ead917f52d7f765f690eb3f9ce984" : "",
            nickname: "liao",
            headimgurl: "https://assets.rrxh5.cc/www/images/no_head.jpg"
        }, bt = ["A", "B", "C", "D", "E", "F"],
        Tt = !1,
        xt = !1,
        Ct = "",
        kt = 0,
        Pt = null,
        Dt = !1,
        Lt = function (e, t) {
            if (at.api = t, at.wsiteGuid = t.getWsiteGuid(), at.pluginDomain = t.getPluginDomain(e.content.token, e.content
                .version), t.loadCss(at.pluginDomain + "css/index.css"), void 0 !== e.content.theme && null !== e.content
                .theme) for (var i = null, n = e.content.theme.list, o = 0; o < n.length; o++) "image" === n[o].type ?
                        (i = new Image, i.src = n[o].src) : void 0 !== n[o].backgroundImage && "" !== n[o].backgroundImage &&
                        (i = new Image, i.src = n[o].backgroundImage)
        }, Et = function (e, t, i) {
            e != i.getCurrentPageId() && (c(), at.api.resetFlip(), dt = !1, ut = 0, $(".show-allpage-report").show())
        }, qt = function (a, r) {
            if (!at.isEditing) {
                c(), Pt = null, at.api.stopFlip(), at.config = r, at.currentPageId = a, at.currentPage = at.api.getPage(
                    a), at.html = at.api.getElement(r.id, a), at.api.hideTopIcon(), at.backgroundMusicState = at.api.getBackgroundMusicState(),
                    o(!0), at.setInstance("isFirstLoad", !0);
                var d = at.getInstance("ispass"),
                    u = at.getInstance("activeData");
                if (d) if (u && (2 == u.resultType || 3 == u.resultType || 1 == u.resultType && l(at.config.content.isShowScore))) {
                        var p = at.getInstance("saveScore");
                        p && U(p.score, p.top)
                    } else {
                        var g = at.getInstance("playCount") || 0,
                            f = n();
                        parseInt(g) >= parseInt(f.answerCount) ? (dt = !0, at.setInstance("activeState", ct), e(ct)) :
                            (dt = !1, at.setInstance("ispass", !1), s("reset"))
                    }
                if (void 0 === at.getInstance("isLoaded") || null === at.getInstance("isLoaded")) at.api.weixinStrong.auth(function (
                        e) {
                        yt = e, zt.showLoading("题库加载中..."), t(r.content, function (e) {
                            Tt = e.data.preset, xt = e.data.needPreset;
                            var t = n();
                            e.data && e.data.regionLimit && at.setInstance("regionLimit", e.data.regionLimit), at.api.checkReginLimit(
                                at.getInstance("regionLimit"), function (n, o) {
                                if (0 !== n) at.setInstance("activeState", o), dt = !0, i();
                                else {
                                    P(), at.setInstance("activeCode", e.result);
                                    var s = e.myTop;
                                    if (at.setInstance("myTop", s), 0 === e.result) {
                                        var a = parseInt(s.playCount);
                                        at.setInstance("playCount", a), a >= parseInt(t.answerCount) && (at.setInstance(
                                            "activeCode", 500), at.setInstance("activeState", ct), dt = !0), i()
                                    } else at.setInstance("activeState", e.msg), dt = !0, i()
                                }
                            })
                        })
                    });
                else {
                    var v = at.getInstance("activeState");
                    v && (dt = !0, e(v))
                }
            }
        }, At = function (e, t, i) {
            at.api = i, Cool.util.checkIsAndroid() || (at.clickType = void 0 === document.ontouchstart ? "click" :
                "touchstart"), at.isEditing = i.isEditing(), at.config = e, at.pluginDomain = i.getPluginDomain(e.content
                .token, e.content.version), at.isEditing ? (i.loadCss(at.pluginDomain + "css/index.css"), console.log(
                "init"), at.renderElement(t, {
                isEdit: !0,
                content: "答题插件编辑区域点击预览开始答题"
            })) : (at.api.hideTopIcon(), at.isEditing || appConfig.dev === !0 || at.api.weixinStrong.auth(function (e) {
                yt = e
            }))
        };
    Array.prototype.shuffle || (Array.prototype.shuffle = function () {
        for (var e, t, i = this.length; i; e = parseInt(Math.random() * i), t = this[--i], this[i] = this[e], this[e] =
            t);
        return this
    });
    var St = {}, zt = {
            showPrizeInfo: function (e) {
                var t = parseInt(e.prizeType);
                if (0 == t) {
                    var i = e.prizeName;
                    if (void 0 !== e.exdata) {
                        var n = $.trim(e.exdata.message);
                        i = "" !== n ? n : i
                    }
                    this.showNoWinInfo(i, "")
                } else 1 == t || 2 == t || 3 == t || 4 == t || 5 == t || 6 == t ? this.showWinPrizeInfo(e) : this.showErrorInfo(
                        "未知奖品类型")
            },
            showWinPrizeInfo: function (e) {
                var t = $.trim(e.exdata.message),
                    i = e.prizeName,
                    n = {
                        name: "" == t ? i : t,
                        image: e.prizeIcon
                    }, o = this;
                showRRXWinPrizeDialog(at.api, n, ht, function (t) {
                    o.dialogCallbackEvent(t, e)
                })
            },
            showNoWinInfo: function (e, t) {
                at.api.stopFlip();
                var i = e;
                t && (i ? i += "<br>" : i = "", i += t);
                var n = {
                    content: i
                };
                window.showRRXNoPrizeDialog(at.api, n, ht, this.dialogCallbackEvent)
            },
            getAwardModel: function () {
                var e = at.getInstance("activeData");
                return e.awardModel
            },
            parseAwardModel: function (e) {
                var t = [],
                    i = [];
                if (e) {
                    i = "string" == typeof e ? JSON.parse(e) : e;
                    for (var n = 0; n < i.length; n++)("true" == i[n].display || i[n].display === !0) && t.push(i[n])
                }
                return t
            },
            showFormDialog: function (e) {
                at.api.stopFlip();
                var t = this.getAwardModel(),
                    i = this;
                showRRXGetPrizeDialog(at.api, t, ht, function (t) {
                    i.dialogCallbackEvent(t, e)
                })
            },
            showTopFormDialog: function () {
                at.api.stopFlip();
                var e = this.getAwardModel(),
                    t = this;
                showRRXGetPrizeDialog(at.api, e, ht, function (e) {
                    e.event = "topPrizeEvent", t.dialogCallbackEvent(e)
                })
            },
            getTopPrize: function (e, t) {
                var i = this;
                at.api.checkReginLimit(at.getInstance("regionLimit"), function (n) {
                    if (0 === n && e) {
                        i.showLoading();
                        var o = e.awardInfo;
                        at.requestAjax("answer/getTopPrize", {
                            wsiteGuid: at.wsiteGuid,
                            activeGuid: at.config.content.guid,
                            awardInfo: JSON.stringify(o),
                            smsData: e.smsData,
                            wxOpenId: yt.id
                        }, "POST").then(function (e) {
                            i.hideLoading(), 0 == e.result ? (i.showErrorInfo("提交成功"), t && t()) : i.showErrorInfo(e.msg)
                        }, function (e) {
                            console.info(e), winAlert("服务异常-" + e.status), i.hideLoading()
                        })
                    }
                }, ht)
            },
            getPize: function (e, t, i, n) {
                t = void 0 === t ? !0 : t;
                var o = t ? i : this.getEmptyAwardInfo();
                if (o) {
                    this.showLoading();
                    var s = this,
                        a = o.awardInfo;
                    at.requestAjax("answer/getPrize", {
                        userToken: yt.id,
                        wsiteGuid: at.wsiteGuid,
                        activeGuid: at.config.content.guid,
                        awardInfo: JSON.stringify(a),
                        smsData: o.smsData,
                        prizeId: e.id,
                        wxOpenId: yt.id,
                        identify: Ct
                    }, "POST").then(function (o) {
                        if (s.hideLoading(), 0 == o.result) {
                            var a = e.exdata,
                                r = a.activeStyle || 3;
                            switch (r) {
                            case 1:
                                4 == e.prizeType ? s.showErrorInfo("红包领取成功!") : s.showAfterOnlineDialog(e, o.data);
                                break;
                            case 2:
                                s.showWxPuplicDialog(e, o.data);
                                break;
                            case 3:
                                s.prizePrompt(e, o.data)
                            }
                            n && n()
                        } else if (4500 === o.result) {
                            var c = at.api.getInteractServiceHost();
                            window.verifyLotteryAlert(c, at.wsiteGuid, yt.id, function (o) {
                                o && o.isVerify && zt.getPize(e, t, i, n)
                            })
                        } else s.showErrorInfo(o.msg)
                    }, function (e) {
                        console.info(e), winAlert("服务异常-" + e.status), s.hideLoading()
                    })
                }
            },
            giveUpPrize: function () {
                at.requestAjax("generalPrize/giveUpPrize", {
                    wsiteGuid: at.wsiteGuid,
                    activeGuid: at.config.content.guid,
                    userToken: yt.id,
                    wxOpenId: yt.id
                }, "POST", "").then(function (e) {
                    0 == e.result || console.log("giveUpPrize", e.msg)
                }, function (e) {
                    console.info(e), winAlert("服务异常-" + e.status)
                })
            },
            getEmptyAwardInfo: function () {
                for (var e = [], t = this.getAwardModel(), i = 0; i < t.length; i++) e.push({
                        id: t[i].id,
                        name: t[i].name,
                        value: "[不记录]",
                        unique: !1,
                        allunique: !1,
                        smsticket: !1
                    });
                return {
                    smsData: "",
                    awardInfo: e
                }
            },
            prizePrompt: function (e, t) {
                if (3 != e.prizeType) {
                    if (2 == e.prizeType) return void this.showMessageDialog(e, t);
                    if (5 == e.prizeType) return void this.pushWxTicket(e, t);
                    if (6 == e.prizeType) return void this.showErrorInfo("积分领取成功", null, "前往兑换", t.uniqueCenterUrl);
                    this.showErrorInfo("领取成功")
                } else this.thridPrize(e)
            },
            thridPrize: function (e) {
                if ("1" == e.exdata.isApiWay) return void this.showErrorInfo("领取成功");
                var t = e.exdata.link;
                return t ? void at.api.urlAuditVisit(t) : void winAlert("奖品链接不可用")
            },
            showMessageDialog: function (e, t) {
                at.api.stopFlip();
                var i = $.trim(e.exdata.message),
                    n = {
                        name: "" == i ? e.prizeName : i,
                        image: e.prizeIcon,
                        detail: t.ticketMessage
                    };
                showRRXPrizeDetailDialog(at.api, n, ht, this.dialogCallbackEvent)
            },
            pushWxTicket: function (e, t) {
                var i = t.cardId,
                    n = t.cardExt,
                    o = this;
                wx.addCard({
                    cardList: [{
                            cardId: i,
                            cardExt: n
                        }],
                    success: function (e) {
                        console.log(e.cardList)
                    },
                    fail: function (e) {
                        o.showErrorInfo("加入卡券失败"), console.log(JSON.stringify(e))
                    }
                })
            },
            showAfterOnlineDialog: function (e, t) {
                at.api.stopFlip();
                var i = {
                    openCode: t.openCode
                };
                showRRXAfterOnlineDialog(at.api, i, ht, this.dialogCallbackEvent)
            },
            showWxPuplicDialog: function (e, t) {
                at.api.stopFlip();
                var i = {
                    openCode: t.openCode,
                    appName: t.appName,
                    appQrUrl: t.appQrUrl
                };
                showRRXWxPuplicDialog(at.api, i, ht, this.dialogCallbackEvent)
            },
            showErrorInfo: function (e, t, i, n) {
                at.api.stopFlip();
                var o = this;
                window.showRRXPrizeInfoDialog(at.api, e, ht, function (e, i) {
                    t && t(), o.dialogCallbackEvent(e, i)
                }, i, n)
            },
            showLoading: function (e) {
                at.api.stopFlip(), showRRXProcess(e)
            },
            hideLoading: function () {
                this.checkIsHaveDialog() || at.api.resetFlip(), hideRRXProcess()
            },
            checkDialogIsDiplay: function (e) {
                var t = $("#main").find(e);
                return t.length > 0 && "none" != t.css("display") ? !0 : !1
            },
            checkIsHaveDialog: function () {
                for (var e = ["." + ft, ".rrx-prizeinfo-dialog", ".rrx-prizewin-dialog", ".rrx-prizeno-dialog",
                        ".rrx-prizeget-dialog", ".rrx-prizedetail-dialog", ".rrx-process-dialog"], t = 0; t < e.length; t++)
                    if (this.checkDialogIsDiplay(e[t])) return !0;
                return !1
            },
            dialogCallbackEvent: function (e, t) {
                if (zt.checkIsHaveDialog() || at.api.resetFlip(), e) if ("submitEvent" == e.event) zt.getPize(t, !0, e.result,
                            e.closeCallBack);
                    else if ("getprizeEvent" == e.event) {
                    var i = zt.parseAwardModel(zt.getAwardModel());
                    t.exdata.showForm && i.length > 0 ? zt.showFormDialog(t) : zt.getPize(t, !1)
                } else "giveupEvent" == e.event ? zt.giveUpPrize() : "topPrizeEvent" == e.event && zt.getTopPrize(e.result,
                        e.closeCallBack)
            }
        };
    window.wePluginInit = At, window.wePluginLoad = qt, window.wePluginPreLoad = Lt, window.wePluginLeave = Et
}();