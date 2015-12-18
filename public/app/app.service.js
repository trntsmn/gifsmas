(function() {
  'use strict';

  angular
    .module('app')
    .factory('appService', appService);

  appService.$inject = ['$http', '$routeParams', '$q'];

  function appService($http, $routeParams, $q) {
    var service = {};
    service.id = null;
    service.overwrite = 'overwrite';
    service.src = null;
    service.previewing = false;
    service.overlay = null;
    service.getList = getList;
    service.getActive = getActive;
    service.readMine = readMine;
    service.setPersonal = setPersonal;
    service.displayIntro = false;
    service.displayError = false;
    service.displayWrongFile = false;


    return service;

    function getActive() {
      if (isPersonal()) {
        return readMine().then(function(response) {
          return _selectActiveGif(response.data);
        })
      } else {
        return getList().then(function(response) {
          return _selectActiveGif(response.data);
        })
      }
    }

    /**
     * Filter cache looks at the url to select the gif from the cache
     * that should be active.
     */
    function _selectActiveGif(cache) {
      var possible = null;
      for (var i = 0; i < cache.length; i++) {
        // This block handles the case where we are view a personal gif
        if ($routeParams.me !== undefined && $routeParams.me == cache[i].id) {
          if(cache[i].active) {
            console.log("never yet");
            return $q.when(cache[i]);
          }
        }
        // This block handles the case where we are viewing the list
        if ($routeParams.id !== undefined && $routeParams.id == cache[i].id) {
          if(cache[i].active) {
            return $q.when(cache[i]);
          } else {
            return $q.when(null);
          }
        }

        if (cache[i].active) {
          if (possible === null) {
            possible = cache[i];
          } else if (possible.order < cache[i].order) {
            possible = cache[i];
          }
        }

      }
      return $q.when(possible);
    }

    function isPersonal() {
      return $routeParams.me === undefined ? false : true;
    }

    function setPersonal(id) {
      this.id = id;
      $routeParams.me = id;
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
        url: '/gifs/mine/' + $routeParams.me,
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
