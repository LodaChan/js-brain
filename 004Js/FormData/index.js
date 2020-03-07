// 上传文件
var formData = new FormData();
formData.append('fileName', 'test_file1.txt');
formData.append('file', document.getElementById('file1').files[0]);
formData.append('fileName', 'test_file2.txt');
formData.append('file', document.getElementById('file2').files[0]);

formData.set('fileName', 'aaa.txt'); // 设置值，全部值都变成aaa.txt
formData.delete("fileName"); // 删除全部的 fileName 数据
formData.get("file"); // 返回 第1个 file
formData.getAll("file"); // 可以查看全部 file 的数组
formData.has("fileName"); // false 已经删掉了 

// 遍历迭代器
var formDataGenerator = formData.entries();
formDataGenerator.next(); // {done:false, value: ["fileName", "test_file1.txt"]}
formDataGenerator.next(); // {done:false, value: ["file", "---data---"]}
formDataGenerator.next(); // {done:false, value: ["fileName", "test_file2.txt"]}
formDataGenerator.next(); // {done:false, value: ["file", "---data---"]}
formDataGenerator.next(); // {done:true,  value: undefined}
