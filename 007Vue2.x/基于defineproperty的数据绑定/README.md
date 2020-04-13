


+ 整合Observer，Compile和Watcher三者，
+ 通过Observer来监听自己的model的数据变化，
+ 通过Compile来解析编译模板指令（vue中是用来解析 {{}}），
+ 最终利用watcher搭起observer和Compile之间的通信桥梁，
+ 达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果
