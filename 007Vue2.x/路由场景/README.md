# 路由场景

#### 路由常见用法

+ 1 重定向

```js
{ path: '/', redirect: { path:'/index' } }
```

+ 2 push

```js
// 
```

#### 神奇的情况

+ 路由push方式参数改变但页面不刷新

```js
this.$router.go(0)
```