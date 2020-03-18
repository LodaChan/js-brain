# 按需加载

> Node编程中最重要的思想就是模块化，import和require都是被模块化所使用

#### require 与 import 的区别


+ require 是运行时调用
   + AMD 规范
   + 运行时调用
   + 赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

+ import 是编译时调用
   + ES6 语法
   + 编译时调用
   + 解构过程，babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require


#### 实现方式

+  ES6 方式
```js
// 每个组件打包成一个js文件
component: () => import('@/xxx.page.vue')

// 多个路由会自己合并
const ImportFuncDemo = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/ImportFuncDemo')
```


+  AMD风格 , commomJs 方式
```js
component: resolve => require(['@/xxx.page.vue'], resolve);
```


+ CMD风格 , webpack提供的require.ensure()

```js
component: resolve => require.ensure([], () => resolve(require('@/components/Hello')), 'demo')
```

#### 实现原理

+ 1 路由通过 match 执行对应的 promise

```js
r.routers = [
    {
        name: "saas",
        path: "/saas",
        component: function (t) {
            // 5 是 compoment index
            return Promise.all([n.e(0), n.e(5)]).then(
                function () {
                    var e = [n("fOGf")]; // compoment key
                    t.apply(null, e)
                }.bind(this)).catch(n.oe)
        },
        meta: { // customer config 
        }
    }, 
]
```
+ 2 去到 manifest 根据 compoment index 找到对应的 `compoment index_hashcode`

```js
var c = document.getElementsByTagName("head")[0], a = document.createElement("script");
a.type = "text/javascript", a.charset = "utf-8",
    a.async = !0, a.timeout = 12e4, o.nc && a.setAttribute("nonce", o.nc),
    a.src = o.p + "static/js/chunkFile_" + e + "." + {
        0: "05c4accad86941f84dfb",
        1: "7d72dcd4de8daa3c601d",
        2: "b5f6cb2080aa48e8adc2",
        3: "3f4443465e63c7409328",
        4: "41a515be8e09112d39ba",
        5: "9bed369a093b49a11749",
        6: "3c620682678443ad4355",
        7: "ecd43f50eeb28fdcbd8c",
        10: "a6f662c76f795f67d74e",
        11: "e4e422d883157084d2d2"
    }[e] + ".js";
```

+ 3 通过 js 在 head 标签内增加 script 脚本 与 css 样式

```html
<script type="text/javascript" charset="utf-8" async="" src="/1.js"></script>
```


+ 4 通过 ` compoment key` 对应组件的执行渲染挂载

```js
webpackJsonp([5], {
    "1gp0": function (e, n) { }, 
    fOGf: function (e, n, r) {  // compoment key
    }
});
```
