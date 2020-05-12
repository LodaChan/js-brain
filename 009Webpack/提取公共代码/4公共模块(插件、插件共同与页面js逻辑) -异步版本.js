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
        filename: '[name].[chunkhash].js',
        chunkFilename: "[name].[chunkhash].chunk.js",// 指定异步加载的模块名字
    },
    plugins: [
        // 库/插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash].js'
        }),
        // 库/插件的公共部分
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].[chunkhash].js',
            chunks: ['vendor']
        }),
        // 页面js逻辑的公共部分 异步版本
        new webpack.optimize.CommonsChunkPlugin({
            // children为true，
            // 共同引用的模块就会被打包合并到名为 vendor-async 的公共模块，
            // 当你懒加载 first 或者 second 的时候 并行加载 vendor-async 公共模块

            // 共同引用的模块就会被打包到首屏加载的app.bundle当中
            name: 'app',
            children: true,
            async: 'vendor-async',
            minChunks: 3
        })
    ]
}

module.exports = config;