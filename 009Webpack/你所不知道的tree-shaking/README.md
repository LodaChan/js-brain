# 你所不知道的tree-shaking

webpack 2.0 开始引入 tree shaking 技术

当然现在常用的 webpack3.X

~~不建议升级到 webpack4.X  很坑~~ `有时间，不用赶需求`可以升级...

#### 一、为什么要tree-shaing

+ 打包时忽略没有用到的代码，就是实际环境的内存占用
+ 减少程序执行时间

#### 二、最简单的AST语法树例子

> AST 对 JS 代码进行语法分析后得出的语法树 (Abstract Syntax Tree)。AST语法树可以把一段 JS 代码的每一个语句都转化为树中的一个节点

简单函数

```js
function square(n) {
    return n * n;
}
```


AST语法树

+ type 节点
+ id 节点
+ params 节点

```js
{
   type: "FunctionDeclaration",
   id: {
       type: "Identifier",
       name: "square"
   },
   params: [
      {
           type: "Identifier",
           name: "n"
      }
   ],
}
```

#### 三、webpack 中的 tree-shaking 原理

源码必须遵循 ES6 的模块规范 (import & export)，如果是 CommonJS 规范 (require) 则无法使用

基于 ES6 的静态引用，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 

webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。

+ 所有 import 标记为 /* harmony import */

+ 被使用过的 export 标记为 /* harmony export ([type]) */，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等

+ 没被使用过的 import 标记为 /* unused harmony export [FuncName] */，其中 [FuncName] 为 export 的方法名称

 
 #### 四、副作用，就是不会被 tree-shaking  掉


 + 1 ES6 类和对象内部
```js
export default class Util {
    fn1() {
        return 'fn1 exec'

    }
    fn2() {

        return 'fn2 exec'

    }
}
```

 + 2 原型方法扩展

 ```js
 // ? 我从来没有被调用呀
 Array.prototype.fn = () => { console.log('fn exec'); }
 ```


 + 3 引用 != 调用

下面的例子可以看到 `let result2 = fn2()` 是始终没用被调用的，但是也不会被shake掉

 ```js
//  模块文件 utils.js
export function fn1() {
    return 'fn1 exec'
}

export function fn2() {
    return 'fn2 exec'
}
 ```


 ```js
 //  实际调用
import { fn1, fn2 } from './utils'

let result1 = fn1()

let result2 = fn2()

console.log(result1)
 ```