const comments = require('../model/comment')


var all = {
    method:'get',
    url:'/comment/all',
    func:function(request, response){
        var comment = comments.all()

        response.send(comment)
    }
}

var add = {
    method:'post',
    url:'/comment/new',
    func:function(request, response){
        var data = request.body
        var blog = comments.new(data)

        response.send(blog)
    }
}

var update = {
    method:'post',
    url:'/comment/update',
    func:function(request, response){
        var data = request.body
        var comment = comments.update(data)

        response.send(comment)
    }
}

var delet = {
    method:'post',
    url:'/comment/delete',
    func:function(request, response){
        var data = request.body
        var comment = comments.delete(data)

        response.send(comment)
    }
}

var routes  = [
    all,
    add,
    update,
    delet,
]

module.exports.routes = routes
