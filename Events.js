// const EventEmitter = require('events');
const EventEmitter = require('./core/events'); // customized events

function Person () {}

Person.prototype.__proto__ = EventEmitter.prototype;

const p = new Person;

// dispatch auto
// p.on('newListener', type => process.nextTick(() => p.emit(type, "Tom")) );
const fn = who => console.log(`${ who } likes dancing.`);
p.once('happy', fn);
p.on('happy', who => console.log(`${ who } likes shopping.`));
// p.off('happy', fn);

// dispatch in hand
p.emit('happy', 'Tom');
p.emit('happy', 'Tom');

console.log(process.cwd());
console.log(process.memoryUsage());
console.log(process.chdir(""));