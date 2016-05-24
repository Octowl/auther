'use strict';

app.controller("LoginCtrl", function ($scope, $state, $log, Auth) {
    $scope.submitLogin = function () {
        Auth.login($scope.user)
            .then(function () {
                $state.go("stories");
            })
            .catch($log.err);
    }
})
