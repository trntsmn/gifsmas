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
      templateUrl: using,
      restrict: "EAC",
      link: link
    };

    /**
     * Detect the appropriate template to use, based on
     * browser capabilities
     */
    function using() {
      if (Modernizr.getusermedia){
        return '/app/submission/video.html';
      }else if (Modernizr.capture) {
        return '/app/submission/input.html';
      } else {
        // This browser supports nothing, what shall we do?
        return '/app/submission/upload.html';
      }
    }

    /**
     * Bind js depending on browser capabilities.
     */
    function link(scope, element, attrs) {
      if (Modernizr.getusermedia){
        video(scope, element, attrs);
      }else if (Modernizr.capture) {
        input(scope, element, attrs);
      } else {
        // This browser supports nothing, what shall we do?
        upload(scope, element, attrs);
      }

    }

    function video(scope, element, attrs) {
      var width = 320; // We will scale the photo width to this
      var height = 0; // This will be computed based on the input stream

      var streaming = false;

      var video = null;
      var canvas = null;
      var photo = null;
      var startbutton = null;

      video = element.find('video');
      canvas = element.find('canvas');
      photo = element.find('img');
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
          console.log("An error occured! " + err);
        }
      );


      video[0].addEventListener('canplay', function(ev) {
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

      startbutton.on('click', function(ev) {
        console.log("clicked");
        takepicture();
        ev.preventDefault();
      });


      // Fill the photo with an indication that none has been
      // captured.

      function clearphoto() {
        var context = canvas[0].getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas[0].toDataURL('image/png');
        photo[0].setAttribute('src', data);
      }

      // Capture a photo by fetching the current contents of the video
      // and drawing it into a canvas, then converting that to a PNG
      // format data URL. By drawing it on an offscreen canvas and then
      // drawing that to the screen, we can change its size and/or apply
      // other changes before drawing it.

      function takepicture() {
        var context = canvas[0].getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video[0], 0, 0, width, height);

          var data = canvas[0].toDataURL('image/png');
          photo[0].setAttribute('src', data);
        } else {
          clearphoto();
        }
      }

      /*
      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM
      }, 1000);
      */
    }

    function input(scope, element, attrs) {

    }

    function upload(scope, element, attrs) {

    }
  }
})();
