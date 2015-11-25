(function() {
  'use strict';

  angular
    .module('app')
    .controller('ErrorController', ErrorController);

  ErrorController.$inject = ['appService', '$routeParams', '$anchorScroll', '$rootScope'];

  function ErrorController(appService, $routeParams, $anchorScroll, $rootScope) {
    var vm = this;
    vm.class = 'error-controller';
    $rootScope.title = "404 Page Not Found - Hiebing Gifsmas";

  }
})();
