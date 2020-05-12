# 提取公共代码

> 使用 WebPack.optimize.CommonsChunkPlugin 对公共代码进行抽取

#### chunk 的分类

+ 1 entry chunk
+ 2 入口文件以及它的依赖文件通过code split（代码分割）出来的 children chunk
+ 3 CommonsChunkPlugin 创建出来的文件的commons chunk

#### 配置 CommonsChunkPlugin

| key| content|
| :------ | :-------------------------------- |
| name| 已经存在的chunk（一般指入口文件）对应的name，那么就会把公共模块代码合并到这个chunk上<br/><br/>不存在，会创建名字为name的commons chunk进行合并|
| filename| 生成 chunk file name |
| chunks| 指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks |
|minChunks|数字 或 函数 ， 当匹配此条件才抽取公共模块|
|children|为true时，就代表source chunks是通过entry chunks（入口文件）进行code split出来的children chunks<br/><br/>
children和chunks不能同时设置，因为它们都是指定source chunks<br/><br/>把 entry chunk 创建的 children chunks 的共用模块合并到自身|
|async|解决children:true时合并到entry chunks自身时初始加载时间过长的问题。async设为true时，commons chunk 将不会合并到自身，而是使用一个新的异步的commons chunk。当这个children chunk 被下载时，自动并行下载该commons chunk|
