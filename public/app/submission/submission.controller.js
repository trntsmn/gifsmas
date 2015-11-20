(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubmissionController', SubmissionController);

    SubmissionController.$inject = ['appService', '$anchorScroll', '$http'];

    function SubmissionController(appService, $anchorScroll, $http) {
        var vm = this;

        vm.gifs = [];
        vm.gif;
        vm.active = false; // Have we run through our initialization
        vm.activate = activate;
        vm.overlay = null; // The overlay selected will be here.
        vm.preview;
        vm.previewing = false; // When we first load the app help text will
                              // appear until we start previewing the animation
        vm.clicker = clicker;
        vm.post = post; // Post handle sending the image and overlay to the server
        vm.alert = alert;
        vm.reset = null; // Rest is pupulated by directive.
        vm.submit = null // Submit is populated by directive.

        ctor();

        function ctor() {
          $anchorScroll.yOffset = 0;
          $anchorScroll("main");
          activate();
        }

        function clicker() {
          console.log("Clicker from controller");
        }

        function activate() {
          active = true;
        }

        function alert(message) {

        }
        /**
         * Private function takes a data uri and converts it to a blob this
         * allows us to send it to the server as mult-part form data.
         */
        function _toBlob(dataUri) {
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
           return new Blob([ia], {type:mimeString});
       }


       /**
        * Private function handles marshalling the post request. Note
        * this method returns a promise with you access from .then()
        */
       function post(dataUri, overlay){
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
