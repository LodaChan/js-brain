# 虚拟 node 与 虚拟 dom 设计


#### 1 html 节点

```html
<div>text</div>
```

#### 2 虚拟 节点

```json
{
    tag:"div",
    children:{
        text:"text"
    }
}
```