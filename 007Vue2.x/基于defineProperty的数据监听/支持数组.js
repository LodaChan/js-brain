// 不能监听数组的变化，需要进行数组方法的重写

function render() {
    console.log('模拟视图渲染')
}

let obj = [1, 2, 3]
let methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push']
// 先获取到原来的原型上的方法
let arrayProto = Array.prototype

// 创建一个自己的原型 并且重写methods这些方法
let proto = Object.create(arrayProto)
methods.forEach(method => {
    proto[method] = function () {
        // AOP
        arrayProto[method].call(this, ...arguments)
        render()
    }
})

function observer(obj) {
    // 把所有的属性定义成set/get的方式
    if (Array.isArray(obj)) {
        obj.__proto__ = proto
        return
    }
    if (typeof obj == 'object') {
        for (let key in obj) {
            defineReactive(obj, key, obj[key])
        }
    }
}

function defineReactive(data, key, value) {
    observer(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            observer(newValue)
            if (newValue !== value) {
                render()
                value = newValue
            }
        }
    })
}

observer(obj);

function $set(data, key, value) {
    defineReactive(data, key, value)
};

obj.push(123, 55)
console.log(obj) //[1, 2, 3, 123,  55]