## 1

```js
const bird = {
  size: 'small'
}

const mouse = {
  name: 'Mickey',
  small: true
}

mouse.bird.size // TypeError: Cannot read property 'size' of undefined
mouse[bird.size] === mouse["small"] === true
mouse[bird["size"]] === mouse["small"] === true
```