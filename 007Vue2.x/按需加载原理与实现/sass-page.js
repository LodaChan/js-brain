// chunkFile_5.9bed369a093b49a11749.js
webpackJsonp([5], {
    "1gp0":
        function (e, n) { },
    fOGf: function (e, n, r) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i = {
            mixins: [r("Qj6l").a],
            data: function () {
                return {
                    isFullScreenWrapperLine1Shown:
                        !1, isFullScreenWrapperLine2Shown: !1, isFullScreenWrapperLine3Shown: !1,
                    isFullScreenWrapperLine4Shown: !1, isFullScreenWrapperLine5Shown: !1,
                    isFullScreenWrapperLine6Shown: !1, pageCurrentBlockIndex: 1
                }
            },
            components: {
                HeaderTmpl: function () { return r.e(10).then(r.bind(null, "h2/A")) },
                FooterTmpl: function () { return r.e(11).then(r.bind(null, "tKJK")) }
            },
            mounted:
                function () {
                    var e = this; setTimeout(function () {
                        e.isFullScreenWrapperLine1Shown = !0, e.isFullScreenWrapperLine2Shown = !0,
                            e.isFullScreenWrapperLine3Shown = !0, e.isFullScreenWrapperLine4Shown = !0,
                            e.isFullScreenWrapperLine5Shown = !0, e.isFullScreenWrapperLine6Shown = !0
                    },
                        600), window.scrollTo(0, 0); var n = this.$broswer.get(); n.indexOf("IE") < 0 &&
                            "Edge" != n && (document.addEventListener &&
                                document.addEventListener("DOMMouseScroll",
                                    this.throttle(this.scrollFunc), !1),
                                document.onmousewheel = this.throttle(this.scrollFunc)), window.scrollTo(0, 0)
                },
            destroyed: function () { document.addEventListener("DOMMouseScroll", function () { }, !1), document.onmousewheel = function () { } }, computed: {}, methods: { scrollFunc: function (e) { e = e || window.event, 1 != this.isPageScrolling && (e.wheelDelta ? (e.wheelDelta > 0 && this.pageCurrentBlockIndex-- , e.wheelDelta < 0 && this.pageCurrentBlockIndex++ , this.scrollSmoothTo()) : e.detail && (e.detail > 0 && this.pageCurrentBlockIndex-- , e.detail < 0 && this.pageCurrentBlockIndex++ , this.scrollSmoothTo())) }, scrollSmoothTo: function () { var e = this; this.isPageScrolling = !0; var n = 0; n = this.pageCurrentBlockIndex <= 1 ? 0 : document.documentElement.clientHeight * (this.pageCurrentBlockIndex - 1), this.pageCurrentBlockIndex > 3 && (n = 3 * document.documentElement.clientHeight), window.scrollTo(0, n), setTimeout(function () { e.isPageScrolling = !1 }, 200) } }
        },
            l = {
                render: function () {
                    var e = this, n = e.$createElement, r = e._self._c || n; return r("div", {
                        class: ["saas-page"]
                    },
                        [r("header-tmpl", { attrs: { targetPage: "saas" } }), e._v(" "),
                        r("div", { staticClass: "full-screen-container1" },
                            [r("div", { staticClass: "full-screen-wrapper" },
                                [r("div", {
                                    directives: [{
                                        name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine4Shown,
                                        expression: "isFullScreenWrapperLine4Shown"
                                    }],
                                    staticClass: "full-screen-wrapper-line1"
                                },
                                    [e._v("Elight智慧社区")]), e._v(" "),
                                r("div", {
                                    directives: [{
                                        name: "show", rawName: "v-show",
                                        value: e.isFullScreenWrapperLine5Shown, expression: "isFullScreenWrapperLine5Shown"
                                    }],
                                    staticClass: "full-screen-wrapper-line2"
                                }, [e._v("\n                提供小区物业、用户、供应商全链条产品；实现物业与业主联动，"),
                                r("br"),
                                e._v("足不出户搞定所有的物业问题。接入常用电商平台，方便生活体验。"),
                                r("br"), e._v("提供快速出入登记等功能，打造和谐社区。")]),
                                e._v(" "),
                                r("div", {
                                    directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine6Shown, expression: "isFullScreenWrapperLine6Shown" }], staticClass: "full-screen-wrapper-line3"
                                })])]), e._v(" "), r("div", { staticClass: "full-screen-container2" }, [r("div", { staticClass: "full-screen-wrapper" }, [r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine1Shown, expression: "isFullScreenWrapperLine1Shown" }], staticClass: "full-screen-wrapper-line1" }, [e._v("Elight智慧商城")]), e._v(" "), r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine2Shown, expression: "isFullScreenWrapperLine2Shown" }], staticClass: "full-screen-wrapper-line2" }, [e._v("\n                快速搭建，快速启用，全生命周期运维；满足零售，分销，连锁等各种场景。")]), e._v(" "), r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine3Shown, expression: "isFullScreenWrapperLine3Shown" }], staticClass: "full-screen-wrapper-line3" })])]), e._v(" "), r("div", { staticClass: "full-screen-container3" }, [r("div", { staticClass: "full-screen-wrapper" }, [r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine1Shown, expression: "isFullScreenWrapperLine1Shown" }], staticClass: "full-screen-wrapper-line1" }, [e._v("Elight智慧公寓")]), e._v(" "), r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine2Shown, expression: "isFullScreenWrapperLine2Shown" }], staticClass: "full-screen-wrapper-line2" }, [e._v("\n                与周边社区无缝接入，功能全面，随选随用，全自助无需人工干预。")]), e._v(" "), r("div", { directives: [{ name: "show", rawName: "v-show", value: e.isFullScreenWrapperLine3Shown, expression: "isFullScreenWrapperLine3Shown" }], staticClass: "full-screen-wrapper-line3" })])]), e._v(" "), r("footer-tmpl", { attrs: { blockNumber: 3 } })], 1)
                }, staticRenderFns: []
            };
        var s = r("C7Lr")(i, l, !1, function (e) { r("1gp0") }, "data-v-0d2d9c03", null);
        n.default = s.exports
    }
});