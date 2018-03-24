 'use strict';
 var errorHandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');

 var logger = require('../../config/logger');

 module.exports.query = errorHandler.wrapError(async(req, res) => {
     var VehicleTransaction = SR.GetService('vehicleTransaction');
     const data = await VehicleTransaction.GetByQuery();
     return res.status(200).json(data);
 });


 module.exports.findOne = errorHandler.wrapError(async(req, res) => {
     var VehicleTransaction = SR.GetService('vehicleTransaction');
     const data = await VehicleTransaction.GetById(req.params.id);
     return res.status(200).json(data);
 });


 module.exports.create = errorHandler.wrapError(async(req, res) => {
    req.checkBody('date', 'date is required').isr();
    
     var VehicleTransaction = SR.GetService('VehicleTransaction');
     var vehicleTransaction = {};
     vehicleTransaction.date = req.body.date;
     vehicleTransaction.branch = req.body.branch;
     vehicleTransaction.coa = req.body.coa;
     vehicleTransaction.type = req.body.type;
     vehicleTransaction.narration = req.body.narration;
     vehicleTransaction.instrumental_type = req.body.instrumental_type;
     vehicleTransaction.vehicle_reg_no = req.body.vehicle_reg_no;
     vehicleTransaction.desc = req.body.desc;
     vehicleTransaction.transaction_detail = req.body.transaction_detail;

     const data = await VehicleTransaction.Create(vehicleTransaction);
     return res.status(201).json(data);
 });

 module.exports.update = errorHandler.wrapError(async(req, res) => {
     var VehicleTransaction = SR.GetService('VehicleTransaction');
     const data = await VehicleTransaction.Update(req.params.id, req.body);
     return res.status(200).json(data);
 });

 module.exports.delete = errorHandler.wrapError(async(req, res) => {
     var VehicleTransaction = SR.GetService('VehicleTransaction');
     const data = await VehicleTransaction.MarkAsDelete(req.params.id);
     return res.status(200).json('Resource has been deleted');
 });