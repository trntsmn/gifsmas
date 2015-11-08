# Step one
Install all dependencies with `npm install`.


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
+ See [http://heroku.com] for the best detail.

_SSH Keys are needed to work with heroku_
