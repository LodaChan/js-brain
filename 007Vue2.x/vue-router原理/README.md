# vue-router原理

http://www.xxx.com/login

####  hash 模式

http://www.xxx.com/#/login

```js
function matchAndUpdate () {
   // match hash and dom do some thing
}

window.addEventListener('hashchange', matchAndUpdate)
```

#### history 模式

> HTML5标准 `pushState` 和 `replaceState`

http://www.xxx.com/login



```js
function matchAndUpdate () {
   // match and dom do some thing
}

window.addEventListener('popstate', matchAndUpdate)
```