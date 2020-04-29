# v-model语法糖

> 主要用于 input，select，textarea，component


#### 配合的修饰符

+ .lazy- 取代input监听change事件
+ .number- 输入字符串转为数字
+ .trim- 输入首尾空格过滤


#### 具体例子


```html
<input type="text" v-model="viewModel">

<input type="text" v-bind:value="viewModel"  v-on:input="mes= $event.target.viewModel"/>

<!-- select 区别于 text -->
<input type="select" v-bind:value="viewModel"  v-on:change="mes= $event.target.viewModel"/>
```