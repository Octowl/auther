'use strict';

app.factory('Auth', function ($http, $log, User) {
    var Auth = {};
    var currentUser = null;

    Auth.signup = function (user) {
        var user = new User(user);
        return user.save()
            .then(function (foundUser) {
                currentUser = foundUser;
            });
    };

    Auth.login = function (user) {
        return $http.post("/auth/login", user)
            .then(function (res) {
                var foundUser = new User(res.data);
                currentUser = foundUser;
            });
    };

    Auth.logout = function () {
        return $http.get("/auth/logout")
        .then(function(){
            currentUser = null;
        });
    };

    Auth.getCurrentUser = function() {
        return currentUser;
    }

    Auth.fetchCurrentUser = function(){
        return $http.get("/auth/me").then(function(res){
            var foundUser = new User(res.data);
            currentUser = foundUser;
        })
            .catch($log.err);
    }

    return Auth;
})
