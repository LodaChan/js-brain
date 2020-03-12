# Vue2.x 生命周期

+ `new Vue()` 创建 Vue 实例



+ 初始化创建 Init、Events、生命周期、Render、callHook、InitState



+ `beforeCreate` .vue创建实例前钩子



+ 注入组件需要用到的 `el`、`data`、`method`
   + el:'#app',
   + data() { return { 
   + methods: {



+ `created` .vue实例完成创建钩子


+ 判断 `实例挂载` 方式，是 用 `el` 还是 `mount`


+ 判断 `模板渲染` 方式 



+ `beforeMount` 视图挂载 前钩子


+ 页面渲染，执行 `render-function` 用 VNode的html元素 替换`el`节点
    
    + complie

        + 有templete `parse` HTML Parser 生成AST语法树

        + 没有templete `optimize` 标记为静态节点  diff算法忽略

        + diff算法1次遍历标记类型、2次标记静态根节点

        + 最终都是 通过 `generate(AST)` 生成 `render-function`

    + mountComponent
        + 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter , 数据发生变化时通过objectDefineprototype执行getter/setter 告诉watchers

        + new watchers() 发布者-订阅者模式


+ `mounted` 视图挂载完成钩子




+ 当涉及 重绘 或 回流时 ，触发 VDOM `re-render` function 和 `patch` ，里面会有 `beforeUpdate` 和 `updated` 2个钩子
    + 数据变化后 `dep.notice()` 调用 watcher 中 `update()`
      + 输出一个新的 VNode 树形结构的数据。然后在调用 patch 函数，拿这个新的 VNode 与旧的 VNode 进行对比，只有发生了变化的节点才会被更新到真实 DOM 树上 
    + patch() 被调用，使用 diff 算法比较 VNode 与 oldVNode
    + compile 会再执行一遍，将模板中的变量替换成数据 ， 重新渲染
  

+ 实例销毁时 vm.$destory call 被调用 


+ `beforeDestory` 实例被销毁前钩子


+ 卸载 watchers / compoments / event listeners


+ `destoryed` 实例被销毁后钩子