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
    var customer = {};
    customer.name = req.body.name;

    const data = await VehicleService.Create(customer);
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