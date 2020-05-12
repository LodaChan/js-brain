# 关于 Nuxt

+ render() 在render()方法在处理完一系列的路径问题后,会调用renderRoute()方法,获取响应所需内容并完成响应

+ renderRoute()  判断当前响应是否应执行服务端渲染。

    + 是,则调用vue提供的bundleRenderer()方法,把html内容渲染完毕以后再整体输出;
    + 不是,则直接输出一个`<div id=""></div>`字符串,交由客户端渲染
    
+ renderAndGetWindow() 检查输出的html是否存在问题,然后发出通知,表明html可用