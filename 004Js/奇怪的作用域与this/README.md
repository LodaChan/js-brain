# 奇怪的作用域与this

| 场景 | ctx |window var | private var | this.var |
| --- | --- |--- | --- |--- |
| function     |window         |windowName/this.windowName|this.privateName|prototypeName/this.prototypeName|
| new function |function object|windowName                |privateName        |this.prototypeName|
| object       |object         |windowName/this.windowName| 无 |this.prototypeName|