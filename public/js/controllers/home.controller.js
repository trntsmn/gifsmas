(function () {
  // body...
  angular
      .module('app')
      .controller('HomeController', HomeController);

  function HomeController() {
    var viewModel = this;
    viewModel.quest = "Over";
  }

})();
