(function() {
  'use strict';

  angular
    .module('app')
    .factory('metaService', metaService);

  metaService.$inject = ['$http', '$routeParams', '$q', 'appService'];

  function metaService($http, $routeParams, $q) {

    var service = {
      getTitle: getTitle,
      getDescription: getDescription,
      getImage: getImage
    };
    return service;

    function getTitle() {
      return $q.when("My Service Title");
    }

    function getDescription() {
      return $q.when("My service desciption");
    }

    function getImage() {
      return $q.when("https://vast-beyond-5642.herokuapp.com/images/gifs/6-image.gif");
    }

  }
})();
