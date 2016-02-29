var app = angular.module('sc', ['ngRoute'])

app.config(function($routeProvider) {
    $routeProvider
      .when('/store', {
        templateUrl: 'partials/store.html',
        controller: 'StoreController'
      })
      .when('/cart', {
        templateUrl: 'partials/cart.html',
        controller: 'CartController'
      });
});
