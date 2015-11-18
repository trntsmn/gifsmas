(function() {
  'use strict';

  angular
    .module('app')
    .factory('socialService', socialService);

  socialService.$inject = ['$http', '$routeParams', '$q', 'appService'];

  function socialService($http, $routeParams, $q) {

    var service = {
      getTitle: getTitle,
      getDescription: getDescription,
      getImage: getImage,
      getUrl: getUrl
    };
    return service;

    function getTitle() {
      return "My Service Title";
    }

    function getDescription() {
      return "My service desciption";
    }

    function getImage() {
      return "https://vast-beyond-5642.herokuapp.com/images/gifs/6-image.gif";
    }

    function getUrl() {
      return 'https://vast-beyond-5642.herokuapp.com/#/day/6';
    }

  }
})();
