'use strict';

app.factory('Auth', function($http, User){
    var Auth = {};

    Auth.signup = function(user){
        var user = new User(user);
        return user.save();
    };

    Auth.login = function(user){
        return $http.post("/login", user)
    };

    return Auth;
})
