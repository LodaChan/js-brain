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
        // 库/插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
        // 库/插件的公共部分
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),
        // 页面js逻辑的公共部分
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['first','second']// 从first.js和second.js中抽取commons chunk
        }),
    ]
}

module.exports = config;