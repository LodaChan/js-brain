# 加载外部资源

#### index.html

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
       jquery : 'window.jQuery',
     }
     ...
   }
```