"use strict";

app.directive("signIn", function($log, $state, Auth){
    return {
        restrict: "E",
        templateUrl: "browser/components/signin/signin.html",
        scope: {
            type: "@"
            //submit: "&"
        },
        link: function (scope){
            console.log(scope.user);
            scope.onSubmit = function(){
                var promise;
                if (scope.type === "login"){
                    promise = Auth.login(scope.user)
                }else if(scope.type === "signup") {
                    promise = Auth.signup(scope.user)
                }
                promise.then(function () {
                    $state.go("stories");
                })
                    .catch($log.err);
            };
        }

    };
})