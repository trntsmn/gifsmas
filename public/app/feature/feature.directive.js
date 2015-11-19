(function() {
  'use strict';

  angular
    .module('app')
    .directive('supportingTemplate', supportingTemplate)
    .directive('renderSvg', renderSvg)
    .directive('animate', animate);

  supportingTemplate.$inject = ['$compile', 'featureService'];
  renderSvg.$inject = ['$compile', 'featureService'];
  animate.$inject = ['$animate']

  function animate($animate) {
    return {
      restrict: "EC",
      link: function(scope, element, attrs) {
        var promise = $animate.addClass(element, 'middle');

        promise.then(function() {
            element.removeClass('begining');
        });
        scope.$on("$destroy", function() {
          $animate.addClass(element, 'end');
        });
      }
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

  function renderSvg($compile, featureService) {
    return {
      scope: {
        vm: '='
      },
      link: function(scope, element) {
        if(!scope.vm.active) {
          scope.vm.activate().then(function(data) {
            featureService.getSvg(scope.vm.gif.id).then(function(response) {
              // Compile the template passing in scope, with the passed
              // scope access controller props using the parent as `vm.myVar`.
              element.append($compile(response.data)(scope));
            });
          })
        } else {
          featureService.getSvg(scope.vm.gif.id).then(function(response) {
            // Compile the template passing in scope, with the passed
            // scope access controller props using the parent as `vm.myVar`.
            element.append($compile(response.data)(scope));
          });
        }

      },
      restrict: "E"
    };
  }
})();
