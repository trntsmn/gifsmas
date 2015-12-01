(function() {
  'use strict';

  angular
    .module('app')
    .factory('socialService', socialService);

  socialService.$inject = ['$q','appService'];

  function socialService($q, appService) {
    var gif = null;
    var active = false;

    var service = {
      getTitle: getTitle,
      getDescription: getDescription,
      getImage: getImage,
      getUrl: getUrl
    };

    return service;


    function getTitle() {

      return "title";

    }

    function getDescription() {
      return "desc";
    }

    function getImage() {
      return "image";
    }

    function getUrl() {
      return "http://google.com";
    }

  }
})();
