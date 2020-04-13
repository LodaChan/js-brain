<!DOCTYPE html>
<html>

<head>
    <title></title>
    <script src="https://unpkg.com/vue"></script>
    <link rel="stylesheet" type="text/css" href="/style.css" />
</head>

<body>

    <script>
        Vue.component('async-component', function (resolve, reject) {
            setTimeout(function () {
                // 向 `resolve` 回调传递组件定义
                resolve({
                    template: '<div>I am async component!</div>'
                })
            }, 0)
        })
    </script>
</body>

</html>