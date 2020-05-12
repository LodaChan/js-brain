const path = require("path");
const webpack = require("webpack");
const packagejson = require("./package.json");

const config = {
    entry: {
        first: './src/first.js',
        second: './src/second.js',
        vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    plugins: [
        // 对 调用的 库 单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
    ]
}

module.exports = config;