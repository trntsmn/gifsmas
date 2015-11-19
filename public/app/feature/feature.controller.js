(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeatureController', FeatureController)

  FeatureController.$inject = ['appService', '$routeParams', '$anchorScroll'];

  function FeatureController(appService, $routeParams, $anchorScroll) {
    var vm = this;
    vm.supportingTemplate = null;
    vm.gif = null;
    vm.active = false;
    $anchorScroll.yOffset = 0;
    $anchorScroll("main");
    vm.activate = activate;
    ctor();

    function ctor() {
      activate();
    }

    function activate() {
      return appService.getActive().then(function(res){
        vm.gif = res;
        vm.active = true;
      });
    }

    function getList() {
      return appService.getList()
        .then(function(data) {
          vm.gifs = data.data;
          for (var i = 0; i < vm.gifs.length; i++) {
            if(vm.gifs[i].id == $routeParams.id) {
              vm.selectedGif = vm.gifs[i];
            }
          }
        });
    }
  }
})();
