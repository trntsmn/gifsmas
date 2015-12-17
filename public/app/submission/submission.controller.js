(function() {
  'use strict';

  angular
    .module('app')
    .controller('SubmissionController', SubmissionController);

  SubmissionController.$inject = ['appService', '$anchorScroll', '$http', '$scope', '$location', '$rootScope'];

  function SubmissionController(appService, $anchorScroll, $http, $scope, $location, $rootScope) {
    $rootScope.title = "Be the GIF that keeps on giving";
    var vm = this;
    vm.class = "submission-controller";
    vm.gifs = [];
    vm.gif;
    vm.active = false; // Have we run through our initialization
    vm.activate = activate;
    vm.overlay = null; // The overlay selected will be here.
    vm.preview = preview;
    vm.previewing = false; // When we first load the app help text will
                      // appear until we start previewing the animation
    vm.showing = 'video' // [video|upload|input]
    vm.clicker = clicker;
    vm.dismiss = dismiss;
    vm.intro = false;
    vm.alert = alert;
    vm.error = false;
    vm.message = null;
    vm.reset = null; // Rest is pupulated by directive.
    vm.snap = null; // Submit is populated by directive.
    vm.src = null;
    vm.placeholder = "/images/placeholder.gif";
    vm.base = null;
    // We don't have constructors yet so here we define a contructor like
    // function and call it early on.
    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");

      if (Modernizr.getusermedia) {
        activate('video');
      } else if (Modernizr.capture) {
        activate('input');
      } else {
        // BOOM upload form
        activate('upload');
      }
    }

    function clicker() {
      console.log("Clicker from controller");
    }

    function activate(str) {
      vm.active = true;
      if(vm.showing !== str) {
        vm.dismiss();
      }
      vm.showing = str;
    }

    function alert(message) {

    }

    function dismiss() {
      if(vm.error) {
        vm.error = false;
        console.log("Dismissed error message.");
      }
      if(vm.intro) {
        vm.intro = false;
        console.log("Dismissed intro message.");
      }
    }

    function preview(file) {
      vm.dismiss();
      _getTokenAndPut(file);
      vm.previewing = true;

    }

    function handleError(response) {
      console.log(response);
    }

    function _putFile(file, signature, url) {
      var req = {
        method: 'PUT',
        url: signature,
        responseType: 'json',
        headers: {
          'x-amz-acl': 'public-read',
          'Content-Type': file.type != '' ? file.type : 'application/octet-stream'
        },
        data: file
      };
      $http(req).then(function(response) {
        vm.src = url;
      }, handleError);
    }

    function _getTokenAndPut(file) {
      var req = {
        method: 'GET',
        url: '/sandbox/token',
        responseType: 'json',
        params: {
          name: file.name,
          type: file.type
        }
      };
      $http(req).then(function(response) {
        file.name = response.data.name;
        _putFile(file, response.data.signature, response.data.url);
      }, handleError);
    }

    // Depricated. Left as an example for how to post back to server.
    function _postUrl(dataUri, overlay) {
      var formData = new FormData();
      var blob = _toBlob(dataUri);
      formData.append("file", blob, "filename.jpg");
      formData.append('overlay', overlay);
      return $http({
        method: 'POST',
        url: 'gifs/create/',
        data: formData
      }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("error posting file" + data);
      });

      //  var request = new XMLHttpRequest();
      //
      //  request.open("POST", "/gifs/create");
      //  request.send(formData);
    }

    var base64Image = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBIAEgAAD/4TItaHR0cDovL25zLmFk=";

  }
})();
