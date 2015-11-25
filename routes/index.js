var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

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
