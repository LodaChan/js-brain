function jsonp({ url, params, cb }) {
    return new Promise((resolve, reject) => {
        window[cb] = function (data) {  // 声明全局变量
            resolve(data)
            document.body.removeChild(script)
        }
        params = { ...params, cb }
        let arrs = []
        for (let key in params) {
            arrs.push(`${key}=${params[key]}`)
        }
        let script = document.createElement('script')
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}


function createScript(src) {
    $("<script><\/script>").attr("src",src).appendTo("body")
}

createScript("http://127.0.0.1:444/somejson?callback=jsonCallback");

// 后端处理
// String callback = (String)request.getParameter("callback");  
// String jsonData = "{\"id\":\"3\", \"name\":\"zhangsan\", \"telephone\":\"13612345678\"}";
// String retStr = callback + "(" + jsonData + ")";
 

function jsonCallback(json) {
    console.log(json)
    // do something ...
}


