const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const log = function() {
    console.log.apply(console, arguments)
}

app.use(bodyParser.json())
app.use(express.static('static'))

var sendHtml = function(path, response) {
    const fs = require('fs')
    const options = {
        encoding: 'utf-8',
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data) {
        if(err === null) {
            // log('data', data)
            response.send(data)
        } else {
            response.send('')
        }
    })
}

app.get('/', function(request, response){
    var path = 'blog_index.html'
    sendHtml(path, response)
})

const registerRoutes = function(app, routes) {
    log('routes', routes, routes.length)
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        var method = route.method
        // log('method', method, typeof method)
        app[method](route.url, route.func)
    }
}

var path = ['./routes/blog', './routes/comment']
var registerRoutesAll = function(app, path) {
    for (var i = 0; i < path.length; i++) {
        var p = path[i]
        const route = require(p)
        registerRoutes(app, route.routes)
    }
}

registerRoutesAll(app, path)


var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    log("应用实例, 访问地址为 http://%s:%s", host, port)

})
