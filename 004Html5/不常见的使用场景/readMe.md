
# 不常见的使用场景

## 一、 detais-summary 标签

需要按需向用户显示内容


## 二、 内容可编辑 属性

+ 1 ontenteditable是可以在元素上设置以使内容可编辑的属性。 它适用于DIV，P，UL等元素

+ 2 当在元素上没有设置contenteditable属性时，它将从其父元素继承该属性

> 对应还是通过

## 三、 map area 标签


## 四、 mark 标签 

## 五、 data-key 与 dataSet["key"] dom value

+ 支持多 - 分割

```html
<div id="ele" data-custom-attr="You are just Awesome!"> 
```
```js
function reveal() {
   let dataDiv = document.getElementById('ele');
    let value = dataDiv.dataset['customAttr'];
   document.getElementById('msg').innerHTML = `<mark>${value}</mark>`;
}
```

## 六、output 标签 减少 getElementById的读取操作

+ 不建议使用污染作用域

+ 1 form oninput action 配合 ， 输出全局 js 属性 outputName
+ 2 对应被输出控件带 id
+ 3 output 控件 
    + 需要带 name 属性 ， 如 ： outputName `与form oninput的输出一致`
    + 需要带 for 属性(空格分隔)里面是 被输出空间的 id
    + output标签内是 初始化的值

```html
<form oninput="x.value=parseInt(a.value) * parseInt(b.value)">
    <input type="number" id="a" value="0">
    * <input type="number" id="b" value="0">
    = <output name="x" for="a b">0</output>
</form>
```



## 七、 datalist option

+ 支持快速实现 ddl
+ 支持任意输入

## 八、input type Range(Slider)

滑块类型的范围选择器

## 九、input type 度量meter 与 进度progress


## 十、 input with required 属性

结合 form 与 btn type submit 可以实现弹出框提示效果


## 十一、 input with autofocus 属性

页面加载时自动获取焦点

## 十二、 input with pattern 属性

可以自己实现正则判断

## 十三、input type 颜色选择器 color