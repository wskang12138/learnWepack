const path = require('path') //node自带路径

exports.resolve = (dir) => path.resolve(__dirname, dir) // 相对位置转换绝对位置

exports.assetsPath = (_path) => path.posix.join("static", _path)
