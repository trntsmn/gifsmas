(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubmissionController', SubmissionController);

    SubmissionController.$inject = ['appService'];

    function SubmissionController(appService) {
        var vm = this;

        vm.getList = getList;
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
                .then(function(data){
                    return vm.gifs = data.data;
                });
        }

        function isActive(avenger) {
            return !!(vm.selectedGif === avenger);
        }

        
    }
})();
