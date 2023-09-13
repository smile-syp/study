const { Worker } = require('node:worker_threads');
const { AsyncResource } = require('node:async_hooks');
const { EventEmitter } = require('node:events');
const path = require('node:path');

const kTaskInfo = Symbol('kTaskInfo');
const kTaskInfoCallback = Symbol('kTaskInfoCallback');

class TaskInfo extends AsyncResource {
    constructor(callback) {
        super('TaskInfo');
        this.callback = callback;
    }

    done(err, result) {
        this.runInAsyncScope(this.callback, null, err, result);
        this.emitDestroy();
    }
}

class WorkerPool extends EventEmitter {
    constructor(numThreads) {
        super();
        this.numThreads = numThreads;
        this.workers = [];
        this.freeWorkers = [];
        this.tasks = [];
        
        for(let i = 0; i < numThreads; i++) {
            this.addNewWorker();
        }

        this.on(kTaskInfoCallback, () => {
            if(this.tasks.length > 0) {
                const { task, callback } = this.tasks.shift();
                this.runTask(task, callback);
            }
        });
    }

    addNewWorker() {
        const worker = new Worker(path.resolve(__dirname, 'task_processer.ts'));
        worker.on('message', (result) => {
            console.log('addmessage')
            worker[kTaskInfo].done(null, result);
            worker[kTaskInfo] = null;
            this.freeWorkers.push(worker);
            this.emit(kTaskInfoCallback);
        });
        worker.on('error', (err) => {
            console.log('adderror')
            if(worker[kTaskInfo]) {
                worker[kTaskInfo].done(err);
            } else {
                this.emit('error', err);
            }
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.addNewWorker();
        });

        this.workers.push(worker);
        this.freeWorkers.push(worker);
        this.emit(kTaskInfoCallback);
    }

    runTask(task, callback) {
        console.log('runTask');
        if(this.freeWorkers.length === 0) {
            this.tasks.push({ task, callback });
            return;
        }
        console.log('runTask2')
        const worker = this.freeWorkers.pop();
        worker[kTaskInfo] = new TaskInfo(callback);
        worker.postMessage(task);
    }

    close() {
        for(const worker of this.workers) {
            worker.terminate();
        }
    }
}

module.exports = {
    WorkerPool
};

export {}