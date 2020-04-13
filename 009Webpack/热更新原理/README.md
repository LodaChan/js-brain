# 热更新原理

> webpack-dev-server hot update 原理 ， 基于发布订阅

#### 一般流程 - 服务器端

+ 启动webpack-dev-server服务器
+ 创建webpack实例
+ 创建Server服务器
+ 添加webpack的done事件回调 编译完成向客户端发送消息（hash和描述文件oldhash.js和oldhash.json）
+ 创建express应用app
+ 设置文件系统为内存文件系统
+ 添加webpack-dev-middleware中间件 负责返回生成的文件
+ 创建http服务 启动
+ 使用socket 实现浏览器和服务器的通信（这里先发送一次hash，将socket存入到第四步，初次编译完第四步中的socket是空，不会触发hash下发）

#### 一般流程 - 浏览器端

+ webpack-dev-server/client-src下文件监听hash，保存此hash值
+ 执行 reloadApp 这个函数 这里派发 hotEmitter.emit('webpackHotUpdate') 事件
+ 执行 hotEmitter.on('webpackHotUpdate') 这个函数
+ 如果是初次编译 hotCurrentHash 为 undefined ，然后将首次拿到的 currentHash 赋值给 hotCurrentHash


#### hotupdate 流程

+ 执行 socket.on("hash")和socket.on("ok") 拿到最新的代码编译后的hash

+ hotEmitter.on('webpackHotUpdate') 中的事件判断， if(!hotCurrentHash || hotCurrentHash == currentHash) hotCurrentHash为上次的hash值 currentHash为最新收到的 并且判断两次是否一致，一致则不需要更新，不一致就执行热更新逻辑

+ hotCheck 会通过ajax请求服务端 拉取最新的 hot-update.json 描述文件 说明哪些模块哪些chunk（大集合）发生了更新改变

+ 然后根据描述文件 hotDownloadUpdateChunk 去创建jsonp拉取到最新的更新后的代码,返回形式为： webpackHotUpdate(id, {...})

+ 为了拉取到的代码直接执行，客户端需要定义一个 window.webpackHotUpdate 函数来处理

+ 将缓存的旧代码更新为最新的代码，接着将父模块中的 render 函数执行一下

+ 最后将 hotCurrentHash = currentHash 置旧hash方便下次比较