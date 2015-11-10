# Step zero
*Background:* This is a NodeJs project. To work on NodeJs you must install it. Goto [nodejs.org] and download version 5.x.x. After you have node installed you'll need to install bower. The is done from the command line as are the rest of the commands below. Type `sudo npm install -g bower` to install bower globally. Now you're ready to begin.

# Step one
Install all serverside dependencies with `npm install`. Then install the frontend dependencies with `bower install`.


# Step two
Run either of the following to start the app:

`npm start`

*OR*

`DEBUG=gifsmas:* npm start`

# Step three
Point your browser to [http://localhost:3000].

# Running deploys

## Deploy to Heroku
+ Url: https://vast-beyond-5642.herokuapp.com/
+ Git Url: https://git.heroku.com/vast-beyond-5642.git

Environment var set as ` heroku config:set ENV=Production ` to tell heroku to use prod setting where available. Access in node as: `server.get('env') === 'development'`.

You need a heroku account and heroku toolbelt commandline app for success.

Sometimes you may need to allocate resources to heroku, do this as `heroku ps:scale web=1`


## General heroku troubleshooting

+ `heroku logs` - Shows access logs and error logs
+ `heroku restart` - We all know that restarting is magic
+ `heroku keys:add` - Add your public key to heroku, so that you can login.
+ `heroku open` - Open heroku instance in the default browser.
+ See [http://heroku.com] for the best detail.

_SSH Keys are needed to work with heroku_
