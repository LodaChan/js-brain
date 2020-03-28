# Vue2.x 生命周期 与 双向数据绑定 

+ `new Vue()` 创建 Vue 实例



+ 初始化创建 Init、Events、生命周期函数、Render、InitState、props



+ `beforeCreate` .vue创建实例前钩子
   

+ 注入组件需要用到的  `props`、`data`、`method`
   + props 参数传入
   + data() { return { 挂载数据
   + 绑定事件


+ `created` .vue实例完成创建钩子


+ 判断 `实例挂载` 方式，是 用 `el` 还是 `mount` 决定渲染方式

+ `beforeMount` 视图挂载 前钩子

+ 进行页面渲染，执行 `render-function` 用 VNode的html元素 替换`el`节点
    
    + compile 编译 ， 首先读缓存，没有缓存就调用 compile 方法拿到 render 函数 的字符串形式，再通过 new Function 的方式生成 render 函数

        
        + compileToFunctions 方法编译成render函数

            + 有templete `parse` parseHTML 生成AST语法树

               + while  html.indexOf('<') 去匹配

                + 等于 0：这就代表这是注释、条件注释、doctype、开始标签、结束标签中的某一种
                + 大于等于 0：这就说明是文本、表达式
                + 小于 0：表示 html 标签解析完了，可能会剩下一些文本、表达式



            + 没有templete `optimize` 标记为AST语法树的静态节点  便于diff算法忽略

               + 把纯静态子树提升为常量，每次重新渲染的时候就不需要创建新的节点了
               + 在 patch 的时候就可以跳过它们

            + diff算法1次遍历标记类型、2次标记静态根节点


        + 最终都是 通过 `generate(AST)` 生成  render 函数字符串
 
        + 执行render函数，VDom渲染成Html
   

    + mountComponent
    
        + new一个watcher对象（主要是将模板与数据建立联系）， 传入 vm._update(vm._render(), hydrating)
            + _render compiler生成的render方法，返回一个vNode对象
            + update() 则会对比新的 vdom 和当前 vdom，并把差异的部分渲染到真正的 DOM 树上

        + 需要 observe观察者模式 的数据对象进行递归遍历，包括子属性和对象的属性，都加上 setter 和 getter ,
           + 数据发生变化时通过objectDefineprototype执行getter/setter 告诉watchers


+ `mounted` 视图挂载完成钩子


+ 当涉及 数据变化、 重绘 或 回流时 ，触发 VDOM `re-render` function 和 `patch` ，里面会有 `beforeUpdate` 和 `updated` 2个钩子
    + patch() 被调用，使用 diff 算法比较 VNode 与 oldVNode
    + 数据变化后 `dep.notice()` 调用 watcher 中 `update()` 更新数据
    + 对变化的节点重新渲染
  
+ 实例销毁时 vm.$destory call 被调用 


+ `beforeDestory` 实例被销毁前钩子

    + 卸载 watchers / compoments / event listeners


+ `destoryed` 实例被销毁后钩子
   + 一般用来清空定时器