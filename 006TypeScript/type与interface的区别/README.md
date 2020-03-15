# type 与 interface 的区别


[TS官方规范文档](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md "TS官方规范文档")

`相同点`

+ 描述一个对象或者函数
+ 都允许 extends 扩展
    + interface extends interface  使用接口扩展接口

    ```js
    interface iObj extends iBusinessMan
    ```

    + type extends interface 使用type扩展接口
    
    ```js
    interface iObj extends tName {
    ```


    + type extends type 使用type扩展type

    ```js
    type User = tName & { age: number };
    ```


    + interface extends type 使用接口扩展type

    ```js
    type UserObj = iObj & { age: number };
    ```


`不同点`
 
+ interface 能够自动检测声明合并，type需要自己去手动合并

```js
 
interface User {
 name: string
 age: number
}
 
interface User {
 sex: string
}
```

```js
// 错误 err
type tName = {
    name: string;
}
type tName = {
    age: number;
}

```

+ type 声明基本类型别名，联合类型，元组等类型
```js
// 基本类型别名
type Name = string
 

interface Dog {
  wong();
}
interface Cat {
  miao();
}

// 联合类型
type Pet = Dog | Cat
 
// 元祖，具体定义数组每个位置的类型
type PetList = [Dog, Pet]

```
+ type 可以使用 typeof 获取实例的 类型进行赋值
```js
// 当你想获取一个变量的类型时，使用 typeof
let ele = document.createElement('div');
type eleType = typeof ele
```

#### 一、interface 例子

参考 interface.ts

#### 二、type 例子

参考 type.js


+ 一些 type 的神奇用法

```js
type StringOrNumber = string | number; 
type Text = string | { text: string }; 
type NameLookup = Dictionary<string, Person>; 
type Callback<T> = (data: T) => void; 
type Pair<T> = [T, T]; 
type Coordinates = Pair<number>; 
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```