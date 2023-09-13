const { parentPort } = require('node:worker_threads');

parentPort.on('message', (task) => {
    console.log('message', task)
    parentPort.postMessage(task.a + task.b);
});