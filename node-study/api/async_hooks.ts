const async_hooks = require('node:async_hooks');
const { writeFileSync } = require('node:fs');
const { format } = require('node:util');
const { createServer } = require('node:net');

// 当前执行上下文的 ID
const eid = async_hooks.executionAsyncId();
// console.log(eid);

// 当前资源的 ID
const tid = async_hooks.triggerAsyncId();
// console.log(tid);

/**
 * createHook 创建一个新的异步钩子实例
 */
const asyncHook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        console.log('init', asyncId);
    },
    before(asyncId) {
        console.log('before', asyncId);
    },
    after(asyncId) {
        console.log('after', asyncId);
    },
    destroy(asyncId) {
        console.log('destroy', asyncId);
    },
    promiseResolve(asyncId) {
        console.log('promiseResolve', asyncId);
    }
});


// 可以通过原型链来继承回调
class MyAsyncCallbacks {
    init(asyncId, type, triggerAsyncId, resource) {}
    destroy(asyncId) {}
}

class MyAddedCallbacks extends MyAsyncCallbacks {
    before(asyncId) {}
    after(asyncId) {}
}

const asyncHook1 = async_hooks.createHook(new MyAddedCallbacks());

function debug(...args) {
    // 在 AsyncHooks 回调中，不要使用 console.log()，因为它会创建一个新的异步资源
    writeFileSync(1, `${format(...args)}\n`, { flag: 'a' });
}


/**
 * enable 启用异步钩子
 */
asyncHook.enable();

/**
 * disable 禁用异步钩子
 */
asyncHook.disable();

// init 参数
// asyncId <number> 异步资源的 ID
// type <string> 异步资源的类型
/* 
FSEVENTWRAP, FSREQCALLBACK, GETADDRINFOREQWRAP, GETNAMEINFOREQWRAP, HTTPINCOMINGMESSAGE,
HTTPCLIENTREQUEST, JSSTREAM, PIPECONNECTWRAP, PIPEWRAP, PROCESSWRAP, QUERYWRAP,
SHUTDOWNWRAP, SIGNALWRAP, STATWATCHER, TCPCONNECTWRAP, TCPSERVERWRAP, TCPWRAP,
TTYWRAP, UDPSENDWRAP, UDPWRAP, WRITEWRAP, ZLIB, SSLCONNECTION, PBKDF2REQUEST,
RANDOMBYTESREQUEST, TLSWRAP, Microtask, Timeout, Immediate, TickObject 
*/
// triggerAsyncId <number> 创建此异步资源的异步资源的 ID
// resource <Object> 异步资源的引用

// 可以通过资源打开然后在资源可以使用之前关闭它来观察
// createServer().listen(8080, () => { 
//     console.log('server start');
// });

module.exports = {};