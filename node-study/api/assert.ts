const assert = require('node:assert');

/** 
 * AssertionError 断言失败
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
 * CallTracker 验证函数调用次数（实验中）
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
    assert.strictEqual(err.message, 'Expected the func function to be executed 2 time(s) but was executed 1 time(s).');
}

/**
 * assert 验证是否为真，该系列方法最后一个参数为message
 */
assert('0');
// assert(0); // 报错


/**
 * deepEqual 验证值，除 NaN 外使用 == 比较，
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
 * deepStrictEqual 验证值，使用 Object.is 进行比较，原型链使用 === 比较
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
 * doesNotMatch 正则表达式不匹配
 */
// assert.doesNotMatch('I will fail', /fail/); // 报错
// assert.doesNotMatch(123, /pass/); // 报错 类型只能为string
assert.doesNotMatch('I will fail', /different/);

/**
 * doesNotReject 异步函数没有抛出错误
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
    // console.log('pass');
})

/**
 * doesNotThrow 函数未抛出错误，实际上并没有用处
 */ 
// assert.doesNotThrow(
//     () => {
//         throw new TypeError('Wrong value');
//     },
//     TypeError
// )

/**
 * equal 验证值，使用 == 比较
 */
assert.equal(1, 1);
assert.equal(1, '1');
assert.equal(NaN, NaN);
// assert.equal(1, 2); // 报错
// assert.equal({ a: { b: 1 } }, { a: { b: 1 } }); // 不同对象报错

/**
 * fail 抛出 AssertionError
 */
// assert.fail();
// assert.fail('boom');
// assert.fail(new TypeError('need array'));

/**
 * ifError 验证是否为假
 */
assert.ifError(null);
// assert.ifError(0); // 报错
// assert.ifError('error'); // 报错
// assert.ifError(new Error()); // 报错

let err;
(function(){
    err = new Error('test error');
})();
(function(){
    // assert.ifError(err); // 报错
})()

/**
 * match 验证正则表达式匹配
 */
assert.match('I will pass', /pass/);
// assert.match(123, /pass/); // 报错 类型只能为string
// assert.match('I will fail', /different/); // 报错

/**
 * notDeepEqual 验证值，除 NaN 外使用 != 比较
 */
const obj6 = {
    a: {
        b: 1
    }
};

const obj7 = {
    a: {
        b: 2
    }
};

const obj8 = {
    a: {
        b: '1'
    }
}

const obj9 = Object.assign({}, obj6);
const obj10 = Object.create(obj6);

assert.notDeepEqual(obj6, obj7);
// assert.notDeepEqual(obj6, obj8); // 报错
// assert.notDeepEqual(obj6, obj9); // 报错
assert.notDeepEqual(obj6, obj10); // 不对比原型

/**
 * notDeepStrictEqual 验证值，使用 Object.is 进行比较
 * 与 deepStrictEqual 相反
 */
assert.notDeepStrictEqual(new Number(1), new Number(2));
assert.notDeepStrictEqual(new String('foo'), 'foo');
// assert.notDeepStrictEqual(new String('foo'), Object('foo')); // 报错
// assert.notDeepStrictEqual({ a: 1 }, { a: 1 }); // 报错

/**
 * notEqual 验证值，使用 != 比较
 */
assert.notEqual(1, 2);
// assert.notEqual(1, '1'); // 报错

/**
 * notStrictEqual 验证值，使用 !== 比较
 */
assert.notStrictEqual(1, 2);
assert.notStrictEqual(1, '1');

/**
 * ok 验证值是否为真
 */
assert.ok(true);
assert.ok(1);
// assert.ok(false); // 报错
// assert.ok(0); // 报错
// assert.ok(); // 报错

/**
 * rejects 异步函数抛出错误
 */
assert.rejects(
    async () => {
        throw new Error('Wrong value');
    },
    {
        name: 'Error',
        message: 'Wrong value'
    }
)

assert.rejects(
    async () => {
        throw new Error('Wrong value');
    },
    (err) => {
        assert(err instanceof Error);
        assert.strictEqual(err.message, 'Wrong value');
        return true;
    }
)

assert.rejects(
    Promise.reject(new Error('Wrong value')),
    Error
).then(() => {
    
})

/**
 * strictEqual 验证值，使用 === 比较
 */
// assert.strictEqual(1, 2); // 报错
assert.strictEqual(1, 1);
// assert.strictEqual(1, '1'); // 报错

/**
 * throws 函数抛出错误
 */
assert.throws(
    () => {
        throw new Error('Wrong value');
    },
    Error
)

assert.throws(
    () => {
        throw new Error('Second');
    },
    /Second$/
)

module.exports = {};