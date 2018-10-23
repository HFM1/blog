const filePath = 'db/user.json'

const fs = require('fs')
const ModelUser = function(form) {
    this.username = form.username || ''
    this.password = form.password || ''
    this.create_time = Math.floor(new Date() / 1000)
}

const loadUser = function() {
    var comment = fs.readFileSync(filePath, 'utf-8')
    var users = JSON.parse(comment)
    return users
}

var u = {
    data: loadUser()
}

u.all = function() {
    var users = this.data
    // console.log(users, typeof users)
    return users
}


u.new = function(form) {
    var m = new ModelUser(form)
    var d = this.data[this.data.length - 1]
    if(d === undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m)
    this.save()
    console.log('abcd')
    return m
}

u.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(filePath, s, (err) => {
        if(err !== null) {
            console.log('写入成功')
        } else {
            console.log('写入失败')
        }
    })
}

module.exports = u
