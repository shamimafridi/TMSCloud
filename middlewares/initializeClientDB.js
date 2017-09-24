'use strict';
var config = require('../config/config.json'),
  	mongoose = require('mongoose'),
    logger  = require('../config/logger');

global.MongooseConnection = [];
global.ServiceRegestry = [];

// Initilize client DB connection 
module.exports = function(req, res, next) {
	var ClientConnection;
	console.log(req.headers['subdomain'])
	console.log('config.dbs.client_base + global.ActiveClientDB', config.dbs.client_base + req.headers['subdomain']);
	if(global.MongooseConnection[req.headers['subdomain']]) {
		 console.log('Open mongo connection for pool:', [req.headers['subdomain']]);
		 ClientConnection = global.MongooseConnection[req.headers['subdomain']];
		 global.ActiveClientMongooseConnection = ClientConnection;
	} else {
		console.log('create new mongo connection for:', [req.headers['subdomain']]);
		ClientConnection =  mongoose.createConnection(config.dbs.client_base + req.headers['subdomain'] + config.dbs.client_db_sufix);

        global.MongooseConnection[req.headers['subdomain']] = ClientConnection;

		 //Initialize Modules for connection
		var models = require('../models');

		models.initialize(ClientConnection);

		//Initilize Services for connection
		var services = require('../Services');

		services.initialize(ClientConnection);

		global.ActiveClientMongooseConnection = ClientConnection;
	}

	ClientConnection.on('connected', function () {
		console.log('Mongoose default connection open to  ' + [req.headers['subdomain']]);
	});
	// When the connection is disconnected
	ClientConnection.on('disconnected', function () {
		console.log('Mongoose ' + [req.headers['subdomain']] + ' connection disconnected');
	});

	// When error
	ClientConnection.on('error', function (error) {
		console.log('Mongoose error>>' + [req.headers['subdomain']] + ':', error);
		// No user with this name exists, respond back with a 401
		delete req.user;
		res.status(401);
		res.json({ 'status': 401, 'message': config.message.invalidCredentials});
	});
	next(); 
}