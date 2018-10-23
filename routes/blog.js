const blogs = require('../model/blog')

var all = {
    method:'get',
    url:'/blog/all',
    func: function(request, response){
        var blog = blogs.all()

        response.send(blog)
    }
}

var add = {
    method:'post',
    url:'/blog/new',
    func:function(request, response){
        var data = request.body

        if(data.password == '809432147') {
            var blog = blogs.new(data)
            var r = blog
        } else {
            var r = JSON.stringify({ error:'密码错误'})
        }
        response.send(r)
    }
}

var update = {
    method:'post',
    url:'/blog/update',
    func:function(request, response){
        var data = request.body
        var blog = blogs.update(data)

        response.send(blog)
    }
}

var delet = {
    method:'post',
    url:'/blog/delete',
    func:function(request, response){
        var data = request.body
        var blog = blogs.delete(data)

        response.send(blog)
    }
}


var routes = [
    all,
    add,
    update,
    delet,
]

module.exports.routes = routes
