 'use strict';
 var Promise = require('bluebird'),
     errorhandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');

 var logger = require('../../config/logger');


 module.exports.query = function (req, res) {
     var VehicleOwnerService = SR.GetService('VehicleOwner');

     var promise = VehicleOwnerService.GetByQuery();
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleOwnerService>>query>>', err);
             errorhandler.SendError(req, res);
         });
 };


 module.exports.findOne = function (req, res) {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     var promise = VehicleOwnerService.GetById(req.params.id);
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleOwnerService>>query>>', err);
             errorhandler.SendError(req, res);
         });
 };


 module.exports.create = function (req, res) {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     var customer = {};
     customer.name = req.body.name;

     var promise = VehicleOwnerService.Create(customer);
     promise.then(function (data) {
             return res.status(201).json(data);
         })
         .catch(function (err) {
             errorhandler.SendError(req, res);
         });
 };


 module.exports.update = function (req, res) {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     var promise = VehicleOwnerService.Update(req.params.id, req.body);
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('VehicleOwnerService>>update>>', err);
             errorhandler.SendError(req, res);
         });
 };

 module.exports.delete = function (req, res) {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     var promise = VehicleOwnerService.MarkAsDelete(req.params.id);
     promise.then(function (data) {
             return res.status(200).json('Resource has been deleted');
         })
         .catch(function (err) {
             logger.error('VehicleOwnerService>>delete>>', err);
             errorhandler.SendError(req, res);
         });
 };