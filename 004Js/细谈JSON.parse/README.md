# 细谈JSON.parse

> 用于 obj 的快速深拷贝


```js
SON.parse(JSON.stringify({a:1,b:1}))
```

#### 不足

+ 1 无法实现对函数 、RegExp等特殊对象的克隆

+ 2 会抛弃对象的constructor,所有的构造函数会指向Object

+ 3 对象有循环引用,会报错