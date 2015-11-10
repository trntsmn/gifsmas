var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

router.get('/', function(req, res, next) {
  res.render('sandbox/index', { title: 'Sandbox Homepage', layout: 'noAngular' });
});

router.get('/jd-test', function(req, res, next) {
  res.render('sandbox/jd-test', { title: 'JD\'s Test Page', layout: 'noAngular' });
});


router.get('/form', function(req, res, next) {
  res.render('sandbox/form', { title: 'Sandbox Form', layout: 'noAngular' });
});

router.post('/uploads', upload.single('file'), function(req, res){
    console.log(req.body) // form fields
    console.log(req.file) // form file
    res.status(204).end()
});

module.exports = router;
