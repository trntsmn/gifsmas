'use strict';

var path = require('path');
var fs = require('fs');


///////////
// Welcome, helpers for the handlebars template engine follow this.
///////////


exports.registerAll = function(hbs, appPath, env) {

  hbs.registerAsyncHelper('svg', function(filename, cb) {
    var tmp = path.join(appPath, "public", filename);
    fs.readFile(tmp, 'utf8', function(err, content) {
      cb(new hbs.SafeString(content));
    });
  });

  hbs.registerHelper('stringify', function(obj){
    var tmp = JSON.stringify(obj, null, 2);
    return new hbs.SafeString(tmp);
  });

  hbs.registerHelper('year', function () {
    return new Date().getFullYear();
  })

  hbs.registerHelper('isProduction', function(block) {
    if(env === 'production')
        return block.fn();
    else
        return block.inverse();
});

}
