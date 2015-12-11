(function() {
  'use strict';

  angular
    .module('app')
    .controller('PersonalController', PersonalController);

  PersonalController.$inject = ['appService', '$routeParams', '$q', '$rootScope'];

  function PersonalController(appService, $routeParams, $q, $rootScope) {
    $rootScope.title = "Be the GIF that keeps on giving";
    var vm = this;
    vm.class = 'personal-controller';
    vm.overlay = null;
    vm.src = null;
    vm.req = null;
    vm.activate = activate;
    vm.gif = {"id": 1, "name" : $rootScope.title};

    ctor();

    function ctor() {
      vm.req = $routeParams.me
      var tmp = $routeParams.me.match(/(.*)_(.*)/);
      console.log(JSON.stringify(tmp));
      vm.overlay = tmp[1];
      vm.src = "https://gifsmas.s3.amazonaws.com/" + tmp[2];
    }

    // This is just to keep tha api consistant.
    function activate(){
      return $q.when(true);
    }

  }
})();
