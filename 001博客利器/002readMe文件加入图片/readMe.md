# readMe文件加入图片

在github项目的readMe文件中插入图片会因为CDN的问题，加载不出来

#### 一、修改 hosts 文件

+ 地址：`C:\Windows\System32\drivers\etc\hosts.ics`

#### 二、增加 github CDN 的支持

```bash
# GitHub Start 
192.30.253.112    github.com 
192.30.253.119    gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
# GitHub End
```

#### 三、刷新CDN

WIN + R 输入 CMD ， 运行指令 `ipconfig /flushdns`

#### 四、readMe.md url change

```bash
https://github.com/你的账号/项目名/raw/master/相对图片的存放目录/图片名.png
```

完整例子

```bash
![最终效果](https://github.com/LodaChan/js-brain/raw/master/001博客利器/001制作gif/.wiki/最终效果.gif)
```