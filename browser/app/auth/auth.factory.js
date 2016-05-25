'use strict';

app.factory('Auth', function ($http, User) {
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
        return $http.post("/login", user)
            .then(function (res) {
                var foundUser = new User(res.data);
                currentUser = foundUser;
            });
    };

    Auth.logout = function () {
        return $http.get("/logout")
        .then(function(){
            currentUser = null;
        });
    };

    Auth.getCurrentUser = function() {
        return currentUser;
    }

    return Auth;
})
