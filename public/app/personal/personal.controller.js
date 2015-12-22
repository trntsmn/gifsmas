(function() {
  'use strict';

  angular
    .module('app')
    .controller('PersonalController', PersonalController);

  PersonalController.$inject = ['appService', '$routeParams', '$q', '$rootScope', '$anchorScroll'];

  function PersonalController(appService, $routeParams, $q, $rootScope, $anchorScroll) {
    $rootScope.title = "Be the GIF that keeps on giving";
    var vm = this;
    vm.class = 'personal-controller';
    vm.overlay = null;
    vm.src = null;
    vm.req = null;
    vm.gif = null;
    vm.activate = activate;
    vm.appSvc = appService;
    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");
      vm.req = $routeParams.me
      var tmp = $routeParams.me.match(/(.*)_(.*)/);
      console.log(JSON.stringify(tmp));
      vm.overlay = tmp[1];
      var url = "https://gifsmas.s3.amazonaws.com/" + tmp[2];
      vm.src = url
      vm.appSvc.gif = {
        "id": 1,
        "order": 12,
        "link" : "/me/" + tmp[1] + "_" + tmp[2],
        'activate': 1350677600, // Dec 21st
        'active': true,
        'image': url,
        'medium': url,
        'thumbnail': url,
        "name": "Hiebing Holiday Elfie",
        "description": "It’s the most GIF-tastic time of the year. Take your own Hiebing Holiday Elfie or check out all 12 Days of Gifsmas."
      };
      vm.gif = vm.appSvc.gif;
    }

    // This is just to keep tha api consistant.
    function activate() {
      return $q.when(true);
    }

  }
})();
