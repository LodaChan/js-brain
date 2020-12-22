
## 1
```js
function sayHi() {
  console.log(name) // undefined
  console.log(age) // ReferenceError
  var name = 'Lydia'
  let age = 21
}

sayHi()
// 1 函数内部的 var 并不会体现出变量提升
// 2 无 扫描级错误
// 3 无 运行级错误
```

## 2
```js

function sayHi() {
  console.log(name) // Lydia
  console.log(age) // ReferenceError
  let age = 21
}

sayHi()
var name = 'Lydia' 
// 函数内部的 var 体现出变量提升
```

## 3
```js

function sayHi() {
  console.log(name)
  console.log(age)
  let age = 21
}

sayHi()
name = 'Lydia'
// name is not defined
// 无 扫描级错误
//    运行级错误
```

## 4
```js
name = 'Lydia'
function sayHi() {
  console.log(name)
  console.log(age)
  let age = 21
}
sayHi()
// 扫描级错误
// Cannot access 'name' before initialization
```

## 5
```js

function sayHi() {
  console.log(name) // Lydia
  console.log(window.name) // Lydia
  console.log(this.name) // Lydia
  console.log(age) // ReferenceError
  let age = 21
}

sayHi()
var name = 'Lydia'
// var => window.xxx === this.xxx === 作用域链查找 var xxx
```

## 6
```js

function sayHi() {
  console.log(name)
  console.log(window.name)
  console.log(this.name)
  console.log(age)
  let age = 21
}

sayHi()
let name = 'Lydia'
// name is not defined
// 无 扫描级错误
//    运行级错误
```