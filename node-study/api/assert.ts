const assert =  require('node:assert');

/** 
 * 断言失败
 */
const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
})

try {
    assert.strictEqual(1, 2);
} catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}

/**
 * 验证函数调用次数（实验中）
 */
const tracker = new assert.CallTracker();
function func() {}
const callsfunc = tracker.calls(func, 2);

/**
    [{
        message: 'Expected the func function to be executed 2 time(s) but was executed 0 time(s).',
        actual: 0,
        expected: 2,
        operator: 'func',
    }]
 */
// console.log(tracker.report());

callsfunc();
try {
    tracker.verify();
} catch (err) {
    assert.strictEqual(err.message, 'Function(s) were not called the expected number of times');
}

/**
 * 验证是否为真，该系列方法最后一个参数为message
 */
assert('0');
// assert(0); // 报错


/**
 * 验证值，除 NaN 外使用 == 比较，
 */
assert.deepEqual(0, '0');
assert.deepEqual(NaN, NaN);
assert.deepEqual('+00000000', false);

const obj1 = {
    a: {
        b: 1
    }
};

const obj2 = {
    a: {
        b: 2
    }
};

const obj5 = {
    a: {
        b: '1'
    }
}

const obj3 = Object.assign({}, obj1);
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
// assert.deepEqual(obj1, obj2); // 报错
assert.deepEqual(obj1, obj3);
// assert.deepEqual(obj1, obj4); // 报错，不对比prototype
assert.deepEqual(obj1, obj5);

/**
 * 验证值，使用 Object.is 进行比较，原型链使用 === 比较
 */
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// 主要体现在解除封装后的对象上
//  assert.deepStrictEqual(object, fakeDate); // 不同原型 报错
// assert.deepStrictEqual(date, fakeDate); // 不同类型 报错
// assert.deepStrictEqual(new Number(1), new Number(2)); // 不同值 报错
assert.deepStrictEqual(new String('foo'), Object('foo'));
// assert.deepStrictEqual(0, -0); // 报错

/**
 * 正则表达式不匹配
 */
// assert.doesNotMatch('I will fail', /fail/); // 报错
// assert.doesNotMatch(123, /pass/); // 报错 类型只能为string
assert.doesNotMatch('I will fail', /different/);

/**
 * 异步函数没有抛出错误
 */
assert.doesNotReject(
    Promise.reject(new Error('Wrong value')),
    SyntaxError
).catch((err) => {
    assert(err instanceof Error);
    assert.strictEqual(err.message, 'Wrong value');
});

assert.doesNotReject(
    Promise.reject(new Error('Wrong value')),
    Error
).catch((err) => {
    assert(err instanceof Error);
    assert.strictEqual(err.message, 'Got unwanted rejection.\nActual message: "Wrong value"');
});

assert.doesNotReject(
    Promise.resolve(new Error('Wrong value')),
    Error
).then(() => {
    console.log('pass');
})

/**
 * 函数未抛出错误
 */ 
assert.doesNotThrow(
    () => {
        throw new TypeError('Wrong value');
    },
    TypeError
);