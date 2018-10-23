
const filePath = 'db/blog.json'

const Modelblog = function(form) {
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''

    this.create_time = Math.floor(new Date() / 1000)

}
const fs = require('fs')
const loadBlogs = function() {
    var content = fs.readFileSync(filePath, 'utf-8')
    var blogs = JSON.parse(content)
    // console.log('content', blogs, typeof blogs)
    return blogs
}

var b = {
    data: loadBlogs()
}

b.all = function() {
    var blogs = this.data
    // console.log(blogs, typeof blogs)
    // 遍历 comment
    const comment = require('./comment')
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var cs = []
        for (var j = 0; j < comments.length; j++) {
            var c = comments[j]
            if(c.blog_id == b.id) {
                cs.push(c)
            }
        }
        b.comments = cs
    }
    return blogs
}

b.new = function(form) {
    var m = new Modelblog(form)
    var d = this.data[this.data.length - 1]
    if(d === undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m)
    this.save()

    return m
}

b.update = function(form) {
    form.create_time = Math.floor(new Date() / 1000)
    var blogs = this.data

    for (var i = 0; i < blogs.length; i++) {
        if(blogs[i].id === form.id) {
            blogs[i].title = form.title
            blogs[i].author = form.author
            blogs[i].content = form.content
            this.save()
            return blogs[i]
        }
    }
}

b.delete = function(form) {

    var blogs = this.data
    const comment = require('./comment')
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        if(blogs[i].id === form.id) {
            var blog = blogs.splice(i, 1)
            console.log('abc', blog, blogs, comments.length)
            this.save()
            for (var i = 0; i < comments.length; i++) {
                console.log(comments,'for')
                if(comments[i].blog_id == form.id) {
                    var com = comments.splice(i, 1)
                    comment.save()
                }
            }
            return blog
        }
    }
}

b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(filePath, s, (err) => {
        if(err !== null) {
            console.log('写入成功')
        } else {
            console.log('写入失败')
        }
    })
}

module.exports = b
