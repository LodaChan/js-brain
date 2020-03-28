display:none 和 visibility:hidden
===

+ display:none
  + 占据的空间消失


+ visibility:hidden
  + 依然占据空间
  + 有继承性，当修改子元素的 visibility: visible ， 子元素就会显示出来
  + li 计数器依然运行 ， display:none 却不会
  + CSS3 transition 支持 visibility 属性，但是并不支持display