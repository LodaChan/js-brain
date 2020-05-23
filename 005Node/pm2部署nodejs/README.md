# pm2部署nodejs

https://www.cnblogs.com/lentoo/p/9539137.html

#### 安装 pm2

```bash
npm install -g pm2

pm2 -v
```


#### 启动nodejs服务

```bash
pm2 start app.js --name application1
pm2 restart application1
pm2 logs application1 


集群模式启动
pm2 start start.js -i max

添加进程监视
pm2 start app.js --name app1WatchName --watch

删除进程监控
pm2 delete app1WatchName

查看某个进程具体情况
pm2 describe app1WatchName

开机启动
pm2 startup centos 
```

