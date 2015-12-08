var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
var gifHelper = require('../helpers/gifObjectHelper');


//TODO replace with mongoDb...
var gifsDb =
[{
    "id": 12,
    "order": 1,
    'activate': 1447175235,
    'active': false,
    'image': '/images/gifs/12-img.gif',
    'medium': '/images/gifs/12-img-md.gif',
    'thumbnail': '/images/gifs/12-th.jpg',
    "name": "Ugly Sweaters",
    "description": "12 Ugly Sweaters: Find all the ugly sweater inspiration you need with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 11,
    "order": 2,
    'activate': 1449468000,
    'active': false,
    'image': '/images/gifs/11-img.gif',
    'medium': '/images/gifs/11-img-md.gif',
    'thumbnail': '/images/gifs/11-th.jpg',
    "name": "Looming Deadlines",
    "description": "11 Looming Deadlines: Cool off from all those hot deadlines with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 10,
    "order": 3,
    'activate': 1449554400,
    'active': false,
    'image': '/images/gifs/10-img.gif',
    'medium': '/images/gifs/10-img-md.gif',
    'thumbnail': '/images/gifs/10-th.jpg',
    "name": "Tangled Lights",
    "description": "10 Tangled Lights: Step one: Untangle. Step two: Give up and check out all 12 Days of Hiebing Gifsmas."
},{
    "id": 9,
    "order": 4,
    'activate': 1449640800,
    'active': false,
    'image': '/images/gifs/9-img.gif',
    'medium': '/images/gifs/9-img-md.gif',
    'thumbnail': '/images/gifs/9-th.jpg',
    "name": "Kitties Caroling",
    "description": "9 Kitties Caroling: Kitty carols, where every note’s a high note. Check out Hiebing’s 12 Days of Gifsmas."
},{
    "id": 8,
    "order": 5,
    'activate': 1449727200, // Dec 10th
    'active': false,
    'image': '/images/gifs/8-img.gif',
    'medium': '/images/gifs/8-img-md.gif',
    'thumbnail': '/images/gifs/8-th.jpg',
    "name": "Reindeers Twerking",
    "description": "8 Reindeers Twerking: They’re staying warm by burning up the dance floor. Check out all 12 Days of Hiebing Gifsmas."
},{
    "id": 7,
    "order": 6,
    'activate': 1449813600, // Dec 11th
    'active': false,
    'image': '/images/gifs/7-img.gif',
    'medium': '/images/gifs/7-img-md.gif',
    'thumbnail': '/images/gifs/7-th.jpg',
    "name": "Surly Santas",
    "description": "7 Surly Santas: Feeling surly? Hiebing’s 12 Days of Gifsmas should cheer you right up."
},{
    "id": 6,
    "order": 7,
    'activate': 1450072800, // dec 14th
    'active': false,
    'image': '/images/gifs/6-img.gif',
    'medium': '/images/gifs/6-img-md.gif',
    'thumbnail': '/images/gifs/6-th.jpg',
    "name": "Regiftceptions",
    "description": "6 Regiftceptions: You thought that Crock-Pot looked familiar… Work through the trauma of regifts with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 5,
    "order": 8,
    'activate': 1450159200, // Dec 15h
    'active': false,
    'image': '/images/gifs/5-img.gif',
    'medium': '/images/gifs/5-img-md.gif',
    'thumbnail': '/images/gifs/5-th.jpg',
    "name": "Cookies Later",
    "description": "5 Cookies Later: Five cookies later…we all know the feeling. Stay in the holiday spirit with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 4,
    "order": 9,
    'activate': 1450245600, // Dec 16th
    'active': false,
    'image': '/images/gifs/4-img.gif',
    'medium': '/images/gifs/4-img-md.gif',
    'thumbnail': '/images/gifs/4-th.jpg',
    "name": "Grandmas Skyping",
    "description": "4 Grandmas Skyping: Show your Grandma what “the kids are doing these days” with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 3,
    "order": 10,
    'activate': 1450332000, // Dec 17th
    'active': false,
    'image': '/images/gifs/3-img.gif',
    'medium': '/images/gifs/3-img-md.gif',
    'thumbnail': '/images/gifs/3-th.jpg',
    "name": "Chrismas Spirits",
    "description": "3 Chrismas Spirits: A toast to past, present and future. Check out all 12 Days of Hiebing Gifsmas."
},{
    "id": 2,
    "order": 11,
    'activate': 1450418400, // Dec 18th
    'active': false,
    'image': '/images/gifs/2-img.gif',
    'medium': '/images/gifs/2-img-md.gif',
    'thumbnail': '/images/gifs/2-th.jpg',
    "name": "Pinterest Fails",
    "description": "2 Pinterest Fails: What are the holidays without a few bakery mishaps? Get back in the spirit with Hiebing’s 12 Days of Gifsmas."
},{
    "id": 1,
    "order": 12,
    'activate': 1450677600, // Dec 21st
    'active': false,
    'image': '/images/gifs/2-img.gif',
    'medium': '/images/gifs/2-img-md.gif',
    'thumbnail': '/images/gifs/2-th.jpg',
    "name": "Pinterest Fails",
    "description": "It’s the most GIF-tastic time of the year. Take your own Hiebing Holiday Elfie or check out all 12 Days of Gifsmas."
}];


///////
// Default List
///////


router.get('/list', function(req, res, next) {
  for (var i = 0; i < gifsDb.length; i++) {
    gifsDb[i] = gifHelper.format(gifsDb[i]);
  }
  res.send(gifsDb);
});


///////
// Retrieve a personalized list
///////


router.get('/read/:me', function(req, res, next) {
  console.log(req.params.me);
  for (var i = 0; i < gifsDb.length; i++) {
    gifsDb[i] = gifHelper.format(gifsDb[i]);
  }
  res.send(gifsDb);

});


///////
// Create new list
///////


router.post('/create', upload.single('file'), function(req, res){
    console.log(req.body) // form fields
    console.log(req.file) // form file
    res.status(204).end()
});


//////
// Update existing
//////


router.put('/update/:me', upload.single('file'), function(req, res) {
  console.log(req.body) // form fields
  console.log(req.file) // form file
  res.status(204).end()
})

module.exports = router;
