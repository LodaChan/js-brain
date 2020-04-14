# nginx本地配置.md

#### 1 app 重写 url , 一般是 80 端口

```bash
# 将http强制转https
location / {
    rewrite (.*) https://www.你的域名$1 permanent; 
}
```


#### 2 监听 443 端口

```bash
server {
       listen       443 ssl http2 default_server;
       listen       [::]:443 ssl http2 default_server;
       server_name  你的域名 www.你的域名;
       root         /data/www(你nginx配置的静态资源目录); 
　　　　ssl_certificate "/etc/pki/nginx/1_www.dingjianjun.cn_bundle.crt"（你刚才传到服务器上的证书地址）; 
　　　　ssl_certificate_key "/etc/pki/nginx/2_www.dingjianjun.cn.key"（你刚才传到服务器上的证书地址）;
　　　　ssl_session_cache shared:SSL:1m; ssl_session_timeout 10m; 
　　　　ssl_ciphers HIGH:!aNULL:!MD5; ssl_prefer_server_ciphers on; 

　　　　# Load configuration files for the default server block. 
　　　　include /etc/nginx/default.d/*.conf; 
　　　　location / { 

　　　　} 
　　　　error_page 404 /404.html; 
　　　　location = /40x.html { 

　　　　} 
　　　　error_page 500 502 503 504 /50x.html; 
　　　　location = /50x.html { 

　　　　} 
　　}
```

#### 3 重启 nginx

```bash
nginx -s reload
```