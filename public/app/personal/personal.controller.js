(function() {
  'use strict';

  angular
    .module('app')
    .controller('PersonalController', PersonalController);

  PersonalController.$inject = ['appService', '$routeParams'];

  function PersonalController(appService, $routeParams) {
    var vm = this;
    vm.getList = getList;
    vm.isActive = isActive;
    vm.gifs = [];
    vm.selectedGif = undefined;
    vm.title = 'Avengers';

    activate();
    
  }
})();
