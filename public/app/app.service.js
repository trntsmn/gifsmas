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
    service.srcName = null; // shorthand for last segment of service.src
    service.socialSrc = null;
    service.previewing = false; // Are we in preview mode?
    service.shareable = false; // this flag will display a button to open sharing
    service.sharing = false; // This flag will the display a box with sharing options.
    service.overlay = null;
    service.getList = getList;
    service.getActive = getActive;
    service.readMine = readMine;
    service.setPersonal = setPersonal;
    service.displayIntro = false;
    service.displayError = false;
    service.displayWrongFile = false;
    service.toBlob = toBlob;
    service.loadImage = loadImage;
    service.height = 0;
    service.width = 1170;
    service.video = null;
    service.gif = null;


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
        if(service.gif != null) {
          data[11] = service.gif;
        }
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

    function toBlob(dataUri) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataUri.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataUri.split(',')[1]);
      else
        byteString = unescape(dataUri.split(',')[1]);
      // separate out the mime component
      var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {
        type: mimeString
      });
    }

    function loadImage(src, onload) {
      // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
      var img = new Image();

      img.onload = onload;
      img.src = src;

      return img;
    } // End loadImage();


  }
})();
