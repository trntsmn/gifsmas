(function() {
  'use strict';

  angular
    .module('app')
    .directive('captureTemplate', captureTemplate);

  captureTemplate.$inject = ['$http', '$routeParams', '$q'];

  function captureTemplate($http, $routeParams, $q) {
    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    navigator.getMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getMedia({
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      });

    return {
      templateUrl: function(elem, attr) {
        return '/app/personal/capture.html';
      },
      restrict: "EAC"
      
    };


  }
})();
