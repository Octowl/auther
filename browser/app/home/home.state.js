'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/browser/app/home/home.html',
    controller: function(Auth){
      if (!Auth.getCurrentUser()) {
        Auth.fetchCurrentUser();
      };
    }
  });
});
