# render-function

```html
<template>
  <div id="test">
    {{val}}
    <img src="http://xx.jpg">
  </div>
</template>
```

```js
{render: "with(this){return _c('div',{attrs:{"id":"test"}},[[_v(_s(val))]),_v(" "),_m(0)])}"}
```