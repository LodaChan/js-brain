# 卡顿问题解决

+ 增加shouldComponentUpdate钩子对新旧props进行比较，如果值相同则阻止更新，避免不必要的渲染，或者使用PureReactComponent替代Component，其内部已经封装了shouldComponentUpdate的浅比较逻辑

+ 对于列表或其他结构相同的节点，为其中的每一项增加唯一key属性，以方便React的diff算法中对该节点的复用，减少节点的创建和删除操作

+ render函数中减少类似onClick={() => {doSomething()}}的写法，每次调用render函数时均会创建一个新的函数，即使内容没有发生任何变化，也会导致节点没必要的重渲染，建议将函数保存在组件的成员对象中，这样只会创建一次

+ 组件的props如果需要经过一系列运算后才能拿到最终结果，则可以考虑使用reselect库对结果进行缓存，如果props值未发生变化，则结果直接从缓存中拿，避免高昂的运算代价

+ webpack-bundle-analyzer分析当前页面的依赖包，是否存在不合理性，如果存在，找到优化点并进行优化