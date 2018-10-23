var templateBlog = function(data) {
    var id = data.id
    var title = data.title
    var content = data.content
    var comments = data.comments
    // log('comments', comments)
    var author = data.author
    var d = new Date(data.create_time * 1000)
    var time = d.toLocaleString()
    var t =  `
      <div class="content-main" id=${id}>
          <div class="title">
              <h3>${title}</h3>
          </div>
          <div class="content">
              <p>${content}</p>
          </div>
          <div class="author">
                作者: <author class="class-author">${author}</author>
                <p class="p-vote"><button id=${id} name="vote" class="vote">${comments.length}个评论</button></p>
                <time class="time">${time}</time>
          </div>
          <div class="comment-main hide" id=${id}>
    `
    return t
}

var templateComment = function(data) {
    var id = data.id
    var author = data.author
    var content = data.content

    var d = new Date(data.create_time * 1000)
    var time = d.toLocaleString()
    var t =  `
    <div class="comment">
        <div class="c-author">
            作者：${author}
            <t>${time}</t>
        </div>
        <div class="c-content">
            内容：${content}
        </div>
    </div>
    `
    return t
}

var templateCS = function(blogId) {
    var t = `
      </div>
        <div class="comment-submit hide" id=${blogId}>
            <input type="hidden" value=${blogId}>
            <input type="text" class="input-author" placeholder="输入你的用户名" ><br>
            <textarea class="comment-text" rows="6" cols="20" placeholder="输入你的评论"></textarea>
            <button class=submit-comment>发表评论</button>
        </div>
        </div>

    `
    return t
}

var ajax_all = function(method, path, data, callback) {
    var url = '/' + path
    var request = {
        method: method,
        url:url,
        data:data,
        contentType:'application/json',
        callback: callback
    }
    ajax(request)
}


var loadBlogs = function(blogs) {
    // log('loadBlogs')
    var html = ''
    var foot = e('.foot')
    for (var i = 0; i < blogs.length; i++) {
        // log('loadBlogs')
        var blog = blogs[i]
        var t = templateBlog(blog)
        html += t
        for (var j = 0; j < blog.comments.length; j++) {
            var comment = blog.comments[j]
            var com = templateComment(comment)
            html += com
        }
        var cs = templateCS(blog.id)
        html += cs
    }
    foot.innerHTML = html
}

var blogAll = function() {
    var method = 'GET'
    var path = 'blog/all'
    var data = ''
    ajax_all(method, path, data, function(response){
        // log('response', response, typeof response)
        var blogs = JSON.parse(response)
        // log('blogs', blogs)
        var blog = blogs.reverse()
        loadBlogs(blogs)
    })

}

var insertBlogs = function(blogs) {
    var foot = e('.foot')
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        var t = templateBlog(blog)
        appendHtml(foot, t)
    }
}

var blogNew = function(blog) {
    var data = JSON.stringify(blog)
    var method = 'POST'
    var path = 'blog/new'
    ajax_all(method, path, data, function(response) {
        log(response, typeof response)
        var blogs = JSON.parse(response)
        // log('blogs', blogs)
        if(blogs.error == '密码错误') {
            // log('alert')
            alert('密码错误')
        } else {
            insertBlogs(blog)
        }
        blogAll()
    })
}

// blog 更新
var blogUpdate = function(blog) {
    var data = JSON.stringify(blog)
    var method = 'POST'
    var path = 'blog/update'
    ajax_all(method, path, data, function(response) {
        log('response', response)
        blogAll()
    })
}

var blogDelete = function(blog) {
    var data = JSON.stringify(blog)
    var method = 'POST'
    var path = 'blog/delete'
    ajax_all(method, path, data, function(response) {
        log('response', response)
        blogAll()
    })
}

var bindIndex = function() {
    var index = e('.index')
    var blog = e('.blog')
    var foot = e('.foot')
    var label = e('.label_container')

    bindEvent(index, 'click', function(event){
        // log('index', foot)
        foot.classList.remove('hide')
        label.classList.add('hide')
    })
    bindEvent(blog, 'click', function(event){
        foot.classList.add('hide')
        label.classList.remove('hide')

        // location.reload()
    })
}

var bindArtcle = function() {
    var button = e('.blog-button')
    var foot = e('.foot')
    var label = e('.label_container')

    bindEvent(button, 'click', function(event) {
        // log('click button')
        var mima = e('.blog-mima').value
        var title = e('.blog-title').value
        var author = e('.blog-author').value
        var text = e('.blog-text').value
        var form = {
            password:mima,
            title:title,
            author: author,
            content:text
        }
        // log('form', form)
        blogNew(form)
        foot.classList.remove('hide')
        label.classList.add('hide')
        location.reload()
    })
}

var bindComment = function() {
    var foot = e('.foot')
    bindEvent(foot, 'click', function(event){
        var target = event.target
        var id = target.id
        if(target.name === 'vote') {
            var comment = document.querySelectorAll('.comment-main')
            // log('comment', comment)
            for (var i = 0; i < comment.length; i++) {
                if(comment[i].id == id) {
                    toggleClass(comment[i], 'hide')
                }
            }
            var sub = document.querySelectorAll('.comment-submit')
            for (var i = 0; i < sub.length; i++) {
                if(sub[i].id == id) {
                    toggleClass(sub[i], 'hide')
                    sub[i].children[1].focus()
                }
            }
        }
    })

}

var bindCS = function() {
    var foot = e('.foot')
    bindEvent(foot, 'click', function(event){
        var target = event.target
        var sub = document.querySelectorAll('.submit-comment')
        for (var i = 0; i < sub.length; i++) {
            if(sub[i] == target) {
                // log('sub', target == sub[i])
                var p = target.parentElement
                var id = p.id
                // log('id', id, p.children)
                var author = p.children[1].value
                // log('author', author)
                var text = p.children[3].value
                // log('text', text)
                if(author === '' || text === '') {
                    alert('输入的用户名或者评论为空')
                } else {
                    var ob = {
                        blog_id:id,
                        author:author,
                        content:text,
                    }
                    var method = 'POST'
                    var url = 'comment/new'
                    var data = JSON.stringify(ob)

                    ajax_all(method, url, data, function(response) {
                        log('response', response)
                    })
                }
                location.reload()

            }
        }
    })

}

var commentUpdate = function(ob) {
    let url = 'comment/update'
    let method = 'POST'
    var data = JSON.stringify(ob)
    ajax_all(method, url, data, function(response) {
        log('response', response)
    })
}
var commentDelete = function(ob) {
    let url = 'comment/delete'
    let method = 'POST'
    var data = JSON.stringify(ob)
    ajax_all(method, url, data, function(response) {
        log('response', response)
    })
}

var addAll = function(selector, className) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.add(className)
    }
}

var bindSearch = function() {
    var search = e('#button-search')
    bindEvent(search, 'click', function(event) {
        var input = e('#input-search')
        var v = input.value
        searchTitle(v)
    })
}

var bindInput = function() {
    var input = e('#input-search')
    bindEvent(input, 'keyup', function(event) {
        var v = input.value
        searchTitle(v)
    })

}

var searchTitle = function(text) {
    var titles = document.querySelectorAll('.title')
    addAll('.content-main', 'hide')
    for (var i = 0; i < titles.length; i++) {
        var t = titles[i]
        var inner = t.innerHTML
        if(inner.includes(text)) {
            t.parentElement.classList.remove('hide')
        }
    }

}

var __main = function() {
    blogAll()
    bindIndex()
    bindArtcle()
    bindComment()
    bindCS()
    // bindSearch()
    bindInput()
}
__main()
