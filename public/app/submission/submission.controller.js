(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubmissionController', SubmissionController);

    SubmissionController.$inject = ['appService', '$anchorScroll'];

    function SubmissionController(appService, $anchorScroll) {
        var vm = this;

        vm.getList = getList;
        vm.isActive = isActive;
        vm.gifs = [];
        vm.selectedGif = undefined;
        vm.active = false;
        vm.activate = activate;
        vm.overlay
        vm.clicker = clicker;
        ctor();

        function ctor() {
          $anchorScroll.yOffset = 0;
          $anchorScroll("main");
          activate();
        }

        function clicker() {
          console.log("Clicker from controller");
        }

        function activate() {
            return getList();
        }

        function getList() {
            return appService.getList()
                .then(function(data){
                    return vm.gifs = data.data;
                });
        }

        function isActive(avenger) {
            return !!(vm.selectedGif === avenger);
        }


    }
})();
