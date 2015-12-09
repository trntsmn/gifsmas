var express = require('express');
var router = express.Router();
var multer  = require('multer')
var aws = require('aws-sdk');
var uuid = require('node-uuid');
var upload = multer({ dest: './uploads/' });
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY :'AKIAIHEVIIVQZIP6Z4XQ';
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY : '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';
var S3_BUCKET = process.env.S3_BUCKET ? process.env.S3_BUCKET :  'gifsmas'

router.get('/', function(req, res, next) {
  res.render('sandbox/index', { title: 'Sandbox Homepage', layout: 'noAngular' });
});

router.get('/jd-test', function(req, res, next) {
  res.render('sandbox/jd-test', { title: 'JD\'s Test Page', layout: 'noAngular' });
});


router.get('/form', function(req, res, next) {
  res.render('sandbox/form', { title: 'Sandbox Form', layout: 'noAngular' });
});

router.get('/social', function(req, res, next) {
  res.render('sandbox/social', { title: 'Sandbox Social', layout: 'noAngular' });
});

router.get('/sign_s3', function(req, res){
    var ext = req.query.file_name.substr((~-req.query.file_name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
    var newName = uuid.v4() + "." + ext;
    req.query.file_name = newName;
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                name: req.query.file_name,
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

router.get('/token', function(req, res){
    console.log(JSON.stringify(req.query));
    var ext = req.query.name.substr((~-req.query.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
    var newName = uuid.v4() + "." + ext;
    req.query.name = newName;
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.name,
        Expires: 60,
        ContentType: req.query.type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error').end();  
        }
        else{
            var output = {
                name: req.query.name,
                signature: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.name
            };
            res.json(output);
            res.end();
        }
    });
});




router.post('/uploads', upload.single('file'), function(req, res){
    console.log(req.body) // form fields
    console.log(req.file) // form file
    res.status(204).end()
});

module.exports = router;
