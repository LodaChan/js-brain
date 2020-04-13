# Vue2.x 生命周期 与 双向数据绑定 

+ `new Vue()` 创建 Vue 实例



+ 初始化创建 , initState(初始化data,methods,props,computed,watch) , initOptions(scoped,scopedSlots等)
   + 初始化 data和computed,分别代理其set以及get方法, 对data中的所有属性生成唯一的dep实例
   + 对computed中的reversedMessage生成唯一watcher,并保存在vm._computedWatchers中



   + 当computed没有被访问（或者没有被模板依赖），当修改了依赖的值后，computed中的值没有变化是因为没有触发到其get方法
   
   + 实例化了一个 Observer 对象,本质上就是代理了数据的set,get方法，当数据修改或获取的时候，能够感知（当然vue还要考虑数组，Object中嵌套Object等各种情况
   + dep是 reactive data 与 watcher 纽带
   + dep.notify() 更新依赖该值的所有watcher

```js
// src/core/observer/index.js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    // 关键代码 new Dep对象
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    // ...省略无关代码
    this.walk(value)
  }

  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      // 给data的所有属性调用defineReactive
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}
```
    + 初始化computed
       + 在computed 生成的watcher，会将 watcher 的lazy设置为true,以减少 watcher 的计算量
       +  computed中初始化对各个属性生成的watcher的dirty和lazy都设置为了true。同时，将computed传入的属性值（一般为funtion）,放入对应key的watcher的getter中保存起来

```js
get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // 这个时候，有值了
      if (Dep.target) {
        // computed的watcher依赖了 this.data 的 dep
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    }
```

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

        + 需要 observe 观察者模式 的数据对象进行递归遍历，包括子属性和对象的属性，都加上 setter 和 getter ,
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