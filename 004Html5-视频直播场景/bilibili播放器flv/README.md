
# bili bili 播放器 flv

github : [bilibili flv.js](https://github.com/bilibili/flv.js "bilibili flv.js")

> bili bili 视频播放采用 `边播放边分部下载,分解成很多个小片段，通过 MediaSource.addSourceBuffer`的方式 ， 实际上使用的是 `vedio` 标签 结合 `blob` 或 `MediaSource` 对象


#### 视频文件的组成

如何被解析来播放需要知道其数据封装格式

+ 数据格式描述
+ 视频数据包
+ 音频数据包
+ 其他数据包


#### bili bili 逻辑层面

```html
<video id="bVideo" preload="auto" src="blob:https://www.bilibili.com/e07f0855-03f1-4250-8150-447ce35cffd7"></video>
```

+ 1 onload 获取当前视频流的长度,然后按块进行请求，每次请求会得到 content-length   =  byte之差 + 1
+ 2 先通过ajax请求，获取 blob 对象
+ 3 通过 js 获取 blob 对象的路径，然后赋给标签

```js
// 单次请求全部加载
var xhr = new XMLHttpRequest();
xhr.open('POST', './play', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
    if (this.status == 200) {
        var blob = this.response;
        $("#bVideo").attr("src", URL.createObjectURL(blob));
    }
};
xhr.send();
```


```js
// flv
attachMediaElement(mediaElement) {
    if (this._mediaSource) {
        throw new IllegalStateException('MediaSource has been attached to an HTMLMediaElement!');
    }
    let ms = this._mediaSource = new window.MediaSource();
    ms.addEventListener('sourceopen', this.e.onSourceOpen);
    ms.addEventListener('sourceended', this.e.onSourceEnded);
    ms.addEventListener('sourceclose', this.e.onSourceClose);

    this._mediaElement = mediaElement;
    this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource);
    mediaElement.src = this._mediaSourceObjectURL;
}
```


+ 4 通过 FileReader 封装对应的视频块

```js
// webscoket 场景
_onWebSocketMessage(e) {
    if (e.data instanceof ArrayBuffer) {
        this._dispatchArrayBuffer(e.data);
    } else if (e.data instanceof Blob) {
        let reader = new FileReader();
        reader.onload = () => {
            this._dispatchArrayBuffer(reader.result);
        };
        reader.readAsArrayBuffer(e.data);
    } else {
        this._status = LoaderStatus.kError;
        let info = {code: -1, msg: 'Unsupported WebSocket message type: ' + e.data.constructor.name};

        if (this._onError) {
            this._onError(LoaderErrors.EXCEPTION, info);
        } else {
            throw new RuntimeException(info.msg);
        }
    }
}
```

```js
// blob 对象封装
let _blob = new Blob([res.data], {
    type: 'application/octet-stream;charset=UTF-8'
})

let result = false;

let msSaveBlobHandler = navigator.msSaveBlob
let saveBlobHandler = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob
let urlCreateHandler = window.URL || window.webkitURL || window.mozURL || window.msURL

// ms save blob
if (!result && msSaveBlobHandler) {
    msSaveBlobHandler(_blob, newFileName)
    result = true
}
else if (!result && saveBlobHandler) { // wekit moz other save as blob
    saveBlobHandler(_blob, newFileName)
    result = true
}


// axios 场景 - 下载 csv 并进行强制编码
const _fileReader = new FileReader()
_fileReader.readAsText(_blob, 'utf-8');
_fileReader.onload = function (event) {
    const _blobTmpUrl = window.URL.createObjectURL(new Blob(['\uFEFF' + event.target.result], { type: 'application/vnd.ms-excel;charset=utf-8' }))
    let _mockLinkElement = document.createElement('a');
    _mockLinkElement.download = newFileName;
    _mockLinkElement.href = _blobTmpUrl;
    document.body.appendChild(_mockLinkElement);
    _mockLinkElement.click()
    document.body.removeChild(_mockLinkElement);
    result = true
}
```


+ 5 append buffer
```js
// flv
let sb = this._sourceBuffers[is.type] = this._mediaSource.addSourceBuffer(mimeType);
sb.addEventListener('error', this.e.onSourceBufferError);
sb.addEventListener('updateend', this.e.onSourceBufferUpdateEnd);
```
```js
'use strict';
 
let socket = io.connect('http://localhost:1337');
 
let mediaSource = new MediaSource();
let video = document.getElementById("player");
let queue = [];
let sourceBuffer;
 
video.src = window.URL.createObjectURL(mediaSource);
 
mediaSource.addEventListener('sourceopen',function() {
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
 
    socket.on("video",function(data) {
        let uIntArray = new Uint8Array(data);
 
        if (!sourceBuffer.updating) {
            sourceBuffer.appendBuffer(uIntArray);// append buffer
        } else {
            queue.push(data);
        }
    });
});
```

#### bili bili 数据传输

`https://cn-bj3-cc-bcache-10.bilivideo.com/upgcxcode/18/16/45611618/45611618_da1-1-30080.m4s`


| key | 说明|
| :------ | :-------------------------------- |
| Http-status         | 206 Partial Content |
| Accept-type         | bytes |
| Content-type        | application/octet-stream ， 有时候是 video/mp4|
| Content-disposition | inline;filename="45611618_da1-1-30280.m4s";filename*=utf-8''45611618_da1-1-30280.m4s|
| Content-md5         | UgKk9YIIwsuptQWOzhDg3A== , 后端生成随机|
| Content-Range       | bytes 4028321-4189105/8371105  4189105-4028321+1 = content-length |