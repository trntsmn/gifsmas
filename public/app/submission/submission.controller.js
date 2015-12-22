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
    vm.displayState = displayState;
    // We don't have constructors yet so here we define a contructor like
    // function and call it early on.
    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");

    }

    function sharing() {
      var cropCanvas = angular.element(document.querySelector('#cropCanvas'));
      var cropContext = cropCanvas[0].getContext('2d');
      var overlay = appService.loadImage('/images/'+appService.overlay+'.png', function() {
        cropContext.drawImage(overlay, 0, 0, 1170, 682);
        var data = cropCanvas[0].toDataURL('image/png');
        var dataBlob = appService.toBlob(data);
        dataBlob.name = 'social.png';
        _getToken(dataBlob, _putSocial);
        console.log('Sharing');
      });
    }

    function displayState(str) {
      var tmp = str.match(/(.*)\.(.*)/)
      console.log("mode is: " + tmp[1] + ' and the variation is: ' + tmp[2]);
      if(str === 'video.1') vm.reset();
      if(str === 'upload.1') vm.reset();
      vm.appSvc.displayMode = tmp[1];
      // this is the sharing mode so we build our sharobject and set the display
      // state when the share object is built.
      if(tmp[2] === '3') {
        vm.appSvc.loading = true;
        sharing();
      } else {
        vm.appSvc.displayState = str;
      }
      vm.appSvc.continuable = false;
    }

    function overlay(layer) {
      vm.appSvc.overlay = layer;
      vm.appSvc.sharing = false; // Hide the share buttons untill we opt for them
      vm.appSvc.continuable = true;
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
      var photo = angular.element(document.querySelector('#basePhoto'));
      if(photo[0] !== undefined) {
        photo[0].src = ''
      }
      vm.theFile = null;
      vm.appSvc.sharing = false;
      vm.appSvc.shareable = false;
      vm.appSvc.overlay = null;
    }
    function clicker() {
      console.log("Clicker from controller");
    }

    function activate(str) {
      if(vm.appSvc.displayMode !== str) {
        if(str == 'upload' && !vm.appSvc.displayState.match('upload.*')) {

          vm.appSvc.displayState = 'upload.1';
        }
        if(str == 'video' && !vm.appSvc.displayState.match('video.*')) {
          vm.appSvc.displayState = 'video.1';
        }
        vm.appSvc.displayMode = str
      }
    }

    function alert(message) {

    }

    function dismiss(butshowupload) {
      if(appService.displayError) {
        appService.displayError = false;
        console.log("Dismissed error message.");
      } else if(appService.displayIntro) {
        appService.displayIntro = false;

        console.log("Dismissed intro message.");
      }else if (appService.displayWrongFile) {
        appService.displayWrongFile = false;
        console.log('Dismissed wrong file warning.');
      }else if(appService.displayUploadIntro && butshowupload !== true) {
        appService.displayUploadIntro = false;
        console.log("Dismissed Upload intro message.");
      } else {

      }
    }

    function preview(file, variation) {
      _getToken(file, _putCanvas, variation);
    }

    function handleError(response) {
      console.log(response);
    }

    function _putCanvas(file, signature, url, variation) {
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
        vm.displayState(variation)
      }, handleError);
    }

    function _putSocial(file, signature, url, variation) {
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
          "link" : "/me/" + vm.appSvc.overlay + "_" + vm.appSvc.srcName,
          'activate': 1350677600, // Dec 21st
          'active': true,
          'image': url,
          'medium': url,
          'thumbnail': url,
          "name": "Hiebing Holiday Elfie",
          "description": "It’s the most GIF-tastic time of the year. Take your own Hiebing Holiday Elfie or check out all 12 Days of Gifsmas."
        };
        vm.gif = vm.appSvc.gif;
        vm.appSvc.loading = false;
        vm.appSvc.displayState = vm.appSvc.displayMode + ".3";
      }, handleError);
    }

    function _getToken(file, callback, variation) {
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
        callback(file, response.data.signature, response.data.url, variation);
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
