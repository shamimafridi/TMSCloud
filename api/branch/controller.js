 'use strict';
var Promise = require('bluebird'),
	  errorhandler = require('../../middlewares/errorhandler'),
      SR = require('../../config/ServiceRegistry');
   	//Branch = global.ServiceRegestry['branch']; //require('./../../services/branch'),
    //console.log('global.ServiceRegestry[branch]', global.ServiceRegestry['branch']);
    //Branch = new Branch();

var logger  = require('../../config/logger');

module.exports.query = function (req, res) {
    var Branch  = SR.GetService('Branch');
	var promise = Branch.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('Branch>>query>>', err);
      errorhandler.SendError(req, res);
    });
};
module.exports.findOne = function (req, res) {
    var Branch  = SR.GetService('Branch');
    var promise = Branch.GetById(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('Branch>>query>>', err);
    	errorhandler.SendError(req, res);
    });
};
module.exports.create = function (req, res) {
    var Branch  = SR.GetService('Branch');
    var branch = {};
    branch.name = req.body.name;

    var promise = Branch.Create(branch);
    promise.then(function(data) {
    	return res.status(201).json(data);
    })
    .catch(function(err){
    	errorhandler.SendError(req, res,err);
    });
};

module.exports.update = function (req, res) {
    var Branch  = SR.GetService('Branch');
    var promise = Branch.Update(req.params.id, req.body);
    promise.then(function(data) {
      	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('Branch>>update>>', err);
    	errorhandler.SendError(req, res);
    });
};

module.exports.delete = function (req, res) {
    var Branch  = SR.GetService('Branch');
  	var promise = Branch.MarkAsDelete(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json('Resource has been deleted');
    })
    .catch(function(err){
    	logger.error('Branch>>delete>>', err);
    	errorhandler.SendError(req, res);
    });
};
