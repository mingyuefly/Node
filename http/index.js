const queryString = require('querystring') 
const http = require('http')
const url = require('url')
const fs = require('fs')

const game = require('./game')   

let playWon = 0
let playerLastAction = null
let sameCount = 0

http.createServer(function(request, response) {
    const parsedUrl = url.parse(request.url)
    // console.log(parsedUrl)
    if (parsedUrl.pathname == '/favicon.ico') {
        response.writeHead(200)
        response.end()
        return
    }
    if (parsedUrl.pathname == '/game') {
        const query = queryString.parse(parsedUrl.query)
        const playerAction = query.action
        // console.log(playerAction)

        if (playWon >= 3 || sameCount == 9) {
            response.writeHead(500)
            response.end('我再也不和你玩了')
            return
        }

        if (playerLastAction && playerLastAction == playerAction) {
            sameCount++
        } else {
            sameCount = 0
        }

        playerLastAction = playerAction;

        if (sameCount >= 3) {
            response.writeHead(400)
            response.end('你作弊！')
        }

        const gameResult = game(playerAction)
        response.writeHead(200)
        if (gameResult == 0) {
            response.end('平局')
        } else if (gameResult == 1) {
            response.end('你赢了')
            playWon++
        } else {
            response.end('你输了')
        }
    }
    if (parsedUrl.pathname == '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(response)
    }
}).listen(3000)