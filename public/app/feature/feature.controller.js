(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeatureController', FeatureController)

  FeatureController.$inject = ['appService', '$routeParams'];

  function FeatureController(appService, $routeParams) {
    var vm = this;
    vm.getList = getList;
    vm.supportingTemplate = undefined;
    vm.isActive = isActive;
    vm.gifs = [];
    vm.selectedGif = undefined;
    vm.title = 'Avengers';

    activate();

    function activate() {
      return getList();
    }

    function getList() {
      return appService.getList()
        .then(function(data) {
          vm.gifs = data.data;
          for (var i = 0; i < vm.gifs.length; i++) {
            console.log(vm.gifs[i].id + " and " + $routeParams.id);
            if(vm.gifs[i].id == $routeParams.id) {
              vm.selectedGif = vm.gifs[i];
            }
          }
        });
    }

    function isActive(avenger) {
      return !!(vm.selectedGif === avenger);
    }
  }
})();
