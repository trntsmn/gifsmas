(function() {
  'use strict';

  angular
    .module('app')
    .directive('captureTemplate', captureTemplate)
    .directive('cameraLightbox', cameraLightbox);




  captureTemplate.$inject = ['$http', '$routeParams', '$q'];

  /**
   * This isn't used just, left as an example.
   */
  function cameraLightbox() {
    return {
      template: '<video>Video stream not available.</video>',
      restrict: 'E' // This is a Html element <camera-lightbox></camera-lightbox>
        // could also be 'A' for attribute or 'C' for class.
    }
  }

  function captureTemplate($http, $routeParams, $q) {

    return {
      controller: "SubmissionController",
      controllerAs: 'vm',
      templateUrl: using,
      restrict: "EAC",
      scope: {},
      bindToController: {
        vm: '=',
      },
      link: link
    };

    function clicker() {
      console.log("Clicker from directive scope.");
    }

    /**
     * Detect the appropriate template to use, based on
     * browser capabilities
     */
    function using() {
      return '/app/submission/video.html';
    }

    /**
     * Bind js depending on browser capabilities.
     */
    function link(scope, element, attrs, controller) {
      console.log(controller.showing);
      if (controller.showing === 'video') {
        video(scope, element, attrs, controller);
      } else if (controller.showing === 'input') {
        input(scope, element, attrs, controller);
      } else {
        upload(scope, element, attrs, controller);
      }

    }

    function video(scope, element, attrs, controller) {
      var width = 1170; // We will scale the photo width to this
      var height = 0; // This will be computed based on the input stream
      var streaming = false;
      var video = null;
      var canvas = null;
      var photo = null;
      var startbutton = null;
      controller.reset = reset;
      controller.snap = takepicture;

      video = element.find('video');
      canvas = element.find('canvas');
      photo = element.find('blockquote').find("img");
      startbutton = element.find('button');

      //clearphoto();

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

        },
        function(err) {
          controller.error = true;
          controller.message = "<h2>Could not access camera.</h2> <h3>Please allow access or <a data-ng-click='vm.activate(\"upload\")'>upload an existing photo</a>.</h3>"
        }
      );


      video[0].addEventListener('canplay', function(ev) {
        scope.$apply(function(){
          controller.error = false;
          controller.intro = true;
        });
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video[0].setAttribute('width', width);
          video[0].setAttribute('height', height);
          canvas[0].setAttribute('width', width);
          canvas[0].setAttribute('height', height);
          streaming = true;
        }
      }, false);


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


      // Capture a photo by fetching the current contents of the video
      // and drawing it into a canvas, then converting that to a PNG
      // format data URL. By drawing it on an offscreen canvas and then
      // drawing that to the screen, we can change its size and/or apply
      // other changes before drawing it.
      function takepicture() {
        var context = canvas[0].getContext('2d');
        if (width && height) {
          //canvas.width = width;
          //canvas.height = height;
          context.drawImage(video[0], 0, 0, width, 682);



          var overlay = loadImage('/images/1.png', function(){
            canvas.height = 682;
            context.drawImage(overlay, 0, 0, 1170, 682, 0, 0, 1170, 682);
          });





          var data = canvas[0].toDataURL('image/png');
          //photo[0].setAttribute('src', data);
          var dataBlob = toBlob(data);
          dataBlob.name = 'canvas.png';
          controller.preview(dataBlob);
        } else {
          controller.reset();
        }
      }

      function reset() {
        controller.previewing = false;
        controller.overlay = null;
        controller.src = null;
        controller.intro = true;
      }

      function loadImage(src, onload) {
          // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
          var img = new Image();

          img.onload = onload;
          img.src = src;

          return img;
      } // End loadImage();
    } // END function video()

    function input(scope, element, attrs, controller) {

    } // END function input()

    function upload(scope, element, attrs, controller) {

    } // END function upload()


  }
})();
