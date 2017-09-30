 'use strict';
var Promise = require('bluebird'),
	  errorhandler = require('../../middlewares/errorhandler'),
      SR = require('../../config/ServiceRegistry');
   	//COA = global.ServiceRegestry['coa']; //require('./../../services/coa'),
    //console.log('global.ServiceRegestry[coa]', global.ServiceRegestry['coa']);
    //COA = new COA();

var logger  = require('../../config/logger');

module.exports.query = function (req, res) {
    var COA  = SR.GetService('COA');
	var promise = COA.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('COA>>query>>', err);
      errorhandler.SendError(req, res);
    });
};


module.exports.findOne = function (req, res) {
    var COA  = SR.GetService('COA');
    var promise = COA.GetById(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('COA>>query>>', err);
    	errorhandler.SendError(req, res);
    });
};


module.exports.create = function (req, res) {
    var COA  = SR.GetService('COA');
    var coa = {};
    coa.name = req.body.name;
    coa.desc = req.body.desc;
    coa.parent_path = req.body.parent_path;
    coa.parent = req.body.parent;

    var promise = COA.Create(coa);
    promise.then(function(data) {
    	return res.status(201).json(data);
    })
    .catch(function(err){
    	errorhandler.SendError(req, res,err);
    });
};

module.exports.update = function (req, res) {
    var COA  = SR.GetService('COA');
    var promise = COA.Update(req.params.id, req.body);
    promise.then(function(data) {
      	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('COA>>update>>', err);
    	errorhandler.SendError(req, res);
    });
};

module.exports.delete = function (req, res) {
    var COA  = SR.GetService('COA');
  	var promise = COA.MarkAsDelete(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json('Resource has been deleted');
    })
    .catch(function(err){
    	logger.error('COA>>delete>>', err);
    	errorhandler.SendError(req, res);
    });
};
