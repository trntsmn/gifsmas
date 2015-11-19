(function() {
  'use strict';

  angular
    .module('app')
    .controller('GridController', GridController)
    .directive('imgNumber', imgNumber);

  GridController.$inject = ['appService'];
  imgNumber.$inject = ['$compile', 'featureService'];

  function GridController(appService) {
    var vm = this;
    vm.getList = getList;
    vm.gifs = [];
    vm.selectedGif = undefined;
    vm.title = 'Take your selfie';

    activate();

    function activate() {
      return getList();
    }

    function getList() {
      return appService.getList()
        .then(function(data) {
          return vm.gifs = data.data;
        });
    }
  }


    function imgNumber($compile, featureService) {
      return {
        scope: {
          id: '@'
        },
        link: function(scope, element) {
              featureService.getSvg(scope.id).then(function(response) {
                // Compile the template passing in scope, with the passed
                // scope access controller props using the parent as `vm.myVar`.
                element.append($compile(response.data)(scope));
              });
        },
        restrict: "E"
      };
    }
})();
