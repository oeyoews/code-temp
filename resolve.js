const path = require('path');
const fs = require('fs')

const resolvedPath = path.resolve('C:/Users/Lenovo/Pictures/flameshot');
console.log(resolvedPath);

fs.readdir(resolvedPath, (err, files) => {
    if (err) {
        console.error('无法读取文件夹：', err);
        return;
    }
    console.log(files); // 打印文件列表
});
