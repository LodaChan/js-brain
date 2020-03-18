# 关于build

+ app.js

这个是项目代码的集合；

+ manifest

方法定义(webpackjson)，变动模块加载，公共代码块抽离，需最先引用

+ vendor

node_modules里面的依赖会打到改文件里面，除非添加了新的依赖，否则该文件不需要改动这是未配置按需加载打包生成的文件