# 动态组件与keep-alive

> 注意这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

> 失活的组件 与 组件内的data 都会被缓存起来

```html
<!-- 这样在组件切换后，失活的组件 与 组件内的data 都会被缓存起来，减少 vdom diff 的消耗 -->
<keep-alive>
  <component v-bind:is="'your compoment name'"></component>
</keep-alive>
```

#### 具体例子

+ demo.vue

#### 实现原理

+ 1 在组件创建created钩子时会创建一个cache对象，用来作为缓存容器，保存vnode节点

```js
created () {
    /* 缓存对象 */
    this.cache = Object.create(null)
},
```

+ 2 render/组件切换时 时 会通过正则去匹配对应的 compoment name 

   + `匹配不成功`（说明不需要进行缓存）, 则不进行任何操作直接返回vnode

   + `匹配成功` 在this.cache 中查找，如果存在则说明之前已经缓存过了，直接将缓存的 vnode 的 componentInstance（组件实例）覆盖到目前的vnode上面

   + `组件切换时`,通过 `watch` 监测 include 与 exclude ,  遍历cache中的所有项，如果不符合filter指定的规则的话，则会执行 pruneCacheEntry 。pruneCacheEntry则会调用组件实例的$destroy方法来将组件销毁

```js
watch: {
    /* 监视include以及exclude，在被修改的时候对cache进行修正 */
    include (val: string | RegExp) {
        pruneCache(this.cache, this._vnode, name => matches(val, name))
    },
    exclude (val: string | RegExp) {
        pruneCache(this.cache, this._vnode, name => !matches(val, name))
    }
},
```

+ 4 destroyed钩子中销毁所有cache中的组件实例

```js
destroyed () {
    for (const key in this.cache) {
        pruneCacheEntry(this.cache[key])
    }
},
```
