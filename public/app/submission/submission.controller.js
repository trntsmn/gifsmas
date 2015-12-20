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
    vm.showing = 'upload' // [video|upload|input]
    vm.clicker = clicker;
    vm.dismiss = dismiss;
    vm.preview = preview;
    vm.overlay = overlay;
    vm.reset = reset;
    vm.sharing = sharing;
    vm.base = null;
    vm.fileInput = null;
    vm.theFile;
    vm.appSvc = appService;
    vm.resetFile = resetFile;
    // We don't have constructors yet so here we define a contructor like
    // function and call it early on.
    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");
      if (Modernizr.getusermedia) {
        vm.activate('video');
      } else if (Modernizr.capture) {
        vm.activate('input');
      } else {
        // BOOM upload form
        vm.activate('upload');
      }
    }

    function sharing(display) {
      console.log('Called sharing with ' + display);
      if(display == true) {
        var cropCanvas = angular.element(document.querySelector('#cropCanvas'));
        var cropContext = cropCanvas[0].getContext('2d');
        var overlay = appService.loadImage('/images/1.png', function() {
          cropContext.drawImage(overlay, 0, 0, 1170, 682);
          var data = cropCanvas[0].toDataURL('image/png');
          var dataBlob = appService.toBlob(data);
          dataBlob.name = 'social.png';
          console.log('sharing');
          _getToken(dataBlob, _putSocial);
        });

      }
    }

    function overlay(layer) {
      vm.appSvc.overlay = layer;
      vm.appSvc.sharing = false; // Hide the share buttons untill we opt for them
      if(vm.appSvc.previewing) {
        // vm.appSvc.buildShareImage().then(function(){
        //   vm.appSvc.s
        // })
        vm.appSvc.shareable = true;
      }
    }

    function resetFile() {
      vm.theFile = null;
    }
    function reset() {
      vm.dismiss();
      var photo = angular.element(document.querySelector('#basePhoto'));
      photo[0].src = ''
      vm.theFile = null;
      vm.appSvc.sharing = false;
      vm.appSvc.shareable = false;
      console.log('called reset');
      vm.appSvc.overlay = null;
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
      if(appService.displayError) {
        appService.displayError = false;
        console.log("Dismissed error message.");
      }
      if(appService.displayIntro) {
        appService.displayIntro = false;
        console.log("Dismissed intro message.");
      }
      if(appService.displayWrongFile) {
        appService.displayWrongFile = false;
        console.log('Dismissed wrong file warning.');
      }
    }

    function preview(file) {
      vm.dismiss();
      _getToken(file, _putCanvas);
    }

    function handleError(response) {
      console.log(response);
    }

    function _putCanvas(file, signature, url) {
      vm.appSvc.srcName = file.name;
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
        vm.appSvc.src = url;
        vm.appSvc.previewing = true;
        vm.appSvc.shareable = vm.appSvc.overlay ? true : false;
      }, handleError);
    }

    function _putSocial(file, signature, url) {
      console.log("put social");
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
        vm.appSvc.socialSrc = url;
        vm.appSvc.gif = {
          "id": 1,
          "order": 12,
          "link" : "me/" + vm.appSvc.overlay + "_" + vm.appSvc.srcName,
          'activate': 1350677600, // Dec 21st
          'active': false,
          'image': url,
          'medium': url,
          'thumbnail': url,
          "name": "Hiebing Holiday Elfie",
          "description": "It’s the most GIF-tastic time of the year. Take your own Hiebing Holiday Elfie or check out all 12 Days of Gifsmas."
        };
        vm.gif = vm.appSvc.gif;
        vm.appSvc.sharing = true;
      }, handleError);
    }

    function _getToken(file, callback) {
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
        callback(file, response.data.signature, response.data.url);
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
