(function() {
  'use strict';

  angular
    .module('app')
    .directive('facebookShare', facebookShare)
    .directive('twitterShare', twitterShare)
    .directive('tumblrShare', tumblrShare)
    .directive('pinterestShare', pinterestShare);

  facebookShare.$inject = ['socialService'];
  twitterShare.$inject = ['socialService'];
  tumblrShare.$inject = ['socialService'];
  pinterestShare.$inject = ['socialService'];


  function facebookShare(socialService) {
    //var title = encodeURIComponent(socialService.getTitle());
    //https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Falpha.gifsmas.com%2Fimages%2Fgifs%2F2-img.gif&t=2+Pinterest+Fails
    // https://www.facebook.com/dialog/feed?%20app_id=7970714394%20&display=popup&caption=An%20example%20caption%20&link=http://alpha.gifsmas.com/images/gifs/6-img.gif%20&redirect_uri=http://alpha.gifsmas.com
    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: `<a href="https://www.facebook.com/sharer.php?u={{gif.image | domain | escape}}&t={{gif.id}}%20{{gif.name | escape}}" target="_blank" class="social-icon">
        <img src="/images/social-facebook.svg" alt="Facebook Share ">
        </a>`,
      link: function(scope, element) {
        var button = element.find('a');
        button.on('click', function(event) {
          window.open(button.attr("href"), "", "width=600, height=500");
          event.preventDefault();
          return false;
        });
      }
    };
  }


  function twitterShare(socialService) {
    // var description = encodeURIComponent(socialService.getDescription());
    // var url = socialService.getUrl();
    // var dest = ``;
    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: `<a href="https://twitter.com/intent/tweet?text={{gif.description | escape}}%20{{'/day/'+gif.id | domain}}" target="_blank" class="social-icon">
        <img src="/images/social-twitter.svg" alt="Twitter Share ">
        </a>`
    };
  }

  function tumblrShare(socialService) {
    // var title = encodeURIComponent(socialService.getTitle());
    // var image = encodeURIComponent(socialService.getImage());
    // var description = encodeURIComponent(socialService.getDescription());
    // var url = encodeURIComponent(socialService.getUrl());
    // var dest = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&posttype=photo&content=${image}&caption=${description}&tags=Gifsmas,Hiebing`;

    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: `<a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl={{'/day/'+gif.id | domain | escape}}&posttype=photo&content={{gif.image | domain | escape}}&caption={{gif.description | escape }}&tags=Gifsmas,Hiebing" target="_blank" class="social-icon">
        <img src="/images/social-tumblr.svg" alt="Tumblr Share ">
        </a>`,
        link: function(scope, element) {
          var button = element.find('a');
          button.on('click', function(event) {
            window.open(dest, "", "width=600, height=500");
            console.log("Sharing to: " + dest);
            event.preventDefault();
            return false;
          });
        }
    };
  }

  function pinterestShare(socialService) {
    // var title = encodeURIComponent(socialService.getTitle());
    // var image = socialService.getImage();
    // var url = socialService.getUrl();
    var dest = ``;
    return {
      scope: {
        gif: '='
      },
      restrict: "E",
      template: `<a data-pin-do="buttonPin" data-pin-custom="true"   href="https://www.pinterest.com/pin/create/button/?description={{gif.id}}%20{{gif.name | escape}}&media={{gif.image | domain}}&url={{'/day/'+gif.id | domain}}" target="_blank" class="social-icon"><img src="/images/social-pinterest.svg" alt="Pinterest Sharing"></a>`
    };
  }

})();
