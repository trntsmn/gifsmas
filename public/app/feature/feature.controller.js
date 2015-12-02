(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeatureController', FeatureController)

  FeatureController.$inject = ['appService', '$routeParams', '$anchorScroll', '$rootScope', "$window", "$location"];

  function FeatureController(appService, $routeParams, $anchorScroll, $rootScope, $window, $location) {
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
      $window.ga('send', 'pageview', { page: $location.url() });
      activate();
    }

    function activate() {
      return appService.getActive().then(function(res){
        vm.gif = res;
        vm.active = res === null ? false : true;
        if(vm.active)
          $rootScope.title = vm.gif.id + " " + vm.gif.name + " - " + $rootScope.base;
        else
          window.location = "/404";

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
