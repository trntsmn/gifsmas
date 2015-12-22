(function() {
  'use strict';

  angular
    .module('app')
    .directive('facebookShare', facebookShare)
    .directive('altFacebookShare', altFacebookShare)
    .directive('twitterShare', twitterShare)
    .directive('tumblrShare', tumblrShare)
    .directive('pinterestShare', pinterestShare)
    .directive('linkShare', linkShare);

    altFacebookShare.$inject = ['appService'];


  function linkShare() {
    return {
      restrict: 'E',
      scope: {
        gif: '='
      },
      template: '<a style="margin-left: 20px;" href="{{gif.link}}" target="_blank" class="social-icon"><img src="/images/social-link.svg" style="width: 40px;" /></a>'
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
      template: '<a href="https://www.facebook.com/dialog/feed?%20app_id=7970714394%20&display=popup&caption={{gif.description | escape}}%20&link={{gif.image | escape}}&redirect_uri=http://gifsmas.com" target="_blank" class="social-icon"><img src="/images/social-facebook.svg" alt="Facebook Share "> </a>'
    };
  }

  function altFacebookShare(appService) {
    //var title = encodeURIComponent(socialService.getTitle());
    //https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Falpha.gifsmas.com%2Fimages%2Fgifs%2F2-img.gif&t=2+Pinterest+Fails
    // https://www.facebook.com/dialog/feed?%20app_id=7970714394%20&display=popup&caption=An%20example%20caption%20&link=http://alpha.gifsmas.com/images/gifs/6-img.gif%20&redirect_uri=http://alpha.gifsmas.com

    //https://www.facebook.com/v2.5/dialog/feed?app_id=7970714394&caption=Hiebing%20Holiday%20Elfie&description=It%E2%80%99s%20the%20most%20GIF-tastic%20time%20of%20the%20year.%20Take%20your%20own%20Hiebing%20Holiday%20Elfie%20or%20check%20out%20all%2012%20Days%20of%20Gifsmas.&display=popup&e2e=%7B%7D&href=%2Fme%2F5_ebcaedf2-7f14-41d5-b3e3-3d350c05ad0f.png&link=%2Fme%2F5_ebcaedf2-7f14-41d5-b3e3-3d350c05ad0f.png&locale=en_US&name=Be%20the%20GIF%20that%20keeps%20on%20giving&next=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df2ceb4b1b4%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff33d4e92e%26relation%3Dopener%26frame%3Df2aeaddbb8%26result%3D%2522xxRESULTTOKENxx%2522&picture=https%3A%2F%2Fgifsmas.s3.amazonaws.com%2Fdf86764d-6be5-4907-8e75-3455ab3073f2.png&sdk=joey&version=v2.5


    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a class="social-icon"><img src="/images/social-facebook.svg" alt="Facebook Share "> </a>',
      link: function(scope, element){
        element.bind('click', function(){
          FB.ui({
            display: 'popup',
            method: 'feed',
            name: 'Be the GIF that keeps on giving',
            link: "https://gifsmas.com" + scope.gif.link,
            href:  "https://gifsmas.com" + scope.gif.link,
            picture: scope.gif.image,
            caption: scope.gif.name,
            description: scope.gif.description
          }, function(response){});
        })
      }
    };
  }

  function twitterShare() {
    return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a href="https://twitter.com/intent/tweet?text={{gif.description | escape}}%20{{gif.link | domain}}" target="_blank" class="social-icon"> <img src="/images/social-twitter.svg" alt="Twitter Share ">  </a>'
    };
  }

  function tumblrShare() {
      return {
      restrict: "E",
      scope: {
        gif: '='
      },
      template: '<a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl={{gif.link | domain | escape}}&posttype=photo&content={{gif.image | escape}}&caption={{gif.description | escape }}%20{{gif.link | domain | escape}}&tags=Gifsmas,Hiebing" target="_blank" class="social-icon"><img src="/images/social-tumblr.svg" alt="Tumblr Share "></a>',
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
      template: '<a data-pin-do="buttonPin" data-pin-custom="true"   href="https://www.pinterest.com/pin/create/button/?description={{gif.description | escape}}&media={{gif.image}}&url={{gif.link | domain}}" target="_blank" class="social-icon"><img src="/images/social-pinterest.svg" alt="Pinterest Sharing"></a>'
    };
  }

})();
