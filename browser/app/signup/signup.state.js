'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    template:'<sign-in type="signup"></sign-in>'
  });
});
