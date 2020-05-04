# beta直播记录


## 一、vdom 遍历 与 编译 优化

#### 1 block 

+ 保留 render 的灵活
+ 通过 指令式创建 block ， 表达为函数性存在，类似 /* TEXT PROPS */ 注释标记 减少 dom tree 遍历，且考虑到嵌套问题
+ 通过 const 解决 vdom 的节点创建内存 cost


#### 2 事件绑定

```html
<div @click="onClick">
```

+ 通过 cacheHost（内联函数方式，侦听缓存） 利用 ref 指向替换最新的 event ， 减少  dom 的回流
+ 父子组件传递内联函数的时，减少子组件的回流


#### 3 SSR

+ 通过 function构建的方式  ES6 templte string 去解决数据绑定
+ 层次嵌套多的时候，通过 inner html 的方式，替换 append


## 二、tree-shaking support

> 因为webpack rollup ES module 的限定 ，vue3 通过编译时进行解决

```js
import { vModelText as _vModelText , createNode as _createVNode , openBlock as _openBlock} from 'vue';

export function render(_ctx,_cache){
    return {
        _openBlock(),_createVNode("div")
        // 当 用到 v-model 时 _withDirectives({},null,512,{_vModelText,_ctx.key})
        // checkbox
        // vModelDymatic
    }
}
```

## 三、Composition API

[https://vue-composition-api-rfc.netlify.app/api.html](https://vue-composition-api-rfc.netlify.app/api.html "https://vue-composition-api-rfc.netlify.app/api.html")

> 当组件很大的时候，logtic 关注点逻辑关注点很多时，使用 options API 的时候会被切分，更加方便的使得 逻辑关注的代码 不被切分，耶可以更方便的复用，使得逻辑更加灵活

+ reactive
+ ref
+ computed
+ readonly
+ watchEffect
+ watch



## 四、新功能 

#### fragments（碎片）
+ vue3 不需要 类似 vue2 模板必须是 1个根节点了 
+ 支持 直接的  string 与 数据

#### teleport

+ 针对 响应式 页面设计

#### suspense

> 通过 异步依赖 解决组件的异步渲染，解决嵌套异步调度

+ 异步数据请求
+ 异步组件



## 五、ts support

+ tsx 组件使用时 类型推导，能自动补全对应的参数 props
+ 依然支持 class compoment
+ 支持 模板 与 ts 的 re-name

## 六、custom render API 自定义渲染 API

```js
vue.createRender
```

+ webgl support , 使用 vue表达 webgl 的渲染逻辑


## 七、好玩的东西，vite

[https://github.com/vuejs/vite](https://github.com/vuejs/vite "https://github.com/vuejs/vite")



+ 直接 import vue file
+ 支持热更新
+ 没有编译
+ 解决打包后才能线上使用的问题

## 八、 Q & A

+ 如何支持 IE 11
   + 使用 defineProperty 使用 替换 proxy


+ templete 选项API 与 Composition API 函数组合API
   + 同时存在
   + 提供更强大的表达与灵活

