# 权重、优先级 与 import 不是万能


#### 权重、优先级
> 行内选择器 > id选择器 > class选择器 > 元素选择器




+ 层叠：后者覆盖前者，后渲染的胜出,比如同时设置 2个 padding , 最终渲染是后者
+ 继承：即子类元素继承父类的样式
+ 优先级：是指不同类别样式的权重比较


#### !import 不是万能

+ 当 min-width、max-width、min-height、max-height 和 !important 发生冲突时，前面 4个 都大哥

+ 当 min 和 max 发生冲突时，min 才是大哥。