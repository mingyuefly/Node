const queryString = require('querystring') 
const url = require('url')
const fs = require('fs')

const game = require('./game')   

const express = require('express')
// const { nextTick } = require('process')

var playerWinCount = 0
let playWon = false
let playerLastAction = null
let sameCount = 0

const app = express()

app.get('/favicon.ico', function(request, response) {
    response.status(200)
    response.end()
    return
})

app.get('/game', function(request, response, next) {
    if (playerWinCount >= 3 || sameCount == 9) {
        response.status(500)
        response.send('我再也不和你玩了')
        return
    }
    // 通过next执行后续中间件
    next()
    // 当后续中间件执行完之后，会执行到这个位置
    if (response.playWon) {
        playerWinCount++
    }

}, function(request, response, next) {
    // express自动帮我们把query处理好挂在request上
    const query = request.query
    const playerAction = query.action
    // console.log(playerAction)
    if (!playerAction) {
        response.status(400);
        response.send();
        return;
    }

    if (playerLastAction == playerAction) {
        sameCount++
        if (sameCount >= 3) {
            response.status(400)
            response.send('你作弊！')
            sameCount = 9
            return;
        }
    } else {
        sameCount = 0
    }

    playerLastAction = playerAction;
    // 把用户操作挂在response上传递给下一个中间件
    response.playerAction = playerAction
    next()

}, function(request, response) {
    const playerAction = response.playerAction
    const gameResult = game(playerAction)

    // 如果这里执行setTimeout，会导致前面的洋葱模型失效
    // 因为playerWon不是在中间件执行流程所属的那个事件循环里赋值的
    // setTimeout(()=> {
    response.status(200)
    if (gameResult == 0) {
        response.send('平局') 
    } else if (gameResult == 1) {
        response.send('你赢了')
        response.playWon = true
    } else {
        response.send('你输了')
    }  
    // }, 500) 
})

app.get('/', function(request, response) {
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})

app.listen(3000)












// const queryString = require('querystring') 
// const url = require('url')
// const fs = require('fs')

// const game = require('./game')   

// const express = require('express')

// let playWon = 0
// let playerLastAction = null
// let sameCount = 0

// const app = express()

// // app.use(function(request, response) {

// // })

// app.get('/favicon.ico', function(request, response) {
//     response.writeHead(200)
//     response.end()
//     return
// })

// app.get('/game', function(request, response, next) {
//     const parsedUrl = url.parse(request.url)
//     // console.log(parsedUrl)
//     const query = queryString.parse(parsedUrl.query)
//     const playerAction = query.action
//     // console.log(playerAction)

//     if (playWon >= 3 || sameCount == 9) {
//         response.writeHead(500)
//         response.end('我再也不和你玩了')
//         return
//     }

//     if (playerLastAction && playerLastAction == playerAction) {
//         sameCount++
//     } else {
//         sameCount = 0
//     }

//     playerLastAction = playerAction;
//     response.playerAction = playerAction
//     next()

// }, function(request, response) {
//     const playerAction = response.playerAction
//     if (sameCount >= 3) {
//         response.writeHead(400)
//         response.end('你作弊！')
//     }

//     const gameResult = game(playerAction)
//     response.writeHead(200)
//     if (gameResult == 0) {
//         response.end('平局') 
//     } else if (gameResult == 1) {
//         response.end('你赢了')
//         playWon++
//     } else {
//         response.end('你输了')
//     }   
// })

// app.get('/', function(request, response) {
//     response.writeHead(200)
//     fs.createReadStream(__dirname + '/index.html').pipe(response)
// })

// app.listen(3000)



