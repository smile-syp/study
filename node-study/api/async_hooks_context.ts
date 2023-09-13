const { WorkerPool } = require('./util/work_pool');
const os = require('node:os');
const { AsyncResource, executionAsyncId } = require('node:async_hooks');
const { createServer } = require('node:http');

// 利用 AsyncResource 实现异步功能
class DBQuery extends AsyncResource {
    constructor(db) {
        super('DBQuery');
        this.db = db;
    }

    getInfo(query, callback) {
        this.db.get(query, (err, result) => {
            this.runInAsyncScope(callback, null, err, result);
        })
    }

    close() {
        this.db.close();
        this.emitDestroy();
    }
}

/**
 * bind 会将 this 绑定到 AsyncResource 的实例上，也可以在AsyncResource上绑定
 * runInAsyncScope 异步执行上下文中调用的函数
 * emitDestroy 通知 AsyncResource 实例已经销毁，只应该调用一次
 * asyncId 用于标识 AsyncResource 实例
 * triggerAsyncId 用于标识创建 AsyncResource 实例的异步资源
 */
const db = new DBQuery({
    get(query, callback) {
        console.log('get', query);
        callback(null, 'result');
    },
    close() {
        console.log('close');
    }
}).bind(() => {});


// 用于线程池实现异步功能
const pool = new WorkerPool(os.cpus().length);
let finished = 0;
for (let i = 0; i < 10; i++) {
//   pool.runTask({ a: 42, b: 100 }, (err, result) => {
//     console.log(i, err, result);
//     if (++finished === 10)
//       pool.close();
//   });
}

// 将 AsyncResource 和 EventEmitters 结合使用
// const server = createServer((req, res) => {
//     req.on('close', AsyncResource.bind(() => {
//         console.log('close', executionAsyncId());
//     }));
//     res.on('close', () => {
//         console.log('close', executionAsyncId());
//     })
// }).listen(3000);




export {};