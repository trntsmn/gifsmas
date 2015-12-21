(function() {
  'use strict';

  angular
    .module('app')
    .directive('captureVideo', captureVideo)
    .directive('captureFile', captureFile)
    .directive('disjointedCapture', disjointedCapture)
    .directive('displayVideo', displayVideo)
    .directive('resize', resize);


  displayVideo.$inject = ['$http', '$routeParams', '$q', 'appService'];
  captureFile.$inject = ['appService', '$anchorScroll'];
  captureVideo.$inject = ['appService'];
  resize.$inject = ["$window", 'appService'];


  function disjointedCapture() {
    return {
      restrict: 'A',
      link: function($scope, element, attrs, controller) {
        element.bind('click', function() {
          document.querySelector('#fileCapture').click();
        });
      }
    }
  }

  function captureFile(appService, $anchorScroll) {
    return {
      controller: "SubmissionController",
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'A',
      link: function($scope, element, attrs, controller) {
        element.bind('change', function(event) {
          var image = angular.element(document.querySelector('#preview'));
          controller.theFile = event.target.files[0];
          if (!controller.theFile.type.match('image.*')) {
            appService.displayWrongFile = true;
            $scope.$apply();
            $anchorScroll.yOffset = 0;
            $anchorScroll("main");
          } else {
            var reader = new FileReader();
            reader.onload = function() {
              var dataBlob = appService.toBlob(reader.result);
              dataBlob.name = 'canvas.png';
              controller.preview(dataBlob);
            }
            $scope.$apply();
            reader.readAsDataURL(controller.theFile);
          }

        });

      }
    };
  }

  function displayVideo($http, $routeParams, $q, appService) {

    return {
      controller: "SubmissionController",
      controllerAs: 'vm',
      //templateUrl: using,
      restrict: "A",
      // scope: {
      //   vm: '='
      // },
      bindToController: true,
      link: link
    };


    function link(scope, video, attrs, controller) {

      appService.width = 1170; // We will scale the photo width to this
      appService.height = 0; // This will be computed based on the input stream
      appService.video = video;
      var streaming = false;
      var canvas = angular.element(document.querySelector('#baseCanvas'));
      var photo = angular.element(document.querySelector('#basePhoto'));
      var fileInput = null;
      var startbutton = null;
      controller.reset = reset;


      var getMedia = Modernizr.prefixed('getUserMedia', navigator);

      getMedia({
          video: true,
          audio: false
        },
        function(stream) {

          if (navigator.mozGetUserMedia) {
            video[0].mozSrcObject = stream;
          } else {
            var vendorURL = window.URL || window.webkitURL;
            video[0].src = vendorURL.createObjectURL(stream);
          }
          video[0].play();
          appService.displayIntro = true;
        },
        function(err) {
          appService.displayError = true;
        }
      );


      video[0].addEventListener('canplay', function(ev) {
        scope.$apply(function() {
          controller.error = false;
          controller.intro = true;
        });
        if (!streaming) {
          appService.height = video.videoHeight / (video.videoWidth / appService.width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
          if (isNaN(appService.height)) {
            appService.height = appService.width / (4 / 3);
          }

          video[0].setAttribute('width', appService.width);
          video[0].setAttribute('height', appService.height);
          canvas[0].setAttribute('width', appService.width);
          canvas[0].setAttribute('height', appService.height);
          streaming = true;
        }
      }, false);

      function reset() {
        controller.appSvc.previewing = false;
        controller.appSvc.overlay = null;
        controller.appSvc.src = null;
        controller.intro = true;
      }
    }
  }




  function captureVideo(appService) {
    return {
      controller: "SubmissionController",
      controllerAs: 'vm',
      restrict: "A",
      bindToController: true,
      link: link
    };


    function link(scope, element, attrs, controller) {
      var canvas = angular.element(document.querySelector('#baseCanvas'));
      var cropCanvas = angular.element(document.querySelector('#cropCanvas'));
      // cropCanvas.height = 682;
      // cropCanvas.width = 1170;
      cropCanvas[0].setAttribute('width', appService.width);
      cropCanvas[0].setAttribute('height', 682);

      element.bind('click', function() {
        console.log("take picture called");
        var context = canvas[0].getContext('2d');
        var cropContext = cropCanvas[0].getContext('2d');

        if (appService.width && appService.height) {
          //canvas.width = width;
          //canvas.height = height;
          context.drawImage(appService.video[0], 0, 0, appService.width, appService.height);
          cropContext.drawImage(canvas[0], 0, 0, 1170, 682, 0, 0,  1170, 682);
          // var overlay = appService.loadImage('/images/1.png', function() {
          //   cropContext.drawImage(overlay, 0, 0, 1170, 682);
          // });

          var data = cropCanvas[0].toDataURL('image/png');
          // setting the photo src creates a faux impression of speed.
          // eventually we'll overwrite with s3's result but since they are
          // the same the user doesn't notice the change.

          appService.src = data;
          var dataBlob = appService.toBlob(data);
          dataBlob.name = 'canvas.png';
          controller.preview(dataBlob);
        } else {
          controller.reset();
        }

      });
    }
  } // End of captureVideo directive




  function resize($window, appService) {
    return {
      restrict: "A",
      link: function (scope, element) {
          var w = angular.element($window);
          console.log("in resize directive");
          scope.getWindowDimensions = function () {

              return {
                  'h': window.innerHeight,
                  'w': window.innerWidth
              };
          };
          scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
              scope.windowHeight = newValue.h;
              scope.windowWidth = newValue.w;
              if(newValue.w >= 1200) {
                console.log('lg screen');
                appService.width = 1170;
              } else if (newValue.w >= 992 && newValue.w < 1200) {
                console.log("md screen");
                appService.width = 970;
              } else if (newValue.w >= 768 && newValue.w < 992 ) {
                console.log('sm screen');
                appService.width = 750;
              } else {
                console.log("xs screen");
                appService.width = newValue.w
              }

              scope.style = function () {
                  return {
                      'height': (newValue.h - 100) + 'px',
                      'width': (newValue.w - 100) + 'px'
                  };
              };

          }, true);

          w.bind('resize', function () {
              scope.$apply();
          });
      }
    }
  } // End of function resize()
})();
