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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),
    ]
}

module.exports = config;