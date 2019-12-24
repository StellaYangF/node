# What is `buffer`?
在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。
NodeJS提供了一个Buffer对象来提供对二进制数据的操作
是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
Buffer好比由一个8位字节元素组成的数组，可以有效的在JavasScript中表示二进制数据
Buffer 类的实例类似于从 0 到 255 之间的整数数组（其他整数会通过 ＆ 255 操作强制转换到此范围），但对应于 V8 堆外部的固定大小的原始内存分配。 
Buffer 的大小在创建时确定，且无法更改。

# What is `byte`?
字节(Byte)是计算机存储时的一种计量单位，一个字节等于8位二进制数
一个位就代表一个0或1，每8个位（bit）组成一个字节（Byte）
字节是通过网络传输信息的基本单位
一个字节最大值十进制数是255(2**8-1)

# System
0b 2进制
0x 16进制
0o 8进制

## to decimal system 转10进制
将任意进制字符串转换为十进制
```js
parseInt("11", 2); // 3 2进制转10进制
parseInt("77", 8); // 63 8进制转10进制
parseInt("e7", 16); //231 16进制转10进制
```

## to binary/ octonary/ system转其他进制
将10进制转换为其它进制字符串
```js
(3).toString(2) // "11" 十进制转2进制
(17).toString(16) // "11" 十进制转16进制
(33).toString(32) // "11" 十提制转32进制
0b1010.toString(2) //1010
0b1010.toString(8) //12
0b1010.toString(10) //110
0b1010.toString(16) //a
```
# 定义buffer的三种方式
## 通过长度定义buffer
```js
const b1 = Buffer.alloc(10);
// <Buffer 00 00 00 00 00 00 00 00 00 00>
const b2 = Buffer.alloc(10,20);
// <Buffer 14 14 14 14 14 14 14 14 14 14>

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 且是随机分配的，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
// <Buffer f0 26 df 02 00 00 00 00 e8 3f>
```

## 通过数组定义buffer
```js
const buf4 = Buffer.from([1,2,3]);
console.log(buf4);
// <Buffer 01 02 03>
```

## 字符串创建
```js
// 创建包含UTF-8字节
const buf5 = Buffer.from('中国');
console.log(buf5);
// <Buffer e4 b8 ad e5 9b bd>
```

# base64编码
## 构成
```js
let base64Encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
```
## 规则
8 bits = 6 bits

## 中文 => base64
```js
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
```

# Buffer API
