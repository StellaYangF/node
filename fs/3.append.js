const fs = require('fs');
const { resolve } = require('path');
const abstractPath = path => resolve(__dirname, path);

fs.appendFile(abstractPath('interest.txt'), Date.now() + '\n', () => console.log('append OK'));

// fs.appendFile(file, data[, options], callback)