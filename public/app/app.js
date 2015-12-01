(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngAnimate', 'common.exception', 'common.logger'])
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
        .when('/me', {
          templateUrl: 'app/submission/submission.html',
          controller: "SubmissionController",
          controllerAs: "vm"
        })
        .when('/form', {
          templateUrl: 'views/form.html',
          controller: 'FormController',
          controllerAs: 'form'
        })
        .when('/404', {
          templateUrl: 'app/error/404.html',
          controller: "ErrorController",
          controllerAs: "vm"
        })
        .otherwise({
          redirectTo: ''
        });
      $locationProvider.html5Mode(true);
    }])
    .directive('animateHeader', ['$animate', '$anchorScroll', function($animate, $anchorScroll){
      return {
        restrict: "EC",
        link: function(scope, element, attrs) {

          angular.element(document).bind('scroll', function(){
            var beenScrolled = false;
            if(window.scrollY > 47) {
              element.addClass('shrink');
            }

            if(window.scrollY < 47) {
              element.removeClass('shrink')

            }
          });

        }
      };
    }])
    .filter('escape', function() { return window.encodeURIComponent;})
    .filter('domain', function() { return function(input) {return "http://alpha.gifsmas.com" + input;};})
     // This sets the default page title
    .run(function($rootScope){$rootScope.base = "Hiebing Gifsmas"});
})();
