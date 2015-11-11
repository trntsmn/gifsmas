(function() {
  'use strict';

  angular
    .module('app')
    .directive('supportingTemplate', supportingTemplate);

  supportingTemplate.$inject = ['$compile', 'featureService'];

  function myDirective() {
    return {
      templateUrl: function(elem, attr) {
        return '/app/feature/feature.' + attr.type + '.html';
      },
      restrict: "EAC"
    };
  }


  function supportingTemplate($compile, featureService) {
    return {
      scope: {
        vm: '=' // Two-way data binding,
          //TODO consider using a one-way binding here!
      },
      link: function(scope, element) {
        // Use the FeatureService to load in one of our directive templates
        featureService.getTemplate(scope.vm.supportingTemplate).then(function(response) {
          // Compile the template passing in scope, with the passed
          // scope access controller props using the parent as `vm.myVar`.
          element.append($compile(response.data)(scope));
        });
      }
    };
  }
})();
