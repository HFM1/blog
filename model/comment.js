const filePath = 'db/comment.json'

const ModelComment = function(form) {
    this.author = form.author || ''
    this.content = form.content || ''
    this.blog_id = form.blog_id || ''
    this.create_time = Math.floor(new Date() / 1000)
}

const fs = require('fs')
const loadComment = function() {
    var contents = fs.readFileSync(filePath, 'utf-8')
    var comment = JSON.parse(contents)
    return comment
}

var c = {
    data: loadComment()
}

c.all = function() {
    // console.log('body', body)
    var comments = this.data
    return comments
}

c.new = function(form) {
    var m = new ModelComment(form)
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

c.update = function(form) {
    form.create_time = Math.floor((new Date() / 1000))
    const blogs = require('./blog')
    for (var i = 0; i < this.data.length; i++) {
        if(this.data[i].id = form.id) {
            // console.log('update')
            this.data[i].author = form.author
            this.data[i].content = form.content
            this.data[i].blog_id = form.blog_id
            this.save()
            for (var i = 0; i < blogs.length; i++) {
                blogs[i].comments = {}
            }
            return form
        }
    }
}

c.delete = function(form) {
    var comments = this.data
    // console.log('delete1')
    for(var i = 0; i < comments.length; i++) {
        // console.log('delete for')
        if(comments[i].id == form.id) {
            var comment = comments.splice(i, 1)
            // console.log('comment', comment, this.data)
            // this.data = comments
            this.save()
            return comment
        }
    }
}


c.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(filePath, s, (err) => {
        if(err !== null) {
            console.log('写入失败')
        } else {
            console.log('写入成功')
        }
    })
}

module.exports = c
