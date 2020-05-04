# Three.js 使用webgl2

> 当创建一个WebGLRenderer实例时， three.js总是使用 WebGL1环境

#### webgl2 新特性

> webgl2 基于OpenGL ES 3.0

+ OPENGL ES着色器语言3.0
+ vertex array objects (VAOs) 顶点数组对象
+ 三维纹理
+ multiple render target（MRT）多重渲染目标
+ Texture access in vertex shaders 顶点着色器中的纹理访问
+ 浮点数纹理
+ 深度纹理
+ texel Fetch
+ 采样器对象
+ 一直缓冲对象
+ 同步对象
+ 查询对象
+ 变换反馈对象
+ Hardware Instancing 硬件实例
+ immutable textures 不可变纹理
+ EXT_color_buffer_float 外部颜色缓冲区浮动
+ Standard Derivatives 标准衍生品
+ Instanced Drawing 实例绘图
+ Depth Textures (WEBGL_depth_texture) 深度纹理
+ UNSIGNED_INT indices (OES_element_index_uint) 无符号索引
+ Setting gl_FragDepth(EXT_frag_depth) 碎片深度
+ Blend Equation MIN/MAX (EXT_blend_minmax) 混合方程
+ Direct texture LOD access (EXT_shader_texture_lod) 直接纹理LOD访问
+ Multiple Draw Buffers (WEBGL_draw_buffers) 多绘图缓冲区
+ Non-Power of 2 Texture Support 2的非幂纹理支持
+ Floating Point Framebuffer Attachments 浮点帧缓冲区附件



#### 手动创建 webgl2 上下文 注入 render

 ```js
var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2', { alpha: false } );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
```

#### 目前支持的特性

+ 3D Textures
+ 2D Texture Arrays
+ Multisampled Renderbuffers
+ Non-power of two (POT) textures work just the same as POT textures now. No resizing is required for best quality.