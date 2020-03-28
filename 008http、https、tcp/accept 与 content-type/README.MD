# accept 与 content-type

> request 通过 accept 告诉服务器，我能处理的内容 , 内容协商机制 ,使用 Content-Type 应答头通知客户端它的选择 


#### 一、Accept 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用MIME类型来表示，借助内容协商机制, 
 
+ index.html

```bash
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3

Content-Type: 无
```


+ get post

```bash
Accept: application/json, text/plain, */*

Content-Type: application/json;charset=UTF-8
```


+ image
```
Accept: 无

Content-Type: image/png ,有时候会没有
```


+ css
```
Accept: text/css,*/*;q=0.1

Content-Type: 无
```

+ js
```
Accept: */*

Content-Type: 无
```

+ mp3
```
Accept: 无

Content-Type: audio/mpeg
```

+ favicon.ico
```
Accept: image/webp,image/apng,image/*,*/*;q=0.8

Content-Type: text/html
```
 
 + scoket
 ```
 Accept: 无

 Content-Type: 无
 ```

#### 二、服务器可以从诸多备选项中选择一项进行应用，并使用 Content-Type 应答头通知客户端它的选择