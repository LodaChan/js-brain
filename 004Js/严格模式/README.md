# 严格模式

> "use strict";

> 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为

+ 消除代码运行的一些不安全之处，保证代码运行的安全
+ 提高编译器效率，增加运行速度
+ 为未来新版本的 Javascript 做好铺垫

# 具体的开发体验

+ this 会变成 undefined
+ 变量必须先声明，直接给变量赋值，不会隐式创建全局变量，不能用with
+ 无法删除(delete)变量
+ 不能定义同名属性
+ 不允许八进制整数直接量（如：023）
+ arguments[0]参数会静态保留，当参数发生改变也会随着更新
+ eval 和 arguments 当作变量名
+ 限制对调用栈的检测能力 arguments.callee，fnObj.caller