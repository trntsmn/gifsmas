(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeatureController', FeatureController)

  FeatureController.$inject = ['appService', '$routeParams', '$anchorScroll', '$rootScope'];

  function FeatureController(appService, $routeParams, $anchorScroll, $rootScope) {
    $rootScope.title = "Hiebing Gifsmas";
    var vm = this;
    vm.class = 'feature-controller';
    vm.supportingTemplate = null;
    vm.gif = null;
    vm.active = false;
    vm.activate = activate;
    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");
      activate();
    }

    function activate() {
      return appService.getActive().then(function(res){
        vm.gif = res;
        vm.active = true;
        $rootScope.title = vm.gif.name + " " + $rootScope.base;
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
