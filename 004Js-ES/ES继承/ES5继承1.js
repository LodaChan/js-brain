function Human(name) {    
    this.name = name
}
Human.prototype.run = function () {
    console.log('I can run')
}



function Man(name) {
    Human.call(this, name)
    this.gender = '男'
}
Man.prototype.fight = function () {
    console.log('I can fight')
}



Man.prototype.__proto__ = Human.prototype

// [for IE]
// var f = function(){}
// f.prototype = Human.prototype
// Man.prototype = new f()