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
    'image': '/images/gifs/12-image.gif',
    'thumbnail': '/images/gifs/12-th.jpg',
    "name": "Ugly Sweaters",
    "description": "Natasha Romanoff, also known as Black Widow, is a world-renowned super spy and one of S.H.I.E.L.D.'s top agents. Her hand-to-hand combat skills, intelligence, and unpredictability make her a deadly secret weapon. True to her mysterious nature, Black Widow comes and goes as she pleases, but always appears exactly when her particular skills are needed."
},{
    "id": 11,
    "order": 2,
    'activate': 1447175235,
    'active': false,
    'image': '/images/gifs/11-image.gif',
    'thumbnail': '/images/gifs/11-th.jpg',
    "name": "Looming Deadlines",
    "description": "During World War II, Steve Rogers enlisted in the military and was injected with a super-serum that turned him into super-soldier Captain America! He's a skilled strategist and even more skilled with his shield, but it's his courage and good heart that makes Captain America both a leader and a true hero. "
},{
    "id": 10,
    "order": 3,
    'activate': 1437175235,
    'active': false,
    'image': '/images/gifs/10-image.gif',
    'thumbnail': '/images/gifs/10-th.jpg',
    "name": "Tangled Lights",
    "description": "Recruited from S.H.I.E.L.D. by his hero and mentor Tony Stark, Falcon is the Avengers' newest and youngest recruit. Like Tony, Sam is a genius with machines and technology. What he lacks in experience, Sam makes up in enthusiasm and determination. Falcon's suit of armor comes fully stocked with holographic wings, explosive flechettes, and retractable talons."
},{
    "id": 9,
    "order": 4,
    'activate': 1437176235,
    'active': false,
    'image': '/images/gifs/9-image.gif',
    'thumbnail': '/images/gifs/9-th.jpg',
    "name": "Kitties Caroling",
    "description": "Hawkeye is an expert archer with an attitude just as on-target as his aim. His stealth combat experience and his ability to hit any target with any projectile make him a valuable member of the Avengers. However, he refuses to let things get too serious, as he has as many jokes as he does arrows!"
},{
    "id": 8,
    "order": 5,
    'activate': 1437175295,
    'active': false,
    'image': '/images/gifs/8-image.gif',
    'thumbnail': '/images/gifs/8-th.jpg',
    "name": "Reindeers Twerking",
    "description": "Scientist Bruce Banner was transformed into the Hulk as a result to gamma radiation exposure. Over 8 feet tall and weighing 1,040 pounds, it's Hulk's strength that makes him the strongest hero in the Marvel Universe! Hulk smashes all threats that dare disturb the peace and friendship he has found in the Avengers. "
},{
    "id": 7,
    "order": 6,
    'activate': 1437175235,
    'active': false,
    'image': '/images/gifs/7-image.gif',
    'thumbnail': '/images/gifs/7-th.jpg',
    "name": "Surly Santas",
    "description": "Tony Stark is the genius inventor/billionaire/philanthropist owner of Stark Industries. With his super high-tech Iron Man suit, he is practically indestructible, able to fly, and has a large selection of weapons to choose from - but it's Tony's quick thinking and ability to adapt and improvise that make him an effective leader of the Avengers.        "
},{
    "id": 6,
    "order": 7,
    'activate': 1437375235,
    'active': false,
    'image': '/images/gifs/6-image.gif',
    'thumbnail': '/images/gifs/6-th.gif',
    "name": "Regiftceptions",
    "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm's mightiest warrior. He loves the thrill of battle and is always eager to show off his power to the other Avengers, especially the Hulk. Thor's legendary Uru hammer, Mjolnir, gives him the power to control thunder and the ability to fly. He's found a new home on Earth and will defend it as his own... even if he doesn't understand its sayings and customs."
},{
    "id": 5,
    "order": 8,
    'activate': 1437375235,
    'active': false,
    'image': '/images/gifs/5-image.gif',
    'thumbnail': '/images/gifs/5-th.jpg',
    "name": "Cookies Later",
    "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm's mightiest warrior. He loves the thrill of battle and is always eager to show off his power to the other Avengers, especially the Hulk. Thor's legendary Uru hammer, Mjolnir, gives him the power to control thunder and the ability to fly. He's found a new home on Earth and will defend it as his own... even if he doesn't understand its sayings and customs."
},{
    "id": 4,
    "order": 9,
    'activate': 1437375235,
    'active': false,
    'image': '/images/gifs/4-image.gif',
    'thumbnail': '/images/gifs/4-th.gif',
    "name": "Grandma’s Skyping",
    "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm's mightiest warrior. He loves the thrill of battle and is always eager to show off his power to the other Avengers, especially the Hulk. Thor's legendary Uru hammer, Mjolnir, gives him the power to control thunder and the ability to fly. He's found a new home on Earth and will defend it as his own... even if he doesn't understand its sayings and customs."
},{
    "id": 3,
    "order": 10,
    'activate': 1437375235,
    'active': false,
    'image': '/images/gifs/3-image.gif',
    'thumbnail': '/images/gifs/3-th.jpg',
    "name": "Chrismas Spirits",
    "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm's mightiest warrior. He loves the thrill of battle and is always eager to show off his power to the other Avengers, especially the Hulk. Thor's legendary Uru hammer, Mjolnir, gives him the power to control thunder and the ability to fly. He's found a new home on Earth and will defend it as his own... even if he doesn't understand its sayings and customs."
},{
    "id": 2,
    "order": 11,
    'activate': 1437375235,
    'active': false,
    'image': '/images/gifs/2-image.gif',
    'thumbnail': '/images/gifs/2-th.jpg',
    "name": "Pinterest Fails",
    "description": "Thor is the Asgardian Prince of Thunder, the son of Odin, and the realm's mightiest warrior. He loves the thrill of battle and is always eager to show off his power to the other Avengers, especially the Hulk. Thor's legendary Uru hammer, Mjolnir, gives him the power to control thunder and the ability to fly. He's found a new home on Earth and will defend it as his own... even if he doesn't understand its sayings and customs."
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
