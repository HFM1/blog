const e = function(selector) {
    return document.querySelector(selector)
}
const bindEvent = function(element, className, callback) {
    element.addEventListener(className, callback)
}
const log = function() {
    console.log.apply(console, arguments)
}
const toggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
const ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if(request.contentType !== undefined) {
        r.setRequestHeader('content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if(request.method === 'GET') {
        r.send('')
    } else {
        r.send(request.data)
    }
}

const bindAll = function(element, className, callback) {
    var elements = document.querySelectorAll(element)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, className, callback)
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}
