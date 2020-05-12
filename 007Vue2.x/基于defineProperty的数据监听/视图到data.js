var data = {
    key: 1
}

// object.definePropety get / set -> dep notify -> watcher[] -> templete -> vdom -> domdiff -> path(oldNode,newnode) -> 具体渲染

var input = {}
input.addEventListener('change', (e) => {
    data.key = e.target.value;
})