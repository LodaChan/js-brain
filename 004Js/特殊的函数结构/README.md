# 特殊的函数结构 


#### compose functions  / merge functions 组合函数

+ 固定顺序

```js
function merge(fn1, fn2) {
    return (...args) => fn2(fn1(...args));// slove multi params
}
```


+ 数组方式

```js
function compose(fns) {
    return (...args) => {
        let tmp = fns[0](...args);
        for (let i = 1; i < fns.length; i++) {
            tmp = fns[i](tmp);
        }
        return tmp;
    }
}
```
#### koa 核心 queue

+ 数组与递归方式

```js
function compose(fns) {
    return function () {
        
        function dispatch(i) {

            let fn = fns[i];
            
            if (!fn) {
                return Promise.resolve();
            }

            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1);
                }));
        }

        return dispatch(0);
    }
}
```
  