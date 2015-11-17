(function() {
  'use strict';

  angular
    .module('app')
    .directive('ogMeta', ogMeta);

  ogMeta.$inject = ['$compile', '$rootScope', 'metaService'];

  function ogMeta($compile, $rootScope, metaService) {
    var title = "My title";
    var description = "My Desc";
    var image = "https://vast-beyond-5642.herokuapp.com/images/gifs/6-image.gif";

    return {
      link: function(scope, element) {
        var meta = `<meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />`
        angular.element(document).find('head').append($compile(meta)(scope));
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
