module.exports = {
    presets: [
        [ "@babel/preset-env", {
            targets: { // 优先级高于 browserslist
                "firefox": "30",
            },
            // useBuiltIns: "entry", // 按需引入 polyfill
            // useBuiltIns: "usage", // 按需引入 polyfill, 不需要 import "@babel/polyfill"，但是需要指定 corejs 版本
            // corejs: 2, // 指定 
            modules: false, // 模块化方案，false 为 es6 modules
        } ]
    ],
    plugins: [
        [ "@babel/plugin-transform-runtime", {
            // 另外，在Babel6版本，该插件还有两个配置选项polyfill和useBuiltIns，在v7版本已经移除了。
            helpers: true, // 默认为 true, 是否自动引入辅助函数包
            regenerator: true, // 默认为 true, 是否自动引入 regeneratorRuntime
            corejs: 3, // 指定 corejs 版本
            useESModules: true, // 默认为 false, 是否使用 es modules
            absoluteRuntime: false, // 默认为 false, 自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则, 一般不修改
            version: "^7.22.15" // 该项主要是和@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3的版本号有关系，这三个包我们只需要根据需要安装一个。我们把安装的npm包的版本号设置给version即可。例如，在上节的babel14例子里，安装的@babel/runtime-corejs3版本是^7.10.4，那么配置项version也取'^7.10.4'。其实该项不填取默认值就行，目前填写版本号主要是可以减少打包体积。
        }]
    ]
}