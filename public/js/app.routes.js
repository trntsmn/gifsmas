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
  .when('/form', {
    templateUrl: 'views/form.html',
    controller: 'FormController',
    controllerAs: 'form'
  })
  .otherwise({redirectTo: '/'});

}]);
