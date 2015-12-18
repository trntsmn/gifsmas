(function() {
  'use strict';

  angular
    .module('app')
    .directive('facebookShare', facebookShare)
    .directive('twitterShare', twitterShare)
    .directive('tumblrShare', tumblrShare)
    .directive('pinterestShare', pinterestShare)
    .directive('linkShare', linkShare);


  function linkShare() {
    return {
      restrict: 'E',
      template: '<a href="/me/1_123.png" target="_blank" class="social-icon"><img src="/images/social-link.svg"</a>'
    }
  }

  function facebookShare() {
    //var title = encodeURIComponent(socialService.getTitle());
    //https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Falpha.gifsmas.com%2Fimages%2Fgifs%2F2-img.gif&t=2+Pinterest+Fails
    // https://www.facebook.com/dialog/feed?%20app_id=7970714394%20&display=popup&caption=An%20example%20caption%20&link=http://alpha.gifsmas.com/images/gifs/6-img.gif%20&redirect_uri=http://alpha.gifsmas.com

    //template: '<a href="https://www.facebook.com/sharer.php?u={{gif.image | domain | escape}}&t={{gif.id}}%20{{gif.name | escape}}" target="_blank" class="social-icon"> <img src="/images/social-facebook.svg" alt="Facebook Share "></a>'


    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a href="https://www.facebook.com/dialog/feed?%20app_id=7970714394%20&display=popup&caption={{gif.description | escape}}%20&link={{gif.image | domain | escape}}&redirect_uri=http://gifsmas.com" target="_blank" class="social-icon"><img src="/images/social-facebook.svg" alt="Facebook Share "> </a>'
    };
  }


  function twitterShare() {
    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a href="https://twitter.com/intent/tweet?text={{gif.description | escape}}%20{{\'/day/\'+gif.id | domain}}" target="_blank" class="social-icon"> <img src="/images/social-twitter.svg" alt="Twitter Share ">  </a>'
    };
  }

  function tumblrShare() {
      return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl={{\'/day/\'+gif.id | domain | escape}}&posttype=photo&content={{gif.image | domain | escape}}&caption={{gif.description | escape }}%20{{\'/day/\'+gif.id | domain | escape}}&tags=Gifsmas,Hiebing" target="_blank" class="social-icon"><img src="/images/social-tumblr.svg" alt="Tumblr Share "></a>',
        link: function(scope, element) {
          var button = element.find('a');
          button.on('click', function(event) {
            window.open(button.attr("href"), "", "width=600, height=500");
            console.log("Sharing to: " + dest);
            event.preventDefault();
            return false;
          });
        }
    };
  }

  function pinterestShare() {
    return {
      scope: {
        gif: '='
      },
      restrict: "E",
      template: '<a data-pin-do="buttonPin" data-pin-custom="true"   href="https://www.pinterest.com/pin/create/button/?description={{gif.description | escape}}&media={{gif.image | domain}}&url={{\'/day/\'+gif.id | domain}}" target="_blank" class="social-icon"><img src="/images/social-pinterest.svg" alt="Pinterest Sharing"></a>'
    };
  }

})();
