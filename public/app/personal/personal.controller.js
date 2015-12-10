(function() {
  'use strict';

  angular
    .module('app')
    .controller('PersonalController', PersonalController);

  PersonalController.$inject = ['appService', '$routeParams', '$q'];

  function PersonalController(appService, $routeParams, $q) {
    var vm = this;
    vm.class = 'personal-controller';
    vm.overlay = null;
    vm.src = null;
    vm.req = null;
    vm.activate = activate;
    vm.gif = {"id": 1, "name" : "Day one"};

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
