const fs = require('fs');
const { resolve } = require('path');
const abstractPath = path => resolve(__dirname, path);

fs.copyFile = (src, dest, callback) => {
  fs.readFile(src, (err, data) => {
    console.log('customized copy OK');
    fs.writeFile(dest, data, callback);
  })
}

fs.copyFile(abstractPath('name.txt'), abstractPath('name1.txt'), () => console.log('copy OK'));