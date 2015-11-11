(function() {
  'use strict';

  angular
    .module('app')
    .factory('appService', appService);

  appService.$inject = ['$http', '$routeParams', '$q'];

  function appService($http, $routeParams, $q) {

    var service = {
      getList: getList,
      getActive: getActive,
      readMine: readMine
    };
    return service;

    function getActive() {
      // body...

    }

    function isPersonal() {
      return $routeParams.id === undefined ? $q.when(false) : $q.when(true);
    }

    function getList() {
      return $http({
        method: 'GET',
        url: '/gifs/list',
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

    function readMine() {
      return $http({
        method: 'GET',
        url: '/gifs/mine/' + $routeParams.id,
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
