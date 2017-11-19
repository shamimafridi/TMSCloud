 'use strict';
 //const data = await require('bluebird'),
 var errorHandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');

 var logger = require('../../config/logger');


 module.exports.query = errorHandler.wrapError(async(req, res) => {
     var VehicleOwnerService = SR.GetService('VehicleOwner');

     const data = await VehicleOwnerService.GetByQuery();
     return res.status(200).json(data);
 });

 module.exports.findOne = errorHandler.wrapError(async(req, res) => {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     const data = await VehicleOwnerService.GetById(req.params.id);
     return res.status(200).json(data);
 });


 module.exports.create = errorHandler.wrapError(async(req, res) => {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     var customer = {};
     customer.name = req.body.name;

     const data = await VehicleOwnerService.Create(customer);
     return res.status(201).json(data);
 });


 module.exports.update = errorHandler.wrapError(async(req, res) => {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     const data = await VehicleOwnerService.Update(req.params.id, req.body);
     return res.status(200).json(data);
 });

 module.exports.delete = errorHandler.wrapError(async(req, res) => {
     var VehicleOwnerService = SR.GetService('VehicleOwner');
     const data = await VehicleOwnerService.MarkAsDelete(req.params.id);
     return res.status(200).json('Resource has been deleted');
 });