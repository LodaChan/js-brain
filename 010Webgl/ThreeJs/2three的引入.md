# Three.js 类库的引入

#### script标签引入

```html
<script src="static/three.js"></script>
```

#### npm 引入

cnpm install three --d -s

```js
// commomJs
var THREE = require('three');
var scene = new THREE.Scene();

// ES6
import * as THREE from 'three';
const scene = new THREE.Scene();

// ES6 按需引入
import { Scene } from 'three';
const scene = new Scene();

// ES6 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
```

#### webgl兼容性判断