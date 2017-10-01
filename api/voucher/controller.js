 'use strict';
var Promise = require('bluebird'),
	  errorhandler = require('../../middlewares/errorhandler'),
      SR = require('../../config/ServiceRegistry');
   	//Voucher = global.ServiceRegestry['voucher']; //require('./../../services/voucher'),
    //console.log('global.ServiceRegestry[voucher]', global.ServiceRegestry['voucher']);
    //Voucher = new Voucher();

var logger  = require('../../config/logger');

module.exports.query = function (req, res) {
    var Voucher  = SR.GetService('Voucher');
	var promise = Voucher.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('Voucher>>query>>', err);
      errorhandler.SendError(req, res);
    });
};


module.exports.findOne = function (req, res) {
    var Voucher  = SR.GetService('Voucher');
    var promise = Voucher.GetById(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('Voucher>>query>>', err);
    	errorhandler.SendError(req, res);
    });
};


module.exports.create = function (req, res) {
    var Voucher  = SR.GetService('Voucher');
    var voucher = {};
    var voucher_detail=[];
    voucher.date = req.body.date;
    voucher.branch = req.body.branch;
    voucher.desc = req.body.desc;
    voucher.voucher_detail = req.body.voucher_detail;

    var promise = Voucher.Create(voucher);
    promise.then(function(data) {
    	return res.status(201).json(data);
    })
    .catch(function(err){
    	errorhandler.SendError(req, res,err);
    });
};

module.exports.update = function (req, res) {
    var Voucher  = SR.GetService('Voucher');
    var promise = Voucher.Update(req.params.id, req.body);
    promise.then(function(data) {
      	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('Voucher>>update>>', err);
    	errorhandler.SendError(req, res);
    });
};

module.exports.delete = function (req, res) {
    var Voucher  = SR.GetService('Voucher');
  	var promise = Voucher.MarkAsDelete(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json('Resource has been deleted');
    })
    .catch(function(err){
    	logger.error('Voucher>>delete>>', err);
    	errorhandler.SendError(req, res);
    });
};
