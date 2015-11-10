var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/uploads/', function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
});

module.exports = router;
