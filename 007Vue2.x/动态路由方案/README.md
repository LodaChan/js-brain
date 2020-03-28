动态路由方案
===

>路由器能够自动的建立自己的路由表，并且能够根据实际情况的变化实时地进行调整

+ 基于 build  全部的page实际上都通过 import 的方式进行引入到项目中

+ 登录后/判断权限后，构建对应的 route array ， 然后 通过路由 addRoutes 添加的 vue-router 中

```js
const dynamicRoutes = gobalRoutes.filter(item => !item.meta.auth)


this.$router.addRoutes(dynamicRoutes)

```