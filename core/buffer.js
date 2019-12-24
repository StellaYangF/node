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


// ## 2.isBuffer 是不是buffer 


// ## 3.toString (可以将buffer转成指定的编码)  


// ## 4.length/ byteLength (字节的长度)  
console.log(buf.byteLength); 
console.log(buf.length); 
// 6

// ## 5.copy => concat 拼接方法


// ## 6.indexOf => split方法

