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
- Binary system: 0b 2进制
- Hexadecimal system:0x 16进制
- Octonary system:0o 8进制
- Decimal system: 0 10进制


## to decimal system 转10进制
将任意进制字符串转换为十进制
```js
parseInt("11", 2); // 3 2进制转10进制
parseInt("77", 8); // 63 8进制转10进制
parseInt("e7", 16); //231 16进制转10进制
```

## to binary/ octonary/ hexadecimal system转其他进制
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
## 1.slice截取 
```js
console.log(buff1);
// <Buffer e5 b0 8f>
console.log(buff1.slice(1));
// <Buffer b0 8f>
```

## 2.isBuffer 是不是buffer 
```js
console.log(Buffer.isBuffer(buff1));
// true
```

## 3.toString (可以将buffer转成指定的编码)  
```js
// 默认是 utf8
console.log(buff1.toString()); // 小
// base64
console.log(buff1.toString('base64')); // 5bCP
```

## 4.length (字节的长度)  
`buf.toString([encoding[, start[, end]]])`
```js
console.log(buf.byteLength); 
console.log(buf.length); 
// 6
```

## 5.重写的方法  拷贝的方法  拼接的方法
`buf.write(string[, offset[, length]][, encoding])`
```js
const buff3 = Buffer.from('我来自中国');
console.log(buff3);
buff3.write('他', 0, 3, 'utf8');
console.log(buff3.toString());
```

## 6.copy => concat 拼接方法
### buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
```js
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
```
### Buffer.concat(list[, totalLength])
```js
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
```

## 7.indexOf => split方法
### buf.indexOf(value[, byteOffset][, encoding])
```js
let buffer = Buffer.from('我爱你我爱你我爱你');
console.log(buffer.indexOf('爱', 24)); // 12 找不到就是 -1
```

### 实现split方法
```js
let buffer = Buffer.from('我爱你我爱你我爱你');

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
```