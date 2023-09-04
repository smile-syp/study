
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // 生成源文件引用用于定位报错信息
    devServer: {
        contentBase: './dist',
        hot: true
    },
})