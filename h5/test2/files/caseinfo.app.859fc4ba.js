function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}
function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}
function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}
function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}
function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}
function core_md5(a, b) {
    a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
    for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
        var h = c,
            i = d,
            j = e,
            k = f;
        c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936), f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586), e = md5_ff(e,
            f, c, d, a[g + 2], 17, 606105819), d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330), c = md5_ff(c, d, e, f,
            a[g + 4], 7, -176418897), f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426), e = md5_ff(e, f, c, d, a[g + 6],
            17, -1473231341), d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983), c = md5_ff(c, d, e, f, a[g + 8], 7,
            1770035416), f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417), e = md5_ff(e, f, c, d, a[g + 10], 17, -
            42063), d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162), c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682),
            f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101), e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290), d =
            md5_ff(d, e, f, c, a[g + 15], 22, 1236535329), c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510), f = md5_gg(
            f, c, d, e, a[g + 6], 9, -1069501632), e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713), d = md5_gg(d, e, f,
            c, a[g + 0], 20, -373897302), c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691), f = md5_gg(f, c, d, e, a[g +
            10], 9, 38016083), e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335), d = md5_gg(d, e, f, c, a[g + 4], 20, -
            405537848), c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438), f = md5_gg(f, c, d, e, a[g + 14], 9, -
            1019803690), e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961), d = md5_gg(d, e, f, c, a[g + 8], 20,
            1163531501), c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467), f = md5_gg(f, c, d, e, a[g + 2], 9, -
            51403784), e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473), d = md5_gg(d, e, f, c, a[g + 12], 20, -
            1926607734), c = md5_hh(c, d, e, f, a[g + 5], 4, -378558), f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463),
            e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562), d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556), c =
            md5_hh(c, d, e, f, a[g + 1], 4, -1530992060), f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353), e = md5_hh(
            e, f, c, d, a[g + 7], 16, -155497632), d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640), c = md5_hh(c, d,
            e, f, a[g + 13], 4, 681279174), f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222), e = md5_hh(e, f, c, d, a[
            g + 3], 16, -722521979), d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189), c = md5_hh(c, d, e, f, a[g + 9], 4, -
            640364487), f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835), e = md5_hh(e, f, c, d, a[g + 15], 16,
            530742520), d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651), c = md5_ii(c, d, e, f, a[g + 0], 6, -
            198630844), f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415), e = md5_ii(e, f, c, d, a[g + 14], 15, -
            1416354905), d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055), c = md5_ii(c, d, e, f, a[g + 12], 6,
            1700485571), f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606), e = md5_ii(e, f, c, d, a[g + 10], 15, -
            1051523), d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799), c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359),
            f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744), e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380), d =
            md5_ii(d, e, f, c, a[g + 13], 21, 1309151649), c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070), f = md5_ii(
            f, c, d, e, a[g + 11], 10, -1120210379), e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259), d = md5_ii(d, e,
            f, c, a[g + 9], 21, -343485551), c = safe_add(c, h), d = safe_add(d, i), e = safe_add(e, j), f = safe_add(f,
            k)
    }
    return Array(c, d, e, f)
}
function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}
function md5_ff(a, b, c, d, e, f, g) {
    return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}
function md5_gg(a, b, c, d, e, f, g) {
    return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}
function md5_hh(a, b, c, d, e, f, g) {
    return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}
function md5_ii(a, b, c, d, e, f, g) {
    return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}
