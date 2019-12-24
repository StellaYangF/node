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

const buf4 = Buffer.from([1,2,3]);
console.log(buf4);
// <Buffer 01 02 03>

// 转换指定的编码方式
let buf5 = Buffer.from('hello world', "ascii");
// buf5.forEach(console.log);
// 十六进制
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

// buf5 = buf5.toString(2);
// 68656c6c6f20776f726c64


buf5 = buf5.toString('base64');
// aGVsbG8gd29ybGQ=
console.log(buf5);
// <Buffer e4 b8 ad e5 9b bd>

let base64Encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
base64Encoding += base64Encoding.toLocaleLowerCase();
base64Encoding += '0123456789+/';
// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/


// 中文 base64转换
const buf6 = Buffer.from('杨');
// <Buffer e6 9d a8>

// 单独拿二进制字节
console.log(0xe6.toString(2));
console.log(0x9d.toString(2));
console.log(0xa8.toString(2));
// 11100110
// 10011101
// 10101000

// binary3*8 => base64: 4*6
// 111001101001110110101000 =>  二进制 8
// 111001 101001 110110 101000 =>   base64 6
// 00111001 00101001 00110110 00101000 base64 00 + 6
console.log(parseInt('0111001', 2)); // 57
console.log(parseInt('0101001', 2)); // 41
console.log(parseInt('0110110', 2)); // 54
console.log(parseInt('0101000', 2)); // 40

console.log(base64Encoding[57] + base64Encoding[41] + base64Encoding[54] + base64Encoding[40]);
// '杨' => 5p2o


// Buffer API
const buff1 = Buffer.from('小');
const buff2 = Buffer.from('杨');

// ## 1.slice截取 
console.log(buff1);
// <Buffer e5 b0 8f>
console.log(buff1.slice(1));
// <Buffer b0 8f>

// ## 2.isBuffer 是不是buffer 
console.log(Buffer.isBuffer(buff1));
// true

// ## 3.toString (可以将buffer转成指定的编码)  
// 默认是 utf8
console.log(buff1.toString()); // 小
// base64
console.log(buff1.toString('base64')); // 5bCP

// ## 4.length/ byteLength (字节的长度)  
console.log(buf.byteLength); 
console.log(buf.length); 
// 6

// ## 5 重写的方法  拷贝的方法  拼接的方法
const buff3 = Buffer.from('我是小可爱');
console.log(buff3);
buff3.write('不', 3, 6, 'utf8');
console.log(buff3.toString());
// 我不小可爱

// ## 6.copy => concat 拼接方法
// ### buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
const buff1 = Buffer.from('小');
const buff2 = Buffer.from('杨');
let buff3 = Buffer.alloc(6);
console.log(buff3);
// <Buffer 00 00 00 00 00 00> 
buff1.copy(buff3, 0);
buff2.copy(buff3, 3);
console.log(buff3.toString('base64'));
// <Buffer e5 b0 8f e6 9d a8>
// 实现 
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
  while (sourceStart < sourceEnd) {
    targetBuffer[targetStart++]  = this[sourceStart++];
  }
}

// ### Buffer.concat(list[, totalLength])
const buff1 = Buffer.from('小');
const buff2 = Buffer.from('杨');
// let buff3 = Buffer.concat([buff1, buff2], 6);
// 实现
Buffer.concat = function (list, totalLength = list.reduce((prev, next) => (prev + next.length),0)) {
  let newBuff = Buffer.alloc(totalLength);
  let offset = 0;
  list.forEach(buf => {
    buf.copy(newBuff, offset);
    offset += buf.length;
  });
  return newBuff;
}
buff3 = Buffer.concat([buff1, buff2]);
console.log(buff3.toString());

// ## 7.indexOf => split方法
// ### buf.indexOf(value[, byteOffset][, encoding])
let buffer = Buffer.from('我是小可爱我是小可爱我是小可爱不');
console.log(buffer.indexOf('爱', 24)); // 27 找不到就是 -1

// 实现split方法
let buffer = Buffer.from('我是小可爱我是小可爱我是小可爱不');

Buffer.prototype.split = function (sep) {
  const arr = [];
  let start = 0;
  let offset = 0;
  sep = Buffer.from(sep);
  while((offset = this.indexOf(sep, start)) != -1) {
    arr.push(this.slice(start, offset));
    start = offset + sep.length;
  }
  arr.push(this.slice(start));
  return arr;
}

buffer.split('爱').forEach(buf => console.log(buf.toString()));
// 我
// 你我
// 你我
// 你