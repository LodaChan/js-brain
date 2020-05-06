# Three.js 浏览器兼容


| 浏览器版本| 具体说明|
| :------ | :-------------------------------- |
| IE10 或 以下 版本  | 版本回落到 renderers（CSS2DRenderer、CSS3DRenderer、SVGRenderer） |
| 其他现代浏览器 | WebGLRenderer  |


#### 特性与填充物 兼容


<table>
    <thead>
        <tr>
            <th>特性</th>
            <th>适用范围</th>
            <th>模块</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Typed Arrays - <b>IE9</b></td>
            <td>Source</td>
            <td>BufferAttribute, BufferGeometry, etc.</td>
        </tr>
         <tr>
            <td>Blob - <b>IE9</b></td>
            <td>Source</td>
            <td>FileLoader, etc.</td>
        </tr>
        <tr>
            <td>Web Audio API</td>
            <td>Source</td>
            <td>Audio, AudioContext, AudioListener, etc.</td>
        </tr>
        <tr>
            <td>WebXR Device API</td>
            <td>Source</td>
            <td>WebXRManager</td>
        </tr>
        <tr>
            <td>Promise</td>
            <td>Examples</td>
            <td>GLTFLoader, DRACOLoader, BasisTextureLoader, GLTFExporter, VRButton, ARButton, etc.</td>
        </tr>
        <tr>
            <td>Fetch</td>
            <td>Examples</td>
            <td>ImageBitmapLoader, etc.</td>
        </tr>
        <tr>
            <td>File API</td>
            <td>Examples</td>
            <td>GLTFExporter, etc.</td>
        </tr>
        <tr>
            <td>URL API</td>
            <td>Examples</td>
            <td>GLTFLoader, etc.</td>
        </tr>
        <tr>
            <td>Pointer Lock API</td>
            <td>Examples</td>
            <td>PointerLockControls</td>
        </tr>
    </tbody>
</table>


#### 其他特性 填充物 兼容

+ core-js

+ typedarray.js

+ ES6-Promise

+ Blob.js

+ fetch