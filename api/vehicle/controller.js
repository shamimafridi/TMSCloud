 'use strict';
 var Promise = require('bluebird'),
     errorhandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');

 var logger = require('../../config/logger');


 module.exports.query = function (req, res) {
     var VehicleService = SR.GetService('Vehicle');

     var promise = VehicleService.GetByQuery();
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleService>>query>>', err);
             errorhandler.SendError(req, res);
         });
 };


 module.exports.findOne = function (req, res) {
     var VehicleService = SR.GetService('Vehicle');
     var promise = VehicleService.GetById(req.params.id);
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleService>>query>>', err);
             errorhandler.SendError(req, res);
         });
 };


 module.exports.create = function (req, res) {
     var VehicleService = SR.GetService('Vehicle');
     var customer = {};
     customer.name = req.body.name;

     var promise = VehicleService.Create(customer);
     promise.then(function (data) {
             return res.status(201).json(data);
         })
         .catch(function (err) {
             errorhandler.SendError(req, res);
         });
 };


 module.exports.update = function (req, res) {
     var VehicleService = SR.GetService('Vehicle');
     var promise = VehicleService.Update(req.params.id, req.body);
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleService>>update>>', err);
             errorhandler.SendError(req, res);
         });
 };

 module.exports.delete = function (req, res) {
     var VehicleService = SR.GetService('Vehicle');
     var promise = VehicleService.MarkAsDelete(req.params.id);
     promise.then(function (data) {
             return res.status(200).json('Resource has been deleted');
         })
         .catch(function (err) {
             logger.error('VehicleService>>delete>>', err);
             errorhandler.SendError(req, res);
         });
 };