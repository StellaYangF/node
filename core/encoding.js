// encoding
// 二进制编码 bit 0 1
// 1 byte = 8 bit
// 共256种状态
// 二进制 0b

// 八进制   0o

// 十六进制 0x


// 十进制 转 任意进制
console.log(0b1010.toString(16));
console.log(0b1010.toString(10));
console.log(0b1010.toString(8));


// 任意进制 转 十进制
console.log(parseInt(1010, 2));
console.log(parseInt(12, 8));
console.log(parseInt(10, 10));
console.log(parseInt('a', 16));