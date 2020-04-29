# fetch 请求

> fetch API 替换 XMLHttpRequest , 返回的都是 Promise

```js
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  return response.text()
}, function(error) {
  error.message //=> String
})
```

#### 实际调用

+ html

```js
fetch('/users.html',{})
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

+ json

```js
fetch('/users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})
```

+ get

```js
fetch('/get',{ method: 'GET', headers: {} })
  .then(function(res) {
    return res.text()
  })
```


+ post

```js
fetch('/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Hubot',
            login: 'hubot',
        })}
)
```


+ upload

```js
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'POST',
  body: data
})
```

#### 缺点

+ 默认不发cookie，若需要，需设置credentials: 'same-origin' // 'include' for CORS

+ 对400/500类的HTTP status，不作reject处理，仍是resolve。故需手动处理一下
 