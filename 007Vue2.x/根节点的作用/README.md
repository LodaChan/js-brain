# Vue 根节点的作用

+ new Vue({el:'#app'})

+ 单组件中，template下的元素div

#### 一、new Vue({el:'#app'})

+ 1个 new Vue() 就是 Vue SPA 的入口，对应 Virtual DOM 的渲染节点
+ 多个可以，但是没必要，但是渲染就只能指定1个
+ vue 通过这个根节点递归遍历整个vue‘树’下的所有节点，并处理为vdom,再渲染成真正的HTML，插入在正确的位置


#### 二、单组件中，template下的元素div

+ templete 是 html5 的新特性 ， 具有 隐藏性、任意性、无效性
   + 不会显示
   + 可以写在页面的任何地方，甚至是head、body、sciprt标签内
   + 标签里的任何HTML内容都是无效的，不会起任何作用
+ 确定唯一就可以通过 `innerHTML` 获取里面的内容

