

/**
 * 非阻塞I/O
 */

const glob = require('glob');

console.time('sync')
const result = glob.sync(__dirname + '/**/*')
console.timeEnd('sync')
console.log(result.length)



console.time('async')
const result2 = glob(__dirname + '/**/*', function (err, result) {
    console.log(result.length)
})
console.timeEnd('async')
// IO完成之前还可以做别的事
console.log('hello geekbang')













/**
 * Node.js内置模块，event事件
 */

// const EventEmitter = require('events').EventEmitter

// class Geektime extends EventEmitter {
//     constructor() {
//         super()
//         setInterval(() => {
//             this.emit('newlesson', {price: Math.random() * 100})
//         }, 3000);
//     }
// }

// const geektime = new Geektime

// geektime.addListener('newlesson', (res) => {
//     console.log('yeah!', res)
// })
