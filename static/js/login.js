
var bindRegister = function() {
    var registe = e('#id-register')
    bindEvent(registe, 'click', function(event) {
        log('click register')
        var regi = e('#registe')
        var login = e('#submit')
        var target = event.target
        if(target.innerHTML === '注册') {
            target.innerHTML = '登录'
        } else {
            target.innerHTML = '注册'
        }
        toggleClass(regi, 'hide')
        toggleClass(submit, 'hide')
    })
}
var bindSumitRegister = function() {
    var submit = e('#submit')
    var registe = e('#registe')
    var username = e('#username')
    var password = e('#password')
    bindEvent(submit, 'click', function(event) {
        var userValue = username.value
        var pasValue = password.value
        log(userValue, pasValue)
        var user = {
            username: userValue,
            password: pasValue
        }
        login(user, '/login')
    })
    bindEvent(registe, 'click', function(event){
        var userValue = username.value
        var pasValue = password.value
        log(userValue, pasValue)
        var user = {
            username: userValue,
            password: pasValue
        }
        login(user, '/register')
    })
    bindEvent(username, 'click', function(event) {
        username.select()
    })
    bindEvent(password, 'click', function(event) {
        password.select()
    })

}
var login = function(user, url) {
    var data = JSON.stringify(user)
    var request = {
        method: 'POST',
        url: url,
        contentType:'application/json',
        data: data,
        callback: function(response) {
            console.log('响应', response)
            if(response === 'success') {
                location.href = 'http://localhost:8081/index'
            }
            // var res = JSON.parse(response)
            console.log('响应', response)
        }
    }
    ajax(request)
}

var __main = function() {
    bindRegister()
    bindSumitRegister()
}
__main()
