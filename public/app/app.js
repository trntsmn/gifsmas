angular
    .module('app', ['ngRoute', 'ngAnimate', 'common.exception', 'common.logger' ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'app/feature/feature.html',
      })
      .when('/day/:id', {
        templateUrl: 'app/feature/feature.html',
        controller: "FeatureController",
        controllerAs: "vm"
      })
      .when('/me/:id', {
        templateUrl: 'app/submission/submission.html',
        controller: "SubmissionController",
        controllerAs: "vm"
      })
      .when('/form', {
        templateUrl: 'views/form.html',
        controller: 'FormController',
        controllerAs: 'form'
      })
      .otherwise({redirectTo: ''});

    }]);
