/*
  observer 对象 数据观察者
  1 通过 key 递归的方式 自动 检测依赖，数据劫持，进行数据监听，存储 value , 有 dep 
  2 通过 defineReactive ， 在 defineProperty getter中给 对象属性的dep添加注册的 watcher
  3 在 defineProperty setter 中给  通过 调用对象属性的dep.notify 告诉 watcher
*/

export class Observer {
    value: any;
    dep: Dep;
    vmCount: number; // number of vms that has this object as root $data

    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, '__ob__', this)
        // ...省略无关代码
        this.walk(value)
    }

    walk(obj: Object) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]]) // data的所有属性调用defineReactive
        }
    }
}


export class Dep {
    subs = [];

    addSub(sub) {
        this.subs.push(sub);
    };
    notify() {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }

}

export function def(value, key, ctx) {

}


function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
};


export function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性

    let dep = new Dep(); 

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        // 当数据在 compile 绑定到视图时，会触发 将 key-watcher 添加到 订阅器中
        get: function () {
            // if (Dep.target) {  // 判断是否需要添加订阅者
            //     dep.addSub(Dep.target); // 在这里添加一个订阅者
            // }
            return val;
        },
        set: function (newVal) {
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            dep.notify();
        }
    });
}
