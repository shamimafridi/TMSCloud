import { read } from 'fs';

'use strict';
//const data = await require('bluebird'),
var errorHandler = require('../../middlewares/errorhandler'),
    SR = require('../../config/ServiceRegistry');

var logger = require('../../config/logger');


module.exports.query = errorHandler.wrapError(async(req, res) => {
    var VehicleService = SR.GetService('Vehicle');

    const data = await VehicleService.GetByQuery();
    return res.status(200).json(data);
});

module.exports.findOne = errorHandler.wrapError(async(req, res) => {
    var VehicleService = SR.GetService('Vehicle');
    const data = await VehicleService.GetById(req.params.id);
    return res.status(200).json(data);
});


module.exports.create = errorHandler.wrapError(async(req, res) => {
    var VehicleService = SR.GetService('Vehicle');
    var vehicle = {};
    vehicle.vehicle_reg_no = req.body.vehicle_reg_no;
    vehicle.desc=req.body.desc;
    vehcile.vehicle_owner=req.body.vehicle_owner;
    vehicle.freight_coa=req.body.freight_coa;
    vehicle.commission_coa=req.body.commission_coa;
    vehicle.shortage_coa=req.body.shortage_coa;

    const data = await VehicleService.Create(vehicle);
    return res.status(201).json(data);
});


module.exports.update = errorHandler.wrapError(async(req, res) => {
    var VehicleService = SR.GetService('Vehicle');
    const data = await VehicleService.Update(req.params.id, req.body);
    return res.status(200).json(data);
});

module.exports.delete = errorHandler.wrapError(async(req, res) => {
    var VehicleService = SR.GetService('Vehicle');
    const data = await VehicleService.MarkAsDelete(req.params.id);
    return res.status(200).json('Resource has been deleted');
});