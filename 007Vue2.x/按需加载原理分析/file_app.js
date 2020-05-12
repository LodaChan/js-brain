webpackJsonp([9], 
    {
    0: function (t, e, n) { n("briU"), t.exports = n("NHnr") },
    NHnr: function (t, e, n) {
        "use strict"; Object.defineProperty(e, "__esModule", {
            value: !0
        }); var o = n("kV13"), i = {
            render: function () {
                var t = this.$createElement, e = this._self._c || t; return e("div", {
                    attrs: { id: "app" }
                }, [e("transition", {
                    attrs: {
                        name:
                            "page-fade", mode: "out-in"
                    }
                }, [e("router-view")], 1)], 1)
            },
            staticRenderFns: []
        }; var a = n("C7Lr")({
            name: "app", data: function () { return {} },
            mounted: function () { },
            methods: {}
        }, i, !1, function (t) {
            n("g2iS")
        }, null, null).exports, r = {};
        r.routers = [
            {
                name: "index", path: "/index",
                component: function (t) {
                    return Promise.all([n.e(0), n.e(2)]).then(function () {
                        var e = [n("MiCu")]; t.apply(null, e)
                    }.bind(this)).catch(n.oe)
                },
                meta: {
                    title: "主页", auth: !1, accessKey: "index", menuCode: ""
                }
            },

            {
                name: "solution", path: "/solution",
                component: function (t) {
                    return Promise.all([n.e(0), n.e(6)]).then(function () {
                        var e = [n("GC9G")];
                        t.apply(null, e)
                    }.bind(this)).catch(n.oe)
                },
                meta: { title: "解决方案", auth: !1, accessKey: "solution", menuCode: "" }
            },
            {
                name: "saas",
                path: "/saas",
                component: function (t) {
                    return Promise.all([n.e(0), n.e(5)]).then(
                        function () {
                            var e = [n("fOGf")];
                            t.apply(null, e)
                        }.bind(this)).catch(n.oe)
                },
                meta: { title: "SaaS服务", auth: !1, accessKey: "saas", menuCode: "" }
            },
            { name: "about", path: "/about", component: function (t) { return Promise.all([n.e(0), n.e(4)]).then(function () { var e = [n("5tFj")]; t.apply(null, e) }.bind(this)).catch(n.oe) }, meta: { title: "关于我们", auth: !1, accessKey: "about", menuCode: "" } }, { name: "join", path: "/join", component: function (t) { return Promise.all([n.e(0), n.e(7)]).then(function () { var e = [n("h9GX")]; t.apply(null, e) }.bind(this)).catch(n.oe) }, meta: { title: "加入我们", auth: !1, accessKey: "join", menuCode: "" } }, { name: "customer", path: "/customer", component: function (t) { return Promise.all([n.e(0), n.e(3)]).then(function () { var e = [n("753e")]; t.apply(null, e) }.bind(this)).catch(n.oe) }, meta: { title: "成功案例", auth: !1, accessKey: "customer", menuCode: "" } }, { name: "cloud", path: "/cloud", component: function (t) { return Promise.all([n.e(0), n.e(1)]).then(function () { var e = [n("0t7J")]; t.apply(null, e) }.bind(this)).catch(n.oe) }, meta: { title: "公有云服务", auth: !1, accessKey: "cloud", menuCode: "" } }]; var s = r, u = n("p7sN"); o.a.use(u.a); var c = []; c = (c = c.concat([{
                path: "/",
                redirect: "/index"
            }])).concat(s.routers);
        var l = new u.a({
            mode: "history",
            saveScrollPosition: !0, routes: c
        });
        l.beforeEach(function (t, e, n) {
            n(), document.title = t.meta.title + " | 翼辉福瑞（北京）科技有限公司"
        });
        var h = l, p = {
            isObjEmptyFn: function (t) {
                var e = !1;
                return void 0 !== t && null != t && t + "" != "" || (e = !0), e
            },
            isIOS: function () {
                var t = !1; try {
                    t = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                }
                catch (t) { throw t } return t
            },
            base64ToBinary: function (t) { for (var e = t.split(","), n = e[0].match(/:(.*?);/)[1], o = atob(e[1]), i = o.length, a = new Uint8Array(i); i--;)a[i] = o.charCodeAt(i); return new Blob([a], { type: n }) }, getInputLength: function (t) { var e = 0; t && t.length > 0 && (t = t.replace(/(^\s*)|(\s*$)/g, "")); for (var n = 0; n < t.length; n++) { null != t.charAt(n).match(/[^\x00-\xff]/gi) ? e += 2 : e += 1 } return e }, timestampToTime: function (t) { var e = new Date(parseInt(t)); return e.getFullYear() + "-" + ((e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-") + (e.getDate() + " ") + ((e.getHours() >= 10 ? e.getHours() : "0" + e.getHours()) + ":") + ((e.getMinutes() >= 10 ? e.getMinutes() : "0" + e.getMinutes()) + ":") + (e.getSeconds() >= 10 ? e.getSeconds() : "0" + e.getSeconds()) }, backInterceptString: function (t, e) { return [t.split(e)[0], t.split(e)[1]] }
        }, g = p; Number.prototype.formateDateTime = function () { var t = this / 1e3, e = t > 3599 ? parseInt(t / 3600) : "0"; t > 59 && parseInt((t - 60 * e * 60) / 60), t > 0 && parseInt(t % 60) }, Date.prototype.toLocaleString = function () { return this.getFullYear() + "-" + (this.getMonth() + 1 > 9 ? this.getMonth() + 1 : "0" + parseInt(this.getMonth() + 1)) + "-" + (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) + " " + (this.getHours() > 9 ? this.getHours() : "0" + this.getHours()) + ":" + (this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes()) + ":" + (this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds()) }, Date.prototype.toShortLocaleString = function () { return this.getFullYear() + "-" + (this.getMonth() + 1 > 9 ? this.getMonth() + 1 : "0" + parseInt(this.getMonth() + 1)) + "-" + (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) }, Date.prototype.toShortLocaleStringNoday = function () { return this.getFullYear() + "-" + (this.getMonth() + 1 > 9 ? this.getMonth() + 1 : "0" + parseInt(this.getMonth() + 1)) }, Date.prototype.toLocaleStringHour = function () { return (this.getHours() > 9 ? this.getHours() : "0" + this.getHours()) + ":" + (this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes()) }; n("briU"); var d = n("r6k1"), f = n.n(d), m = (n("84iU"), { apiConfig: {}, load: function () { console.log("[system.nodeJs.NODE_ENV]", "production"), m.apiConfig = window.PROD_API_HOST, console.log("[apiHostProvider.apiConfig from production]", m.apiConfig) } }); m.load(), m.getModuleHost = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "XXXXXXX_HOST"; return m.apiConfig[t] }, m.getApiAddress = function (t, e) { return e && 0 == e.indexOf("/") ? this.getModuleHost(t) + e : this.getModuleHost(t) + "/" + e }; var v = m, y = { userDefaultImageUrl: "/static/images/default-user-logo.png" }; y.imageLoadHost = v.getApiAddress("WISE_OFFICE_SERVICE_HOST", "/image/management/fileout") + "?file_name="; var S = y, M = { get: function () { var t = navigator.userAgent, e = t.indexOf("Opera") > -1, n = t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1 && !e, o = t.indexOf("Edge") > -1, i = t.indexOf("Firefox") > -1, a = t.indexOf("Safari") > -1 && -1 == t.indexOf("Chrome"), r = t.indexOf("Chrome") > -1 && t.indexOf("Safari") > -1; if (n) { new RegExp("MSIE (\\d+\\.\\d+);").test(t); var s = parseFloat(RegExp.$1); return 7 == s ? "IE7" : 8 == s ? "IE8" : 9 == s ? "IE9" : 10 == s ? "IE10" : 11 == s ? "IE11" : "0" } return e ? "Opera" : o ? "Edge" : i ? "FF" : a ? "Safari" : r ? "Chrome" : void 0 } }, b = M; o.a.prototype.$utils = g, f.a.polyfill(), o.a.prototype.$var = S, o.a.prototype.$broswer = b, new o.a({
            el:
                "#app", router: h,
            components: { App: a },
            template: "<App/>"
        })
    }, g2iS: function (t, e) { }
}, [0]);