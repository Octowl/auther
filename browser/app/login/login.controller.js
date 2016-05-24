app.controller("LoginCtrl", function($scope, $http, $state, $log){
    $scope.submitLogin = function( ){
        $http.post("/login", $scope.user)
            .then(function(res){
                $state.go("stories");
            })
            .catch($log.err);
    }
})