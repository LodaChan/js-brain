# 详解diff算法

>为了优化dom，通过算法使操作dom的行为降到最低，diff 算法来源于 snabbdom


#### 一、具体细节


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
 
>如果一个静态节点它只拥有一个子节点并且这个子节点是文本节点，那么就不做静态处理，它的成本大于收益，不如直接渲染
 


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