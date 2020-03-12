# 关于插槽slot

+ 内容分发的 API
+ 添加的样式无效
+ 具名插槽不会被匿名插槽替换

#### slot

```html
<!-- 父组件 -->
<template>
    <div>
        <son-compoment>
            <span>admin</span>
        </son-compoment>
    </div>
</template>

<!-- 子组件 -->
<template>
    <div>
        hello,
        <slot></slot>
        !
    </div>
</template>

<!-- 最终效果 -->
<template>
    <div>
        hello,
        <span>admin</span>
        !
    </div>
</template>

```

#### 具名slot

#### 作用域slot

#### 动态slot