# 编程哲学

+ 压缩请求文本长度，参考qs

```js
// qs 多层嵌套时，简化数据格式
qs.stringify({
    a: {
        b: {
            c: 'd', e: 'f'
        }
    }
}, { allowDots: true });
// 'a.b.c=d&a.b.e=f'
```

+ 使用 multipart/form-data (非简单请求) 替代 application/x-www-form-urlencoded (简单请求)

```js
// application/x-www-form-urlencoded 1个汉字会从3个字节变成9个字节
// multipart/form-data 采用utf-8编码，1个汉字3个字节还是3个字节，不会增加报文长度
```