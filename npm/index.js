/**
 * Node.js 异步编程
 */

(function() {
    var promise = Promise.all([
        interview('geekbang'),
        interview('tencent')
    ]).then(() => {
        console.log('smile')
    }).catch((err) => {
        console.log('cry for ' + err.name)
    })

    function interview(name) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    resolve('success')
                } else {
                    var error = new Error('fail')
                    error.name = name
                    reject(error) 
                }
            }, 500)
        })
    }
})()


// (function() {
//     var promise = interview(1)
//     .then(()=>{
//         return interview(2)
//     })
//     .then(()=>{
//         return interview(3)
//     }).then(()=>{
//         console.log('smile')
//     })
//     .catch((error)=>{
//         console.log('cry at ' + error.round + ' round')
//     })

//     function interview(round) {
//         return new Promise(function(resolve, reject) {
//             setTimeout(() => {
//                 if (Math.random() > 0.2) {
//                     resolve('success')
//                 } else {
//                     var error = new Error('fail')
//                     error.round = round
//                     reject(error) 
//                 }
//             }, 500)
//         })
//     }
// })()


// (function() {
//     var promise = new Promise(function(resolve, reject) {
//         setTimeout(()=>{
//             // resolve(3)
//             reject(new Error('3'))
//         }, 500)
//     }).then(function(res) {
//         console.log(res)
//     }).catch(function(error) {
//         console.log(error)
//     })
    
//     console.log(promise)
    
//     setTimeout(()=>{
//         console.log(promise)
//     }, 800)
// })()






/**
 * Node.js 事件循环
 */

// const eventloop = {
//     queue:[],
//     loop() {
//         while (this.queue.length) {
//             var callback = this.queue.shift()
//             callback()
//         }
//         setTimeout(this.loop.bind(this), 50)
//     },
//     add(callback) {
//         this.queue.push(callback)
//     }
// }

// eventloop.loop();

// setTimeout(() => {
//     eventloop.add(function() {
//         console.log(1)
//     })
// }, 500)

// setTimeout(() => {
//     eventloop.add(function() {
//         console.log(2)
//     })
// }, 800)



// try {
//     interview(function() {
//         console.log('smile')
//     })
// } catch (e) {
//     console.log('cry', e);
// }

// interview(function(error, res) {
//     if (error) {
//         return console.log('cry')
//     }
//     console.log('smile')
// })

// function interview(callback) {
//     setTimeout(() => {
//         if (Math.random() < 0.1) {
//             callback(null, 'success')
//         } else {
//             callback(new Error('fail')) 
//         }
//     }, 500);
// }




/**
 * 非阻塞I/O
 */

// const glob = require('glob');

// console.time('sync')
// const result = glob.sync(__dirname + '/**/*')
// console.timeEnd('sync')
// console.log(result.length)



// console.time('async')
// const result2 = glob(__dirname + '/**/*', function (err, result) {
//     console.log(result.length)
// })
// console.timeEnd('async')
// // IO完成之前还可以做别的事
// console.log('hello geekbang')













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
