# content-type 详解

> 网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定文件接收方将以什么形式、什么编码读取这个文件，这就是经常看到一些Asp网页点击的结果却是下载到的一个文件或一张图片的原因。默认为TEXT/HTML。

####  下面以 [axios](https://github.com/axios/axios) 为例子进行解析

提示: application/json`;charset=UTF-8`   别忘了哦

| content-type | 场景 | 输入参数  | 其他优点 |
| :--- | :--- |:--- |:--- |
| text/html |  输出网页 |  |  调用html的解析器对文件进行相应的处理 |
| text/plain | 无格式正文 | aaa | 有效避免XSS漏洞，因为浏览器不会自动执行 |
| `application/x-www-form-urlencoded` | ?key1=value1&key2=value2 | qs.stringify({ 'bar': 123 } |
| `application/json` | json , axios默认的请求数据类型 | data: JSON.stringify(obj) |  |
| `multipart/form-data` | 回发表单 或 上传文件 | new FormData() |  |
| raw | 支持 text、json、xml、html  |   |  |
| application/octet-stream | 二进制数据，通常用来下载文件， |  | `response["content-type"]`  |
 

#### 一、详解 text/plain

+ 常用在 POST
+ 有效避免XSS漏洞，因为浏览器不会自动执行

#### 二、详解 `application/x-www-form-urlencoded`

+ 浏览器都支持
+ 键值对的方式 ，?key1=value1&key2=value2
+ value需要进行 js URLencode
+ `缺点` 汉字会从3字节变9字节

```js
// 使用 URLSearchParams 类帮助
// 所有浏览器都不支持 URLSearchParams ，但是有了 全局 polyfill 就可用
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

```js
// 或借助与 qs 插件
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));

// qs 多层嵌套时，简化数据格式
qs.stringify({
    a: {
        b: {
            c: 'd', e: 'f'
        }
    }
}, { allowDots: true });
// 'a.b.c=d&a.b.e=f'
```

#### 三、详解 `application/json`

+ 绝大部分浏览器支持
+ axios 默认请求数据类型

```js
// 直接模式
axios.post('/api', {
    firstName: 'Kobe',
    lastName: 'Bryant'
  })
  .then((res) => {
    console.log(res);
  })
  .catch((er) => {
    console.log(err);
  });

// config模式
JSON.stringify({
    firstName: 'Kobe',
    lastName: 'Bryant'
})

// string模式
JSON.parse('{"firstName":"Kobe","lastName":"Bryant"}')
```


#### 四、详解 `multipart/form-data`

+ 一段utf8编码的字节
+ 适合传输长字节，大批量汉字首选
+ boundary隔离，键值对存在

```js
// post 表单
var form = document.getElementById("myForm");
var formData = new FormData(form);
var name = formData.get("name"); 
var psw = formData.get("psw");  
formData.append("token","kshdfiwi3rh");
```

```js
// 上传文件
var formData = new FormData();
formData.append('fileName', 'test_file1.txt');
formData.append('file', document.getElementById('file1').files[0]);
formData.append('fileName', 'test_file2.txt');
formData.append('file', document.getElementById('file2').files[0]);

formData.set('fileName', 'aaa.txt'); // 设置值，全部值都变成aaa.txt
formData.delete("fileName"); // 删除全部的 fileName 数据
formData.get("file"); // 返回 第1个 file
formData.getAll("file"); // 可以查看全部 file 的数组
formData.has("fileName"); // false 已经删掉了 

// 遍历迭代器
var formDataGenerator = formData.entries();
formDataGenerator.next(); // {done:false, value: ["fileName", "test_file1.txt"]}
formDataGenerator.next(); // {done:false, value: ["file", "---data---"]}
formDataGenerator.next(); // {done:false, value: ["fileName", "test_file2.txt"]}
formDataGenerator.next(); // {done:false, value: ["file", "---data---"]}
formDataGenerator.next(); // {done:true,  value: undefined}
```
#### 五、raw

+ axios将 js对象 序列化为JSON

```js
var postData = {
    firstName: 'Kobe',
    lastName: 'Bryant'
}
axios.post("/api",postData)
axios.post("/api",JSON.stringify(postData))
```

#### 六、application/octet-stream

+ 只能提交一个文件，而且只能是流（或者字节数组）
+ 浏览器接收后需要使用 blob 对象进行接收

```js
// axios中
let newFileName = "test.csv"; // 中文需要 urlEncode

let _blob = new Blob([res.data], {
    type: 'application/octet-stream;charset=UTF-8'
})

let msSaveBlobHandler = navigator.msSaveBlob
let saveBlobHandler = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob
// let urlCreateHandler = window.URL || window.webkitURL || window.mozURL || window.msURL

// msSaveBlobHandler(_blob, newFileName)
// saveBlobHandler(_blob, newFileName)

const _fileReader = new FileReader()
_fileReader.readAsText(_blob, 'utf-8'); // 强行把流当作 utf-8 字符编码
_fileReader.onload = function (event) {
    const _blobTmpUrl = window.URL.createObjectURL(new Blob(
        ['\uFEFF' + event.target.result],
        { type: 'application/vnd.ms-excel;charset=utf-8' }
    ))
    let _mockLinkElement = document.createElement('a');
    _mockLinkElement.download = newFileName;
    _mockLinkElement.href = _blobTmpUrl;
    document.body.appendChild(_mockLinkElement);
    _mockLinkElement.click()
    document.body.removeChild(_mockLinkElement);
    result = true
}

```

```js
// Express 中
 res.set({
    'Content-Type':'application/octet-stream',
    'ETag':''
}
```
