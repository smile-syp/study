import "@babel/polyfill";
var fn = num => num + 2;


console.log(fn(1));


var promise = new Promise((resolve, reject) => {
    console.log(123)
});

