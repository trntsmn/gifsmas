(function() {
  'use strict';

  angular
    .module('app')
    .controller('SubmissionController', SubmissionController);

  SubmissionController.$inject = ['appService', '$anchorScroll', '$http', '$scope'];

  function SubmissionController(appService, $anchorScroll, $http, $scope) {
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
    vm.clicker = clicker;
    vm.post = post; // Post handle sending the image and overlay to the server
    vm.alert = alert;
    vm.reset = null; // Rest is pupulated by directive.
    vm.submit = null; // Submit is populated by directive.
    vm.src = null;

    ctor();

    function ctor() {
      $anchorScroll.yOffset = 0;
      $anchorScroll("main");
      activate();

    }

    function clicker() {
      console.log("Clicker from controller");
      vm.src="less stuff";
    }

    function activate() {
      vm.active = true;
    }

    function alert(message) {

    }

    function preview(file) {
      _get_signed_request(file);
    }

    function _upload_file(file, signed_request, url) {
      var xhr = new XMLHttpRequest();

      console.log(vm.src);
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
        if (xhr.status === 200) {
          vm.src = url;
          $scope.$apply();
        }
      };
      xhr.onerror = function() {
        alert("Could not upload file.");
      };
      xhr.send(file);
    }

    function _get_signed_request(file) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/sandbox/sign_s3?file_name=" + file.name + "&file_type=" + file.type);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            _upload_file(file, response.signed_request, response.url);
          } else {
            alert("Could not get signed URL.");
          }
        }
      };
      xhr.send();
    }


    function post(dataUri, overlay) {
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
