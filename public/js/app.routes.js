angular.module('app.routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/me', {
    templateUrl: 'views/me.html',
    controller: 'MeController',
    controllerAs: 'me'
  })
  .otherwise({redirectTo: '/'});

}]);
