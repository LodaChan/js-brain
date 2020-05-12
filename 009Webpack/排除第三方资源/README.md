# 加载外部资源

> 将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle

#### index.html中引入第三方库

```html
 <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```

#### webpack 配置

```js
module.exports = {
     ...
     output: {
       ...
     },
     externals : {
       react: 'react',
       redux: 'redux',
       jquery : 'jQuery',
     }
     ...
   }
```

#### 项目中的使用保持一致

```js
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
```