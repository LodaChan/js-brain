# 性能优化

#### 1 函数型组件

减少组件的生命周期处理的cost

```html
`<template functional>
    <div>
        <div v-if="value" class="on"></div>
        <section v-else class="off"></section>
    </div>
</template>

<script>
    export default {
        props: ['value']
    }
</script>
```

#### 2 子组件拆分

将复杂的耗时计算处理放在子组件中进行处理

```html
<template>
    <div :style="{opacity: number / 300 }">
        <ChildComp />
    </div>
</template>

<script>
export default {
    props: ['number'],
    components: {
        sonCompoment: {
            methods: {
                heavyTask() {
                    // heavy task
                }
            },
            render(h) {
                return h('div', this.heavyTask())
            }
        }
    }
}
</script>
```

#### 3  computed 与 局部变量

```html
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    // 1 
    base () {
      return 42
    },
    result () {
      // 2 赋值给局部变量，防止重复计算
      const base = this.base;
      let result = start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(base))) + base * base + base + base * 2 + base * 3
      }
      return result
    },
  },
}
</script>
```

#### 4 v-show >> v-if

减少 dom-diff ，且用 重绘 替换 回流

#### 5 使用keep-alive

路由切换组件，或在 tab动态组件 可参考`动态组件与keep-alive` 场景中 

```html
<template>
    <div id="app">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<!-- 动态组件切换 -->
<keep-alive>
  <component v-bind:is="'your compoment name'"></component>
</keep-alive>
```

#### 6 延迟加载（defer)

一般在 移动/大长屏 场景

```html
<template>
  <div class="deferred-on">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
       
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999"/>
  </div>
</template>

<script>

export default {
    data () {
        return {
           displayPriority: 0
        }
    },
    mixins: [
        defer (priority) {
          return this.displayPriority >= priority
        }
    ],
}
</script>
```

####  7 分批处理(time slicing) 或 减少数据计算

可以用requestAnimationFrame分批次执行大数据量的计算,防止一次性执行的数据太大从而阻塞页面渲染。

```js
fetchItems({ commit }, { items }) {
    commit('clearItems');
    commit('addItems', items)
}


fetchItems({ commit }, { items, splitCount }) {
    commit('clearItems');
     
    const queue = new JobQueue();
    splitArray(items, splitCount).forEach(chunk => queue.addJob(done => {
        // 分片
        requestAnimationFrame(() => {
            commit('addItems', chunk);
            done()
        });
    }));

    awiat queue.start();
}
```

####  8 非响应式模式(non-reactive)

显式声明为非响应式，这样可以避免很多不必要的计算

```js
const data = items.map(item => rebuildDefineProperty(item));

function rebuildDefineProperty (item) {
    const itemData = {
        id: uid ++,
        vote: 0
    };
    Object.defineProperty(itemData, 'data', {
        // non-reactive config
        configurable: false,
        value: item
    });
    return itemData
}
```

#### 9 仅渲染可视化部分



