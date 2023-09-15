var babelCore = require('@babel/core');
var code = 'let fn = num => num + 2;';
var options = {
    presets: ["@babel/preset-env"]
};
var result = babelCore.transform(code, options);
console.log(result);
console.log('------------------');
console.log(result.code);