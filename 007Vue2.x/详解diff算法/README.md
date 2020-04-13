# 详解diff算法

> 为了优化dom，通过算法使操作dom的行为降到最低，diff 算法来源于 snabb dom 斯内b


#### 一、具体细节

+ 基于深度优先，因为可以先进后出，能在1次遍历的时候对父节点下的node全部遍历
+ tree 不论是 深度优先 还是 水平优先 时间复杂度都是 n^2 或 n+k
+ key 的作用在于能保证 对应的数据 与 vnode state 能准备渲染到对应的 节点上 , 如：2个options选中第1个 b ,又加了1个option C ，那么就会变成 C 选中


过程

+ 第一次遍历 - 标记节点类型
```js
function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}
```
+ 第二次遍历 - 标记静态根节点
 
> 如果一个静态节点它只拥有一个子节点并且这个子节点是文本节点，那么就不做静态处理，它的成本大于收益，不如直接渲染
 


#### 二、认识VNode

```es6
constructor (
  tag?: string,
  data?: VNodeData,
  children?: ?Array<VNode>,
  text?: string,
  elm?: Node,
  context?: Component,
  componentOptions?: VNodeComponentOptions,
  asyncFactory?: Function
) {
  this.tag = tag
  this.data = data
  this.children = children
  this.text = text
  this.elm = elm
  this.ns = undefined
  this.context = context
  this.fnContext = undefined
  this.fnOptions = undefined
  this.fnScopeId = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false
  this.isRootInsert = true
  this.isComment = false
  this.isCloned = false
  this.isOnce = false
  this.asyncFactory = asyncFactory
  this.asyncMeta = undefined
  this.isAsyncPlaceholder = false
}
```

#### 三、snabbdom

> key值算是一个snabbdom 中 diff算法的一个核心内容

> vdom 是 采用深度优先算法，tree node之间比较时间复杂度是 n^3

新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记


```js
return h('div',{key:data.id}, [h('span','aaa')])
);
```

+ 利用createElement所创造出来的节点

+ 没有key的情况不会准确追踪到对应的节点，新加的节点会导致 view 看起来数据变化

> 比如 添加1个option后，页面还是看到还是第二个option被选中, 应该此时是选中第三个option

+ 它能跟踪每个节点的身份，从而重用和重新排序现有元素
   + key 的 原则
      + 唯一存在
      + 旧的不变
      + 新的不重复


 

