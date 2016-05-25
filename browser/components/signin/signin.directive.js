"use strict";

app.directive("signIn", function ($log, $state, Auth) {
    return {
        restrict: "E",
        templateUrl: "browser/components/signin/signin.html",
        scope: {
            type: "@"
        },
        link: function (scope) {
            scope.onSubmit = function () {
                Auth[scope.type](scope.user)
                    .then(function () {
                        $state.go("stories");
                    })
                    .catch($log.err);
            };
        }
    };
})
