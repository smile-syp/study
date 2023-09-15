import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.promise.js";
var fn = function fn(num) {
  return num + 2;
};
var promise = Promise.resolve('ok');
console.log(fn(1));
