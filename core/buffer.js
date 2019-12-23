// buffer create

// 创建长度为10 ，用0x00填充
const b1 = Buffer.alloc(10);
console.log(b1);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建长度为10， 用20 => 14来填充
const b2 = Buffer.alloc(10,20);
console.log(b2);
// <Buffer 14 14 14 14 14 14 14 14 14 14>

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 且是随机分配的，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
// <Buffer f0 26 df 02 00 00 00 00 e8 3f>
console.log(Buffer.alloc(5));

const buf4 = Buffer.from()