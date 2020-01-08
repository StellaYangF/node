const fs = require('fs');
const { resolve } = require('path');
const abstractPath = path => resolve(__dirname, path);

// fs.writeFile(file, data[, options], callback)
fs.writeFile(abstractPath('interest.txt'), Date.now() + '\ndance\n', { flag: 'a' }, () => console.log('OK'));

/**
 * options <Object> | <string>
 *  encoding  <string> | <null> Default: 'utf8'
 *  mode <integer> Default: 0o666 八进制  https://nodejs.org/docs/latest/api/fs.html#fs_fs_writefile_file_data_options_callback
 *  flag <string>  Default: 'w'  https://nodejs.org/docs/latest/api/fs.html#fs_file_system_flags
 *    'a':  Open file for appending. The file is created if it does not exist.
 *    'ax': Like 'a' but fails if the path exists.
 *    'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 *    'wx': Like 'w' but fails if the path exists.
 */