function core_hmac_md5(a, b) {
    var c = str2binl(a);
    c.length > 16 && (c = core_md5(c, a.length * chrsz));
    for (var d = Array(16), e = Array(16), f = 0; 16 > f; f++) d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
    var g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz);
    return core_md5(e.concat(g), 640)
}
function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}
function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}
function str2binl(a) {
    for (var b = Array(), c = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz) b[d >> 5] |= (a.charCodeAt(d /
            chrsz) & c) << d % 32;
    return b
}
function binl2str(a) {
    for (var b = "", c = (1 << chrsz) - 1, d = 0; d < 32 * a.length; d += chrsz) b += String.fromCharCode(a[d >> 5] >>>
            d % 32 & c);
    return b
}
function binl2hex(a) {
    for (var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(
            a[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
    return c
}
function binl2b64(a) {
    for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; d < 4 * a.length; d +=
        3) for (var e = (a[d >> 2] >> 8 * (d % 4) & 255) << 16 | (a[d + 1 >> 2] >> 8 * ((d + 1) % 4) & 255) << 8 | a[d +
            2 >> 2] >> 8 * ((d + 2) % 4) & 255, f = 0; 4 > f; f++) c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(
                e >> 6 * (3 - f) & 63);
    return c
}
var appConfig = {
    home: "https://www.rrxiu.net",
    version: "v4.9.7.3",
    qrVer: 2,
    firstPayStoreEnable: !0,
    behaviorEnable: !0,
    libHost: "https://assets.rrxh5.cc/lib/",
    viewDomainFormat: "https://m.rrxiu.net/?v={guid}",
    assetsHost: "https://assets.rrxh5.cc/",
    viewHost: "https://view.rrxh5.cc/",
    pcViewHost: "https://www.rrxiu.net/view-",
    serviceHost: "https://www.rrxiu.net/",
    accountCenter: "https://www.rrxiu.net/",
    thisHostAndServiceHostIsSame: !1,
    dataHost: "https://data.rrxh5.cc/",
    vipDataHost: "https://data.rrxh5.cc/",
    imageHost: "https://file2.rrxh5.cc/",
    imageOss: "https://file2.rrxh5.cc/",
    uploadHost: "https://uploading.rrxiu.net/",
    webAppHost: "https://app.rrxiu.net",
    pushsaleAppHost: "https://sale.rrxiu.net",
    imageGroupLimit: 15,
    imageThumb: "@!100-2",
    shareImageThumb: "@!200x200",
    llImageThumb: "@!view-loading-logo",
    tplPageCoverThumb: "@!90x142",
    animationEngine: "css",
    chromeDownload: "http://rj.baidu.com/soft/detail/14744.html",
    formatFactoryDownload: "http://rj.baidu.com/soft/detail/13052.html?ald",
    pluginDomainFormat: "https://assets.rrxh5.cc/plugin/{token}/{version}",
    pluginUploadHost: "https://www.rrxiu.net/",
    webFontHost: "https://assets.rrxh5.cc/webfont/",
    tplMarketThumb: "@!237x375",
    startTimeParseBgImgNew: "2016-11-16 08:30:00",
    huanleHost: "http://www.huanle001.com/",
    focusIntro: "https://www.rrxiu.net/content-3zrxvi",
    copyright: {
        content: "免费制作 → liao",
        textAlign: "right",
        url: "http://mp.weixin.qq.com/s?__biz=MzA4ODc5OTE1OQ==&mid=403178211&idx=1&sn=9c50c942df41020d626d50289a75cf16#rd",
        color: "#fff",
        bgColor: "#000"
    },
    shareInfo: {
        color: "#fff",
        bgColor: "rgba(0, 0, 0, 0.9)",
        content: '<div class="d-share-arrow"></div>'
    },
    openFunction: {
        normalAccoutGiveGoldEnabled: !1,
        normalAccoutPayMin: 100,
        code: !0,
        sensor: !0,
        shake: !0,
        longPage: !0,
        floorPage: !0,
        sharePage: !0,
        loadingPage: !0,
        htmlElement: !0,
        addSpecialPage: !0,
        forgotPwd: !0,
        confirmAccount: !0,
        accountNavVipDisplay: !0,
        accountNavAboutDisplay: !0,
        accountNavContactDisplay: !0,
        accountNavHelpDisplay: !0,
        wisteShow: !0,
        wisteVip: !0,
        wisteProduct: !0,
        weplusQQ: !0
    }
};
window.rrxiuUtils = window.rrxiuUtils || {}, rrxiuUtils = function () {
    function a(a) {
        var b, c, d, e, f, h, i;
        for (h = a.length, f = 0, i = ""; h > f;) {
            do b = g[255 & a.charCodeAt(f++)]; while (h > f && -1 == b);
            if (-1 == b) break;
            do c = g[255 & a.charCodeAt(f++)]; while (h > f && -1 == c);
            if (-1 == c) break;
            i += String.fromCharCode(b << 2 | (48 & c) >> 4);
            do {
                if (d = 255 & a.charCodeAt(f++), 61 == d) return i;
                d = g[d]
            } while (h > f && -1 == d);
            if (-1 == d) break;
            i += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
            do {
                if (e = 255 & a.charCodeAt(f++), 61 == e) return i;
                e = g[e]
            } while (h > f && -1 == e);
            if (-1 == e) break;
            i += String.fromCharCode((3 & d) << 6 | e)
        }
        return i
    }
    function b(a) {
        var b, c, d, e, f, g;
        for (b = "", d = a.length, c = 0; d > c;) switch (e = a.charCodeAt(c++), e >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                b += a.charAt(c - 1);
                break;
            case 12:
            case 13:
                f = a.charCodeAt(c++), b += String.fromCharCode((31 & e) << 6 | 63 & f);
                break;
            case 14:
                f = a.charCodeAt(c++), g = a.charCodeAt(c++), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 |
                    (63 & g) << 0)
        }
        return b
    }
    function c(a) {
        for (var b = {
            strictMode: !1,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path",
                    "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        }, c = b, d = c.parser[c.strictMode ? "strict" : "loose"].exec(a), e = {}, f = 14; f--;) e[c.key[f]] = d[f] ||
                "";
        return e[c.q.name] = {}, e[c.key[12]].replace(c.q.parser, function (a, b, d) {
            b && (e[c.q.name][b] = d)
        }), e
    }
    function d(a) {
        var b = a || window.location.toString();
        "http://" !== b.substring(0, 7) && "https://" !== b.substring(0, 8) && (b = "http://" + b), a = b.split("/"); {
            var c = a[2].split(":"),
                d = {
                    protocol: a[0],
                    hostname: c[0],
                    port: c[1] || "80",
                    pathname: "/" + a.slice(3, a.length).join("/").split("?")[0]
                }, e = d.hostname,
                f = e.split("."),
                g = d.pathname;
            g.split("/")
        }
        return {
            domain: e,
            host: f.slice(-2).join("."),
            sub: f.slice(0, f.length - 2).join("."),
            port: d.port || "80",
            protocol: d.protocol.split(":")[0],
            path: g
        }
    }
    var e = function (a, b, c, d) {
        var e = document.getElementById(a).contentWindow,
            f = {
                filpType: b,
                wsite: c,
                copyright: d
            }, g = JSON.stringify(f);
        e.postMessage(g, "*")
    }, f = function (a) {
            var b = a.replace(/^\s+/, "").replace(/\s+$/, "").match(/([^?#]*)(#.*)?$/);
            if (!b) return {};
            for (var c = b[1], d = c.split("&"), e = {}, f = 0, g = d.length; g > f; f++) {
                var h = d[f];
                if ((h = h.split("="))[0]) {
                    var i = decodeURIComponent(h.shift()),
                        j = h.length > 1 ? h.join("=") : h[0];
                    void 0 !== j && (j = decodeURIComponent(j)), i in e ? (e[i].constructor != Array && (e[i] = [e[i]]),
                        e[i].push(j)) : e[i] = j
                }
            }
            return e
        }, g = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -
            1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54,
            55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
        h = function (c) {
            return b(a(c))
        }, i = {
            storage: window.localStorage,
            set: function (a, b) {
                try {
                    this.storage && this.storage.setItem(a, b)
                } catch (c) {
                    console.error(c)
                }
            },
            get: function (a) {
                return this.storage ? this.storage.getItem(a) : null
            }
        }, j = {};
    return j.notifyTurnPage = e, j.getUrlParaObject = f, j.decode = h, j.parseUri = c, j.getUrlInfo = d, j.localStorage =
        i, j
}();
var hexcase = 0,
    b64pad = "",
    chrsz = 8;
window.behaviorUtils = window.behaviorUtils || {}, behaviorUtils = function () {
    function a() {
        var a = new Date;
        return a.getTime()
    }
    function b() {
        r = a()
    }
    function c() {
        if (k) {
            var a = window.location.href;
            if (a.indexOf("index") > -1) return !0;
            a = a.replace("https://www.rrxiu.net", ""), a = a.replace("https://www.starlord.cc", ""), a = a.replace(
                "http://localhost/rrxiu/web/www/webroot", ""), a = a.replace("#wap", ""), a = a.replace("/", ""), a = a
                .replace("#", ""), a = a.replace("index", "");
            var b = "",
                c = a.indexOf("/");
            if (c > -1) {
                var d = a.split("/");
                b = d[0]
            }
            if ("" === b) {
                var e = a.indexOf("-");
                if (e > -1) {
                    var f = a.split("-");
                    b = f[0]
                }
            }
            if ("" === b && (b = a), "" === b) return !0;
            var g = [];
            return window.rrxgpara ? (g = window.rrxgpara.exvw.split(","), -1 === g.indexOf(b)) : !1
        }
    }
    function d() {
        return c(), void 0
    }
    function e() {
        $(window).bind("beforeunload hashchange", function (a) {
            d()
        });
        var a = 2e3;
        window.rrxgpara && window.rrxgpara.freq && (a = window.rrxgpara.freq);
        var b = !1;
        window.rrxgpara && (b = window.rrxgpara.useTimer), b && null === s && (s = setInterval(d, a))
    }
    function f(a, b, c, d, e, f) {
        if (!appConfig.behaviorEnable) return console.log("已取消记录");
        var h = document.referrer;
        d ? setTimeout(function () {
            g(a, b, c, h, window.location.href, e, f)
        }, 1e3) : g(a, b, c, h, window.location.href, e, f)
    }
    function g(a, b, c, d, e, f, g) {
        if (k) {
            var h = o + "add";
            n.checkIsMobile() && ("" !== $.trim(e) && (e += l), "" !== $.trim(d) && (d += l)), $.ajax({
                url: h,
                type: "POST",
                dataType: "json",
                data: {
                    form: {
                        finger: p.finger,
                        page: a,
                        action: b,
                        details: c,
                        referrer: d,
                        pageUrl: e,
                        actionLevel2: f,
                        actionLevel3: g
                    }
                }
            }).done(function (a) {
                p.firstAdd && (q = a.bkey), p.firstAdd = !1
            }).fail(function () {
                console.error("记录错误")
            })
        }
    }
    function h() {
        if (!p.hasInit) {
            b(), p.hasInit = !0;
            var a = i();
            p.finger = m.get(a), p.finger || (p.finger = m.getMd5Key(a + (new Date).getTime()), m.set(a, p.finger))
        }
    }
    function i() {
        return "behaviorKey"
    }
    function j() {
        return p.finger
    }
    var k = !0,
        l = "#wap",
        m = {
            storage: window.localStorage,
            getMd5Key: function (a) {
                return hex_md5(window.location.host + a)
            },
            set: function (a, b) {
                try {
                    this.storage && this.storage.setItem(this.getMd5Key(a), b)
                } catch (c) {
                    this.clear()
                }
            },
            get: function (a) {
                return this.storage ? this.storage.getItem(this.getMd5Key(a)) : null
            },
            clear: function () {
                this.storage && this.storage.clear()
            },
            remove: function (a) {
                this.storage && this.storage.removeItem(this.getMd5Key(a))
            },
            isHave: function (a) {
                if (this.storage) {
                    for (var b = 0; b < this.storage.length; b++) if (this.storage.key(b) === this.getMd5Key(a)) return !
                                0;
                    return !1
                }
                return !1
            }
        }, n = {
            checkIsMobile: function () {
                var a = navigator.userAgent.toLowerCase();
                return a.indexOf("iphone") > -1 ? !0 : a.indexOf("android") > -1 ? !0 : !1
            }
        }, o = appConfig.serviceHost + "behaviorrecord/";
    null !== appConfig.accountCenter && void 0 !== appConfig.accountCenter && (o = appConfig.accountCenter +
        "behaviorrecord/");
    var p = {
        hasInit: !1,
        finger: "",
        keyList: [],
        firstAdd: !0
    }, q = "",
        r = 0,
        s = null;
    p.pages = {
        index: "网站首页",
        eidt: "编辑页面",
        store: "模板库",
        vip: "VIP页面",
        acount: "账户中心",
        pdShow: "作品秀",
        interact: "互动市场",
        my: "个人中心",
        help: "帮助页面",
        adMarket: "推广页面",
        product: "产品中心",
        pcview: "PC预览",
        error: "Error页面",
        solution: "解决方案",
        regSuccess: "注册成功",
        mreg: "移动端注册"
    }, p.actions = {
        search: "搜索",
        link: "访问",
        edit: "编辑",
        tag: "标签",
        button: "按钮",
        login: "登录",
        regist: "注册",
        pay: "付费",
        buy: "购买",
        tpl: "模板"
    }, p.subactions = {
        search: "搜索",
        tag: "标签",
        pay: "付费"
    }, p.init = function (a, b, c, d, g) {
        h(), a = a || p.pages.index, b = b || p.actions.link, c = c || "", f(a, b, c, !0, d, g), e()
    }, p.addNoDelay = function (a, b, c, d, g) {
        h(), a = a || p.pages.index, b = b || p.actions.link, c = c || "", f(a, b, c, !1, d, g), e()
    }, p.regCredibly = function () {
        if (k) {
            h();
            var a = o + "regCredibly";
            $.ajax({
                url: a,
                type: "GET",
                dataType: "json",
                data: {
                    finger: p.finger
                },
                xhrFields: {
                    withCredentials: !0
                }
            }).done(function (a) {}).fail(function (a) {
                console.error(a)
            })
        }
    }, p.perfectWho = function () {
        if (k) {
            h();
            var a = o + "perfectWho";
            $.ajax({
                url: a,
                type: "GET",
                dataType: "json",
                data: {
                    finger: p.finger
                },
                xhrFields: {
                    withCredentials: !0
                }
            }).done(function (a) {}).fail(function (a) {
                console.error(a)
            })
        }
    };
    var t = {};
    return t.init = p.init, t.addNoDelay = p.addNoDelay, t.pages = p.pages, t.actions = p.actions, t.subactions = p.subactions,
        t.regCredibly = p.regCredibly, t.perfectWho = p.perfectWho, t.getF = j, t
}(), window.rrxiuAccount = window.rrxiuAccount || {},
function () {
    function a() {
        if (ib.bind("click", function () {
            console.log("_triggerDialogElem"), ka() ? Da() : la().then(function (a) {
                0 === a.result && "ok" === a.msg ? ia(a.accf).then(function (b) {
                    b.result && ($b = a, db && db())
                }) : Da()
            })
        }), jb.bind("click", function () {
            h()
        }), kb) {
            var a = $(kb);
            a && a.bind("click", function () {
                Ia(function () {
                    window.location.reload()
                })
            })
        }
    }
    function b() {
        pb.bind({
            keyup: function (a) {
                bc.isEmpty(pb.val()) && na(Yb.EMAIL_EMPTY);
                var b = a.keyCode || a.which;
                console.log(13 == b), 13 === b && ga()
            }
        }), rb.bind({
            keyup: function (a) {
                bc.isEmpty(rb.val()) ? na(Yb.PHONE_EMPTY) : Y(rb.val()) ? oa() : na(Yb.PHONE_INVALID);
                var b = a.keyCode || a.which;
                console.log(13 == b), 13 === b && ha()
            }
        })
    }
    function c() {
        qb.bind({
            keyup: function (a) {
                var b = a.keyCode || a.which;
                13 === b && ga()
            }
        }), sb.bind({
            keyup: function (a) {
                var b = a.keyCode || a.which;
                13 === b && ha()
            }
        })
    }
    function d() {
        yb.off().on("click", function () {
            2 == Zb ? ha() : ga()
        }), Ab.off().on("click", function () {
            X()
        })
    }
    function e() {
        zb.off().on("click", function () {
            Ja(), h()
        })
    }
    function f() {
        Nb.off().on("click", function () {
            Ja(), Zb = 1 == Zb ? 2 : 1, g()
        })
    }
    function g() {
        1 == Zb ? (oa(), ob.find(".loginType-pwd").show(), ob.find(".loginType-phone").hide(), Nb.text("手机短信登录")) : (oa(),
            ob.find(".loginType-pwd").hide(), ob.find(".loginType-phone").show(), Nb.text("账号密码登录"))
    }
    function h(a) {
        ec = bc.isEmpty(a) ? "" : a, Ja(), bb(ic ? "开始激活" : "开始注册"), xa("weplusRegister"), Ca()
    }
    function i(a, b) {
        var c = Kb.find("." + a).val();
        return "" === c ? !1 : !0
    }
    function j(a) {
        Kb.find(".error").html(a), Kb.find(".error").show()
    }
    function k() {
        Kb.find(".error").hide()
    }
    function l() {
        return i("field-phone") ? Y(Kb.find(".field-phone").val()) ? (k(), !0) : (j("输入的手机号码格式不正确!"), !1) : (j(
            "手机号码不能为空!"), !1)
    }
    function m() {
        return tb.prop("checked") ? (k(), !0) : (j("请同意《liao用户协议》"), !1)
    }
    function n() {
        return l() ? i("field-password") ? Kb.find(".field-password").val().length < 6 ? (j("密码至少为6个字符!"), !1) : m() ?
            (k(), !0) : !1 : (j("密码不能为空!"), !1) : !1
    }
    function o() {
        ic ? (Mb.html("激活"), Kb.find(".header-close").hide()) : (Mb.html("注册"), Kb.find(".header-close").show())
    }
    function p() {
        u(), Kb.find(".field-phone").bind("blur", function (a) {
            var b = $(this),
                c = b.val();
            return bc.isEmpty(c) ? (j("手机号码不能为空!"), !1) : Y(c) ? (k(), !0) : (j("输入的手机号码格式不正确!"), !1)
        }), Kb.find(".field-password").bind("blur", function (a) {
            var b = $(this),
                c = b.val();
            return bc.isEmpty(c) ? (j("密码不能为空!"), !1) : c.length < 6 ? (j("密码至少为6个字符!"), !1) : (k(), !0)
        }), Lb.off().on("click", function () {
            l() && ca(Kb.find(".field-phone").val(), "en")
        }), tb.bind("change", function () {
            m()
        }), Mb.bind("click", function (a) {
            if (n()) {
                if (!i("field-code")) return void j("验证码不能为空!");
                if (!cc) {
                    var b = "";
                    window.rrxgpara && window.rrxgpara.s && (b = window.rrxgpara.s);
                    var c = {
                        platform: Bb,
                        phone: Kb.find(".field-phone").val(),
                        password: Kb.find(".field-password").val(),
                        code: Kb.find(".field-code").val(),
                        _f: behaviorUtils.getF(),
                        _t: b
                    };
                    ic ? s(c) : r(c)
                }
            }
        }), Kb.find(".switch-login-button").bind("click", function (a) {
            q()
        })
    }
    function q() {
        t(), Ma(), Ta(), ra(), Ja(), clearInterval(ac), Ha(), gb || (gb = setInterval(function () {
            Ka()
        }, 2e3)), g()
    }
    function r(a) {
        cc = !0, Mb.html("正在注册..."), ma("RegisterViaPhone", {
            form: a
        }, "POST", "auth").then(function (a) {
            if (Mb.html("注册"), cc = !1, 0 === a.result) {
                var b = function () {
                    bb("注册成功", !0), behaviorUtils.regCredibly(), dc = Kb.find(".field-phone").val(), v()
                };
                ka() ? b() : ia(a.accf).then(function (a) {
                    a.result && b()
                })
            } else 2 === a.result ? window.location.reload() : j(a.msg)
        }, function (a) {
            console.error(a), Mb.html("注册"), cc = !1, j("注册失败")
        })
    }
    function s(a) {
        cc = !0, Mb.html("正在激活..."), ma("AcitvePhone", {
            form: a
        }, "POST", "auth").then(function (a) {
            Mb.html("激活"), cc = !1, 0 === a.result ? (bb("用户激活成功", !0), behaviorUtils.regCredibly(), dc = Kb.find(
                ".field-phone").val(), v()) : j(a.msg)
        }, function (a) {
            console.error(a), Mb.html("激活"), cc = !1, j("激活失败")
        })
    }
    function t() {
        $(".error").hide()
    }
    function u() {
        o(), ic ? Kb.find(".switch-login-button").hide() : Kb.find(".switch-login-button").show()
    }
    function v() {
        T("en"), D(), bb("开始完善注册信息"), xa("weplusFillUserInfo")
    }
    function w(a) {
        ic = !0, u(), ec = bc.isEmpty(a) ? "" : a, v(), Ca()
    }
    function x() {
        Tb.show()
    }
    function y() {
        Tb.hide()
    }
    function z() {
        $("[data-user-info=e]").show()
    }
    function A() {
        $("[data-user-info=e]").hide()
    }
    function B() {
        Vb.show()
    }
    function C() {
        Vb.hide()
    }
    function D() {
        "" !== ec ? (y(), "e" === ec ? z() : A(), B()) : (C(), x())
    }
    function E() {
        D(), $(".account-type-tab").bind("click", function () {
            var a = $(this);
            $(".account-type-tab").removeClass("active"), a.addClass("active");
            var b = a.data("acctype");
            fc = b, "e" === b ? z() : A(), B()
        }), Sb.find(".field-provice").off().on("change", function () {
            V(Sb, "field-city", U(Sb.find(".field-provice option:selected").val(), jc))
        }), Ub.bind("click", function () {
            var a = null;
            a = "e" === fc || "e" === ec ? L() : J(), null !== a && void 0 !== a && a.then(function (a) {
                gc = !1, Ub.html("完成"), 0 === a.result ? ($b = a, bb("完善注册信息完成"), ma("IsBined", {
                    platform: Bb
                }, "GET", "auth").then(function (a) {
                    a.isBind ? (db && db(), X()) : M()
                }, function (a) {
                    console.error("check binded", a), db && db(), X()
                })) : G(a.msg)
            }, function (a) {
                console.log(a), gc = !1, Ub.html("完成"), G("操作失败")
            })
        })
    }
    function F(a, b) {
        b = b || "";
        var c = Sb.find("." + a + b).val();
        return "" === c ? !1 : !0
    }
    function G(a) {
        Sb.find(".error").html(a), Sb.find(".error").show()
    }
    function H() {
        Sb.find(".error").hide()
    }
    function I() {
        return F("field-industry", " option:selected") ? F("field-purpose", " option:selected") ? F("field-contact") ?
            (H(), !0) : (G("联系人不能为空!"), !1) : (G("用途不能为空!"), !1) : (G("行业不能为空!"), !1)
    }
    function J() {
        if (!gc && I()) {
            bb("完善个人注册信息"), gc = !0;
            var a = {
                industry: Sb.find(".field-industry option:selected").text(),
                purpose: Sb.find(".field-purpose option:selected").text(),
                contact: Vb.find(".field-contact").val()
            };
            return Ub.html("正在完成"), ma("finishReg", {
                form: a
            }, "POST", "auth")
        }
    }
    function K() {
        return F("field-name") ? F("field-provice", " option:selected") ? F("field-city", " option:selected") ? F(
            "field-industry", " option:selected") ? F("field-purpose", " option:selected") ? F("field-contact") ? F(
            "field-email") ? Z(Sb.find(".field-email").val()) ? (H(), !0) : (G("输入的邮箱格式不正确!"), !1) : (G("邮箱不能空!"), !1) :
            (G("联系人不能为空!"), !1) : (G("用途不能为空!"), !1) : (G("行业不能为空!"), !1) : (G("城市不能为空!"), !1) : (G("省份不能为空!"), !1) : (
            G("企业名称不能为空!"), !1)
    }
    function L() {
        if (!gc && K()) {
            bb("完善企业注册信息"), gc = !0;
            var a = {
                platform: Bb,
                title: Vb.find(".field-name").val(),
                email: Vb.find(".field-email").val(),
                address: "",
                contact: Vb.find(".field-contact").val(),
                phone: dc,
                province: Vb.find(".field-provice option:selected").text(),
                city: Vb.find(".field-city option:selected").text(),
                name: Vb.find(".field-name").val(),
                industry: Sb.find(".field-industry option:selected").text(),
                purpose: Sb.find(".field-purpose option:selected").text()
            };
            return Ub.html("正在完成"), ma("finishReg", {
                form: a
            }, "POST", "Enterprise")
        }
    }
    function M() {
        Wb.find(".error").html(""), Q(), xa("weplusBinWx"), hc = window.setInterval(R, 2e3), Ca()
    }
    function N() {
        2 === Bb && ($("#bind_wx_qr_tips1").html("微信关注欢乐现场"), $("#bind_wx_qr_tips2").hide()), Wb.find(
            ".bind-wx-qr-cancel").bind("click", function () {
            P(), O(), X(), db && db()
        })
    }
    function O() {
        window.clearInterval(hc), hc = null
    }
    function P() {
        Wb.find(".bind-wx-qr-img").html("")
    }
    function Q() {
        $.ajax({
            url: hb + "wechat/SceneBind",
            type: "GET",
            data: {
                platform: Bb
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        }).then(function (a) {
            P();
            var b = Wb.find(".bind-wx-qr-img")[0],
                c = new QRCode(b, {
                    width: 184,
                    height: 184
                });
            c.makeCode(a.url)
        }, function (a) {
            console.log(a)
        })
    }
    function R() {
        $.ajax({
            url: hb + "auth/isBindWeixin",
            type: "GET",
            data: {
                platform: Bb
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        }).then(function (a) {
            0 === a.result ? a.isBind && (O(), Wb.find(".error").html("绑定成功"), setTimeout(function () {
                X(), Xb && Xb(), setTimeout(function () {
                    db && db()
                }, 200)
            }, 1200)) : a.isBind && (O(), Wb.find(".error").html(a.msg))
        }, function (a) {
            console.log(a)
        })
    }
    function S() {
        ic = !0, u(), h()
    }
    function T(a) {
        a = a || "en", (null === jc || null === kc) && ma("getaddress", {}, "GET", "address").then(function (b) {
            0 === b.result && ("en" === a ? (jc = b.data, V(Sb, "field-provice", jc.p), V(Sb, "field-city", U(jc.p[0].id,
                jc))) : (kc = b.data, V(_activeUserDialog, "field-provice", kc.p), V(_activeUserDialog, "field-city", U(
                kc.p[0].id, kc))))
        })
    }
    function U(a, b) {
        var c = [];
        return $.each(b.c, function (b, d) {
            parseInt(d.id) === parseInt(a) && c.push({
                name: d.name,
                id: d.name
            })
        }), c
    }
    function V(a, b, c) {
        a.find("." + b).html("");
        var d = "";
        $.each(c, function (a, b) {
            d += "<option value=" + b.id + ">" + b.name + "</option>"
        }), a.find("." + b).append(d)
    }
    function W() {
        Eb.off().on("click", function () {
            da("", "", "verify"), Fb.val("")
        }), Hb.off().on("click", function () {
            ea(Fb.val())
        }), Gb.off().on("click", function () {
            Ba()
        }), Fb.bind({
            keyup: function (a) {
                var b = a.keyCode || a.which;
                console.log(13 == b), 13 === b && ea(Fb.val())
            }
        })
    }
    function X() {
        ra(), Ja(), clearInterval(ac), lb.modal("hide")
    }
    function Y(a) {
        var b = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return b.test(a) ? !0 : !1
    }
    function Z(a) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(a) ? !0 : !1
    }
    function _() {
        var a = aa();
        lc = 120, a.css("background-color", "#9E9E9E"), a.html("重新发送(" + lc + ")"), a.attr("disabled", !0), ac =
            setInterval(function () {
            lc -= 1, 0 === lc ? ba() : a.html("重新发送(" + lc + ")")
        }, 1e3)
    }
    function aa() {
        var a = null;
        return a = "active" === mc ? _activeGetCodeButton : "forgot" === mc ? Qb : "login" === mc ? Ob : Lb
    }
    function ba() {
        var a = aa();
        lc = 0, clearInterval(ac), a.html("获取验证码"), a.attr("disabled", !1), a.css("background-color", "#FF9900")
    }
    function ca(a, b) {
        if (!nc && (nc = !0, mc = b || "en", 0 === lc)) {
            var c = 0,
                d = "registerEnterprise";
            "active" === mc ? d = "bindEmail" : "forgot" === mc ? d = "registerEnterprise" : "login" === mc && (c = 1,
                d = "registerEnterprise");
            var e = {
                wsiteGuid: "",
                sendPhone: a,
                sendType: d,
                checkPhone: c,
                _f: behaviorUtils.getF()
            };
            ma("VerifyReg", {
                form: e
            }, "POST", "sms").then(function (b) {
                nc = !1, 0 === b.result ? b.data.isVerify ? da(a, d, mc) : _() : ("active" === mc ? showActiveError(b.msg) :
                    "forgot" === mc ? Ua(b.msg) : "login" === mc ? na(b.msg) : j(b.msg), ba())
            })
        }
    }
    function da(a, b, c) {
        "verify" !== c ? (Ib = b, Jb = a) : (a = Jb, b = Ib);
        var d = hb + "sms/VerifyImage?wsiteGuid=&sendPhone=" + a + "&sendType=" + b + "&r=" + Math.random();
        Eb.find("img").attr("src", d), "verify" !== c && (console.log("showVerifyDialog"), Aa())
    }
    function ea(a) {
        if (0 === lc) {
            var b = Ib,
                c = Jb;
            if (!$.trim(a)) return void ya("请输入校验码");
            var d = {
                wsiteGuid: "",
                sendPhone: c,
                sendType: b,
                verify: a
            };
            ma("VerifySend", {
                form: d
            }, "POST", "sms").then(function (a) {
                0 === a.result ? (Ba(), _()) : (ya(a.msg), da("", "", "verify"))
            })
        }
    }
    function fa(a) {
        var b = function () {
            Ja(), $b = a, oa(), Ea(), behaviorUtils.perfectWho(!0), setTimeout(function () {
                db && db()
            }, 100)
        };
        ka() ? b() : ia(a.accf).then(function (a) {
            a.result && b()
        })
    }
    function ga() {
        var a = !0;
        bc.isEmpty(pb.val()) && (na(Yb.EMAIL_EMPTY), a = !1), a && (bc.isEmpty(qb.val()) ? (na(Yb.PWD_EMPTY), a = !1) :
            oa(), a && ma("login", {
            email: pb.val(),
            password: qb.val(),
            rememberMe: 1,
            via: "jquery"
        }, "POST").then(function (a) {
            0 === a.result ? fa(a) : (na(a.msg), eb && eb())
        }, function (a) {
            console.log(a)
        }))
    }
    function ha() {
        var a = !0;
        bc.isEmpty(rb.val()) ? (na(Yb.PHONE_EMPTY), a = !1) : Y(rb.val()) ? oa() : (na(Yb.PHONE_INVALID), a = !1), a &&
            (bc.isEmpty(sb.val()) ? (na(Yb.VERCODE_EMPTY), a = !1) : oa(), a && ma("loginByPhone", {
            phone: rb.val(),
            code: sb.val()
        }).then(function (a) {
            0 === a.result ? fa(a) : (na(a.msg), eb && eb())
        }, function (a) {
            console.log(a)
        }))
    }
    function ia(a) {
        return $.ajax({
            url: Cb + "auth/SetSId",
            type: "GET",
            data: {
                accf: a,
                platform: Bb
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        })
    }
    function ja(a) {
        return $.ajax({
            url: hb + "auth/SetSId",
            type: "GET",
            data: {
                accf: a,
                platform: 1
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        })
    }
    function ka() {
        return Cb === hb
    }
    function la() {
        return $.ajax({
            url: hb + "auth/getUser",
            type: "GET",
            data: {},
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        })
    }
    function ma(a, b, c, d) {
        return d = d || "auth", "activeForUser" !== a && (b.platform = Bb), $.ajax({
            url: hb + d + "/" + a,
            type: void 0 === c ? "GET" : c,
            data: b || {},
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        })
    }
    function na(a) {
        xb.html(a), xb.show()
    }
    function oa() {
        xb.hide()
    }
    function pa() {
        ob.show(), nb.css({
            marginLeft: 80
        })
    }
    function qa() {
        lb.find("form")[0].reset(), $("#weplusForgot").find("form")[0].reset(), $("#weplusForgotViaPhone").find("form")[
            0].reset(), $("#btnForgotOK").removeAttr("disabled"), $("#weplusRegister").find("form")[0].reset(), $(
            "#weplusFillUserInfo").find("form")[0].reset()
    }
    function ra() {
        lb.find(".qr-img").html("")
    }
    function sa() {
        var a = $.cookie("rrxiuRememberAcct");
        if (void 0 !== a && null !== a && "" !== $.trim(a)) {
            var b = rrxiuUtils.decode(a).split("|");
            b.length > 0 && pb.val(b[0]), b.length > 1 && qb.val(b[1])
        }
    }
    function ta() {
        lb.modal({
            backdrop: "static",
            keyboard: !1,
            show: !1
        }), Db.modal({
            backdrop: "static",
            keyboard: !1,
            show: !1
        }), a(), b(), c(), d(), e(), f(), p(), E(), N(), Ga(), Na(), Za(), W(), Ob.off().on("click", function () {
            var a = rb.val();
            bc.isEmpty(a) ? na(Yb.PHONE_EMPTY) : Y(a) ? (oa(), ca(a, "login")) : na(Yb.PHONE_INVALID)
        })
    }
    function ua() {
        return $b
    }
    function va() {
        bb("开始企业注册"), Ja(), xa("weplusEnterprice"), T("en"), Ca()
    }
    function wa() {
        Ja(), Fa(), bb("开始激活用户"), xa("weplusActiveUser"), T("active")
    }
    function xa(a) {
        $("#weplusForgot").addClass("hide"), $("#weplusForgotViaPhone").addClass("hide"), $("#weplusLogin").addClass(
            "hide"), $("#weplusRegister").addClass("hide"), $("#weplusFillUserInfo").addClass("hide"), $("#weplusBinWx")
            .addClass("hide"), $("#" + a).removeClass("hide")
    }
    function ya(a) {
        Db.find(".error").html(a), Db.find(".error").show()
    }
    function za() {
        Db.find(".error").hide()
    }
    function Aa() {
        Db.modal("show"), za()
    }
    function Ba() {
        Db.modal("hide")
    }
    function Ca() {
        lb.modal("show"), mb.modal("hide")
    }
    function Da() {
        ic = !1, sa(), Ha(), fb && fb(), gb || (bb("开始登录"), gb = setInterval(function () {
            Ka()
        }, 2e3)), Ca(), xa("weplusLogin")
    }
    function Ea() {
        bb("登录成功", !0), lb.modal("hide")
    }
    function Fa() {
        lb.modal("hide"), mb.modal("show")
    }
    function Ga() {
        lb.on("hidden.bs.modal", function (a) {
            pa(), oa(), qa(), Ma(), Ta(), ra(), Ja(), ba(), O(), P(), t()
        })
    }
    function Ha() {
        $.ajax({
            url: hb + "wechat/Scene",
            type: "GET",
            data: {
                platform: Bb
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        }).then(function (a) {
            ra();
            var b = lb.find(".qr-img")[0],
                c = new QRCode(b, {
                    width: 184,
                    height: 184
                });
            if (c.makeCode(a.url), "" === a.url) Ka();
            else if (0 !== a.userId) {
                var d = function () {
                    Ja(), $b = a;
                    var b = window.location.pathname,
                        c = $b.needActive === !0 && b.indexOf("/store") > -1;
                    c ? S() : (Ea(), behaviorUtils.perfectWho(!0), setTimeout(function () {
                        db && db()
                    }, 100))
                };
                ka() ? d() : ia(a.accf).then(function (b) {
                    b.result && ja(a.accf).then(function (a) {
                        b.result && d()
                    })
                })
            }
        }, function (a) {
            console.log(a)
        })
    }
    function Ia(a) {
        ma("Logout", {}, "get").then(function (b) {
            ka() ? a && a() : $.ajax({
                url: Cb + "auth/Logout",
                type: "GET",
                dataType: "json",
                xhrFields: {
                    withCredentials: !0
                }
            }).then(function (b) {
                a && a()
            })
        }, function (a) {
            console.log(a)
        })
    }
    function Ja() {
        window.clearInterval(gb), gb = null
    }
    function Ka() {
        $.ajax({
            url: hb + "wechat/Scene",
            type: "GET",
            data: {
                platform: Bb
            },
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            }
        }).then(function (a) {
            ra();
            var b = lb.find(".qr-img")[0],
                c = new QRCode(b, {
                    width: 184,
                    height: 184
                });
            if (c.makeCode(a.url), 0 !== a.userId) {
                var d = function () {
                    Ja(), $b = a;
                    var b = window.location.pathname,
                        c = $b.needActive === !0 && b.indexOf("/store") > -1;
                    c ? S() : (Ea(), behaviorUtils.perfectWho(!0), setTimeout(function () {
                        db && db()
                    }, 100))
                };
                ka() ? d() : ia(a.accf).then(function (b) {
                    b.result && ja(a.accf).then(function (a) {
                        b.result && d()
                    })
                })
            }
        }, function (a) {
            console.log(a)
        })
    }
    function La() {
        var a = $.trim($('form[name="login_form"] input[name="email"]').val()),
            b = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        b.test(a) && $('form[name="forgot_form"] input[name="email"]').val(a), xa("weplusForgot")
    }
    function Ma() {
        xa("weplusLogin")
    }
    function Na() {
        ub.off("click").on("click", function () {
            Ja(), Sa()
        }), $("#btnForgotOK").off("click").on("click", function () {
            Oa()
        })
    }
    function Oa() {
        var a = $.trim($('form[name="forgot_form"] input[name="email"]').val());
        if (Qa(), "" === a) return Pa("邮箱不能为空"), !1;
        var b = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!b.test(a)) return Pa(Yb.EMAIL_INVALID), !1;
        $("#btnForgotOK").attr("disabled", !0);
        var c = {
            email: a,
            via: "jquery",
            platform: Bb
        }, d = hb + "auth/IsRegister";
        $.ajax({
            url: d,
            type: "POST",
            dataType: "json",
            data: c,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function (a) {
            2 === a.result ? ($("#btnForgotOK").attr("disabled", !1), Pa(a.msg)) : Pa(a.msg)
        }).fail(function (a) {
            $("#btnForgotOK").attr("disabled", !1), Pa(a.msg)
        })
    }
    function Pa(a) {
        var b = $('form[name="forgot_form"] .error');
        b.html(a), b.show()
    }
    function Qa() {
        var a = $('form[name="forgot_form"] .error');
        a.hide()
    }
    function Ra() {
        $("#weplusForgotViaPhone").find("form")[0].reset();
        var a = Qb;
        lc = 0, clearInterval(ac), a.html("获取验证码"), a.attr("disabled", !1), a.css("background-color", "#FF9900")
    }
    function Sa() {
        Ra(), bb("手机号找回密码开始"), xa("weplusForgotViaPhone")
    }
    function Ta() {
        xa("weplusLogin")
    }
    function Ua(a) {
        Pb.find(".error").html(a), Pb.find(".error").show()
    }
    function Va() {
        Pb.find(".error").hide()
    }
    function Wa() {
        var a = Pb.find(".field-phone").val();
        return bc.isEmpty(a) ? (Ua("手机号码不能为空!"), !1) : Y(a) ? (Va(), !0) : (Ua("输入的手机号码格式不正确!"), !1)
    }
    function Xa() {
        var a = Pb.find(".field-password").val();
        return bc.isEmpty(a) ? (Ua("新密码不能为空!"), !1) : a.length < 6 ? (Ua("新密码至少为6个字符!"), !1) : (Va(), !0)
    }
    function Ya(a, b) {
        var c = Pb.find("." + a).val();
        return "" === c ? !1 : !0
    }
    function Za() {
        Pb.find(".switch-login-button").bind("click", function (a) {
            q()
        }), Pb.find(".switch-find-via-email-button").bind("click", function (a) {
            La()
        }), Pb.find(".field-phone").bind("blur", function (a) {
            Wa()
        }), Pb.find(".field-password").bind("blur", function (a) {
            Xa()
        }), Qb.off().on("click", function () {
            Wa() && ca(Pb.find(".field-phone").val(), "forgot")
        }), Rb.bind("click", function (a) {
            if (Wa()) {
                if (!Ya("field-code")) return void Ua("验证码不能为空!");
                if (Xa() && !oc) {
                    var b = {
                        platform: Bb,
                        phone: Pb.find(".field-phone").val(),
                        password: Pb.find(".field-password").val(),
                        code: Pb.find(".field-code").val()
                    };
                    $a(b)
                }
            }
        })
    }
    function $a(a) {
        oc = !0, _a(), ma("forgotViaPhone", {
            form: a
        }, "POST", "auth").then(function (b) {
            ab(), oc = !1, 0 === b.result ? (Ua("即将进入登录..."), setTimeout(function () {
                q(), pb.val(a.phone), qb.val(""), bb("手机号找回密码成功")
            }, 1500)) : Ua(b.msg)
        }, function (a) {
            console.error(a), ab(), oc = !1, Ua("保存失败")
        })
    }
    function _a() {
        Rb.html("保存中")
    }
    function ab() {
        Rb.html("保存")
    }
    function bb(a, b) {
        var c = behaviorUtils.actions.regist;
        return b ? void behaviorUtils.addNoDelay(behaviorUtils.pages.index, c, a) : void behaviorUtils.init(
            behaviorUtils.pages.index, c, a)
    }
    var cb =
        ' <div id="login_dialog" class="modal fade" tabindex="-1" role="dialog"> <div id="weplusLogin" class="modal-dialog rrxiu-account-dialog hide" role="document"> <div class="dialog-header"> <div class="header-title"> 登录注册 </div> <a href="javascript:void(0)" class="header-close">关闭</a> </div> <div class="dialog-body"> <div class="left-box"> <div class="qr-box"> <div class="qr-img"> </div> </div> <div class="qr-tips"> <span style="color:#37ab2f">微信扫描快速登录</span> </div> </div> <div class="right-box"> <form class="form-horizontal loginType-pwd" name="rrxiuAccount"> <div class="login-item-title"> 邮箱/手机 </div> <div class="input-margin"> <input type="text" name="email" class="form-control input-email"> </div> <div class="login-item-title login-item-title-pwd"> 密码<a tabindex="-1" href="javascript:void(0)" class="forgot">忘记密码</a> </div> <div class="input-margin"> <input type="password" name="password" class="form-control input-password"> </div> </form> <form class="form-horizontal loginType-phone" name="rrxiuAccount"> <div class="login-item-title"> 手机号 </div> <div class="input-margin"> <input type="tel" class="form-control input-phone" minlength="11" maxlength="20"> </div> <div class="login-item-title login-item-title-pwd"> 验证码 </div> <div class="input-margin"> <input type="text" class="form-control input-vercode"> <a href="javascript:void(0)" class="btn-phone-vercode">获取验证码</a> </div> </form> <div class="error"> </div> <div class="login-button"> 登录 </div> <div class="register-box"> <a href="javascript:void(0)" class="register-button">立即注册</a> <a href="javascript:void(0)" class="register-phone">手机短信登录</a> </div> </div> </div> </div> <div id="weplusForgot" class="modal-dialog rrxiu-account-dialog hide" style="height:220px"> <div class="dialog-header"> <div class="header-title"> 找回密码 </div> <a href="javascript:void(0)" class="header-close">关闭</a> </div> <div class="dialog-body" style="margin-top:50px"> <form class="form-horizontal" name="forgot_form" novalidate> <div class="account-box" style="text-align:center"> <div> <input type="email" name="email" style="width:220px;display:inline;font-size:16px" class="form-control" placeholder="输入您注册使用的邮箱" required><button id="btnForgotOK" class="btn btn-default" type="button">确定</button> </div> <div style="text-align:center;margin-top:10px"> <small class="error" style="font-size:16px;position:initial"></small> </div> </div> </form> </div> </div> <div id="weplusForgotViaPhone" class="modal-dialog rrxiu-account-dialog forgot-phone-dialog hide"> <div class="dialog-header"> <div class="header-title"> 找回密码 </div> <a href="javascript:void(0)" class="header-close">关闭</a> </div> <div id="forgotViaPhoneDialog" class="dialog-body" style="margin-top:30px"> <form class="form-horizontal" name="rrxiuForgotViaPhoneDialog"> <div class="form-group"> <label class="col-sm-3 control-label item-title">手机号：</label> <div class="col-sm-7"> <input type="tel" class="field-phone form-control" minlength="11" maxlength="20" placeholder="输入您注册时使用的手机号"> </div> </div> <div class="form-group mtop20"> <label class="col-sm-3 control-label item-title">验证码：</label> <div class="col-sm-4"> <input type="text" class="field-code form-control"> </div> <div class="col-sm-3" style="padding:2px 0"> <a class="button-getCode" href="javascript:void(0)">获取验证码</a> </div> </div> <div class="form-group mtop20"> <label class="col-sm-3 control-label item-title">新密码：</label> <div class="col-sm-7"> <input placeholder="至少6位字符或数字" type="password" class="field-password form-control" minlength="6" maxlength="30"> </div> </div> <div class="form-group mtop20" style="height:27px"> </div> <div class="form-group reg-buttons"> <div class="col-sm-10 col-sm-offset-3"> <button type="button" class="btn-ok">保存</button> </div> </div> </form> <div class="old-user-login"> <a href="javascript:void(0)" class="switch-login-button"> 账号登录 </a> </div> <div class="error" style="position:absolute;left:132px;bottom:119px"> </div> </div> </div> <div id="weplusRegister" class="modal-dialog rrxiu-account-dialog register-dialog hide"> <div class="dialog-header"> <div class="header-title"> 完成注册 </div> <a href="javascript:void(0)" class="header-close">关闭</a> </div> <div id="registerDialog" class="dialog-body" style="margin-top:30px"> <form class="form-horizontal" name="rrxiuRegister"> <div class="form-group"> <label class="col-sm-3 control-label item-title">手机号：</label> <div class="col-sm-7"> <input type="tel" class="field-phone form-control" minlength="11" maxlength="20"> </div> </div> <div class="form-group mtop20"> <label class="col-sm-3 control-label item-title">验证码：</label> <div class="col-sm-4"> <input type="text" class="field-code form-control"> </div> <div class="col-sm-3" style="padding:2px 0"> <a class="button-getCode" href="javascript:void(0)">获取验证码</a> </div> </div> <div class="form-group mtop20"> <label class="col-sm-3 control-label item-title">密码：</label> <div class="col-sm-7"> <input placeholder="至少6位字符或数字" type="password" class="field-password form-control" minlength="6" maxlength="30"> </div> </div> <div class="form-group mtop20"> <label class="col-sm-3 control-label item-title"> </label> <div class="col-sm-7"> <input type="checkbox" class="field-rrxp" id="rrx-f" checked style="width:15px;height:15px;vertical-align:middle;margin:-2px 0 0;"> <label for="rrx-f" style="font-weight:normal;"> 同意<a href="https://www.rrxiu.net/content-rrxyhxy" target="_blank" style="color:#0099ff;">《liao用户协议》</a> </label> </div> </div> <div class="form-group reg-buttons"> <div class="col-sm-10 col-sm-offset-3"> <button type="button" class="btn-ok">注册</button> </div> </div> </form> <div class="old-user-login"> <a href="javascript:void(0)" class="switch-login-button">老用户登录</a> </div> <div class="error" style="position:absolute;left:132px;bottom:119px"> </div> </div> </div> <div id="weplusFillUserInfo" class="modal-dialog rrxiu-account-dialog fill-user-info-dialog hide"> <div class="dialog-header"> <div class="header-title"> 完成注册 </div> </div> <div id="fillUserInfoDialog" class="dialog-body" style="margin-top:30px"> <form class="form-horizontal" name="rrxiuFillUserInfo"> <div class="form-group" id="userInfoAccountType"> <label class="col-sm-3 control-label item-title">账号类型：</label> <div class="col-sm-7"> <div class="account-type-tab account-type-tab-p" data-acctype="p"> 个人使用 </div> <div class="account-type-tab account-type-tab-e" data-acctype="e"> 企业使用<br>（更多高级功能） </div> </div> </div> <div id="fillUserInfoDialogDetail"> <div class="form-group" data-user-info="e"> <label class="col-sm-3 control-label item-title">企业名称：</label> <div class="col-sm-7"> <input type="text" class="field-name form-control" maxlength="100"> </div> </div> <div class="form-group" data-user-info="e"> <label class="col-sm-3 control-label item-title">地址：</label> <div class="col-sm-3" style="padding-right: 0;"> <select class="field-provice form-control"> </select> </div> <div class="col-sm-4"> <select class="field-city form-control"> </select> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label item-title">行业：</label> <div class="col-sm-7"> <select class="field-industry form-control" style="width: 116px;"> <option value="">选择行业</option> <option value="广告传媒">广告传媒</option> <option value="IT互联网">IT互联网</option> <option value="教育培训">教育培训</option> <option value="银行金融">银行金融</option> <option value="房地产">房地产</option> <option value="电商">电商</option> <option value="政府组织">政府组织</option> <option value="汽车4S店">汽车4S店</option> <option value="媒体">媒体</option> <option value="旅游">旅游</option> <option value="餐饮住宿">餐饮住宿</option> <option value="医药医疗">医药医疗</option> <option value="食品">食品</option> <option value="百货零售">百货零售</option> <option value="珠宝首饰">珠宝首饰</option> <option value="影视">影视</option> <option value="美容健身">美容健身</option> <option value="通信">通信</option> <option value="家居建材">家居建材</option> <option value="交通物流">交通物流</option> <option value="服饰">服饰</option> <option value="会展">会展</option> <option value="体育娱乐">体育娱乐</option> <option value="生产制造">生产制造</option> <option value="生活服务">生活服务</option> <option value="其他">其他</option> </select> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label item-title">用途：</label> <div class="col-sm-7"> <select class="field-purpose form-control" style="width: 116px;"> <option value="">选择用途</option> <option value="微信营销">微信营销</option> <option value="门店引流">门店引流</option> <option value="企业宣传">企业宣传</option> <option value="现场活动">现场活动</option> <option value="电商运营">电商运营</option> <option value="邀请函">邀请函</option> <option value="招聘">招聘</option> <option value="其他">其他</option> </select> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label item-title">联系人：</label> <div class="col-sm-7"> <input type="text" class="field-contact form-control" maxlength="30"> </div> </div> <div class="form-group" data-user-info="e"> <label class="col-sm-3 control-label item-title">邮箱：</label> <div class="col-sm-7"> <input type="email" class="field-email form-control" maxlength="30"> </div> </div> <div class="error"> </div> <div class="form-group save-buttons"> <div class="col-sm-10 col-sm-offset-3"> <button type="button" class="btn-ok">完成</button> </div> </div> </div> </form> </div> </div> <div id="weplusBinWx" class="modal-dialog rrxiu-account-dialog bin-wx-dialog hide"> <div class="dialog-header"> <div class="header-title"> 完成注册 </div> </div> <div id="bindWxDialog" class="dialog-body" style="margin-top:55px"> <div class="bind-wx-qr-box"> <div class="bind-wx-qr-img"> </div> </div> <div class="bind-wx-qr-tips"> <div class="error" style="padding:0;color:#f00;position:static;margin-top:-14px;"> </div> <div id="bind_wx_qr_tips1"> 微信关注liao </div> <div id="bind_wx_qr_tips2"> 支持在手机上制作、查看作品数据 </div> </div> <a href="javascript:void(0)" class="bind-wx-qr-cancel">暂不关注</a> </div> </div> </div> <div class="modal fade" id="verify_dialog" style="z-index:9999" tabindex="-1" role="dialog"> <div id="weplusVerify" class="modal-dialog rrxiu-account-dialog enterprice-dialog activeUser-dialog verify-dialog"> <div id="verifyDialog" class="dialog-body" style="margin-top:50px"> <form class="form-horizontal" name="verify_form" novalidate> <div class="verifyContent"> <div class="verifyBox" id="verifyBox"> <img title="看不清，点击换一张" align="absmiddle"> </div> <input type="text" name="verify" class="input-verify verifyInput form-control" onkeydown="if(event.keyCode==13){return false;}" placeholder="输入左边的校验码" required> </div> </form> <div class="form-group en-buttons"> <div class="col-sm-10 col-sm-offset-3" style="padding-left:8px"> <button id="btnVerifyCannel" class="btn btn-cancel" type="button">取消</button> <button id="btnVerifyOK" class="btn btn-sure" type="submit">确定</button> </div> </div> <div class="error" style="position:absolute;left:208px;bottom:42px"> </div> </div> </div> </div>';

    $("body").append(cb);
    var db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Eb,
            Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Ob, Pb, Qb, Rb, Sb, Tb, Ub, Vb, Wb, Xb, Yb = {
            EMAIL_EMPTY: "帐号不能为空",
            EMAIL_INVALID: "邮箱格式不正确",
            PHONE_EMPTY: "手机号不能为空",
            PHONE_INVALID: "手机号格式不正确",
            VERCODE_EMPTY: "验证码不能为空",
            PWD_EMPTY: "密码不能为空",
            PWD_LENGTH: "密码至少6个字符",
            LOGINING: "正在登录...",
            FAIL: "登录失败",
            SUCCESS: "登录成功"
        }, Zb = 1,
        $b = null,
        _b = !1;
    rrxiuAccount = function (a) {
        hb = a.serviceHost, db = a.successCallback, eb = a.failCallback, Xb = a.bindWeixinCallback, fb = a.beforeShowCallback,
            ib = $(a.loginButtonSelector), jb = $(a.regButtonSelector), Bb = a.platform, Cb = a.currServiceHost, kb = a
            .logoutButtonSelector, lb = $("#login_dialog"), mb = $("#active_dialog");
        var b = $("#weplusLogin");
        nb = b.find(".left-box"), ob = b.find(".right-box"), pb = b.find(".input-email"), qb = b.find(".input-password"),
            rb = b.find(".input-phone"), sb = b.find(".input-vercode"), tb = $("#rrx-f"), ub = b.find(".forgot"), vb =
            b.find(".register-box .register-p"), wb = b.find(".register-box .register-e"), yb = b.find(".login-button"),
            zb = b.find(".register-button"), Nb = b.find(".register-phone"), Ob = b.find(".btn-phone-vercode"), xb = b.find(
            ".error"), Ab = lb.find(".header-close"), Db = $("#verify_dialog"), Eb = Db.find("#verifyBox"), Fb = Db.find(
            ".input-verify"), Gb = Db.find("#btnVerifyCannel"), Hb = Db.find("#btnVerifyOK"), Kb = $("#weplusRegister"),
            Lb = Kb.find(".button-getCode"), Mb = Kb.find(".btn-ok"), Pb = $("#weplusForgotViaPhone"), Qb = Pb.find(
            ".button-getCode"), Rb = Pb.find(".btn-ok"), Sb = $("#weplusFillUserInfo"), Tb = $("#userInfoAccountType"),
            Vb = $("#fillUserInfoDialogDetail"), Ub = Sb.find(".btn-ok"), Wb = $("#weplusBinWx"), _b = !0 === a.isBindWeixin ? !
            0 : !1
    };
    var ac, bc = {
            isEmail: function (a) {
                var b = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                return b.test(a)
            },
            isEmpty: function (a) {
                return void 0 === a || null === a || "" === $.trim(a) ? !0 : !1
            },
            checkLength: function (a, b) {
                return a.length > b
            }
        }, cc = !1,
        dc = "",
        ec = "",
        fc = "",
        gc = !1,
        hc = null,
        ic = !1,
        jc = null,
        kc = null,
        lc = 0,
        mc = "en",
        nc = !1,
        oc = !1;
    rrxiuAccount.prototype = {
        constructor: rrxiuAccount,
        init: ta,
        getUser: ua,
        showLoginDialog: Da,
        hideLoginDialog: Ea,
        showEnterpriceDialog: va,
        showActiveUserDialog: wa,
        showRegDialog: h,
        showFinishReg: S,
        showBindWxDialog: M,
        showWaitActiveDialog: w,
        logout: Ia
    }
}();
var options = {
    currServiceHost: appConfig.serviceHost,
    serviceHost: appConfig.accountCenter,
    platform: 1,
    loginButtonSelector: ".mywsite-header .button-login",
    regButtonSelector: ".mywsite-header .button-register",
    logoutButtonSelector: "#sigin_out",
    successCallback: function () {
        $(".mywsite-header .sign-menu").hide(), $(".action-area .user-portal").show(), $isStrolord = window.location.host
            .indexOf("starlord.cc") > -1, $isRrxiu = window.location.host.indexOf("rrxiu.net") > -1, $isStrolord ||
            $isRrxiu ? window.location.href = "https://" + window.location.host + "/my" : window.location = "my"
    }
}, accountMain = new rrxiuAccount(options);
accountMain.init(), window.rrxiuCaseInfo = window.rrxiuCaseInfo || {},
function () {
    function a() {
        m = $("#__viewUrl").val(), n = $("#__pcPreview").val()
    }
    function b() {
        o.css({
            width: l.width(),
            height: 704
        }), o.attr("src", n)
    }
    function c() {
        $(".btn-pre").click(function () {
            return rrxiuUtils.notifyTurnPage(p, "pre"), !1
        }), $(".btn-next").click(function () {
            return rrxiuUtils.notifyTurnPage(p, "next"), !1
        })
    }
    function d() {
        var a = new QRCode($(".right-box .qrcode")[0], {
            width: 200,
            height: 200
        }),
            b = m.lastIndexOf("?"),
            c = m;
        if (b > -1) {
            c = m.substr(0, b);
            var d = rrxiuUtils.getUrlParaObject(m),
                e = [];
            jQuery.each(d, function (a, b) {
                void 0 !== a && "iframe" !== a && e.push(a + "=" + b)
            });
            var f = e.join("&");
            "" !== f && (c += "?" + f)
        }
        a.makeCode(c)
    }
    function e(a) {
        var b = $(a),
            c = new QRCode(a, {
                width: 170,
                height: 170
            }),
            d = b.data("url"),
            e = d.split("-"),
            f = "";
        e.length > 1 && (f = e[1]);
        var g = appConfig.viewDomainFormat.replace("{guid}", f);
        g += g.indexOf("?") > -1 ? "&rrxsrc=1" : "?rrxsrc=1", window.rrxdebug && console.info(g), c.makeCode(g), a.title =
            "微信扫一扫即可在手机查看效果"
    }
    function f() {
        var a = $(".page").find(".item-content-qr-img");
        jQuery.each(a, function (a, b) {
            e(b)
        })
    }
    function g() {
        var a = $(".item-contact-qrcode");
        $.each(a, function (a, b) {
            var c = new QRCode(b, {
                width: 120,
                height: 120
            }),
                d = $(b).data("url");
            d || (d = "http://weixin.qq.com/r/cftOVv-EM6JMrbs1965j"), c.makeCode(d)
        }), h()
    }
    function h() {
        $(".item-logos-weixin").bind({
            mouseover: function () {
                $(".item-contact-qr-gzh").show()
            },
            mouseleave: function () {
                $(".item-contact-qr-gzh").hide()
            }
        }), $(".icon-contact-qr-creative").bind({
            mouseover: function () {
                $(".item-contact-qr-creative").show()
            },
            mouseleave: function () {
                $(".item-contact-qr-creative").hide()
            }
        })
    }
    function i() {
        behaviorUtils.init(behaviorUtils.pages.product)
    }
    function j() {
        $('[data-op="wp_free_use"]').bind("click", function () {
            var a = appConfig.serviceHost + "auth/getCurrentUser";
            $.ajax({
                url: a,
                type: appConfig.thisHostAndServiceHostIsSame ? "POST" : "GET",
                dataType: appConfig.thisHostAndServiceHostIsSame ? "json" : "jsonp",
                data: {
                    via: "jquery"
                },
                jsonp: "jsonp_callback"
            }).done(function (a) {
                0 === a.result ? window.location.href = "/my" : accountMain.showRegDialog()
            }).fail(function () {})
        })
    }
    var k, l, m, n, o, p = "viewFrame";
    window.rrxRegRedirect = "my", rrxiuCaseInfo = function (a) {
        k = a, l = $("#main"), o = $("#" + p)
    }, rrxiuCaseInfo.prototype = {
        constructor: rrxiuCaseInfo,
        init: function () {
            f(), j(), i(), g(), a(), b(), c(), d()
        }
    }
}(), $(function () {
    var a = new rrxiuCaseInfo(appConfig.serviceHost);
    a.init()
}),
function () {
    var a =
        '<div onclick="_MEIQIA(\'showPanel\')" style="display:block;z-index:2147483647;position:fixed;bottom:150px;left:0;width:auto;height:auto;padding:0;margin:0;border:0;background-color:#0000"></div>';
    setTimeout(function () {
        $("body").append(a)
    }, 1e3)
}();