(function() {
  'use strict';

  angular
    .module('app')
    .factory('featureService', featureService);

  featureService.$inject = ["$http"];

  function featureService($http) {
    var service = {
      getTemplate: getTemplate
    };

    return service;

    function getTemplate(content) {
      return $http({
        method: 'GET',
        url: 'app/feature/feature.' + content + '.html',
        cache: true
      }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  }
})();
