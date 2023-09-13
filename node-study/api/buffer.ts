const { Buffer, Blob } = require('buffer');

/* ==============基础使用============== */

/**
 * Buffer可以和字符串进行互相转换，支持的编码有：
 * ascii - 仅支持 7 位 ASCII 数据。 如果设置去掉高位的话，这种编码是非常快的。
 * utf8 - 多字节编码的 Unicode 字符。 许多网页和其他文档格式都使用 UTF-8 。
 * utf16le - 2 或 4 个字节，小端序编码的 Unicode 字符。 支持代理对（U+10000 至 U+10FFFF）。
 * ucs2 - utf16le 的别名。
 * base64 - Base64 编码。
 * latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
 * binary - latin1 的别名。
 * hex - 将每个字节编码为两个十六进制字符。
 * base64url - Base64 URL 安全编码。(当Buffer编码为字符串时，此编码将忽略填充)
 */

const buf4 = Buffer.from([1, 2, 3]);
// console.log(buf4);

// 创建包含字节 [1, 1, 1, 1] 的缓冲区, 会截断超出的部分, 截断范围为 0 - 255
const buf5 = Buffer.from([257, 275.5, -255, '1']);
// console.log(buf5);

// 创建包含字符串 'tést' 的 UTF-8 编码字节的缓冲区，16进制
const buf6 = Buffer.from('tést');
// console.log(buf6);

// 创建包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的缓冲区。
const buf7 = Buffer.from('tést', 'latin1');
// console.log(buf7);

const buf8 = Buffer.from('lag123', 'hex');
// console.log(buf8);

const buf9 = Buffer.from('1a7', 'hex');
// console.log(buf9);

const buf10 = Buffer.from('1634', 'hex');
// console.log(buf10);

/**
 * Buffer 实例也是 JavaScript Uint8Array 和 TypedArray 实例。 所有 TypedArray 方法都可在 Buffer 上使用。
 * 但是，Buffer API 和 TypedArray API 之间存在细微的不兼容。
 */
const buf11 = Buffer.from([1, 2, 3, 4, 5]);
const unit32array = new Uint32Array(buf11); // 解释为整数数组而不是目标字节序列
// console.log(unit32array);

const buf12 = Buffer.from('hello', 'utf16le');
const unit16array = new Uint16Array(buf12.buffer, buf12.byteOffset, buf12.length / Uint16Array.BYTES_PER_ELEMENT); // 解释为目标字节
// console.log(unit16array);

// 通过以相同的方式使用 TypedArray 对象的 .buffer 属性，可以创建与 TypedArray 实例共享相同分配内存的新 Buffer。 Buffer.from() 在这种情况下表现得像 new Uint8Array()。
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
const buf13 = Buffer.from(arr);
const buf14 = Buffer.from(arr.buffer);
// console.log(buf13);
// console.log(buf14);

const arr1 = new Uint16Array(20);
const buf15 = Buffer.from(arr1.buffer, 0, 16);
// console.log(buf15);

// Buffer.form() 和 TypedArray.from() 具有不同的签名和实现，TypedArray 接受第二个参数作为映射函数，而 Buffer 不接受。

// 可以使用迭代器迭代
const buf16 = Buffer.from([1, 2, 3]);
for (const b of buf16) {
    // console.log(b);
}



/* ==============Blob类(实验中)============== */

// Bolb 中封装了不可变的原始数据，可以在多个线程中间安全共享
const blob1 = new Blob(['hello there']); 
// console.log(blob1);
// console.log(blob1.size);
// console.log(blob1.type);
blob1.arrayBuffer().then((buffer) => {
    // console.log(buffer, 'blob1');
});
blob1.text().then((text) => {
    // console.log(text, 'blob1');
});
// console.log(blob1.stream());
// console.log(blob1.slice(0, 5));

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.on('message', async (data) => {
    // console.log(await data.arrayBuffer(), 'mc1');
    mc1.port1.close();
});

mc2.port1.on('message', async (data) => {
    setTimeout(async () => {
        // console.log(await data.arrayBuffer(), 'mc2');
        mc2.port1.close();
    }, 1000);
});


mc1.port2.postMessage(blob1);
mc2.port2.postMessage(blob1);



/* ==============Buffer类============== */

// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);
// console.log(buf1);

const buf2 = Buffer.alloc(10, 1);
// console.log(buf2);

const buf17 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
// console.log(buf17);

// 创建一个长度为 10、且未初始化的 Buffer，效率最高，但返回的 Buffer 实例可能包含旧数据。
const buf3 = Buffer.allocUnsafe(10);
// console.log(buf3);

const buf18 = Buffer.allocUnsafeSlow(10);
// console.log(buf18);

// const store = [];
// socket.on('readable', () => {
//     let data;
//     while (data = socket.read()) {
//         // 为保留的数据分配。
//         const sb = Buffer.allocUnsafeSlow(10);

//         // 将数据复制到新分配中。
//         data.copy(sb, 0, 0, 10);

//         store.push(sb);
//     }
// });

const str = '\u00bd + \u00bc = \u00be';
const strLen = Buffer.byteLength(str, 'utf8');
// console.log(`${str}: ${str.length} 个字符, ` + `${strLen} 个字节`); // 9个 12个

const buf19 = Buffer.from('1234');
const buf20 = Buffer.from('2345');
// console.log(Buffer.compare(buf19, buf20));
// console.log(buf19.compare(buf20));

const bufCon = Buffer.concat([buf19, buf20]);
// console.log(buf19, buf20);
// console.log(bufCon, bufCon.length);

const buf21 = Buffer.from(buf19);
// console.log(buf21);

class Foo {
    [Symbol.toPrimitive]() {
        return 'foo';
    }
}

const buf22 = Buffer.from(new Foo(), 'utf8');
// console.log(buf22);

// isBuffer
// console.log(Buffer.isBuffer(buf22));
// console.log(Buffer.isBuffer('str'));
// console.log(Buffer.isBuffer(new Uint8Array(10)));
// console.log(Buffer.isBuffer({}));

// isEncoding
// console.log(Buffer.isEncoding('utf8'));
// console.log(Buffer.isEncoding('hex'));
// console.log(Buffer.isEncoding('utf/8'));
// console.log(Buffer.isEncoding(''));




















export {};