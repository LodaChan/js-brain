# 写在2020404清明节 - 页面置灰

#### 场景分析

> 清明节要求首页全部置灰，个人推荐 js 的方式

+ style

+ 文本
    + :hover
    + 伪类 ::after

+ bg
+ border
+ linear-gradient-bg
+ border-image

+ image
+ svg
+ canvas

+ video , 一般是第三方库， 改变图片即可

#### 具体技术方案

+ 使用 css 优先级 !important 大法好
```js
// 1 css 自己改
// 2 js 自动改
```


+ 使用 滤镜
```css
/* chrome 样式具有传递性，一劳永逸 */
html{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}
/* IE 建议js */

/* FF 建议js */
```

+ 使用 webpack-loader 或 自执行脚本
```js
// 对 资源/颜色 进行替换 
// webpack-loader 的方式需要预先把 图片放置好

// 滤镜公式
var color = 0.3 * r + 0.59 * g + 0.11 * b;
pxData[4 * j + 0] = color;
pxData[4 * j + 1] = color;
pxData[4 * j + 2] = color;
```


#### 架构方案


+ 弄1个新的首页 - index.html -> index-gray.html 然后更新路由
    + 优点
       + 减少对prod分支代码的冲击
       + 能最大限度的解决样式问题
    + 缺点
       + 工作量大
       + 多了1次 build 与 cdn cost

+ 自执行脚本
   + 优点 
        + 可复用
        + 容易维护
        + 第三方库也支持
   + 缺点 
        + 重绘 cost 很大
        + 会闪屏

 
+ webpack-loader
    + 优点
       + 减少对 prod 分支代码的冲击
       + 够骚，可复用 可开源
    + 缺点
       + 工作量大
       + 多了1次 build 与 cdn cost
       + build的时候需要将第三方库也进行递归遍历

