const fs = require('fs');
const { resolve } = require('path');
const resolvePath = path => resolve(__dirname, path);

fs.readFile(resolvePath('./name.txt'), 'utf8', (err, data) => console.log('async read:', data));

const data = fs.readFileSync(resolvePath('./name.txt'), 'utf8');
console.log('sync read:', data);

console.log('write');
