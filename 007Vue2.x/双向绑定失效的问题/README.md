# 双向绑定失效的问题

####  场景1 v-mode viewModel : {}

+ viewModel 中 初始化好对应的数据 ，一般是 null , ""
+ 不建议使用 undefined


####  场景2  数组 viewList[0] 更新，但是页面不更新

+ 方法1

```js
viewList : [a, b, c ];


this.$set(viewList, index , newData);
```

+ 方法2

```js
this.$forceUpdate()
```

####  场景3  v-for循环中组件过多时数据层太多 如:checkbox,render函数没有自动更新

同样适用去 i18n 无刷新切换语言

```js
this.$forceUpdate()
```