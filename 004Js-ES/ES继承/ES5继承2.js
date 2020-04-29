function father(name) {
    this.name = name;
}

father.prototype.sayName = function () {
    console.log(this.name)
}

function son(name, age) {
    father.call(this, name);
    this.age = age;
}

son.prototype.sayAge = function () {
    console.log(this.age)
}

// 1个继承链
son.prototype = Object.create(father.prototype, {
    constructor: {
        value: son,
        writable: true,
        configurable: true
    }
});