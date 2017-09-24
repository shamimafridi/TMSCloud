// /http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
'use strict';
var express = require('express'),
  url = require('url'),
  cors = require('cors'),
  proxy = require('proxy-middleware'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  morgan = require('morgan'),
  config = require('./config/config.json'),
  session = require('express-session'),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  path = require('path');

var app = express();



var corsOptions = {
  origin: '*'
};


app.set('port', (process.env.PORT || 80));




//server.use(cors(corsOptionsDelegate));
app.use(morgan(config.logging.type));
app.use(express.static('./../dist'));
app.use(bodyParser.json()); // for parsing application/json
//server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//server.use(multer()); // for parsing multipart/form-data

//NOTE: At the moment sometime we get followign error:
//(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
// It's due to we are using alots of listeners e.g. server.all('/*', cors());, server.all('/*', cors(require('./lib/middlewares/validateDomain')));
// We need to merge somge of those listners into one listner
// Suggetion : merge all '/api/*' into One, cors into validateDomain 

app.options('*', cors());
app.all('/*', cors());


//Validate subdomain for all request
app.all('/*', cors(require('./middlewares/validateDomain')));

//Authentication
app.use('/api',require('./auth')); // auth routes

// Initialize Client DB
app.all('/api/*', require('./middlewares/initializeClientDB'));


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/*', [require('./middlewares/validateRequest')]);



//Initilize API's
var api = require('./api');
api.initialize(app);

// app.all('/*', function (req, res, next) {
//   var fallbackPage = '/loader.html';
//   console.log('req.user>.', req.user);
//   if (req.user)
//     fallbackPage = '/loader.html';
//  next();
//   //var rootPath = path.join(__dirname, './../dist/');
//   // res.sendFile('/', {
//   //   root: rootPath,
//   //   fallback: rootPath + fallbackPage //'/index.html'
//   // });

// });


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  next();
});

/*server.listen(server.get('port'), function() {
  console.log("Node app is running at localhost:" + server.get('port'));
});*/
app.set('clientSecret', 'secret'); // secret variable
//app.listen(app.get('port'), '0.0.0.0');
app.on('listening', function () {
  console.log('Express server started on port %s at %s', app.address().port, app.address().address);
});


module.exports = app;