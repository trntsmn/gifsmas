(function () {
  // body...
  angular
      .module('app')
      .controller('FormController', FormController);

  function FormController() {
    var viewModel = this;
    viewModel.quest = "Over";
  }

})();
