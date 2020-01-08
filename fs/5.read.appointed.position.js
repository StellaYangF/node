/** 
 * 1. open
 * 2. read
 * 3. write
 * 4. disc cache sync
 * 5. close
 * 6. copy
*/

const fs = require('fs');
const path = require('path');
const abstractPath = pathname => path.resolve(__dirname, pathname);

// fs.open(abstractPath('age.txt'), 'r', (err, fd) => {
//   err && console.log(err);
//   console.log(fd)
// });  // 3

/** 
 * 打开文件
 * fs.open(path[, flags[, mode]], callback)
 * 'r':   Open file for reading. An exception occurs if the file does not exist.
 * 'r+':  Open file for reading and writing. An exception occurs if the file does not exist.
 * 'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
 *        This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. 
 *        It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.
 * callback fd <file_description>
*/


/** 
 * 读取文件
 * fs.read(fd, buffer, offset, length, position, callback)
*/
// fs.open(abstractPath('name.txt'), (err,fd) => {
//   let buf = Buffer.alloc(6);
//    fs.read(fd, buf, 0, 6, 0,(err, bytesRead, buffer) => {
//      console.log(bytesRead); // 6
//      console.log(buf.toString()); // stella
//    })
// })


/** 
 * 写入文件
 * fs.write(fd, buffer[, offset[, length[, position]]], callback)
*/
// fs.open(abstractPath('name.txt'), 'w' ,(err,fd) => {
//   let buf = Buffer.from('Stella is a girl.');
//   fs.write(fd, buf, 0, 17, 0,(err, bytesWritten, buffer) => {
//      console.log(bytesWritten); // 6
//      console.log(buf.toString()); // stella
//    })
// })


/** 
 * 同步磁盘缓存
 * fs.fsync(fd,[callback]);
 * 
 * 关闭文件
 * fs.close(fd,[callback]);
*/
// let buf =Buffer.from('Hello world!');
// fs.open(abstractPath('fsync.txt'), 'w+', (err, fd) => {
//   fs.write(fd, buf, 0, 12, 0, (err, written, buffer) => {
//     console.log(written);
//     fs.fsync(fd, err => {
//       fs.close(fd, err => console.log('Written done.') )
//     })
//   } )
// })

/** 
 * 拷贝文件
*/
let BUFFER_SIZE = 1;
const copy = (src, dest, callback) => {
  let buf = Buffer.alloc(BUFFER_SIZE);
  fs.open(src, 'r', (err, readFd) => {
    fs.open(dest, 'w', (err, writeFd) => {
      (function read() {
        fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead) => {
          bytesRead && fs.write(writeFd, buf, 0, bytesRead, read);
        })
      })()
    })
  })
}
copy(abstractPath('name.txt'),abstractPath('2.txt'),()=>console.log('ok'));