'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<sign-in type="login"></sign-in>'
  });
});
