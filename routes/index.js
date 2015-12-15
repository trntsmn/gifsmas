var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })
var fs = require('fs');

// Redirect non-https to https
router.get('*',function(req,res,next){
  if(req.protocol !='https' && server.get('env') === 'production')
    res.redirect('https://'+req.hostname + req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/day*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.render('index');
});


router.get('/me*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.render('index');
});

router.get('/hiebing', function(req, res, next) {
  var fs = require('fs');
  var files;
  fs.readdir('./public/images/selfies', function (err, f) {
    if (err)
      throw err;
    else {
      res.render('hiebing', { title: 'Happy holidays from your friends at Hiebing', layout: 'noAngular', class: 'reverse', selfies: f });
    }
  });

});

router.get('/404*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.status(404);
    res.render('index');
});

router.post('/uploads/', function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
});

module.exports = router;
