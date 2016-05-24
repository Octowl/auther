'use strict';

app.controller("SignupCtrl", function ($scope, $state, $log, Auth) {
    $scope.submitSignup = function () {
        Auth.signup($scope.user)
        .then(function() {
            $state.go('stories');
        })
        .catch($log.err);
    }
})
