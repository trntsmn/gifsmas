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
        .otherwise({
          redirectTo: ''
        });

    }])
    .directive('animateHeader', ['$animate', '$anchorScroll', function($animate, $anchorScroll){
      return {
        restrict: "EC",
        link: function(scope, element, attrs) {

          angular.element(document).bind('scroll', function(){
            console.log("scrolling");
            var beenScrolled = false;
            if(window.scrollY > 47) {
              element.addClass('shrink');
            }

            if(window.scrollY < 47) {
              console.log("grow");
              element.removeClass('shrink')

            }
          });

        }
      };
    }]);
})();
