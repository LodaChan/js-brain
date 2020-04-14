class Super {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

class Sub extends Super {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    sayAge() {
        console.log(this.age);
    }
}