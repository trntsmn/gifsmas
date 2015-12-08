'use strict';

var path = require('path');
var fs = require('fs');


///////////
// A simple little function to assist in fomatting a gif object
///////////


exports.format = function(gif) {
  var now = new Date();
  var activate = new Date(gif.activate * 1000);
  if(now > activate) {
    // This is an active gif
    gif.active = true;
    //gif.image = gif.activeImage;
    //gif.thumbnail = gif.activeThumbnail;
  } else {
    //gif.image = null
    //gif.thumbnail = null;
  }
  return gif

}
