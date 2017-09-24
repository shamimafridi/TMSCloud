// connection.js

var mongoose = require('mongoose'),
	config = require('./config.json');

mongoose.Promise = require('bluebird');
console.log('CREATING CONNECTION');
//mongoose.connect(config.dbs.attms_com_tms);
var db = mongoose.createConnection(config.dbs.attms_com_tms);
db.Schema = mongoose.Schema;
//var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error>> : '));
db.once('open', function(){
  console.log('MongoDB Connection ok!');
});

module.exports = db;


