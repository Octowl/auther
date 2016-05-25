'use strict';

app.factory('Auth', function ($http, $log, User) {
    var auth = {};
    var currentuser = null;

    auth.signup = function (user) {
        var user = new user(user);
        return user.save()
            .then(function (founduser) {
                currentuser = founduser;
            });
    };

    auth.login = function (user) {
        return $http.post("/auth/login", user)
            .then(function (res) {
                var founduser = new user(res.data);
                currentuser = founduser;
            });
    };

    auth.logout = function () {
        return $http.get("/auth/logout")
        .then(function(){
            currentuser = null;
        });
    };

    auth.getcurrentuser = function() {
        return currentuser;
    }

    auth.fetchcurrentuser = function(){
        return $http.get("/auth/me").then(function(res){
            var founduser = new user(res.data);
            currentuser = founduser;
        })
            .catch($log.err);
    }

    return auth;
})
